"use client"

import "./scroll.css"

import type { ReactNode } from "react"

export interface ScrollProps {
  /** Content that may overflow the bounded area. */
  children?: ReactNode

  /** Maximum size of the scroll area on its overflow axis. */
  height?: "sm" | "md" | "lg"

  /** Axis that scrolls when content overflows. */
  orientation?: "vertical" | "horizontal"
}

/** Scrolls overflowing children inside a bounded area. */
function Scroll({
  children,
  height = "md",
  orientation = "vertical",
}: ScrollProps) {
  return (
    <div
      className="Scroll"
      data-height={height}
      data-orientation={orientation}
      data-slot="scroll"
    >
      {children}
    </div>
  )
}

export { Scroll }
