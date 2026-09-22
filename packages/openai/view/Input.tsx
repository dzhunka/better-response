import "../styles/Input.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type InputVariant = "outline" | "soft";
export type InputSize =
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type InputGutterSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
export type InputOpticalAlignment = "start" | "end";

export type InputOwnProps = {
  "aria-invalid"?: never;
  children?: never;
  dangerouslySetInnerHTML?: never;
  gutterSize?: InputGutterSize;
  invalid?: boolean;
  opticallyAlign?: InputOpticalAlignment;
  pill?: boolean;
  size?: InputSize;
  variant?: InputVariant;
};

export type InputProps<Target extends ElementType = "input"> = PolymorphicProps<
  Target,
  InputOwnProps
>;

export function Input<Target extends ElementType = "input">({
  as,
  gutterSize,
  invalid = false,
  opticallyAlign,
  pill = false,
  size = "md",
  variant = "outline",
  ...props
}: InputProps<Target>) {
  return renderPolymorphic("input", as, {
    ...props,
    "aria-invalid": invalid || undefined,
    className: "Input",
    "data-gutter-size": gutterSize,
    "data-optically-align": opticallyAlign,
    "data-pill": pill ? "" : undefined,
    "data-size": size,
    "data-variant": variant,
    ...(as === undefined || as === "input"
      ? { type: props.type ?? "text" }
      : {}),
  });
}
