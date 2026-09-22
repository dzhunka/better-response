export type EmbeddedNode = {
  type: string;
  props?: unknown;
  children?: unknown;
};

/**
 * Recognizes a serialized node sitting inside a prop value. The validator and
 * the renderer must agree on this test: anything it accepts is required to be
 * a valid node and is rendered, and anything it rejects stays plain data.
 */
export function isEmbeddedNode(
  candidate: unknown,
  isRegistered: (type: string) => boolean,
): candidate is EmbeddedNode {
  if (
    typeof candidate !== "object" ||
    candidate === null ||
    Array.isArray(candidate)
  ) {
    return false;
  }

  for (const key of Object.keys(candidate)) {
    if (key !== "type" && key !== "props" && key !== "children") return false;
  }

  const { type } = candidate as { type?: unknown };
  return typeof type === "string" && isRegistered(type);
}
