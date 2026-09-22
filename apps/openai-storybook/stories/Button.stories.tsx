import type { Meta, StoryObj } from "@storybook/react";

import { Button, type ButtonProps } from "@better-response/openai/view/Button";

const meta = {
  title: "View/Button",
  component: Button,
  args: {
    children: "Button",
    color: "primary",
    variant: "solid",
  },
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["primary", "secondary"],
    },
    variant: {
      control: "inline-radio",
      options: ["solid", "outline"],
    },
  },
} satisfies Meta<ButtonProps>;

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
    <main className="ButtonStory">
      <section className="ButtonStory__theme" data-preview-theme="light">
        <h2>Light</h2>
        <div className="ButtonStory__matrix">
          <Button color="primary" variant="solid">
            Primary solid
          </Button>
          <Button color="primary" variant="outline">
            Primary outline
          </Button>
          <Button color="secondary" variant="solid">
            Secondary solid
          </Button>
          <Button color="secondary" variant="outline">
            Secondary outline
          </Button>
        </div>
      </section>

      <section className="ButtonStory__theme" data-preview-theme="dark">
        <h2>Dark</h2>
        <div className="ButtonStory__matrix">
          <Button color="primary" variant="solid">
            Primary solid
          </Button>
          <Button color="primary" variant="outline">
            Primary outline
          </Button>
          <Button color="secondary" variant="solid">
            Secondary solid
          </Button>
          <Button color="secondary" variant="outline">
            Secondary outline
          </Button>
        </div>
      </section>
    </main>
  ),
};
