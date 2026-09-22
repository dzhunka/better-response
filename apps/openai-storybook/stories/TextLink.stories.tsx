import type { Meta, StoryObj } from "@storybook/react";

import { TextLink, type TextLinkProps } from "@better-response/openai/view/TextLink";

const meta = {
  title: "View/TextLink",
  component: TextLink,
  args: {
    children: "Responses endpoint",
    href: "#",
    primary: false,
    underline: true,
  },
  argTypes: {
    primary: {
      control: "boolean",
    },
    underline: {
      control: "boolean",
    },
  },
} satisfies Meta<TextLinkProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
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
      <section
        data-preview-theme="light"
        style={{
          display: "grid",
          alignContent: "start",
          gap: "1rem",
          padding: "3rem",
          background: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      >
        <h2>Light</h2>
        <TextLink href="#">Inherited, underlined</TextLink>
        <TextLink href="#" underline={false}>
          Inherited, no underline
        </TextLink>
        <TextLink href="#" primary>
          Primary, no underline
        </TextLink>
        <TextLink href="#" primary underline>
          Primary, underlined
        </TextLink>
      </section>

      <section
        data-preview-theme="dark"
        style={{
          display: "grid",
          alignContent: "start",
          gap: "1rem",
          padding: "3rem",
          background: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      >
        <h2>Dark</h2>
        <TextLink href="#">Inherited, underlined</TextLink>
        <TextLink href="#" underline={false}>
          Inherited, no underline
        </TextLink>
        <TextLink href="#" primary>
          Primary, no underline
        </TextLink>
        <TextLink href="#" primary underline>
          Primary, underlined
        </TextLink>
      </section>
    </main>
  ),
};
