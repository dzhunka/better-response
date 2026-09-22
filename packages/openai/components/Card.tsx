import { Text } from "../view/Text";
import { Card as CardUI } from "../ui/Card";

export type CardProps = {
  description?: string;
  title: string;
};

export function Card({ description, title }: CardProps) {
  return (
    <CardUI data-component="card">
      <Text weight="semibold">{title}</Text>
      {description ? <Text tone="secondary">{description}</Text> : null}
    </CardUI>
  );
}
