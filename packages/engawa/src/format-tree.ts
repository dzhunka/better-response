export function formatTree(node: unknown, depth = 0): string {
  const indent = "  ".repeat(depth);

  if (typeof node === "string") {
    return `${indent}${JSON.stringify(node)}`;
  }

  if (!node || typeof node !== "object") {
    return `${indent}${String(node)}`;
  }

  const record = node as {
    type?: unknown;
    props?: Record<string, unknown>;
    children?: unknown;
  };
  const type = typeof record.type === "string" ? record.type : "?";
  const props =
    record.props &&
    typeof record.props === "object" &&
    Object.keys(record.props).length > 0
      ? ` ${JSON.stringify(record.props)}`
      : "";
  const lines = [`${indent}${type}${props}`];
  const children = Array.isArray(record.children)
    ? record.children
    : record.children === undefined
      ? []
      : [record.children];

  for (const child of children) {
    lines.push(formatTree(child, depth + 1));
  }

  return lines.join("\n");
}
