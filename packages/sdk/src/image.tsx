"use client"

import "./image.css"

export interface ImageProps {
  /** Accessible description of the image. */
  alt?: string

  /** Frame ratio for the image. */
  aspect?: "auto" | "square" | "video"

  /** HTTPS URL of the image. */
  src: string
}

/** Displays a remote image. */
function Image({ alt = "", aspect = "auto", src }: ImageProps) {
  return (
    <img
      alt={alt}
      className="Image"
      data-aspect={aspect}
      data-slot="image"
      src={src}
    />
  )
}

export { Image }
