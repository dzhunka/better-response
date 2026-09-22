import type { ComponentRenderers } from "../components";
import type { Node } from "./node";

type PropsOf<Component> = Component extends (props: infer Props) => unknown
  ? Props
  : never;

type TreeProps<Component> = Omit<PropsOf<Component>, "children">;

export type Component<
  Components extends ComponentRenderers | undefined = undefined,
> = [Components] extends [ComponentRenderers]
  ? {
      [Name in keyof Components & string]: {
        type: Name;
        props?: TreeProps<Components[Name]>;
      } & ("children" extends keyof PropsOf<Components[Name]>
        ? {
            children?:
              | string
              | Node<Components>
              | Array<string | Node<Components>>;
          }
        : // Do not use `children?: never` here: many childless members make
          // TypeScript stop correlating `type` with `props` on the union.
          {});
    }[keyof Components & string]
  : {
      type: string;
      props?: Record<string, boolean | number | string | null | undefined>;
      children?: string | Node | Array<string | Node>;
    };
