import type { Tree } from "@better-response/engawa";
import * as components from ".";

export const validTextStringChildren = {
  type: "Text",
  children: "Hello",
} satisfies Tree<typeof components>;

export const validStackStringChildren = {
  type: "Stack",
  children: ["Hello"],
} satisfies Tree<typeof components>;

export const validNumericGap = {
  type: "Stack",
  props: { gap: 8, padding: 16 },
  children: "Hello",
} satisfies Tree<typeof components>;

export const validProgress = {
  type: "Progress",
  props: { max: 4, text: "Halfway", value: 2 },
} satisfies Tree<typeof components>;

export const invalidProgress = {
  type: "Progress",
  props: {
    // @ts-expect-error Registered component props retain their authored TypeScript type.
    value: "2",
  },
} satisfies Tree<typeof components>;

export const validButton = {
  type: "Button",
  props: { text: "Reset", variant: "outline", size: "sm" },
} satisfies Tree<typeof components>;

export const invalidButton = {
  type: "Button",
  // @ts-expect-error Registered component props retain their authored TypeScript type.
  props: {
    variant: true,
  },
} satisfies Tree<typeof components>;

export const validCheckbox = {
  type: "Checkbox",
  props: { defaultChecked: true, disabled: false },
} satisfies Tree<typeof components>;

export const invalidCheckbox = {
  type: "Checkbox",
  props: {
    // @ts-expect-error Registered component props retain their authored TypeScript type.
    checked: "yes",
  },
} satisfies Tree<typeof components>;

export const validLabel = {
  type: "Label",
  props: { text: "400 g spaghetti" },
} satisfies Tree<typeof components>;

export const validLabelFor = {
  type: "Stack",
  props: { direction: "horizontal", align: "center", gap: "sm" },
  children: [
    { type: "Checkbox", props: { id: "eggs", defaultChecked: false } },
    { type: "Label", props: { htmlFor: "eggs", text: "2 eggs" } },
  ],
} satisfies Tree<typeof components>;

export const invalidLabel = {
  type: "Label",
  props: {
    // @ts-expect-error Registered component props retain their authored TypeScript type.
    text: false,
  },
} satisfies Tree<typeof components>;

export const validStack = {
  type: "Stack",
  props: { direction: "vertical", gap: "sm" },
  children: [
    { type: "Text", props: { variant: "heading", text: "Pasta night" } },
    {
      type: "Label",
      props: { text: "400 g spaghetti" },
      children: [{ type: "Checkbox", props: { defaultChecked: false } }],
    },
  ],
} satisfies Tree<typeof components>;

export const validComparison = {
  type: "Stack",
  props: { gap: "md", padding: "sm" },
  children: [
    {
      type: "Stack",
      props: { direction: "horizontal", align: "center" },
      children: [
        { type: "Text", props: { variant: "heading", text: "Pick a commute" } },
        { type: "Spacer" },
        { type: "Text", props: { variant: "caption", text: "today" } },
      ],
    },
    {
      type: "Stack",
      props: { direction: "horizontal", gap: "md" },
      children: [
        {
          type: "Stack",
          props: { flex: true, gap: "sm", padding: "sm" },
          children: [
            { type: "Text", props: { variant: "label", text: "Bus" } },
            { type: "Separator" },
            { type: "Text", props: { variant: "caption", text: "$2" } },
          ],
        },
        {
          type: "Stack",
          props: { flex: true, gap: "sm", padding: "sm" },
          children: [
            { type: "Text", props: { variant: "label", text: "Train" } },
            { type: "Separator" },
            { type: "Text", props: { variant: "caption", text: "$5" } },
          ],
        },
      ],
    },
    {
      type: "Scroll",
      props: { height: "sm" },
      children: [
        {
          type: "Text",
          props: { variant: "caption", text: "Fares last checked this morning." },
        },
      ],
    },
  ],
} satisfies Tree<typeof components>;

