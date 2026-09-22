import {
  SelectItem,
  SelectList,
  SelectPopup,
  SelectRoot,
  SelectTrigger,
} from "../ui/Select";

export type SelectComponentOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectProps = {
  ariaLabel: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  options: readonly SelectComponentOption[];
  placeholder?: string;
  required?: boolean;
};

export function Select({
  ariaLabel,
  defaultValue,
  disabled = false,
  name,
  options,
  placeholder = "Select…",
  required = false,
}: SelectProps) {
  return (
    <SelectRoot
      defaultValue={defaultValue}
      disabled={disabled}
      items={options}
      name={name}
      required={required}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        disabled={disabled}
        placeholder={placeholder}
      />
      <SelectPopup>
        <SelectList>
          {options.map((option) => (
            <SelectItem key={option.value} {...option} />
          ))}
        </SelectList>
      </SelectPopup>
    </SelectRoot>
  );
}
