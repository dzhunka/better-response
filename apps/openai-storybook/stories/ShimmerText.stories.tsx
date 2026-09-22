import type { Meta, StoryObj } from "@storybook/react";

import {
  ShimmerText,
  type ShimmerTextProps,
} from "@better-response/openai/view/ShimmerText";

const meta = {
  title: "View/ShimmerText",
  component: ShimmerText,
  args: {
    children: "Thinking through the details…",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
} satisfies Meta<ShimmerTextProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
          <ShimmerText title={`${theme} shimmer preview`}>
            Thinking through the details…
          </ShimmerText>
        </section>
      ))}
    </main>
  ),
};
