import type { Meta, StoryObj } from "@storybook/react";
import type { ChangeEvent } from "react";
import { useArgs } from "storybook/internal/preview-api";

import { Switch, type SwitchProps } from "@better-response/openai/view/Switch";

const meta = {
  title: "View/Switch",
  component: Switch,
  args: {
    "aria-label": "Switch",
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
    const [args, updateArgs] = useArgs<SwitchProps>();

    return (
      <Switch
        {...args}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          updateArgs({ checked: event.currentTarget.checked });
        }}
      />
    );
  },
} satisfies Meta<SwitchProps>;

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
      <legend>Switch states</legend>
      <p>
        <label>
          <Switch /> Unchecked
        </label>
      </p>
      <p>
        <label>
          <Switch defaultChecked /> Checked
        </label>
      </p>
      <p>
        <label>
          <Switch disabled /> Disabled
        </label>
      </p>
      <p>
        <label>
          <Switch defaultChecked disabled /> Checked and disabled
        </label>
      </p>
    </fieldset>
  ),
};

export const InteractionStates: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Hover and focus-visible states</legend>
      <p>
        <label>
          <Switch /> Hover this switch
        </label>
      </p>
      <p>
        <label>
          <Switch autoFocus /> Focus-visible on initial render
        </label>
      </p>
    </fieldset>
  ),
};
