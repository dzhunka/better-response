import "../styles/Text.css";

import {
  type ElementType,
  type ReactNode,
} from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type TextHeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextHeadingVariant =
  | "heading-5xl"
  | "heading-4xl"
  | "heading-3xl"
  | "heading-2xl"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "heading-xs";
export type TextScaleVariant =
  | "text-lg"
  | "text-md"
  | "text-sm"
  | "text-xs"
  | "text-2xs"
  | "text-3xs";
export type TextVariant = TextHeadingVariant | TextScaleVariant;
export type TextTone = "default" | "secondary" | "tertiary" | "inverse";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

type TextCommonProps = {
  children?: ReactNode;
  tone?: TextTone;
  weight?: TextWeight;
};

export type TextProps<Target extends ElementType = "span"> =
  PolymorphicProps<
    Target,
    TextCommonProps &
      (
        | {
            as?: Target;
            variant?: TextScaleVariant;
          }
        | {
            as: Target & TextHeadingElement;
            variant: TextHeadingVariant;
          }
      )
  >;

export function Text<Target extends ElementType = "span">({
  as,
  tone = "default",
  variant = "text-md",
  weight,
  ...props
}: TextProps<Target>) {
  return renderPolymorphic("span", as, {
    ...props,
    className: "Text",
    "data-tone": tone,
    "data-variant": variant,
    "data-weight": weight,
  });
}
