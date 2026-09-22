import "../styles/Textarea.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type TextareaVariant = "outline" | "soft";
export type TextareaSize =
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type TextareaGutterSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type TextareaOwnProps = {
  "aria-invalid"?: never;
  dangerouslySetInnerHTML?: never;
  gutterSize?: TextareaGutterSize;
  invalid?: boolean;
  size?: TextareaSize;
  variant?: TextareaVariant;
};

export type TextareaProps<Target extends ElementType = "textarea"> =
  PolymorphicProps<Target, TextareaOwnProps>;

export function Textarea<Target extends ElementType = "textarea">({
  as,
  gutterSize,
  invalid = false,
  size = "md",
  variant = "outline",
  ...props
}: TextareaProps<Target>) {
  return renderPolymorphic("textarea", as, {
    ...props,
    "aria-invalid": invalid || undefined,
    className: "Textarea",
    "data-gutter-size": gutterSize,
    "data-size": size,
    "data-variant": variant,
    ...(as === undefined || as === "textarea"
      ? { rows: props.rows ?? 3 }
      : {}),
  });
}
