import {
  cloneElement,
  createElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactElement,
} from "react";

type ReservedTargetProp = "as" | "className" | "style";

type UITargetProps<
  Target extends ElementType,
  OwnProps extends object,
> = DistributiveOmit<
  ComponentPropsWithRef<NoInfer<Target>>,
  keyof OwnProps | ReservedTargetProp | "forwardedAs"
>;

type ForwardedAsProps<
  Target extends ElementType,
  ForwardedTarget extends ElementType,
> =
  Target extends keyof React.JSX.IntrinsicElements
    ? {
        forwardedAs?: never;
      }
    : "as" extends keyof ComponentPropsWithRef<Target>
      ? {
          forwardedAs?: ForwardedTarget;
        }
      : {
          forwardedAs?: never;
        };

export type DistributiveOmit<
  Props,
  Keys extends PropertyKey,
> = Props extends unknown ? Omit<Props, Keys> : never;

export type PolymorphicProps<
  Target extends ElementType,
  OwnProps extends object,
> = OwnProps & {
  as?: Target;
} & DistributiveOmit<
    ComponentPropsWithRef<NoInfer<Target>>,
    keyof OwnProps | ReservedTargetProp
  >;

export type UIPolymorphicProps<
  Target extends ElementType,
  DefaultTarget extends ElementType,
  OwnProps extends object,
  ForwardedTarget extends ElementType = DefaultTarget,
> = OwnProps &
  (
    | ({
        as?: undefined;
        forwardedAs?: undefined;
      } & UITargetProps<DefaultTarget, OwnProps>)
    | ({
        as?: undefined;
        forwardedAs: ForwardedTarget;
      } & UITargetProps<ForwardedTarget, OwnProps>)
    | ({
        as: Target;
      } & ForwardedAsProps<Target, ForwardedTarget> &
        UITargetProps<Target, OwnProps>)
    | {
        as: ReactElement;
        forwardedAs?: never;
      }
  );

export function renderPolymorphic(
  defaultTarget: ElementType,
  target: ElementType | undefined,
  props: Record<string, unknown>,
) {
  return createElement(target ?? defaultTarget, props);
}

export function resolveUIRender(
  defaultTarget: ElementType,
  target: ElementType | ReactElement | undefined,
  forwardedTarget: ElementType | undefined,
) {
  const element = isValidElement(target)
    ? target
    : createElement(target ?? defaultTarget);

  return forwardedTarget === undefined
    ? element
    : cloneElement(element, { as: forwardedTarget });
}
