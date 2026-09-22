import "../styles/List.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ListOwnProps = {};

export type ListProps<Target extends ElementType = "div"> = PolymorphicProps<
  Target,
  ListOwnProps
>;

export function List<Target extends ElementType = "div">({
  as,
  ...props
}: ListProps<Target>) {
  return renderPolymorphic("div", as, {
    ...props,
    className: "List",
  });
}
