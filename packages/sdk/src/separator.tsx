"use client"

import "./separator.css"

export interface SeparatorProps {
  /** Axis of the hairline. Omit to follow the parent Stack: a row gets a vertical line, a column gets a horizontal line. */
  orientation?: "horizontal" | "vertical"
}

/** Draws a hairline between adjacent content. */
function Separator({ orientation }: SeparatorProps) {
  return (
    <div
      aria-orientation={orientation}
      className="Separator"
      data-orientation={orientation}
      data-slot="separator"
      role="separator"
    />
  )
}

export { Separator }
