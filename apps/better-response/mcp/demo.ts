import { applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import { render, type Tree } from "@better-response/engawa";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "@better-response/common/styles.css";
import "@better-response/engawa/styles.css";
import * as components from "./components/index.ts";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing demo root");
}

const checklist: Tree<typeof components> = {
  type: "Stack",
  props: { gap: "md", padding: "md" },
  children: [
    { type: "Text", props: { variant: "heading", text: "Pasta night" } },
    {
      type: "Stack",
      props: { gap: "sm" },
      children: [
        {
          type: "Label",
          props: { text: "400 g spaghetti" },
          children: [{ type: "Checkbox", props: { defaultChecked: true } }],
        },
        {
          type: "Label",
          props: { text: "200 g guanciale" },
          children: [{ type: "Checkbox" }],
        },
        {
          type: "Label",
          props: { text: "4 eggs" },
          children: [{ type: "Checkbox" }],
        },
        {
          type: "Label",
          props: { text: "A wedge of pecorino romano" },
          children: [{ type: "Checkbox" }],
        },
      ],
    },
    { type: "Separator" },
    {
      type: "Text",
      props: {
        variant: "caption",
        text: "Enough for four. The guanciale is the one worth a detour.",
      },
    },
  ],
};

const comparison: Tree<typeof components> = {
  type: "Stack",
  props: { gap: "md", padding: "md" },
  children: [
    {
      type: "Text",
      props: { variant: "heading", text: "Which Attain is the real upgrade?" },
    },
    {
      type: "DataGrid",
      props: {
        columns: [
          { key: "build", label: "Build" },
          {
            key: "price",
            label: "Price",
            type: "number",
            format: { style: "currency", currency: "EUR", maximumFractionDigits: 0 },
          },
          {
            key: "weight",
            label: "kg",
            type: "number",
            format: { minimumFractionDigits: 1 },
          },
          {
            key: "available",
            label: "Available",
            type: "date",
            format: { month: "short", year: "numeric" },
          },
          { key: "worth", label: "Worth it" },
        ],
        data: [
          {
            build: "Attain SLX",
            price: 1399,
            weight: 9.6,
            available: "2026-03-01",
            worth: { value: 4, children: { type: "Rating", props: { value: 4 } } },
          },
          {
            build: "Attain Pro",
            price: 1099,
            weight: 10.1,
            available: "2026-02-01",
            worth: { value: 3, children: { type: "Rating", props: { value: 3 } } },
          },
          {
            build: "Attain Race",
            price: 899,
            weight: 10.7,
            available: "2026-05-01",
            worth: { value: 2, children: { type: "Rating", props: { value: 2 } } },
          },
        ],
      },
    },
    { type: "Separator" },
    {
      type: "Text",
      props: {
        variant: "caption",
        text: "Prices are manufacturer recommended. Availability varies by region.",
      },
    },
  ],
};

// The real app takes its theme from the host. On the website the visitor's own
// preference is the closest equivalent, applied through the same helper.
const dark = matchMedia("(prefers-color-scheme: dark)");
const followPreference = () => applyDocumentTheme(dark.matches ? "dark" : "light");

dark.addEventListener("change", followPreference);
followPreference();

const tree =
  new URLSearchParams(location.search).get("view") === "checklist"
    ? checklist
    : comparison;

createRoot(root).render(
  createElement("div", { className: "engawa-root" }, render(tree, components)),
);
