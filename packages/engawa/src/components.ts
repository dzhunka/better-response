import type { ReactNode } from "react";

export type ComponentPropKind =
  | "array"
  | "boolean"
  | "number"
  | "object"
  | "string";

export type ComponentRenderer = (props: never) => ReactNode;
export type ComponentRenderers = Record<string, ComponentRenderer>;

export type ComponentMetadata = {
  children:
    | false
    | {
        description: string;
        optional: boolean;
      };
  description: string;
  props: Record<
    string,
    {
      description: string;
      enum?: Array<string | number>;
      nullable: boolean;
      optional: boolean;
      type: ComponentPropKind | ComponentPropKind[];
    }
  >;
};

export type ComponentMetadataRegistry = Record<string, ComponentMetadata>;
