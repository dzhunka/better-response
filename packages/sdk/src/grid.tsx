"use client"

import "./grid.css"

import type { ReactNode } from "react"

import { spaceToken, type Space } from "./space"

export interface GridProps {
  /** Cells in row-major order. */
  children?: ReactNode

  /** Number of equal-width columns. */
  columns?: 2 | 3 | 4

  /** Spacing between cells. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  gap?: Space

  /** Inset around the grid's cells. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  padding?: Space
}

/** Arranges children into a fixed number of equal columns. */
function Grid({
  children,
  columns,
  gap = "md",
  padding = "none",
}: GridProps) {
  const columnCount = columns ?? 2
  return (
    <div
      className="Grid"
      data-columns={columnCount}
      data-gap={spaceToken(gap)}
      data-padding={spaceToken(padding)}
      data-slot="grid"
    >
      {children}
    </div>
  )
}

export { Grid }
