import type { ComponentMetadataRegistry } from "../components";
import { createNode } from "./node";

export function createTree(metadata: ComponentMetadataRegistry) {
  return createNode(metadata);
}

export function advertiseTreeJsonSchema(
  schema: Record<string, unknown>,
): Record<string, unknown> {
  return structuredClone(schema);
}

export type { Node as Tree } from "./node";
