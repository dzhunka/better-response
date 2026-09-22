---
name: create-openai-components
description: Create or change OpenAI design-language interfaces across packages/openai/view, packages/openai/ui, and packages/openai/components, with native CSS and Storybook coverage. Use when adding, modifying, decomposing, or repairing any OpenAI view, stateful UI, serializable component, public prop, variant, size, visual state, behavior, export, or story.
---

# Create OpenAI Components

Build the `@better-response/openai` React spectrum while preserving the dependency
direction `components → ui → view`.

## Establish scope

1. Read `AGENTS.md`, the OpenAI-library section of `PRODUCT.md`, and the
   relevant family in `packages/openai/TODO.md`.
2. Inspect the working tree and preserve unrelated changes.
3. Inspect the existing family, design tokens, styles, public exports, and
   Storybook conventions.
4. Trace the current pinned OpenAI React and CSS source before making a fidelity
   claim. Use the linked Figma library only for evidence the source does not
   settle.
5. Define one concrete acceptance case and classify every styled semantic part
   as View, UI, Component, or an explicit omission.
6. Implement only the vertical slice required by that acceptance case.

Do not treat a passing build as evidence of OpenAI fidelity. Record unsupported,
partial, provisional, or omitted behavior honestly in `PRODUCT.md` and
`packages/openai/TODO.md`.

## Route each part to one layer

### View

Put a part in `packages/openai/view` only when it is a generally reusable,
accessible visual primitive that renders one semantic element and owns no
state, effects, event behavior, or headless interaction.

- Preserve native attributes and semantics.
- Forward caller-provided handlers without defining behavior.
- Express visual axes through semantic props and `data-*` attributes.
- Do not expose `className`, `style`, or arbitrary styling escape hatches unless
  the accepted public contract requires them.
- Keep family-specific layout, state selectors, and behavior out of view.
- Apply the reuse test: identify the current consumer and one second traced
  family that needs the same visual primitive. Otherwise keep the part in its
  UI layer.

### UI

Put a part in `packages/openai/ui` when it owns accessible behavior,
state, or contextual assembly across one or more elements.

- Use a current Base UI primitive when it matches the required behavior and
  accessibility contract.
- Compose existing view primitives where their semantics and visual contracts fit.
- Keep family-specific layout, positioning, scrolling, motion, and state
  selectors in the UI control.
- Let developer-facing UI props accept normal React composition and
  handlers when the concrete control requires them.
- Do not duplicate View styling or create passthrough UI without a
  proven behavior, state, or contextual seam.
- Make same-node styling an explicit contract through a scoped data attribute,
  a semantically harmless wrapper, or another accepted mechanism.

### Components

Put a part in `packages/openai/components` when it provides the opinionated,
ready-to-render contract consumed by agent-authored configuration.

- Accept serializable data and small semantic configuration.
- Prefer labels, values, option records, and approved identifiers over
  `ReactNode`, component functions, or manually authored child trees.
- Compose UI and view primitives without reimplementing their behavior or styles.
- Give every agent-exposed control a Component entry, even when the adapter is
  intentionally thin.
- Keep the Component bounded to the accepted output shape. Do not add speculative
  modes, fallback behavior, or generalized schema infrastructure.

## Map foundations and CSS

Use the six systems in `packages/openai/design`: colors, typography, spacing,
shape, elevation, and motion.

- Add only official foundation values required by the accepted slice.
- Keep invariant palette values private by convention with `--_` names.
- Keep reusable semantic tokens public.
- Put light/dark selection on semantic tokens with `light-dark()` and let the
  consumer choose inherited `color-scheme`.
- Keep View-private CSS variables scoped to the View primitive.
- Keep independent visual axes independent. Never combine color, variant, size,
  or another public axis in one selector.
- Keep UI-only selectors and state mapping out of generic View styles.
- Do not use Tailwind, Sass, CSS-in-JS, runtime-computed styles, combination
  classes, or `:where()` specificity hiding.

## Publish the vertical slice

1. Export every public interface through the matching package subpath:
   `@better-response/openai/view/Name`, `@better-response/openai/ui/Name`, or
   `@better-response/openai/components/Name`.
2. Add or update Storybook coverage in the same change.
3. Import only through public `@better-response/openai` exports in stories.
4. Group stories under `View`, `UI`, or `Components`.
5. Expose every explicit public prop, variant, color, size, visual state, and
   behavior through controls or a focused example.
6. Keep preview-only layout and theme adapters inside
   `apps/openai-storybook`.
7. Update `packages/openai/TODO.md` with provenance, layer disposition,
   completion state, and deliberate omissions.
8. Update `PRODUCT.md` when evidence or implementation changes the recorded
   product contract.

## Validate

Run:

```sh
pnpm typecheck
pnpm build:storybook
git diff --check
```

Before reporting completion, also verify:

- dependencies flow only `components → ui → view`;
- no stale or missing public import paths remain;
- every package export target exists;
- Storybook covers the complete accepted surface;
- build success is not reported as visual fidelity;
- unrelated working-tree changes remain untouched.

Report the implemented vertical slice, public paths, validation results,
provenance limitations, and deliberately deferred behavior.
