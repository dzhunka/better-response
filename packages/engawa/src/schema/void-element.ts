import { z } from "zod";
import { voidProps, type VoidProps } from "./props";

export const voidElementTypes = ["br", "col", "hr", "img", "input", "wbr"] as const;
export const voidElementType = z.enum(voidElementTypes);
export type VoidElementType = z.infer<typeof voidElementType>;

export type VoidElement = {
  type: VoidElementType;
  props?: VoidProps;
  children?: never;
};

export function createVoidElement(componentTypes: Set<string>) {
  const availableTypes = voidElementTypes.filter(
    (type) => !componentTypes.has(type),
  );

  if (availableTypes.length === 0) return undefined;

  return z
    .object({
      type: z.enum(availableTypes as [VoidElementType, ...VoidElementType[]]),
      props: z.lazy(() => voidProps).optional(),
    })
    .strict();
}
