import type { Meta, StoryObj } from "@storybook/react";

import {
  ControlContainer,
  type ControlContainerProps,
} from "@better-response/openai/view/ControlContainer";

const meta = {
  title: "View/ControlContainer",
  component: ControlContainer,
  args: {
    children: (
      <button className="ControlContainerStory__control" type="button">
        Button-backed control
      </button>
    ),
    disabled: false,
    invalid: false,
    pill: false,
    variant: "outline",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    invalid: {
      control: "boolean",
    },
    pill: {
      control: "boolean",
    },
    variant: {
      control: "inline-radio",
      options: ["outline", "soft"],
    },
  },
} satisfies Meta<ControlContainerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Consumers: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="ControlContainerStory">
      <ControlContainer>
        <input
          aria-label="Input-backed control"
          className="ControlContainerStory__control"
          placeholder="Input-backed control"
        />
      </ControlContainer>
      <ControlContainer pill>
        <button className="ControlContainerStory__control" type="button">
          Button-backed control
        </button>
      </ControlContainer>
    </div>
  ),
};
