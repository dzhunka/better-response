import type { Meta, StoryObj } from "@storybook/react";

import { Text, type TextProps } from "@better-response/openai/view/Text";

const headingVariants = [
  "heading-5xl",
  "heading-4xl",
  "heading-3xl",
  "heading-2xl",
  "heading-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "heading-xs",
] as const;

const textVariants = [
  "text-lg",
  "text-md",
  "text-sm",
  "text-xs",
  "text-2xs",
  "text-3xs",
] as const;

const variants = [...headingVariants, ...textVariants];

const meta = {
  title: "View/Text",
  component: Text,
  args: {
    children: "Reusable text",
    tone: "default",
    variant: "text-md",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["span", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
    tone: {
      control: "inline-radio",
      options: ["default", "secondary", "tertiary", "inverse"],
    },
    variant: {
      control: "select",
      options: variants,
    },
    weight: {
      control: "inline-radio",
      options: ["normal", "medium", "semibold", "bold"],
    },
  },
} satisfies Meta<TextProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scales: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="TextStoryScales">
      <div className="TextStoryScales__group">
        {headingVariants.map((variant) => (
          <Text as="h2" key={variant} variant={variant}>
            {variant}
          </Text>
        ))}
      </div>
      <div className="TextStoryScales__group">
        {textVariants.map((variant) => (
          <Text as="p" key={variant} variant={variant}>
            {variant}
          </Text>
        ))}
      </div>
    </div>
  ),
};

export const TonesAndWeights: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="TextStory">
      <Text>Default</Text>
      <Text tone="secondary">Secondary</Text>
      <Text tone="tertiary">Tertiary</Text>
      <span className="TextStory__inverse">
        <Text tone="inverse">Inverse</Text>
      </span>
      <Text weight="normal">Normal</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
      <Text weight="bold">Bold</Text>
    </div>
  ),
};
