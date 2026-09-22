import type { Meta, StoryObj } from "@storybook/react";

import { Textarea, type TextareaProps } from "@better-response/openai/view/Textarea";

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
const gutterSizes = ["2xs", "xs", "sm", "md", "lg", "xl"] as const;

const meta = {
  title: "View/Textarea",
  component: Textarea,
  args: {
    disabled: false,
    invalid: false,
    placeholder: "Write a message…",
    readOnly: false,
    rows: 3,
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
    rows: {
      control: {
        min: 1,
        step: 1,
        type: "number",
      },
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
} satisfies Meta<TextareaProps>;

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
        <Textarea aria-label="Outline textarea" placeholder="Outline" variant="outline" />
      </p>
      <p>
        <Textarea aria-label="Soft textarea" placeholder="Soft" variant="soft" />
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
          <Textarea aria-label={`${size} textarea`} placeholder={size} rows={1} size={size} />
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
          <Textarea
            aria-label={`${gutterSize} gutter textarea`}
            gutterSize={gutterSize}
            placeholder={gutterSize}
            rows={1}
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
        <Textarea aria-label="Default textarea" defaultValue="Default" />
      </p>
      <p>
        <Textarea aria-label="Invalid textarea" invalid placeholder="Invalid" />
      </p>
      <p>
        <Textarea aria-label="Disabled textarea" defaultValue="Disabled" disabled />
      </p>
      <p>
        <Textarea aria-label="Read-only textarea" defaultValue="Read only" readOnly />
      </p>
    </fieldset>
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
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        minHeight: "100vh",
      }}
    >
      {(["light", "dark"] as const).map((theme) => (
        <section
          data-preview-theme={theme}
          key={theme}
          style={{
            background: "var(--color-surface)",
            color: "var(--color-text)",
            padding: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-text-sm-size)",
              fontWeight: "var(--font-weight-medium)",
              margin: "0 0 2rem",
              textTransform: "capitalize",
            }}
          >
            {theme}
          </h2>
          <Textarea
            aria-label={`${theme} outline textarea`}
            defaultValue="Outline"
            variant="outline"
          />
          <p>
            <Textarea
              aria-label={`${theme} soft textarea`}
              defaultValue="Soft"
              variant="soft"
            />
          </p>
        </section>
      ))}
    </main>
  ),
};
