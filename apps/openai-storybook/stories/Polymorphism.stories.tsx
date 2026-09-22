import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithRef } from "react";

import { Badge } from "@better-response/openai/view/Badge";
import { Button } from "@better-response/openai/view/Button";
import { Card as CardView } from "@better-response/openai/view/Card";
import { Checkbox } from "@better-response/openai/view/Checkbox";
import { ControlContainer } from "@better-response/openai/view/ControlContainer";
import { Icon } from "@better-response/openai/view/Icon";
import { Image } from "@better-response/openai/view/Image";
import { Input } from "@better-response/openai/view/Input";
import { List } from "@better-response/openai/view/List";
import { ListItem } from "@better-response/openai/view/ListItem";
import { ShimmerText } from "@better-response/openai/view/ShimmerText";
import { Slider } from "@better-response/openai/view/Slider";
import { Surface } from "@better-response/openai/view/Surface";
import { Switch } from "@better-response/openai/view/Switch";
import { Text } from "@better-response/openai/view/Text";
import { Textarea } from "@better-response/openai/view/Textarea";
import { TextLink } from "@better-response/openai/view/TextLink";
import { Card as CardUI } from "@better-response/openai/ui/Card";

type RouterLinkProps = Omit<ComponentPropsWithRef<"a">, "href"> & {
  to: string;
};

function RouterLink({ ref, to, ...props }: RouterLinkProps) {
  return <a {...props} href={to} ref={ref} />;
}

function CheckboxTarget({
  ref,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "type">) {
  return <input {...props} ref={ref} type="checkbox" />;
}

function ImageTarget({ ref, ...props }: ComponentPropsWithRef<"img">) {
  return <img {...props} ref={ref} />;
}

function SearchInput({
  ref,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "size" | "type">) {
  return <input {...props} ref={ref} type="search" />;
}

function SliderTarget({
  ref,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "size" | "type">) {
  return <input {...props} ref={ref} type="range" />;
}

function SwitchTarget({
  ref,
  ...props
}: Omit<ComponentPropsWithRef<"input">, "size" | "type">) {
  return <input {...props} ref={ref} role="switch" type="checkbox" />;
}

function TextareaTarget({
  ref,
  ...props
}: ComponentPropsWithRef<"textarea">) {
  return <textarea {...props} ref={ref} />;
}

const meta = {
  title: "Foundations/Polymorphism",
  parameters: {
    controls: {
      disable: true,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const View: Story = {
  render: () => (
    <main className="PolymorphismStory">
      <Text as="h2" variant="heading-sm">
        Intrinsic targets
      </Text>
      <div className="PolymorphismStory__row">
        <Badge as="strong">Badge as strong</Badge>
        <Button as="a" href="#custom-components">
          Button as anchor
        </Button>
        <Text as="p">Text as paragraph</Text>
        <ShimmerText as="p">ShimmerText as paragraph</ShimmerText>
      </div>

      <CardView as="article">
        <Text weight="semibold">Card as article</Text>
      </CardView>
      <Surface as="section">
        <Text>Surface as section</Text>
      </Surface>
      <ControlContainer as="fieldset">
        <Text>ControlContainer as fieldset</Text>
      </ControlContainer>
      <List as="ul">
        <ListItem as="li">List and ListItem as semantic list elements</ListItem>
      </List>

      <Text as="h2" id="custom-components" variant="heading-sm">
        Component targets
      </Text>
      <div className="PolymorphismStory__row">
        <Text as={RouterLink} to="#forms">
          Text as RouterLink
        </Text>
        <TextLink as={RouterLink} to="#forms">
          TextLink as RouterLink
        </TextLink>
        <Icon aria-label="Polymorphic icon" as="svg" size="sm">
          <circle cx="12" cy="12" r="8" />
        </Icon>
        <Image
          alt=""
          as={ImageTarget}
          height={32}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' rx='8' fill='%238a8a8a'/%3E%3C/svg%3E"
          width={32}
        />
      </div>

      <div className="PolymorphismStory__forms" id="forms">
        <Checkbox aria-label="Custom checkbox target" as={CheckboxTarget} />
        <Input
          aria-label="Custom search input target"
          as={SearchInput}
          placeholder="Input as SearchInput"
        />
        <Slider
          aria-label="Custom slider target"
          as={SliderTarget}
          defaultValue={40}
        />
        <Switch aria-label="Custom switch target" as={SwitchTarget} />
        <Textarea
          aria-label="Custom textarea target"
          as={TextareaTarget}
          placeholder="Textarea as a component"
        />
      </div>
    </main>
  ),
};

export const UIRootStrategies: Story = {
  render: () => (
    <main className="PolymorphismStory">
      <Text as="h2" variant="heading-sm">
        Intercept the default View primitive
      </Text>
      <CardUI as="article">
        <Text>The UI renders the article directly.</Text>
      </CardUI>

      <Text as="h2" variant="heading-sm">
        Forward into the default View primitive
      </Text>
      <CardUI forwardedAs="article">
        <Text>The Card View primitive remains and renders as an article.</Text>
      </CardUI>

      <Text as="h2" variant="heading-sm">
        Supply a configured element
      </Text>
      <CardUI as={<CardView as="article" />}>
        <Text>The explicit Card → article chain is preserved.</Text>
      </CardUI>
    </main>
  ),
};
