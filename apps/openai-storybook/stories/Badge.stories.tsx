import type { Meta, StoryObj } from "@storybook/react";

import { Badge, type BadgeProps } from "@better-response/openai/view/Badge";

const colors = ["secondary", "success", "warning", "danger", "info", "discovery"] as const;
const variants = ["soft", "solid", "outline"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "View/Badge",
  component: Badge,
  args: {
    children: "New",
    color: "secondary",
    variant: "soft",
    size: "sm",
    pill: false,
  },
  argTypes: {
    children: {
      control: "text",
    },
    color: {
      control: "select",
      options: colors,
    },
    variant: {
      control: "inline-radio",
      options: variants,
    },
    size: {
      control: "inline-radio",
      options: sizes,
    },
    pill: {
      control: "boolean",
    },
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Combinations: Story = {
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

          <div
            style={{
              alignItems: "center",
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(6, max-content)",
            }}
          >
            {variants.flatMap((variant) =>
              colors.map((color) => (
                <Badge color={color} key={`${variant}-${color}`} variant={variant}>
                  {color}
                </Badge>
              )),
            )}
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {sizes.map((size) => (
              <Badge color="info" key={size} size={size}>
                {size}
              </Badge>
            ))}
            <Badge color="warning" pill size="lg">
              Pill
            </Badge>
          </div>
        </section>
      ))}
    </main>
  ),
};
