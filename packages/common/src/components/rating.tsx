"use client"

import { Rating as UiRating } from "@better-response/common/ui/rating"

export interface RatingProps {
  /**
   * Lowest value in the rating range.
   * Values below this are clamped to `min`.
   * @default 1
   */
  min?: number

  /**
   * Highest value in the rating range. Determines the total number of stars shown.
   * Use `5` for the common 1–5 scale (default) or `10` for a 1–10 scale.
   * @default 5
   */
  max?: number

  /**
   * Current rating value. Must be between `min` and `max`; fractional values fill a partial star.
   * @default 0
   */
  value?: number
}

/** Displays a star rating within a [min, max] range. */
function Rating({ min = 1, max = 5, value = 0 }: RatingProps) {
  return <UiRating min={min} max={max} value={value} />
}

export { Rating }
