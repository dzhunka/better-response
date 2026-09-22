import "../styles/Button.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ButtonColor = "primary" | "secondary";
export type ButtonVariant = "solid" | "outline";

export type ButtonOwnProps = {
  color?: ButtonColor;
  variant?: ButtonVariant;
};

export type ButtonProps<Target extends ElementType = "button"> =
  PolymorphicProps<Target, ButtonOwnProps>;

export function Button<Target extends ElementType = "button">({
  as,
  color = "primary",
  variant = "solid",
  ...props
}: ButtonProps<Target>) {
  return renderPolymorphic("button", as, {
    ...props,
    className: "Button",
    "data-color": color,
    "data-variant": variant,
    ...(as === undefined || as === "button"
      ? { type: props.type ?? "button" }
      : {}),
  });
}
