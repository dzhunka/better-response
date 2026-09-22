"use client"

import "./spacer.css"

export type SpacerProps = Record<string, never>

/** Consumes leftover space on the parent Stack axis. */
function Spacer(_props: SpacerProps) {
  return (
    <div aria-hidden="true" className="Spacer" data-slot="spacer" />
  )
}

export { Spacer }
