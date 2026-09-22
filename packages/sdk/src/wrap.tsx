"use client"

import "./wrap.css"

import type { ReactNode } from "react"

import { spaceToken, type Space } from "./space"

export interface WrapProps {
  /** Cross-axis alignment of children on each line. */
  align?: "start" | "center" | "end"

  /** Content that may wrap onto additional lines. */
  children?: ReactNode

  /** Spacing between children. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  gap?: Space

  /** Main-axis distribution of children on each line. */
  justify?: "start" | "center" | "end" | "between"

  /** Inset around the wrapped children. Token or a pixel-like number: 0 none, ≤8 sm, ≤16 md, otherwise lg. */
  padding?: Space
}

/** Flows children onto additional lines when they run out of width. */
function Wrap({
  align = "start",
  children,
  gap = "md",
  justify = "start",
  padding = "none",
}: WrapProps) {
  return (
    <div
      className="Wrap"
      data-align={align}
      data-gap={spaceToken(gap)}
      data-justify={justify}
      data-padding={spaceToken(padding)}
      data-slot="wrap"
    >
      {children}
    </div>
  )
}

export { Wrap }
