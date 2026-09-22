import type { Meta, StoryObj } from "@storybook/react";
import type { ChangeEvent } from "react";
import { useArgs } from "storybook/internal/preview-api";

import {
  Checkbox,
  type CheckboxProps,
} from "@better-response/openai/view/Checkbox";

const meta = {
  title: "View/Checkbox",
  component: Checkbox,
  args: {
    "aria-label": "Checkbox",
    checked: false,
    disabled: false,
    required: false,
  },
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
  render: function Render() {
    const [args, updateArgs] = useArgs<CheckboxProps>();

    return (
      <Checkbox
        {...args}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          updateArgs({ checked: event.currentTarget.checked });
        }}
      />
    );
  },
} satisfies Meta<CheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Checkbox states</legend>
      <p>
        <label>
          <Checkbox /> Unchecked
        </label>
      </p>
      <p>
        <label>
          <Checkbox defaultChecked /> Checked
        </label>
      </p>
      <p>
        <label>
          <Checkbox disabled /> Disabled
        </label>
      </p>
      <p>
        <label>
          <Checkbox defaultChecked disabled /> Checked and disabled
        </label>
      </p>
      <p>
        <label>
          <Checkbox required /> Required
        </label>
      </p>
    </fieldset>
  ),
};
