"use client"

import type { ReactNode } from "react"

import { Button as UiButton } from "@better-response/common/ui/button"

export interface ButtonProps {
  /** Nested nodes or a visible string. */
  children?: ReactNode

  /** Whether the button ignores press and focus activation. */
  disabled?: boolean

  /** Visual size of the button. */
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"

  /** Visible label. */
  text?: string

  /** Native button type for form participation. */
  type?: "button" | "submit" | "reset"

  /** Visual style of the button. */
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
}

/** Performs an action or submits a choice. */
function Button({
  children,
  disabled = false,
  size = "default",
  text = "",
  type = "button",
  variant = "default",
}: ButtonProps) {
  return (
    <UiButton disabled={disabled} size={size} type={type} variant={variant}>
      {text}
      {children}
    </UiButton>
  )
}

export { Button }
