import "../styles/Slider.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type SliderOwnProps = {
  children?: never;
  dangerouslySetInnerHTML?: never;
  type?: never;
};

export type SliderProps<Target extends ElementType = "input"> =
  PolymorphicProps<Target, SliderOwnProps>;

export function Slider<Target extends ElementType = "input">({
  as,
  ...props
}: SliderProps<Target>) {
  return renderPolymorphic("input", as, {
    ...props,
    className: "Slider",
    ...(as === undefined || as === "input" ? { type: "range" } : {}),
  });
}
