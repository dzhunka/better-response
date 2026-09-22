import "../styles/Card.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type CardOwnProps = {};

export type CardProps<Target extends ElementType = "div"> = PolymorphicProps<
  Target,
  CardOwnProps
>;

export function Card<Target extends ElementType = "div">({
  as,
  ...props
}: CardProps<Target>) {
  return renderPolymorphic("div", as, {
    ...props,
    className: "Card",
  });
}
