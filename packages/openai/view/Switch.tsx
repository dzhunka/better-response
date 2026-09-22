import "../styles/Switch.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type SwitchOwnProps = {
  children?: never;
  dangerouslySetInnerHTML?: never;
  role?: never;
  type?: never;
};

export type SwitchProps<Target extends ElementType = "input"> =
  PolymorphicProps<Target, SwitchOwnProps>;

export function Switch<Target extends ElementType = "input">({
  as,
  ...props
}: SwitchProps<Target>) {
  const isInput = as === undefined || as === "input";

  return renderPolymorphic("input", as, {
    ...props,
    className: "Switch",
    ...(isInput ? { role: "switch", type: "checkbox" } : {}),
  });
}
