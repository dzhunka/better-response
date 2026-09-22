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

const tree: Tree<typeof components> = {
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
            label: "2026 price",
            type: "number",
            format: { style: "currency", currency: "EUR", maximumFractionDigits: 0 },
          },
          {
            key: "weight",
            label: "Weight (kg)",
            type: "number",
            format: { minimumFractionDigits: 1 },
          },
          {
            key: "available",
            label: "Available",
            type: "date",
            format: { month: "short", year: "numeric" },
          },
          { key: "worth", label: "Worth the jump" },
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

createRoot(root).render(
  createElement("div", { className: "engawa-root" }, render(tree, components)),
);
