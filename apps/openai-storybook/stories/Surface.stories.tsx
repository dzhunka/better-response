import type { Meta, StoryObj } from "@storybook/react";

import { Surface, type SurfaceProps } from "@better-response/openai/view/Surface";
import { Text } from "@better-response/openai/view/Text";

const meta = {
  title: "View/Surface",
  component: Surface,
  args: {
    children: (
      <div className="SurfaceStory__content">
        <Text weight="medium">Elevated surface</Text>
      </div>
    ),
  },
} satisfies Meta<SurfaceProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
