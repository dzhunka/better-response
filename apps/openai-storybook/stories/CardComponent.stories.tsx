import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@better-response/openai/components/Card";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    description: "A minimal serializable Card composition.",
    title: "Card title",
  },
  decorators: [
    (Story) => (
      <div className="CardStory">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
