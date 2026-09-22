import "../styles/TextLink.css";

import type { ElementType, ReactNode } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type TextLinkOwnProps = {
  children: ReactNode;
  primary?: boolean;
  underline?: boolean;
};

export type TextLinkProps<Target extends ElementType = "a"> = PolymorphicProps<
  Target,
  TextLinkOwnProps & (Target extends "a" ? { href: string } : {})
>;

export function TextLink<Target extends ElementType = "a">({
  as,
  children,
  primary = false,
  underline = !primary,
  ...props
}: TextLinkProps<Target>) {
  return renderPolymorphic("a", as, {
    ...props,
    children,
    className: "TextLink",
    "data-primary": primary ? "" : undefined,
    "data-underline": underline ? "" : undefined,
  });
}
