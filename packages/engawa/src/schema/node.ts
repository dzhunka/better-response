import { z } from "zod";
import type {
  ComponentMetadataRegistry,
  ComponentRenderers,
} from "../components";
import type { Component } from "./component";
import { isEmbeddedNode } from "./embedded";
import { rejectUnsafeProps } from "./props";
import { value } from "./value";

export type Node<
  Components extends ComponentRenderers | undefined = undefined,
> = Component<Components>;

export function createNode(
  metadata: ComponentMetadataRegistry,
): z.ZodType<Node> {
  const names = Object.keys(metadata);
  if (names.length === 0) {
    throw new Error("Engawa requires at least one registered component.");
  }

  const isRegistered = (type: string) => names.includes(type);
  let node: z.ZodType<Node>;
  node = z.lazy(() =>
    z
      .object({
        type: z.enum(names as [string, ...string[]]),
        props: z
          .record(value)
          .superRefine(rejectUnsafeProps)
          .superRefine((props, context) => {
            checkEmbeddedNodes(props, [], context, node, isRegistered);
          })
          .optional(),
        children: z
          .union([
            z.string(),
            z.lazy(() => node),
            z.array(z.union([z.string(), z.lazy(() => node)])),
          ])
          .optional(),
      })
      .strict()
      .describe(
        "UI node with type, optional props, and optional children beside type.",
      ),
  ) as z.ZodType<Node>;

  return node;
}

/**
 * A prop value that looks like a node must be a valid node, because the
 * renderer will turn it into an element. Plain data objects keep arbitrary
 * keys; only the embedded node's own props face the unsafe-prop rules.
 */
function checkEmbeddedNodes(
  input: unknown,
  path: Array<string | number>,
  context: z.RefinementCtx,
  node: z.ZodType<Node>,
  isRegistered: (type: string) => boolean,
): void {
  if (Array.isArray(input)) {
    input.forEach((item, index) =>
      checkEmbeddedNodes(item, [...path, index], context, node, isRegistered),
    );
    return;
  }

  if (typeof input !== "object" || input === null) return;

  if (isEmbeddedNode(input, isRegistered)) {
    const result = node.safeParse(input);
    if (!result.success) {
      for (const issue of result.error.issues) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...path, ...issue.path],
          message: issue.message,
        });
      }
    }
    return;
  }

  for (const [key, item] of Object.entries(input)) {
    checkEmbeddedNodes(item, [...path, key], context, node, isRegistered);
  }
}
