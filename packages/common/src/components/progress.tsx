"use client"

import type { ReactNode } from "react"

import { Progress as UiProgress } from "@better-response/common/ui/progress"

export interface ProgressProps {
  /** Nested nodes or a visible string. */
  children?: ReactNode

  /** Highest value represented by the progress bar. */
  max?: number

  /** Visible label before the progress track. */
  text?: string

  /** Current progress value, or null when progress is indeterminate. */
  value?: number | null
}

/** Displays completion toward a numeric maximum. */
function Progress({
  children,
  max,
  text = "",
  value = null,
}: ProgressProps) {
  return (
    <UiProgress max={max} value={value}>
      {text}
      {children}
    </UiProgress>
  )
}

export { Progress }
