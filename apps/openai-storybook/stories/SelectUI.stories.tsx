import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@better-response/openai/view/Button";
import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
} from "@better-response/openai/ui/Select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { disabled: true, label: "Dragon fruit", value: "dragon-fruit" },
] as const;

const meta = {
  title: "UI/Select",
  component: SelectRoot,
  args: {
    children: null,
    items: options,
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof SelectRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ComposedParts: Story = {
  render: () => (
    <div className="SelectStory">
      <SelectRoot defaultValue="banana" items={options}>
        <SelectTrigger aria-label="Choose a fruit" placeholder="Select a fruit…" />
        <SelectPopup>
          <SelectList>
            {options.map((option) => (
              <SelectItem key={option.value} {...option} />
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>
    </div>
  ),
};

export const PolymorphicRoots: Story = {
  render: () => (
    <div className="SelectStory">
      <SelectRoot defaultValue="apple" items={options}>
        <SelectTrigger
          aria-label="Choose a fruit"
          as={Button}
          forwardedAs="button"
          placeholder="Select a fruit…"
        />
        <SelectPopup as="section">
          <SelectList>
            {options.map((option) => (
              <SelectItem key={option.value} {...option} />
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>

      <SelectRoot defaultValue="banana" items={options}>
        <SelectTrigger
          aria-label="Choose another fruit"
          placeholder="Select a fruit…"
        />
        <SelectPopup forwardedAs="section">
          <SelectList forwardedAs="ul">
            {options.map((option) => (
              <SelectItem
                forwardedAs="li"
                key={option.value}
                {...option}
              />
            ))}
          </SelectList>
        </SelectPopup>
      </SelectRoot>
    </div>
  ),
};
