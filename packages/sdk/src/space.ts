export type SpaceToken = "none" | "sm" | "md" | "lg"
export type Space = SpaceToken | number

/** Maps a pixel-like number onto the four layout tokens. 0 is none, ≤8 sm, ≤16 md, otherwise lg. */
export function spaceToken(value: Space): SpaceToken {
  if (typeof value !== "number") return value
  if (!Number.isFinite(value) || value <= 0) return "none"
  if (value <= 8) return "sm"
  if (value <= 16) return "md"
  return "lg"
}
