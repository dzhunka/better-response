import { z } from "zod";
import { createChildren, createProps, type Children, type Props } from "./props";
import type { Node } from "./node";
import type { ComponentRenderers } from "../components";

export const elementTypes = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "button",
  "caption",
  "cite",
  "code",
  "colgroup",
  "data",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "i",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "meter",
  "nav",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "search",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "u",
  "ul",
  "var",
] as const;

export const elementType = z.enum(elementTypes);

export type ElementType = z.infer<typeof elementType>;

export type Element<
  Components extends ComponentRenderers | undefined = undefined,
> = {
  type: ElementType;
  props?: Props;
  children?: Children<Components>;
};

export function createElement<
  Components extends ComponentRenderers | undefined = undefined,
>(
  getNode: () => z.ZodType<Node<Components>>,
  componentTypes: Set<string>,
) {
  const availableTypes = elementTypes.filter(
    (type) => !componentTypes.has(type),
  ) as [ElementType, ...ElementType[]];

  return z
    .object({
      type: z.enum(availableTypes),
      props: createProps().optional(),
      children: createChildren(getNode),
    })
    .strict();
}
