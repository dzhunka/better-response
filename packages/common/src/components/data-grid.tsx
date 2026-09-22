"use client"

import { isValidElement, type ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@better-response/common/ui/table"

export type DataGridCellType = "text" | "number" | "boolean" | "date"

export type DataGridColumn =
  | string
  | {
      /** Row field name. */
      key: string

      /** Header text. Defaults to key. */
      label?: string

      /**
       * Cell semantics. Omitted columns infer number or boolean from the first
       * value and otherwise render text. Set "date" explicitly for ISO date
       * strings and epoch numbers; they are indistinguishable from text.
       */
      type?: DataGridCellType

      /**
       * Intl options for the column type, applied in the viewer's locale:
       * Intl.NumberFormat options for number ({ "style": "currency",
       * "currency": "EUR" }), Intl.DateTimeFormat options for date
       * ({ "dateStyle": "medium" }).
       */
      format?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
    }

type CellValue = string | number | boolean | null

/**
 * A serialized node as the agent writes it. The renderer hydrates it into a
 * ReactNode before this component sees it, so a slot accepts either spelling.
 */
type SerializedNode = { type: string; props?: unknown; children?: unknown }

/**
 * A cell is a plain value, or a `{ children, value }` envelope that adds
 * custom rendering without giving up the underlying datum.
 */
export type DataGridCell =
  | CellValue
  | {
      /** Node rendered in place of the formatted value. */
      children?: ReactNode | SerializedNode

      /** Underlying datum. Keeps column semantics and renders as the fallback. */
      value?: CellValue
    }

export interface DataGridProps {
  /**
   * Row objects. A cell is a string, number, boolean, or null, or
   * `{ children, value }` to render a node in that cell while keeping the
   * underlying datum: `{ "children": { "type": "Progress", "props":
   * { "value": 3, "max": 5 } }, "value": 3 }`. `children` takes any node the
   * schema accepts; `value` keeps the column's type and format meaningful and
   * renders when `children` is absent.
   * A column's type and format apply to one value per cell; a value that does
   * not match the column's type renders as plain text.
   */
  data?: Array<Record<string, DataGridCell>>

  /**
   * Columns as key strings, or objects `{ key, label?, type?, format? }`.
   * Omit to use keys from the first row.
   * `type` is "text" | "number" | "boolean" | "date"; omitted columns infer
   * number or boolean from the first value and otherwise render text. Set
   * "date" explicitly for ISO date strings and epoch numbers.
   * Text columns wrap onto several lines so long copy stays readable; typed
   * columns stay on one line so a formatted value is never broken.
   * `format` passes Intl options for that type in the viewer's locale:
   * Intl.NumberFormat options for number, such as
   * { "style": "currency", "currency": "EUR" } or { "style": "percent" },
   * and Intl.DateTimeFormat options for date, such as
   * { "dateStyle": "medium" }.
   */
  columns?: DataGridColumn[]
}

type ResolvedColumn = {
  key: string
  label: string
  type: DataGridCellType
  format?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions

  /** True when a cell renders a node, which drops numeric alignment. */
  slotted: boolean
}

function resolveColumns(
  columns: DataGridColumn[] | undefined,
  data: Array<Record<string, DataGridCell>>,
): ResolvedColumn[] {
  const declared: DataGridColumn[] = columns?.length
    ? columns
    : Object.keys(data[0] ?? {})
  const resolved: ResolvedColumn[] = []

  for (const column of declared) {
    const key = typeof column === "string" ? column : column?.key
    if (typeof key !== "string" || !key) continue

    const declaredType = typeof column === "string" ? undefined : column.type
    const sample = data
      .map((row) => cellDatum(row[key]))
      .find((datum) => datum != null)

    resolved.push({
      key,
      label:
        typeof column === "object" &&
        typeof column.label === "string" &&
        column.label
          ? column.label
          : key,
      type:
        declaredType ??
        (typeof sample === "number"
          ? "number"
          : typeof sample === "boolean"
            ? "boolean"
            : "text"),
      format: typeof column === "object" ? column.format : undefined,
      slotted: data.some((row) => cellNode(row[key]) !== undefined),
    })
  }

  return resolved
}

function cellDatum(cell: DataGridCell): CellValue {
  if (cell !== null && typeof cell === "object") {
    return isValidElement(cell) ? null : (cell.value ?? null)
  }

  return cell
}

function cellNode(cell: DataGridCell): ReactNode | undefined {
  if (isValidElement(cell)) return cell

  if (cell !== null && typeof cell === "object") {
    const { children } = cell
    if (
      isValidElement(children) ||
      Array.isArray(children) ||
      typeof children === "string" ||
      typeof children === "number"
    ) {
      return children
    }
  }

  return undefined
}

function formatCell(value: CellValue, column: ResolvedColumn): string {
  if (value == null) return ""

  if (column.type === "boolean" && typeof value === "boolean") {
    return value ? "✓" : "—"
  }

  if (column.type === "number" && typeof value === "number") {
    try {
      return new Intl.NumberFormat(undefined, column.format).format(value)
    } catch {
      return String(value)
    }
  }

  if (column.type === "date" && typeof value !== "boolean") {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      try {
        return new Intl.DateTimeFormat(undefined, column.format).format(date)
      } catch {
        return String(value)
      }
    }
  }

  return String(value)
}

/** Tabular data from row objects. Typed columns are formatted and aligned; untyped columns render as text. */
function DataGrid({ columns, data = [] }: DataGridProps) {
  const resolved = resolveColumns(columns, data)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {resolved.map((column) => (
            <TableHead
              key={column.key}
              className={numeric(column) ? "text-right" : undefined}
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {resolved.map((column) => (
              <TableCell key={column.key} className={cellClass(column)}>
                {cellNode(row[column.key]) ??
                  formatCell(cellDatum(row[column.key]), column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function numeric(column: ResolvedColumn): boolean {
  return column.type === "number" && !column.slotted
}

/** Table cells are nowrap by default, which a formatted value needs and free text does not. */
function cellClass(column: ResolvedColumn): string | undefined {
  if (numeric(column)) return "text-right tabular-nums"
  if (column.type === "text" || column.slotted) return "whitespace-normal"

  return undefined
}

export { DataGrid }
