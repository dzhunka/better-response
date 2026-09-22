import type { Meta, StoryObj } from "@storybook/react";

import { Icon, type IconProps } from "@better-response/openai/view/Icon";

const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "View/Icon",
  component: Icon,
  args: {
    "aria-label": "Search",
    children: (
      <path
        clipRule="evenodd"
        d="M10.875 4.5C7.354 4.5 4.5 7.354 4.5 10.875s2.854 6.375 6.375 6.375a6.35 6.35 0 0 0 4.004-1.416l4.914 4.914a1 1 0 0 0 1.414-1.414l-4.914-4.914a6.35 6.35 0 0 0 1.457-4.045c0-3.521-2.854-6.375-6.375-6.375Zm-4.375 6.375a4.375 4.375 0 1 1 8.75 0 4.375 4.375 0 0 1-8.75 0Z"
        fillRule="evenodd"
      />
    ),
    role: "img",
    size: "md",
  },
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: "inline-radio",
      options: sizes,
    },
  },
} satisfies Meta<IconProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
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
            alignItems: "center",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            display: "flex",
            gap: "1.5rem",
            padding: "3rem",
          }}
        >
          {sizes.map((size) => (
            <Icon
              aria-label={`${size} search icon`}
              key={size}
              role="img"
              size={size}
            >
              <path
                clipRule="evenodd"
                d="M10.875 4.5C7.354 4.5 4.5 7.354 4.5 10.875s2.854 6.375 6.375 6.375a6.35 6.35 0 0 0 4.004-1.416l4.914 4.914a1 1 0 0 0 1.414-1.414l-4.914-4.914a6.35 6.35 0 0 0 1.457-4.045c0-3.521-2.854-6.375-6.375-6.375Zm-4.375 6.375a4.375 4.375 0 1 1 8.75 0 4.375 4.375 0 0 1-8.75 0Z"
                fillRule="evenodd"
              />
            </Icon>
          ))}
        </section>
      ))}
    </main>
  ),
};
