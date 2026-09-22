import "../styles/ListItem.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ListItemOwnProps = {};

export type ListItemProps<Target extends ElementType = "div"> =
  PolymorphicProps<Target, ListItemOwnProps>;

export function ListItem<Target extends ElementType = "div">({
  as,
  ...props
}: ListItemProps<Target>) {
  return renderPolymorphic("div", as, {
    ...props,
    className: "ListItem",
  });
}
