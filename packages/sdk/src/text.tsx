"use client"

import "./text.css"

import type { ReactNode } from "react"

export interface TextProps {
  /** Nested nodes or a visible string. */
  children?: ReactNode

  /** Visible string. Same copy as children: "Hello". */
  text?: string

  /** Presentation role for the text. subheading is caption; label is typography only and forms no association with a control. */
  variant?: "body" | "heading" | "label" | "caption" | "subheading"
}

/** Displays readable text. */
function Text({ children, text = "", variant = "body" }: TextProps) {
  const role = variant === "subheading" ? "caption" : variant
  const Element = role === "heading" ? "h2" : role === "body" ? "p" : "span"

  return (
    <Element className="Text" data-slot="text" data-variant={role}>
      {text}
      {children}
    </Element>
  )
}

export { Text }
