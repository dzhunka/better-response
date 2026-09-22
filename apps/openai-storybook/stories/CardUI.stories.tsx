import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@better-response/openai/view/Text";
import { Card, type CardProps } from "@better-response/openai/ui/Card";

const meta = {
  title: "UI/Card",
  component: Card,
  args: {
    children: (
      <>
        <Text weight="semibold">Card title</Text>
        <Text tone="secondary">Card description</Text>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="CardStory">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CardProps>;

export default meta;

type Story = StoryObj<CardProps>;

export const Playground: Story = {};
