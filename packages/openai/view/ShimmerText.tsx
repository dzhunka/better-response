import "../styles/ShimmerText.css";

import type { ElementType, ReactNode } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ShimmerTextOwnProps = {
  children: ReactNode;
  dangerouslySetInnerHTML?: never;
};

export type ShimmerTextProps<Target extends ElementType = "span"> =
  PolymorphicProps<Target, ShimmerTextOwnProps>;

export function ShimmerText<Target extends ElementType = "span">({
  as,
  children,
  ...props
}: ShimmerTextProps<Target>) {
  return renderPolymorphic("span", as, {
    ...props,
    children,
    className: "ShimmerText",
  });
}
