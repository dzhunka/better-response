"use client"

import type { ReactNode } from "react"

import { Label as UiLabel } from "@better-response/common/ui/label"

export interface LabelProps {
  /** Nested control such as Checkbox, then optional extra nodes. */
  children?: ReactNode

  /** Associates this label with a sibling control's id when not wrapping. */
  htmlFor?: string

  /** Visible caption. After nested children when wrapping; alone when using htmlFor. */
  text?: string
}

/**
 * Names a control. Either wrap the control as children with text as the caption,
 * or sit beside it and set htmlFor to that control's id.
 */
function Label({ children, htmlFor, text = "" }: LabelProps) {
  return (
    <UiLabel htmlFor={htmlFor}>
      {children}
      {text}
    </UiLabel>
  )
}

export { Label }
