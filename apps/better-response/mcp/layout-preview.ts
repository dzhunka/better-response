import { render, type Tree } from "@better-response/engawa";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "@better-response/common/styles.css";
import "@better-response/engawa/styles.css";
import * as components from "./components/index.ts";

document.documentElement.dataset.theme = "dark";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing layout preview root");
}

function item(label: string): Tree<typeof components> {
  return {
    type: "Label",
    props: { text: label },
    children: [{ type: "Checkbox", props: { defaultChecked: false } }],
  };
}

const naiveHeader: Tree<typeof components> = {
  type: "Stack",
  props: { gap: "md" },
  children: [
    {
      type: "Stack",
      props: { direction: "horizontal", align: "center", gap: "md" },
      children: [
        {
          type: "Text",
          props: { variant: "heading", text: "Beef Dinner Shopping List" },
        },
        { type: "Separator" },
        {
          type: "Text",
          props: {
            text: "A flexible list for roughly 3-4 servings. Check items off as you shop.",
          },
        },
      ],
    },
  ],
};

const groceryGrid: Tree<typeof components> = {
  type: "Stack",
  props: { gap: "md" },
  children: [
    {
      type: "Text",
      props: { variant: "heading", text: "Beef Dinner Shopping List" },
    },
    {
      type: "Text",
      props: {
        text: "A flexible list for roughly 3-4 servings. Check items off as you shop.",
      },
    },
    {
      type: "Grid",
      props: { columns: 3, gap: "md" },
      children: [
        {
          type: "Stack",
          props: { gap: "sm" },
          children: [
            { type: "Text", props: { variant: "heading", text: "Main" } },
            item("500-700g ground beef"),
            item("Potatoes or rice"),
          ],
        },
        {
          type: "Stack",
          props: { gap: "sm" },
          children: [
            { type: "Text", props: { variant: "heading", text: "Vegetables" } },
            item("Onion & garlic"),
            item("Carrots"),
            item("Bell peppers"),
            item("Broccoli or green beans"),
          ],
        },
        {
          type: "Stack",
          props: { gap: "sm" },
          children: [
            {
              type: "Text",
              props: { variant: "heading", text: "Pantry & seasoning" },
            },
            item("Olive oil or butter"),
            item("Beef stock"),
            item("Salt & black pepper"),
            item("Paprika"),
            item("Thyme or rosemary"),
            item("Worcestershire or soy sauce"),
          ],
        },
      ],
    },
  ],
};

const comparison: Tree<typeof components> = {
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
          props: { flex: true, gap: "sm" },
          children: [
            { type: "Text", props: { variant: "label", text: "Bus" } },
            { type: "Separator" },
            {
              type: "Text",
              props: { variant: "caption", text: "35 minutes with one transfer" },
            },
          ],
        },
        {
          type: "Stack",
          props: { flex: true, gap: "sm" },
          children: [
            { type: "Text", props: { variant: "label", text: "Train" } },
            { type: "Separator" },
            {
              type: "Text",
              props: { variant: "caption", text: "22 minutes direct" },
            },
          ],
        },
      ],
    },
  ],
};

const ratingScale: Tree<typeof components> = {
  type: "Stack",
  props: { gap: "sm" },
  children: [0, 1, 2.5, 3.5, 4.8, 5].map((value) => ({
    type: "Stack",
    props: { direction: "horizontal", align: "center", gap: "md" },
    children: [
      { type: "Rating", props: { value } },
      { type: "Text", props: { variant: "caption", text: String(value) } },
    ],
  })),
};

const ratingGrid: Tree<typeof components> = {
  type: "DataGrid",
  props: {
    columns: [
      { key: "name", label: "Reviewer" },
      { key: "score", label: "Score" },
      {
        key: "spend",
        label: "Spend",
        type: "number",
        format: { style: "currency", currency: "EUR" },
      },
      { key: "visited", label: "Visited", type: "date" },
      { key: "member", label: "Member", type: "boolean" },
    ],
    data: [
      {
        name: "Kiril",
        score: { children: { type: "Rating", props: { value: 3.5 } }, value: 3.5 },
        spend: 128.4,
        visited: "2026-08-19",
        member: true,
      },
      {
        name: "Ana",
        score: { children: { type: "Rating", props: { value: 5 } }, value: 5 },
        spend: 62,
        visited: "2026-09-02",
        member: false,
      },
    ],
  },
};

function section(title: string, tree: Tree<typeof components>) {
  return createElement(
    "section",
    { className: "engawa-root", style: { outline: "1px solid var(--border)" } },
    createElement("h1", { style: { fontSize: 14, margin: 0 } }, title),
    render(tree, components),
  );
}

createRoot(root).render(
  createElement(
    "div",
    { style: { display: "grid", gap: 24, padding: 16, maxWidth: 720 } },
    section("Naive header (title | Separator | description)", naiveHeader),
    section("Grocery Grid of column Stacks", groceryGrid),
    section("Comparison with flex + Separator", comparison),
    section("Rating scale", ratingScale),
    section("DataGrid with slotted Rating cells", ratingGrid),
  ),
);
