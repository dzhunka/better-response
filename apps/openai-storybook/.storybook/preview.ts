import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "@better-response/openai";
import "../stories/preview.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-preview-theme",
    }),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
    layout: "centered",
  },
};

export default preview;
