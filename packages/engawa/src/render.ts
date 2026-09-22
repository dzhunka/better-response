import { createElement, type ElementType, type ReactElement } from "react";
import type { ComponentRenderers } from "./components";
import { isEmbeddedNode } from "./schema/embedded";
import type { Node } from "./schema/node";

export function render<Components extends ComponentRenderers>(
  node: Node<Components>,
  components: Components,
): ReactElement {
  const props = { ...((node.props ?? {}) as Record<string, unknown>) };
  const fromProps = props.children;
  delete props.children;

  for (const [name, value] of Object.entries(props)) {
    props[name] = hydrate(value, components);
  }
  const raw =
    "children" in node && node.children !== undefined
      ? node.children
      : fromProps !== undefined
        ? fromProps
        : [];
  const children = Array.isArray(raw) ? raw : [raw];
  const component = components[node.type];

  if (!component) {
    throw new Error(`Unknown Engawa component: ${String(node.type)}`);
  }

  return createElement(
    component as unknown as ElementType,
    props,
    ...children.map((child) =>
      typeof child === "string"
        ? child
        : render(child as Node<Components>, components),
    ),
  );
}

/**
 * Turns serialized nodes found anywhere inside a prop value into elements, so
 * components can accept UI in a data position. Everything else passes through.
 */
function hydrate<Components extends ComponentRenderers>(
  value: unknown,
  components: Components,
): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => hydrate(item, components));
  }

  if (isEmbeddedNode(value, (type) => type in components)) {
    return render(value as Node<Components>, components);
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([name, item]) => [
        name,
        hydrate(item, components),
      ]),
    );
  }

  return value;
}
