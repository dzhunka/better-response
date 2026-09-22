import "../styles/Select.css";

import { Select as BaseSelect } from "@base-ui/react/select";
import type { ElementType, ReactNode } from "react";

import { ControlContainer } from "../view/ControlContainer";
import { Icon } from "../view/Icon";
import { List } from "../view/List";
import { ListItem } from "../view/ListItem";
import { Surface } from "../view/Surface";
import { Text } from "../view/Text";
import {
  type UIPolymorphicProps,
  resolveUIRender,
} from "../polymorphic";

export type SelectOption = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

export type SelectRootProps = {
  children: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  items: readonly SelectOption[];
  name?: string;
  onValueChange?: (value: string | null) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string | null;
};

export function SelectRoot(props: SelectRootProps) {
  return <BaseSelect.Root {...props} />;
}

export type SelectTriggerOwnProps = {
  "aria-label": string;
  children?: never;
  disabled?: boolean;
  nativeButton?: boolean;
  placeholder?: ReactNode;
};

export type SelectTriggerProps<
  Target extends ElementType = "button",
  ForwardedTarget extends ElementType = "button",
> = UIPolymorphicProps<
  Target,
  "button",
  SelectTriggerOwnProps,
  ForwardedTarget
>;

export function SelectTrigger<
  Target extends ElementType = "button",
  ForwardedTarget extends ElementType = "button",
>({
  "aria-label": ariaLabel,
  as,
  disabled = false,
  forwardedAs,
  nativeButton,
  placeholder = "Select…",
  ...props
}: SelectTriggerProps<Target, ForwardedTarget>) {
  const inferredNativeButton =
    as === undefined
      ? forwardedAs === undefined || forwardedAs === "button"
      : as === "button" || forwardedAs === "button";

  return (
    <BaseSelect.Trigger
      {...props}
      aria-label={ariaLabel}
      data-ui="select-trigger"
      disabled={disabled}
      nativeButton={nativeButton ?? inferredNativeButton}
      render={resolveUIRender(
        ControlContainer,
        as ?? <ControlContainer pill>{null}</ControlContainer>,
        forwardedAs ?? (as === undefined ? "button" : undefined),
      )}
    >
      <BaseSelect.Value
        placeholder={placeholder}
        render={<Text variant="text-sm" />}
      />
      <BaseSelect.Icon className="SelectTriggerIcon">
        <Icon aria-hidden="true" size="sm" viewBox="0 0 16 16">
          <path d="M11 10H5l3 3.5L11 10ZM5 6h6L8 2.5 5 6Z" />
        </Icon>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export type SelectPopupOwnProps = {
  children: ReactNode;
};

export type SelectPopupProps<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
> = UIPolymorphicProps<
  Target,
  "div",
  SelectPopupOwnProps,
  ForwardedTarget
>;

export function SelectPopup<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
>({
  as,
  children,
  forwardedAs,
  ...props
}: SelectPopupProps<Target, ForwardedTarget>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        align="start"
        alignItemWithTrigger={false}
        className="SelectPositioner"
        sideOffset={5}
      >
        <BaseSelect.Popup
          {...props}
          data-ui="select-popup"
          render={resolveUIRender(Surface, as, forwardedAs)}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export type SelectListOwnProps = {
  children: ReactNode;
};

export type SelectListProps<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
> = UIPolymorphicProps<
  Target,
  "div",
  SelectListOwnProps,
  ForwardedTarget
>;

export function SelectList<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
>({
  as,
  children,
  forwardedAs,
  ...props
}: SelectListProps<Target, ForwardedTarget>) {
  return (
    <BaseSelect.List
      {...props}
      data-ui="select-list"
      render={resolveUIRender(List, as, forwardedAs)}
    >
      {children}
    </BaseSelect.List>
  );
}

export type SelectItemOwnProps = SelectOption & {
  children?: never;
  nativeButton?: boolean;
};

export type SelectItemProps<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
> = UIPolymorphicProps<
  Target,
  "div",
  SelectItemOwnProps,
  ForwardedTarget
>;

export function SelectItem<
  Target extends ElementType = "div",
  ForwardedTarget extends ElementType = "div",
>({
  as,
  disabled = false,
  forwardedAs,
  label,
  nativeButton,
  value,
  ...props
}: SelectItemProps<Target, ForwardedTarget>) {
  const inferredNativeButton =
    as === undefined
      ? forwardedAs === "button"
      : as === "button" || forwardedAs === "button";

  return (
    <BaseSelect.Item
      {...props}
      data-ui="select-item"
      disabled={disabled}
      label={typeof label === "string" ? label : undefined}
      nativeButton={nativeButton ?? inferredNativeButton}
      render={resolveUIRender(ListItem, as, forwardedAs)}
      value={value}
    >
      <span aria-hidden="true" className="SelectItemIndicatorSlot">
        <BaseSelect.ItemIndicator className="SelectItemIndicator">
          <Icon size="sm" viewBox="0 0 16 16">
            <path
              d="m2.5 8.5 4 4 7-9"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </Icon>
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText>
        <Text variant="text-sm">{label}</Text>
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}