export const validWrap = {
  type: "Wrap",
  props: { gap: "sm" },
  children: [
    { type: "Text", props: { variant: "caption", text: "Bus" } },
    { type: "Text", props: { variant: "caption", text: "Train" } },
  ],
} satisfies Tree<typeof components>;

export const validGrid = {
  type: "Grid",
  props: { columns: 2, gap: "md" },
  children: [
    { type: "Text", props: { text: "Left" } },
    { type: "Text", props: { text: "Right" } },
  ],
} satisfies Tree<typeof components>;

export const invalidGrid = {
  type: "Grid",
  // @ts-expect-error Registered component props retain their authored TypeScript type.
  props: {
    columns: "two",
  },
} satisfies Tree<typeof components>;

export const unregisteredImage = {
  // @ts-expect-error Image left the registry; the app CSP blocks remote images.
  type: "Image",
} satisfies Tree<typeof components>;

export const invalidText = {
  type: "Text",
  // @ts-expect-error Registered component props retain their authored TypeScript type.
  props: {
    variant: "title",
  },
} satisfies Tree<typeof components>;

export const validDataGrid = {
  type: "DataGrid",
  props: {
    columns: ["Option", "Time", "Cost"],
    data: [
      { Option: "Train", Time: "2h 10m", Cost: "€38" },
      { Option: "Bus", Time: "3h", Cost: "€18" },
    ],
  },
} satisfies Tree<typeof components>;

export const validDataGridLabeledColumns = {
  type: "DataGrid",
  props: {
    columns: [
      { key: "model", label: "Model" },
      { key: "msrp", label: "German MSRP" },
    ],
    data: [
      { model: "Attain Pro", msrp: "€899 → €899" },
      { model: "Attain Race", msrp: "€1,099 → €1,099" },
    ],
  },
} satisfies Tree<typeof components>;

export const validDataGridTypedColumns = {
  type: "DataGrid",
  props: {
    columns: [
      { key: "model", label: "Model" },
      {
        key: "msrp",
        label: "MSRP",
        type: "number",
        format: { style: "currency", currency: "EUR" },
      },
      { key: "released", label: "Released", type: "date" },
      { key: "inStock", label: "In stock", type: "boolean" },
    ],
    data: [
      {
        model: "Attain Pro",
        msrp: 899,
        released: "2026-03-04",
        inStock: true,
      },
    ],
  },
} satisfies Tree<typeof components>;

export const validRating = {
  type: "Rating",
  props: { max: 5, value: 3.5 },
} satisfies Tree<typeof components>;

export const invalidRating = {
  type: "Rating",
  props: {
    // @ts-expect-error Registered component props retain their authored TypeScript type.
    value: "3",
  },
} satisfies Tree<typeof components>;

export const validDataGridSlottedCell = {
  type: "DataGrid",
  props: {
    columns: [{ key: "name", label: "Name" }, { key: "performance" }],
    data: [
      {
        name: "Kiril",
        performance: {
          children: { type: "Rating", props: { value: 3 } },
          value: 3,
        },
      },
    ],
  },
} satisfies Tree<typeof components>;

export const invalidDataGrid = {
  type: "DataGrid",
  props: {
    // @ts-expect-error Registered component props retain their authored TypeScript type.
    data: "not-rows",
  },
} satisfies Tree<typeof components>;

export const progress = components.Progress({ max: 4, text: "Halfway", value: 2 });
export const button = components.Button({
  text: "Save",
  variant: "secondary",
});
export const checkbox = components.Checkbox({ defaultChecked: true });
export const label = components.Label({
  text: "Accept",
  children: components.Checkbox({ defaultChecked: true }),
});
export const stack = components.Stack({
  children: components.Text({ text: "Hello", variant: "heading" }),
  gap: "sm",
});
export const dataGrid = components.DataGrid({
  columns: ["Option", "Time"],
  data: [{ Option: "Train", Time: "2h" }],
});
export const rating = components.Rating({ max: 5, value: 3.5 });
