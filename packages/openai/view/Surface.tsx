import "../styles/Surface.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type SurfaceOwnProps = {};

export type SurfaceProps<Target extends ElementType = "div"> =
  PolymorphicProps<Target, SurfaceOwnProps>;

export function Surface<Target extends ElementType = "div">({
  as,
  ...props
}: SurfaceProps<Target>) {
  return renderPolymorphic("div", as, {
    ...props,
    className: "Surface",
  });
}
