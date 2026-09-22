import "../styles/Badge.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type BadgeColor =
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "discovery";
export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeOwnProps = {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
};

export type BadgeProps<Target extends ElementType = "span"> =
  PolymorphicProps<Target, BadgeOwnProps>;

export function Badge<Target extends ElementType = "span">({
  as,
  color = "secondary",
  variant = "soft",
  size = "sm",
  pill = false,
  ...props
}: BadgeProps<Target>) {
  return renderPolymorphic("span", as, {
    ...props,
    className: "Badge",
    "data-color": color,
    "data-pill": pill ? "" : undefined,
    "data-size": size,
    "data-variant": variant,
  });
}
