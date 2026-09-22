import type { Meta, StoryObj } from "@storybook/react";

import { Card, type CardProps } from "@better-response/openai/view/Card";
import { Text } from "@better-response/openai/view/Text";

const meta = {
  title: "View/Card",
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

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
