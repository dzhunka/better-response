import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "@better-response/openai/components/Select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { disabled: true, label: "Dragon fruit", value: "dragon-fruit" },
] as const;

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    ariaLabel: "Choose a fruit",
    defaultValue: "banana",
    disabled: false,
    options,
    placeholder: "Select a fruit…",
    required: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    options: {
      control: false,
    },
    required: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="SelectStory">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
