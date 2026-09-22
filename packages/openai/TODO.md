# OpenAI design-language TODO

This is the living decomposition ledger for `@better-response/openai`. It tracks the
visual vocabulary we still need to discover, not just the component names that
OpenAI exports.

The upstream family list is only an entry point. A family is complete only when
every styled semantic part in its React and CSS source has an explicit
disposition in this repository.

## Reference baseline

- OpenAI Apps SDK UI source:
  [`openai/apps-sdk-ui`](https://github.com/openai/apps-sdk-ui) at
  `0f00143c7a639906f1621fe58e1b6be7b5bea46d`
- Base UI behavior reference:
  [`@base-ui/react`](https://base-ui.com/react/overview/quick-start), with the
  v1.7.0 documentation checked on 2026-08-04
- Local implementation: `packages/openai`
- Visual verification: `apps/openai-storybook`

Update the source commit and re-audit affected families when the reference
changes. Do not silently mix evidence from different upstream revisions.

## Status vocabulary

| Status | Meaning |
| --- | --- |
| `DONE` | The accepted surface is implemented, publicly exported, covered in Storybook, and has no undisposed styled parts in the current audit. |
| `ROOT` | A useful public root exists, but the upstream family still contains concealed parts or behavior that must be decomposed. |
| `MAPPED` | Source and behavior anatomy have been traced and provisional layer assignments exist; implementation remains open. |
| `AUDIT` | The family is known, but its complete styled-part inventory or target anatomy is not settled. |
| `OMIT` | The source has an explicit reason not to become part of this design-language package. |

## Provenance audit — 2026-08-04

The current pinned commit is also OpenAI's current `main`; the audit is not
explained by a stale baseline.

| System | Result |
| --- | --- |
| Colors | Exact. All 140 non-gray primitive declarations match, the fixed gray ramp preserves the official swatches, and all 259 shared semantic color tokens resolve identically in light and dark. |
| Typography | Corrected. The foundation exposes the complete official `text-3xs` through `text-lg` and `heading-xs` through `heading-5xl` tokens, all four weights, and official tracking names. Text exposes those exact variants, `default`/`secondary`/`tertiary`/`inverse` tones, intrinsic or component target selection, and the official `text-md` default. |
| Spacing and shape | The implemented subsets use official values. `--border-width` is a local generic alias rather than an upstream foundation token. |
| Elevation | Corrected. The official popup, `100`–`400`, strong, stronger, and hairline contracts are present with exact light/dark results; hairlines adapt above 1.5dppx and the elevated Surface suppresses its dark edge. Switch keeps its component-specific thumb shadow locally. |
| Motion | Corrected. The foundation exposes official `--cubic-enter`, `--cubic-exit`, `--cubic-exit-snappy`, `--cubic-move`, `--transition-duration-basic`, and `--transition-ease-basic` names. Switch keeps its component-specific 250ms duration locally. |
| React compatibility | Corrected. The private package now explicitly requires React 19, matching the workspace runtime and the generic ref-as-prop contract used by every polymorphic view. |

## How to update this ledger

For each upstream family:

1. Read its public index, every non-story React source file, every stylesheet,
   and any source file it composes from another family.
2. Record every rendered semantic element, CSS class, pseudo-element that
   represents a distinct part, and externally supplied behavior primitive.
3. Give every part one provisional layer:
   - `view`: a generally reusable, one-element visual primitive with no
     owned behavior, state, or effects;
   - `ui`: Base UI behavior primitives, reusable View primitives, and any contextual
     assembly or styling specific to the control;
   - `components`: opinionated assemblies of UI and View;
   - `omit`: provider, infrastructure, or reference behavior that this package
     intentionally does not reproduce.
4. Record the Base UI part used for behavior separately from the styled View
   primitive or UI styling applied to it. Base UI is not the source of OpenAI
   styling.
5. Do not promote an upstream family-specific fragment into `view`.
   Reduce it to reusable visual vocabulary or keep it in `ui`.
6. Do not mark a family `DONE` until its concealed-parts list is empty or every
   item has an explicit `ui`, `components`, or `omit` disposition.
7. When implementation begins, add the public contract, Storybook acceptance
   case, and validation result beside the item.
8. Trace every agent-exposed control vertically through `view`, `ui`, and
   `components`. A thin component adapter is still required when its job is to
   replace React-only composition with serializable configuration.

Names under “parts” are discovery names, not approved public APIs.

## Current root coverage

These seventeen public View roots exist. After the focused foundation repair,
Badge and Text are currently closed under the styled-part rule.

| Family | Status | Implemented root | Concealed work still open |
| --- | --- | --- | --- |
| Badge | `DONE` | `view/Badge` | None found in the pinned source. |
| Button | `ROOT` | `view/Button` | The bounded colors, variants, and medium sizing use official values, but the root drops the upstream default pill shape and active scaling and lacks focused Storybook state coverage. Add the missing inner/loading/link/copy dispositions before calling the leaf faithful, then build UI and Component adapters. |
| Card | `AUDIT` | `view/Card` | No Card component family exists in the pinned OpenAI source. The current shell has unverified local styling, its Component title is a `span` rather than a heading, and the passthrough UI is speculative. Confirm separate Figma evidence or remove the OpenAI provenance claim before expanding it. |
| Checkbox | `ROOT` | `view/Checkbox` | Label/container composition and an explicit indicator/checkmark leaf for a future Base UI-backed control. |
| ControlContainer | `ROOT` | `view/ControlContainer` | Select proves the button-backed field shell; audit Input, Textarea, TagInput, and date-control consumers before expanding its axes. |
| Icon | `ROOT` | `view/Icon` | Generic SVG canvas exists; the named glyph catalog remains untracked as individual exports. |
| Image | `ROOT` | `view/Image` | The native image leaf exists, but its local flex styling is not from the pinned family and it omits the upstream opacity/load/failure state. Map that stateful behavior to UI or explicitly omit it. |
| Input | `ROOT` | `view/Input` | Field container and adornment slots; decide which autofill and focus behavior belongs in `ui` or is omitted. |
| List | `ROOT` | `view/List` | Select proves the visual collection primitive; audit Menu before expanding density or spacing axes. |
| ListItem | `ROOT` | `view/ListItem` | Select proves the item visual foundation; audit Menu action, link, checkbox, radio, and submenu states before expanding its axes. |
| ShimmerText | `ROOT` | `view/ShimmerText` | The always-on shimmer effect is faithful and adds reduced-motion handling, but upstream `ShimmerableText` and its idle state still need a UI or explicit omission disposition. |
| Slider | `ROOT` | `view/Slider` | The native range is an approximation, not a faithful port of the compound upstream Slider; track/range/thumb behavior differs by browser and the upstream focus treatment, label, value editor, unit, reset, marks, and motion remain open. |
| Surface | `ROOT` | `view/Surface` | Select proves the elevated shell's background, radius, popup shadow, high-density hairline, and elevated-dark edge suppression; audit Menu, Popover, and Tooltip before expanding its axes. |
| Switch | `ROOT` | `view/Switch` | Label/container, track, and thumb leaves for a Base UI-backed switch. |
| Text | `DONE` | `view/Text` | The complete official text and heading scales, tones, weights, tracking, `text-md` default, and semantic `as` contract are covered in Storybook. |
| Textarea | `ROOT` | `view/Textarea` | Field container plus disposition of auto-resize, selection, and autofill behavior. |
| TextLink | `ROOT` | `view/TextLink` | The native-anchor primary/underline contract is faithful, but the upstream secondary/tertiary contextual hover treatments are missing and must be implemented or explicitly omitted. |

## Worked decomposition: Button

Button proves that every agent-facing control needs a complete vertical path,
even when the styled leaf already works by itself.

```text
components/Button
├── serializable label
├── startIcon / endIcon identifiers
└── ui/Button
    ├── Base UI Button behavior
    └── view/Button

components/ButtonGroup
└── ui/ButtonGroup
    ├── ui/ToolbarButton
    │   ├── Base UI Toolbar Button behavior
    │   └── view/Button
    └── ui/ButtonGroupButton
        ├── context-appropriate Base UI Button or Toggle behavior
        └── view/Button
```

`ui/Button`, `ui/ToolbarButton`, and `ui/ButtonGroupButton` are behavior
specializations over the same View primitive. Do not duplicate Button CSS or
nest Base UI Button inside Toolbar Button or Toggle just to preserve a single
wrapper name. The parent group owns roving focus, orientation, shared disabled
state, and selection semantics when applicable.

Component props are intentionally different from developer-facing UI props:

- `ui/Button` may accept ordinary React children and native handlers;
- `components/Button` should prefer serializable `label`, `startIcon`, and
  `endIcon` values that can be authored without constructing React children;
- icon values must resolve through the approved icon registry rather than accept
  component functions;
- `components/ButtonGroup` must make the group semantic explicit instead of
  inferring whether a set of buttons is a toolbar or a pressed-choice group.

Button checklist:

- [ ] Correct the bounded `view/Button` leaf's default pill shape, active treatment, and Storybook state coverage before calling it OpenAI-faithful.
- [x] Verify current Base UI Button, Toolbar, Toggle, and Toggle Group roles.
- [ ] Settle the complete visual Button surface still hidden upstream:
  inner content, loading overlay, icon-only treatment, link treatment, and copy
  behavior.
- [ ] Define `ui/Button` through Base UI Button composition.
- [ ] Define `ui/ToolbarButton` and `ui/ButtonGroupButton` as separate behavior
  adapters that both render `view/Button`.
- [ ] Define command-group and choice-group contracts separately at the parent
  group level.
- [ ] Define the serializable `components/Button` contract.
- [ ] Define `components/ButtonGroup` only after both group semantics have
  focused acceptance cases.
- [x] Extend the local authoring skill across `view`, `ui`, and `components`
  implementations.

## Worked decomposition: Select

OpenAI's pinned `Select` does not compose its exported `Menu`. It privately
builds a menu-shaped control from Radix Popover, manual focus and option
navigation, `SelectControl`, `Input`, `Tooltip`, and transition behavior.
Therefore `Select` cannot be represented by one TODO item.

The first accepted slice should be deliberately narrower than the upstream
family. Its component contract needs a serializable `ariaLabel`, a flat
array of `{ value, label, disabled? }` options, an optional `defaultValue`, a
placeholder, and the native form fields that Base UI already supports (`name`,
`required`, and `disabled`). Keep the OpenAI default appearance fixed at medium,
outline, block, and pill for this acceptance case. Multiple selection, groups,
descriptions, option tooltips, search, limits, actions, clear, loading, custom
views, positioning knobs, and additional visual axes remain follow-on slices.

Current first-slice decomposition (names are still discovery names):

```text
components/Select
├── serializable ariaLabel, placeholder, options, and defaultValue
└── ui/Select
    ├── Base UI Select.Root: value, form, open, and selection behavior
    ├── ui/SelectTrigger
    │   └── view/ControlContainer
    │       ├── Base UI Trigger: native button and Select behavior
    │       │   ├── Base UI Value → view/Text
    │       │   └── Base UI Icon → view/Icon
    │       └── future clear action → view/Button sibling
    └── ui/SelectPopup
        ├── Base UI Portal + Positioner: positioning behavior
        └── Base UI Popup + view/Surface
            └── ui/SelectList
                └── Base UI List → view/List
                    └── ui/SelectItem
                        ├── Base UI Item → view/ListItem
                        ├── Base UI ItemIndicator → view/Icon
                        └── Base UI ItemText → view/Text
```

These `ui/Select*` names describe separate UI adapters and composition
boundaries; they may live in one compound public module rather than one file
each. `ui/Select` owns the root context. `ui/SelectTrigger` owns the trigger
assembly, `ui/SelectPopup` owns portal and positioning, and `ui/SelectList` and
`ui/SelectItem` own collection semantics. They should reuse general View
styling, but may also own Select-specific layout, Base UI state selectors,
anchored sizing, scrolling, and transitions.

Contextual CSS reaches a reused View primitive through an explicit UI-scoping
`data-ui` attribute on the same DOM node. Base UI's `render` seam merges
its behavior props into that View root, so no visual wrapper or public
`className` escape hatch is needed. Do not move Select selectors into the
generic View primitive.

Base UI's current Select anatomy provides `Root`, `Trigger`, `Value`, `Icon`,
`Portal`, `Backdrop`, `Positioner`, `Popup`, `List`, `Item`, `ItemText`,
`ItemIndicator`, `Separator`, `Group`, `GroupLabel`, scroll arrows, and
optional arrow parts. Those are behavior and accessibility slots. Their OpenAI
visual treatment may come from reusable View primitives and contextual UI styles.

Base UI also supplies controlled and uncontrolled values, single and multiple
selection, typeahead, hidden-input form participation, disabled/read-only/
required states, and labeling. The `ui` layer should use those capabilities
instead of reproducing the pinned source's manual focus, keyboard, DOM-crawl,
hidden-input, and Popover state machinery.

Base UI Select is intentionally not filterable and its documentation directs
large filterable lists to Combobox. The pinned OpenAI family automatically
shows search above fifteen options, so its complete contract cannot be
implemented solely by `ui/Select`. Search is a later Component-level fork
to a Combobox-backed UI control (public name and explicit-versus-automatic
selection still unsettled), not a hidden feature of the first Select UI.

The pinned OpenAI source reveals these additional private styled parts:

- popup shell: `Menu`, `MenuList`, `MenuInner`;
- option region: `OptionsList`, `Option`, `PressableInner`, `OptionInner`;
- selection: `OptionIndicatorSlot`, `OptionCheck`;
- grouping and limits: `OptionGroupHeading`, `OptionHardLimitHeading`,
  `OptionsLimit`;
- search and empty results: `Search`, `SearchEmpty`;
- actions: `ActionsContainer`, `Action`, `ActionInner`.

`SelectControl` must also be decomposed. Its root, trigger text, indicator
wrapper, clear button, loader, and dropdown glyph are separately styled
elements, and the upstream component owns synthetic button behavior. It is a
`ui/SelectTrigger` assembly, not a component. The current dispositions are:

| Upstream part | Disposition |
| --- | --- |
| `SelectControl` root | Base UI Trigger behavior and `view/ControlContainer` field chrome share one resolved button root; `ui/SelectTrigger` owns the inner layout and Select state mapping. |
| `TriggerText` | Reusable `view/Text`; `ui/SelectTrigger` selects its typography and placeholder treatment. |
| `IndicatorWrapper` | Select-specific layout in `ui/SelectTrigger`, containing reusable `view/Icon`. |
| `StartIcon` and dropdown/check/search/info glyphs | Generic `view/Icon` canvas exists; named glyph exports do not. |
| `Clear` | Defer. `ui/SelectTrigger` can later place a reusable Button inside ControlContainer as a sibling of the native Trigger, avoiding nested buttons; the current Button still lacks the required small, ghost, uniform/icon-only surface. |
| `LoadingIndicator` | Defer until the Indicator family has a style-only loading leaf. |

The popup comparison does not justify a universal functional `view/Popup`,
but it does reveal a reusable visual `view/Surface`: elevated background,
radius, border/hairline, and shadow. `ui/SelectPopup`, `ui/MenuPopup`,
`ui/PopoverPopup`, and `ui/TooltipPopup` keep their own width, padding,
typography, scroll structure, positioning variables, motion, and behavior-state
selectors while composing that Surface where the visual contract fits.

`Menu` remains the name of a behavior assembly. The reusable visual vocabulary
is `view/List` and `view/ListItem`; `ui/SelectList` and
`ui/MenuList` combine those primitives with different behavior and contextual
styling. `ui/SelectItem` maps Base UI's selected, highlighted, and disabled
state into a ListItem and composes reusable Text and Icon primitives. Menu
action, link, checkbox, radio, and submenu states remain distinct UI concerns
even when they reuse the same ListItem foundation.

For the trigger shell, prefer a reusable `view/ControlContainer`
(working name) over extending `view/Button`. This is the generalized form
of the proposed InputContainer: a non-interactive visual shell for native
inputs, textareas, searchable/tag inputs, and button-backed field controls.
The existing Button's action-oriented color/variant contract is not the
form-control appearance used by Select. In `ui/SelectTrigger`, Base UI
Trigger behavior renders through ControlContainer onto one native button;
UI CSS owns Select-specific arrangement, pointer treatment, and state
mapping on that root. This preserves semantics and reuses the field chrome.
Any future clear or loading sibling would require a deliberate multi-root
assembly rather than changing this public root implicitly.

Implemented first-slice readiness:

| Need | Current state |
| --- | --- |
| Base UI Select behavior | `@base-ui/react` v1.7.0 and public `ui/Select` adapters now own value, form, popup, listbox, option, and disabled behavior. |
| Serializable Select contract | Public `components/Select` accepts the bounded string/option/form contract. |
| Reusable trigger shell | Public `view/ControlContainer` supplies reusable outline/soft field chrome on the same resolved node as the native Base UI Trigger. |
| Reusable typography | Public `view/Text` now supplies the official scale and Select consumes `text-sm`. The trigger still misses the upstream medium weight and 24px control line height; correct those in a separate Select fidelity change. |
| Reusable popup surface | Public `view/Surface` supplies the main elevated shell values and density-aware light/dark hairline behavior. |
| Reusable collection visuals | Public `view/List` matches the menu gutter. `view/ListItem` is only partial: the bounded Select's item gap and active/highlight mechanics differ from the pinned source. |
| Select-specific trigger, popup, list, and item composition | Public `ui/Select` owns the correct behavior layer and resolves Trigger, Popup, List, and Item behavior through their View roots. Popup polymorphism targets the Surface inside the fixed Portal and Positioner. Visual fidelity remains partial: the trigger typography, 300px popup minimum, option scroll/overflow rules, pseudo-element highlight/press treatment, and official glyphs are missing or altered. |
| Search input | Native `view/Input` exists, but search is outside the first slice and its adornment/container composition is still missing. |
| Dropdown and check glyphs | Generic `view/Icon` canvas exists; named glyph catalog is missing. |
| Clear action | `view/Button` exists, but its current medium solid/outline contract does not cover the upstream clear treatment. |
| Popup foundations | Popup shadow, density-aware hairline, and easing values use the official contracts. |

Select checklist:

- [x] Trace pinned OpenAI React and CSS source.
- [x] Record current Base UI Select, Menu, and Popover anatomy.
- [x] Compare OpenAI `Select.MenuList`, `Menu.MenuList`,
  `Popover.Popover`, and `Tooltip.Tooltip` before approving a shared `Popup`.
- [x] Settle `Menu` and `SelectList` as contextual UI over reusable
  `List` and `ListItem` View primitives.
- [x] Bound the first Component acceptance case and its reusable View
  vocabulary.
- [ ] Audit `ControlContainer`, `Text`, `Surface`, `List`, and `ListItem` against
  their second concrete consumers before approving their complete public axes.
- [ ] Settle follow-on View reuse and contextual UI styling for groups, separators, search,
  empty state, limits, actions, loading, clear, descriptions, and tooltips.
- [x] Add a `view` Storybook matrix for every approved visual leaf.
- [x] Define the first Base UI-backed `ui` authoring acceptance case and
  extend the local skill to cover it.
- [x] Settle the same-node contextual styling mechanism for UI
  composition: Base UI behavior, the reusable View primitive, and an explicit scoped
  `data-ui` attribute share the resolved root.
- [x] Implement and type-test the shared View/UI polymorphism contract,
  including intrinsic and component targets, configured UI elements,
  UI-only `forwardedAs`, target-specific props and refs, design-prop
  collision precedence, and the component boundary.
- [x] Implement the Base UI-backed Select UI.
- [x] Implement the opinionated Select Component after the underlying UI
  and View contracts are proven.

Validation on 2026-08-04: `pnpm typecheck` and `pnpm build:storybook` pass.
Browser verification in light and dark schemes confirms combobox/listbox/option
semantics, disabled and selected option states, pointer and keyboard opening and
selection, and hidden native form value updates. Those checks establish behavior
and build integrity; they did not establish visual or naming provenance.
Polymorphism verification additionally confirms intrinsic and component View
targets at runtime; Select Trigger interception resolves to the selected Button
root; Popup interception resolves the element inside the Portal; and
`forwardedAs` retains the Surface, List, and ListItem View classes while
resolving their requested `section`, `ul`, and `li` hosts.

## Upstream family ledger

The concealed-part lists below come from static React/CSS tracing. They are
starting evidence, not final public contracts.

| Upstream family | Status | Provisional target | Concealed visual parts and next disposition |
| --- | --- | --- | --- |
| Alert | `AUDIT` | component + view | Indicator, content, message, title, description, and actions. Determine whether Alert itself is only a component. |
| AppsSDKUIProvider | `OMIT` | infrastructure | No visual parts. Router/provider configuration is not part of this design-language inventory. |
| Avatar | `AUDIT` | ui + view | Image container, image, initial/fallback, icon fallback, group, and overflow count. Map image-loading fallback behavior to Base UI Avatar. |
| Badge | `DONE` | view | Single styled leaf. |
| Button | `ROOT` | view + ui + component | Partial styled leaf exists; correct its default pill and active treatment. Then add `ui/Button`, `ui/ToolbarButton`, and `ui/ButtonGroupButton` over the same view, plus serializable label/icon configuration, inner content, loader overlay, link behavior, and copy behavior. |
| Checkbox | `ROOT` | ui + view | Root/control, indicator, label, and container. Recompose with Base UI Checkbox, reuse general visual primitives, and keep checkbox-specific assembly or styling in its ui. |
| CodeBlock | `AUDIT` | component + view | Root, syntax/code region, copy action container, code leaf, and copy button behavior. |
| DatePicker | `AUDIT` | component + ui + view | Popup, calendar container/wrapper, month label, previous/next controls, week, day label, day, interactive day, range, and today dot. |
| DateRangePicker | `AUDIT` | component + ui + view | DatePicker anatomy plus trigger, range text/separator, shortcuts, stepper control, and previous/next stepper actions. |
| EmptyMessage | `AUDIT` | component + view | Icon badge, title, description, and action row. |
| Icon | `ROOT` | view catalog | Generic canvas exists; named glyph exports remain open. |
| Image | `ROOT` | view + ui or omit | Native leaf exists; opacity/load/failure styling and stateful behavior remain undisposed. |
| Indicator | `AUDIT` | view | Loading indicator, loading dots and dot, circular-progress container, track, and track progress. |
| Input | `ROOT` | view + ui | Input leaf exists; container and adornment composition remain open. |
| Markdown | `AUDIT` | component + view | Prose renderer, anchor, inline code, pre/code block, table cell treatment, empty state, and syntax integration. |
| Menu | `MAPPED` | ui + view | Map Base UI Menu behavior into a contextual Menu ui that reuses Surface, List, ListItem, Text, Icon, and Button where their contracts fit; keep action, link, checkbox, radio, submenu, and transition styling in the ui. |
| Popover | `MAPPED` | ui + view | Map Base UI Trigger, Portal, Positioner, Popup, Arrow, Title, Description, Close, and Viewport; test reuse of Surface, Text, and Button while keeping positioning and transition CSS in the ui. |
| RadioGroup | `AUDIT` | ui + view | Group, item, indicator wrapper, indicator, and label. Map to Base UI Radio Group. |
| SegmentedControl | `AUDIT` | ui + view | Root, option, and moving thumb. Map selection behavior to Base UI Toggle Group and determine thumb ownership. |
| Select | `ROOT` | component + ui + view | The bounded flat single-select path is implemented. Follow-on groups, search/Combobox, clear, loading, descriptions, actions, multiple selection, and additional visual axes remain explicitly deferred. |
| SelectControl | `ROOT` | ui + view | `ui/SelectTrigger` now composes ControlContainer around a Base UI native Trigger with Text and Icon children plus contextual layout/state CSS. Clear remains a deferred sibling control; loading and named glyphs remain Indicator and Icon work. |
| ShimmerText | `ROOT` | view + ui or omit | Always-on leaf exists; ShimmerableText and its idle state remain undisposed. |
| Slider | `ROOT` | ui + view | Root/wrap, label, value input, unit, reset, marks container, mark, mark label, track, range, and thumb. |
| Switch | `ROOT` | ui + view | Container, label, track, and thumb. |
| TagInput | `AUDIT` | component + ui + view | Field container, input container/wrapper/measure, input, tag, tag value, remove action, and limit text; classify measurement and keyboard behavior. |
| TextLink | `ROOT` | view | Native leaf exists; contextual hover treatment for secondary and tertiary text remains undisposed. |
| Textarea | `ROOT` | view + ui | Textarea leaf exists; container and behavior disposition remain open. |
| Tooltip | `AUDIT` | ui + view | Popup, trigger decorator, copy-tooltip composition, and transition states. Map to Base UI Tooltip. |
| Transition | `AUDIT` | ui or motion infrastructure | Transition item, group child, layout container, and layout item. Decide which behavior Base UI/CSS already supplies before creating public controls. |

## Cross-family leaf candidates

These names recur across compound families. They are candidates for deliberate
reuse, not permission to generalize them yet.

| Candidate | Seen in | Evidence still required |
| --- | --- | --- |
| Surface | Select, Menu, Popover, Tooltip, DatePicker, DateRangePicker | Candidate reusable elevated visual shell; each ui retains sizing, padding, typography, positioning, motion, and state selectors. Audit calendars before settling all axes. |
| List | Select, Menu | Reusable visual collection container beneath contextual `ui/SelectList` and `ui/MenuList`. Compare padding and density axes without importing behavior. |
| ListItem | Select, Menu | Reusable item visual foundation. The ui owns selected, highlighted, disabled, link, action, checkbox, radio, and submenu semantics and may add contextual CSS. |
| Icon slot | Select, Menu | Prefer ordinary Icon composition and ui layout unless a second control proves a reusable reserved-slot primitive. |
| Group label | Select, Menu | Prefer Text composition first; compare spacing, typography, and indicator alignment before adding another component. |
| MenuSeparator | Menu and action/search boundaries in Select | Determine whether Select boundaries share the separator contract. |
| ControlContainer | Input, Textarea, Select, TagInput, searchable and date controls | Reusable non-interactive field/adornment shell around a native input, textarea, or button-backed ui trigger. Keep action Button axes separate and let each ui own its inner control layout and behavior. |
| ControlLabel | Checkbox, Switch, RadioGroup, Slider, Date controls | Compare semantic element, click target, disabled state, and typography. |
| Indicator | Alert, Checkbox, RadioGroup, Select, Menu, loading controls | Keep semantic roles separate even if geometry tokens are shared. |
| Trigger | Select, Menu, Popover, Tooltip, date controls | Trigger behavior and contextual arrangement belong to Base UI-backed `ui`; compose Button or ControlContainer only when the semantic and visual contract matches. |
| ButtonGroup | Button, Menu triggers, Select triggers, segmented controls, toolbars | Separate command grouping from pressed-choice state; compare shared visual seams, orientation, focus, disabled, and selection contracts. |

## Next audits

1. Repair the remaining view provenance failures before adding more public
   components.
2. Re-audit Card and Select consumers after the completed Text, elevation, and
   motion repair.
3. Audit the new Select primitives against their second concrete consumers
   before expanding their public axes.
4. Fully decompose Menu into Base UI behavior, reusable view, and contextual
   Menu ui styling.
5. Revisit popup sharing only after Select and one second popup family are
   implemented.
6. Re-audit existing Checkbox, Switch, RadioGroup, Input, and Textarea roots as
   one field/control family without prematurely sharing wrappers.
7. Re-audit Slider and SegmentedControl against Base UI parts.
8. Trace calendar anatomy shared by DatePicker and DateRangePicker.
9. Continue through the remaining `AUDIT` families, updating this file as each
   styled part receives a disposition.
