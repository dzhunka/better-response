"use client"

import { Checkbox as UiCheckbox } from "@better-response/common/ui/checkbox"

export interface CheckboxProps {
  /** Controlled checked state. */
  checked?: boolean

  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean

  /** Whether the checkbox ignores toggle and focus activation. */
  disabled?: boolean

  /** DOM id for a sibling Label's htmlFor when not wrapped. */
  id?: string
}

/**
 * Toggles a single boolean choice. Pair with Label by wrapping inside Label,
 * or set id and point a sibling Label's htmlFor at it.
 */
function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  id,
}: CheckboxProps) {
  return (
    <UiCheckbox
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      id={id}
    />
  )
}

export { Checkbox }
