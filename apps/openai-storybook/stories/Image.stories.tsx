import type { Meta, StoryObj } from "@storybook/react";

import { Image, type ImageProps } from "@better-response/openai/view/Image";

const imageSource =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23f6c177'/%3E%3Cstop offset='1' stop-color='%2331758f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='360' fill='url(%23sky)'/%3E%3Ccircle cx='470' cy='110' r='54' fill='%23fff4cf'/%3E%3Cpath d='M0 300 145 165l82 78 89-104 126 139 84-74 114 96v60H0Z' fill='%23243b53'/%3E%3Cpath d='M0 328 154 231l105 79 118-70 91 47 74-38 98 58v53H0Z' fill='%2313293d'/%3E%3C/svg%3E";

const meta = {
  title: "View/Image",
  component: Image,
  args: {
    alt: "Layered mountains beneath a setting sun",
    draggable: false,
    height: 180,
    src: imageSource,
    width: 320,
  },
  argTypes: {
    alt: {
      control: "text",
    },
    draggable: {
      control: "boolean",
    },
    height: {
      control: {
        min: 90,
        step: 90,
        type: "number",
      },
    },
    src: {
      control: false,
    },
    width: {
      control: {
        min: 160,
        step: 160,
        type: "number",
      },
    },
  },
} satisfies Meta<ImageProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NativeSemantics: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <main>
      <figure>
        <Image
          alt="Layered mountains beneath a setting sun"
          decoding="async"
          height={180}
          src={imageSource}
          width={320}
        />
        <figcaption>
          An informative image with descriptive alternative text.
        </figcaption>
      </figure>

      <figure>
        <Image
          alt=""
          draggable
          height={90}
          loading="lazy"
          src={imageSource}
          width={160}
        />
        <figcaption>
          A decorative image with an empty alt attribute and native loading,
          sizing, and dragging attributes.
        </figcaption>
      </figure>
    </main>
  ),
};
