import "../styles/Checkbox.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type CheckboxOwnProps = {
  children?: never;
  dangerouslySetInnerHTML?: never;
  type?: never;
};

export type CheckboxProps<Target extends ElementType = "input"> =
  PolymorphicProps<Target, CheckboxOwnProps>;

export function Checkbox<Target extends ElementType = "input">({
  as,
  ...props
}: CheckboxProps<Target>) {
  return renderPolymorphic("input", as, {
    ...props,
    className: "Checkbox",
    ...(as === undefined || as === "input" ? { type: "checkbox" } : {}),
  });
}
