"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@better-response/common/lib/utils"

function Rating({
  className,
  min = 1,
  max = 5,
  value = 0,
  ...props
}: React.ComponentProps<"div"> & {
  /** Lowest value in the rating range; values below this are clamped. @default 1 */
  min?: number
  /** Highest value in the rating range; determines the total number of stars shown. @default 5 */
  max?: number
  /** Current rating value between `min` and `max`; fractional values fill a partial star. @default 0 */
  value?: number
}) {
  const total = Math.max(1, Math.round(max))
  const safeValue = Number.isFinite(value) ? value : min
  const filled = Math.min(Math.max(safeValue, min), total)
  const stars = Array.from({ length: total }, (_, index) => index)

  return (
    <div
      data-slot="rating"
      role="img"
      aria-label={`${filled} out of ${total}, minimum ${min}`}
      className={cn("relative inline-flex w-fit", className)}
      {...props}
    >
      <div aria-hidden className="flex gap-0.5 text-muted-foreground">
        {stars.map((index) => (
          <Star key={index} className="size-4 shrink-0" />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-foreground"
        style={{ width: `${(filled / total) * 100}%` }}
      >
        {stars.map((index) => (
          <Star key={index} className="size-4 shrink-0 fill-current" />
        ))}
      </div>
    </div>
  )
}

export { Rating }
