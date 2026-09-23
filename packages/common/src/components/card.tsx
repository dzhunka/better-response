"use client"

import { Children, isValidElement, type ReactNode } from "react"

import {
  Card as UiCard,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@better-response/common/ui/card"

/**
 * A serialized node as the agent writes it. The renderer hydrates it into a
 * ReactNode before this component sees it, so a slot accepts either spelling.
 */
type SerializedNode = { type: string; props?: unknown; children?: unknown }

type Slot = ReactNode | SerializedNode | Array<ReactNode | SerializedNode>

export interface CardProps {
  /**
   * Rendered first, spanning the card's full width with no inner padding.
   * The card's rounded corners clip it.
   */
  media?: Slot

  /** Header heading in emphasized text. */
  title?: Slot

  /** Header text below the title in muted text. */
  description?: Slot

  /** Placed in the header's top-right corner, beside the title and description. */
  action?: Slot

  /** Body between the header and the footer, padded to the card's inset. */
  children?: ReactNode

  /**
   * Bottom row separated from the body by a border on a muted background.
   * Items sit side by side and wrap onto more lines when they run out of width.
   */
  footer?: Slot
}

/**
 * A bordered, rounded surface with regions stacked in this order: media,
 * header (title, description, action), body, footer. Each region renders only
 * when given.
 */
function Card({ action, children, description, footer, media, title }: CardProps) {
  return (
    <UiCard className="has-data-[slot=card-media]:pt-0">
      {media != null && <div data-slot="card-media">{slot(media)}</div>}
      {(title != null || description != null || action != null) && (
        <CardHeader>
          {title != null && <CardTitle>{slot(title)}</CardTitle>}
          {description != null && (
            <CardDescription>{slot(description)}</CardDescription>
          )}
          {action != null && <CardAction>{slot(action)}</CardAction>}
        </CardHeader>
      )}
      {children != null && <CardContent>{children}</CardContent>}
      {footer != null && (
        <CardFooter className="flex-wrap gap-2">{slot(footer)}</CardFooter>
      )}
    </UiCard>
  )
}

/** A node the renderer could not hydrate stays a plain object, which React cannot render. */
function slot(value: Slot): ReactNode {
  if (Array.isArray(value)) return Children.toArray(value.map(slot))
  if (typeof value === "string" || typeof value === "number") return value

  return isValidElement(value) ? value : null
}

export { Card }
