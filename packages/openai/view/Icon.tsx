import "../styles/Icon.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type IconSize = "sm" | "md" | "lg";

export type IconOwnProps = {
  dangerouslySetInnerHTML?: never;
  fill?: never;
  height?: never;
  size?: IconSize;
  width?: never;
};

export type IconProps<Target extends ElementType = "svg"> = PolymorphicProps<
  Target,
  IconOwnProps
>;

export function Icon<Target extends ElementType = "svg">({
  as,
  size = "md",
  ...props
}: IconProps<Target>) {
  return renderPolymorphic("svg", as, {
    ...props,
    className: "Icon",
    "data-size": size,
    ...(as === undefined || as === "svg"
      ? {
          fill: "currentColor",
          viewBox: props.viewBox ?? "0 0 24 24",
        }
      : {}),
  });
}
