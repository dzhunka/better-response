import type { Meta, StoryObj } from "@storybook/react";
import type { ChangeEvent } from "react";
import { useArgs } from "storybook/internal/preview-api";

import {
  Slider,
  type SliderProps,
} from "@better-response/openai/view/Slider";

const meta = {
  title: "View/Slider",
  component: Slider,
  args: {
    "aria-label": "Value",
    disabled: false,
    max: 100,
    min: 0,
    step: 1,
    value: 50,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    max: {
      control: "number",
    },
    min: {
      control: "number",
    },
    step: {
      control: "number",
    },
    value: {
      control: "number",
    },
  },
  render: function Render() {
    const [args, updateArgs] = useArgs<SliderProps>();

    return (
      <Slider
        {...args}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          updateArgs({ value: event.currentTarget.valueAsNumber });
        }}
      />
    );
  },
} satisfies Meta<SliderProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const BoundsAndStep: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Native range configuration</legend>
      <p>
        <label>
          Integer steps from 10 to 90
          <Slider defaultValue={40} min={10} max={90} step={10} />
        </label>
      </p>
      <p>
        <label>
          Decimal steps from 0 to 1
          <Slider defaultValue={0.4} min={0} max={1} step={0.1} />
        </label>
      </p>
    </fieldset>
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <label>
      Disabled
      <Slider defaultValue={65} disabled />
    </label>
  ),
};

export const Themes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: "fullscreen",
  },
  render: () => (
    <main className="SliderStory">
      <section className="SliderStory__theme" data-preview-theme="light">
        <h2>Light</h2>
        <label>
          Value
          <Slider defaultValue={60} />
        </label>
      </section>

      <section className="SliderStory__theme" data-preview-theme="dark">
        <h2>Dark</h2>
        <label>
          Value
          <Slider defaultValue={60} />
        </label>
      </section>
    </main>
  ),
};
