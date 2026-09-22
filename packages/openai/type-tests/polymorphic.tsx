import { createRef, type ComponentPropsWithRef } from "react";

import { Button } from "../view/Button";
import { Checkbox } from "../view/Checkbox";
import { Input } from "../view/Input";
import { Text } from "../view/Text";
import { TextLink } from "../view/TextLink";
import { SelectItem, SelectPopup } from "../ui/Select";
import { Select as SelectComponent } from "../components/Select";

type RouterLinkProps = Omit<ComponentPropsWithRef<"a">, "href"> & {
  to: string;
};

function RouterLink({ ref, to, ...props }: RouterLinkProps) {
  return <a {...props} href={to} ref={ref} />;
}

const anchorRef = createRef<HTMLAnchorElement>();
const buttonRef = createRef<HTMLButtonElement>();

<Button ref={buttonRef}>Button</Button>;
<Button as="a" href="/docs" ref={anchorRef}>
  Anchor
</Button>;
<Button as={RouterLink} to="/docs">
  Router link
</Button>;

// @ts-expect-error Default buttons do not accept anchor props.
<Button href="/docs">Invalid button</Button>;
// @ts-expect-error Custom targets retain their required props.
<Button as={RouterLink}>Missing destination</Button>;
// @ts-expect-error The selected anchor target determines the ref type.
<Button as="a" ref={buttonRef} />;

<Text as={RouterLink} to="/docs">
  Linked text
</Text>;
<Text as="h2" variant="heading-lg">
  Heading
</Text>;
// @ts-expect-error Heading variants require an explicit native heading target.
<Text as={RouterLink} to="/docs" variant="heading-lg" />;

<TextLink href="/docs">Native link</TextLink>;
<TextLink as={RouterLink} to="/docs">
  Router link
</TextLink>;
// @ts-expect-error The default native anchor contract requires href.
<TextLink>Missing destination</TextLink>;
// @ts-expect-error Custom link props remain required.
<TextLink as={RouterLink}>Missing router destination</TextLink>;

<Input size="sm" />;
// @ts-expect-error The design-system size shadows the native numeric input size.
<Input size={12} />;

// @ts-expect-error Void View primitives remain childless after changing targets.
<Checkbox as="div">Invalid child</Checkbox>;

<SelectPopup>Default surface</SelectPopup>;
<SelectPopup as="section">Section popup</SelectPopup>;
<SelectPopup as={RouterLink} to="/docs">
  Linked popup
</SelectPopup>;
<SelectPopup as={<Button as="div" />}>Configured popup</SelectPopup>;
<SelectPopup forwardedAs="section">Forwarded surface</SelectPopup>;
<SelectPopup forwardedAs="a" href="/docs" ref={anchorRef}>
  Forwarded linked surface
</SelectPopup>;
<SelectPopup as={Button} color="secondary" forwardedAs="div">
  Button-backed popup
</SelectPopup>;
<SelectItem
  as="button"
  label="Button item"
  nativeButton
  type="button"
  value="button"
/>;

// @ts-expect-error Intrinsic targets cannot receive forwardedAs.
<SelectPopup as="section" forwardedAs="div" />;
// @ts-expect-error Non-polymorphic components cannot receive forwardedAs.
<SelectPopup as={RouterLink} forwardedAs="div" to="/docs" />;

<SelectComponent
  ariaLabel="Choose"
  // @ts-expect-error Components own their rendering and do not expose as.
  as="section"
  options={[]}
/>;
