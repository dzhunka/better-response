import { useRender } from "@base-ui/react/use-render";
import type { ElementType, ReactNode } from "react";

import { Card as CardView } from "../view/Card";
import {
  type UIPolymorphicProps,
  resolveUIRender,
} from "../polymorphic";

export type CardOwnProps = {
  children?: ReactNode;
};

export type CardProps<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
> = UIPolymorphicProps<
  Target,
  "div",
  CardOwnProps,
  ForwardedTarget
>;

export function Card<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
>({
  as,
  forwardedAs,
  ...props
}: CardProps<Target, ForwardedTarget>) {
  return useRender({
    defaultTagName: "div",
    render: resolveUIRender(CardView, as, forwardedAs),
    props: {
      ...props,
      "data-ui": "card",
    },
  });
}
