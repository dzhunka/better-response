"use client"

import "./stack.css"

import type { ReactNode } from "react"

import { spaceToken, type Space } from "./space"

export interface StackProps {
  /** Cross-axis alignment of children. */
  align?: "start" | "center" | "end" | "stretch"

  /** Content arranged by the stack. */
  children?: ReactNode

  /** Main axis along which children are placed. */
  direction?: "vertical" | "horizontal"

  /** Share leftover space with sibling Stacks on the parent axis. */
  flex?: boolean

  /** Spacing between children. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  gap?: Space

  /** Main-axis distribution of children. */
  justify?: "start" | "center" | "end" | "between"

  /** Inset around the stack's children. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  padding?: Space
}

/** Arranges children along one axis. */
function Stack({
  align = "stretch",
  children,
  direction = "vertical",
  flex = false,
  gap = "md",
  justify = "start",
  padding = "none",
}: StackProps) {
  return (
    <div
      className="Stack"
      data-align={align}
      data-direction={direction}
      data-flex={flex ? "true" : "false"}
      data-gap={spaceToken(gap)}
      data-justify={justify}
      data-padding={spaceToken(padding)}
      data-slot="stack"
    >
      {children}
    </div>
  )
}

export { Stack }
