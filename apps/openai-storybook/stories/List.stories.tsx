import type { Meta, StoryObj } from "@storybook/react";

import { List, type ListProps } from "@better-response/openai/view/List";
import { ListItem } from "@better-response/openai/view/ListItem";
import { Surface } from "@better-response/openai/view/Surface";
import { Text } from "@better-response/openai/view/Text";

const meta = {
  title: "View/List",
  component: List,
  args: {
    children: (
      <>
        <ListItem>
          <Text>First item</Text>
        </ListItem>
        <ListItem>
          <Text>Second item</Text>
        </ListItem>
      </>
    ),
  },
} satisfies Meta<ListProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div className="ListStory">
        <Surface>
          <Story />
        </Surface>
      </div>
    ),
  ],
};

export const ListItemPrimitive: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <ListItem>
      <Text>Standalone reusable list item</Text>
    </ListItem>
  ),
};
