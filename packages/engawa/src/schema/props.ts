import { z } from "zod";
import type { Node } from "./node";
import { value, type Value } from "./value";
import type { ComponentRenderers } from "../components";

export type Children<
  Components extends ComponentRenderers | undefined = undefined,
> = Array<string | Node<Components>>;
export type Style = Record<string, string | number>;

export type Props = Record<string, Value | Style | undefined> & {
  children?: never;
  style?: Style;
};

export type VoidProps = Record<string, Value | Style | undefined> & {
  children?: never;
  style?: Style;
};

const style = z
  .record(z.union([z.string(), z.number().finite()]))
  .describe(
    "CSS properties using JSX camelCase names. Use strings when units are required. Never pass a CSS string. Omit color properties to inherit the host theme; when an explicit color is required, use a standard MCP variable such as var(--color-text-primary) or var(--color-background-primary).",
  );

function rejectUnsafeProps(props: Record<string, unknown>, context: z.RefinementCtx): void {
  for (const name of Object.keys(props)) {
    if (
      /^on/i.test(name) ||
      name === "ref" ||
      name === "key" ||
      name === "dangerouslySetInnerHTML" ||
      name === "children" ||
      name === "className" ||
      name === "style"
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [name],
        message: `${name} is not an allowed Engawa prop`,
      });
    }

    if (
      ["action", "cite", "formaction", "href", "poster", "src"].includes(name.toLowerCase()) &&
      typeof props[name] === "string" &&
      /^\s*(?:data|javascript|vbscript):/i.test(props[name])
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [name],
        message: `${name} uses an unsafe URL scheme`,
      });
    }
  }
}

export { rejectUnsafeProps };

export function createChildren(
  getNode: () => z.ZodTypeAny,
  description = "Ordered text and UI nodes.",
) {
  return z
    .array(z.union([z.string(), z.lazy(getNode)]))
    .optional()
    .describe(description);
}

export function createProps(): z.ZodType<Props> {
  return z.lazy(() =>
    z
      .object({
        style: style.optional(),
      })
      .catchall(value)
      .superRefine(rejectUnsafeProps)
      .describe(
        "JSX props for this type. Children sit beside type, not in props. Use camelCase DOM names except aria-* and data-*. Omit absent values. Event handlers, ref, dangerouslySetInnerHTML, and unsafe URL schemes are not allowed.",
      ),
  );
}

export const voidProps: z.ZodType<VoidProps> = z.lazy(() =>
  z
    .object({
      style: style.optional(),
    })
    .catchall(value)
    .superRefine(rejectUnsafeProps)
    .describe(
      "JSX props for this childless type. Children are not allowed. Use camelCase DOM names except aria-* and data-*. Omit absent values. Event handlers, ref, dangerouslySetInnerHTML, and unsafe URL schemes are not allowed.",
    ),
);
