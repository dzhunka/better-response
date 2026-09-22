import type { Meta, StoryObj } from "@storybook/react";

import { Input, type InputProps } from "@better-response/openai/view/Input";

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
const gutterSizes = ["2xs", "xs", "sm", "md", "lg", "xl"] as const;

const meta = {
  title: "View/Input",
  component: Input,
  args: {
    disabled: false,
    invalid: false,
    pill: false,
    placeholder: "Enter text…",
    readOnly: false,
    size: "md",
    variant: "outline",
  },
  argTypes: {
    gutterSize: {
      control: "select",
      options: [undefined, ...gutterSizes],
    },
    invalid: {
      control: "boolean",
    },
    opticallyAlign: {
      control: "inline-radio",
      options: [undefined, "start", "end"],
    },
    pill: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: sizes,
    },
    variant: {
      control: "inline-radio",
      options: ["outline", "soft"],
    },
  },
} satisfies Meta<InputProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Variants</legend>
      <p>
        <Input aria-label="Outline input" placeholder="Outline" variant="outline" />
      </p>
      <p>
        <Input aria-label="Soft input" placeholder="Soft" variant="soft" />
      </p>
      <p>
        <Input aria-label="Pill input" pill placeholder="Pill" />
      </p>
    </fieldset>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Control sizes</legend>
      {sizes.map((size) => (
        <p key={size}>
          <Input aria-label={`${size} input`} placeholder={size} size={size} />
        </p>
      ))}
    </fieldset>
  ),
};

export const Gutters: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Gutter sizes</legend>
      {gutterSizes.map((gutterSize) => (
        <p key={gutterSize}>
          <Input
            aria-label={`${gutterSize} gutter input`}
            gutterSize={gutterSize}
            placeholder={gutterSize}
          />
        </p>
      ))}
    </fieldset>
  ),
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>States</legend>
      <p>
        <Input aria-label="Default input" defaultValue="Default" />
      </p>
      <p>
        <Input aria-label="Placeholder input" placeholder="Placeholder" />
      </p>
      <p>
        <Input aria-label="Invalid input" invalid placeholder="Invalid" />
      </p>
      <p>
        <Input aria-label="Disabled input" disabled defaultValue="Disabled" />
      </p>
      <p>
        <Input aria-label="Read-only input" readOnly defaultValue="Read only" />
      </p>
    </fieldset>
  ),
};

export const OpticalAlignment: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <fieldset>
      <legend>Optical alignment</legend>
      <p>Surrounding content</p>
      <Input
        aria-label="Start-aligned input"
        opticallyAlign="start"
        placeholder="Aligned to the start gutter"
      />
      <p>Surrounding content</p>
      <Input
        aria-label="End-aligned input"
        opticallyAlign="end"
        placeholder="Aligned to the end gutter"
      />
    </fieldset>
  ),
};
