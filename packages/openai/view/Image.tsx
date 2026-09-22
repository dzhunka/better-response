import "../styles/Image.css";

import type { ElementType } from "react";

import {
  type PolymorphicProps,
  renderPolymorphic,
} from "../polymorphic";

export type ImageOwnProps = {
  children?: never;
  dangerouslySetInnerHTML?: never;
};

export type ImageProps<Target extends ElementType = "img"> = PolymorphicProps<
  Target,
  ImageOwnProps
>;

export function Image<Target extends ElementType = "img">({
  as,
  ...props
}: ImageProps<Target>) {
  return renderPolymorphic("img", as, {
    ...props,
    className: "Image",
    ...(as === undefined || as === "img"
      ? { draggable: props.draggable ?? false }
      : {}),
  });
}
