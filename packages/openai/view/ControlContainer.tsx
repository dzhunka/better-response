import "../styles/ControlContainer.css";

import type { ElementType, ReactNode } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ControlContainerVariant = "outline" | "soft";

export type ControlContainerOwnProps = {
  children: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  pill?: boolean;
  variant?: ControlContainerVariant;
};

export type ControlContainerProps<Target extends ElementType = "div"> =
  PolymorphicProps<Target, ControlContainerOwnProps>;

export function ControlContainer<Target extends ElementType = "div">({
  as,
  children,
  disabled = false,
  invalid = false,
  pill = false,
  variant = "outline",
  ...props
}: ControlContainerProps<Target>) {
  return renderPolymorphic("div", as, {
    ...props,
    children,
    className: "ControlContainer",
    "data-disabled": disabled ? "" : undefined,
    "data-invalid": invalid ? "" : undefined,
    "data-pill": pill ? "" : undefined,
    "data-variant": variant,
    ...(disabled && as !== undefined && as !== "div"
      ? { disabled: true }
      : {}),
  });
}
