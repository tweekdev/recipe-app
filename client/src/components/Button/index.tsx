/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */ // Type is given by callee
import React from 'react';

import classNames, { Argument } from 'classnames';

export type IButtonVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'primaryOutline';

export type IButtonSizes = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: IButtonVariants;
  size?: IButtonSizes;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  fullwidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  disabledReason?: string;
  responsive?: boolean;
  children?: React.ReactNode;
}

type DataAttributeKey = `data-${string}`;
export type ICommonButtonProps = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    [dataAttribute: DataAttributeKey]: string;
  };

export const makeVariantButtonClassnames = (
  disabled?: boolean,
): { [key in IButtonVariants]: Argument[] } => ({
  primary: [
    'outline-0 border-0 outline-orange',
    'hover:bg-orange',
    'active:bg-orange',
    { '!bg-neutral-100': disabled },
    { 'text-neutral-100 hover:text-neutral-100 bg-orange': !disabled },
  ],
  primaryOutline: [
    'outline-0 border-solid border-[1px] border-orange outline-green-400',
    'hover:bg-primary-400',
    'active:bg-primary-500',
    { 'bg-neutral-100': disabled },
    { 'text-primary-400 hover:text-neutral-0 bg-neutral-0': !disabled },
  ],
  secondary: [
    'outline-0 border-solid border-[1px] border-neutral-800 outline-green-400',
    'hover:bg-neutral-800',
    'active:bg-neutral-900 active:border-neutral-900',
    {
      '!bg-neutral-100 !border-neutral-300 outline-0': disabled,
    },
    { 'text-neutral-800 bg-neutral-0 hover:text-neutral-0': !disabled },
  ],
  tertiary: [
    'outline-0 border-0 ',
    'bg-transparent',
    'hover:bg-neutral-100 hover:text-neutral-700',
    'active:bg-neutral-200 active:text-neutral-900',
    'focus:bg-neutral-100',
    {
      '!bg-neutral-0 outline-0 !text-neutral-400': disabled,
    },
    { 'text-neutral-800': !disabled },
  ],
});

const makeResponsiveButtonClassnames = ({
  isIconOnlyButton,
}: {
  isIconOnlyButton?: boolean;
}): Argument[] => [
  {
    'sm-desktop:text-ds-b1 sm-desktop:px-md sm-desktop:py-sm':
      !isIconOnlyButton,
  },
  { 'sm-desktop:text-ds-b1 sm-desktop:p-sm': isIconOnlyButton },
  { 'text-ds-b2 px-xs py-[0.375rem]': !isIconOnlyButton },
  { 'text-ds-b2 p-xs': isIconOnlyButton },
];

const makeCommonButtonClassnames = ({
  size,
  isIconOnlyButton,
  isFullwidth,
  disabled,
}: {
  size?: IButtonSizes;
  isIconOnlyButton?: boolean;
  isFullwidth?: boolean;
  disabled?: boolean;
}): Argument[] => [
  { 'text-ds-h4 px-lg py-md': size === 'lg' && !isIconOnlyButton },
  { 'text-ds-h4 p-md': size === 'lg' && isIconOnlyButton },
  { 'text-ds-b1 px-md py-sm': size === 'md' && !isIconOnlyButton },
  { 'text-ds-b1 p-sm': size === 'md' && isIconOnlyButton },
  { 'text-ds-b2 px-xs py-[0.375rem]': size === 'sm' && !isIconOnlyButton },
  { 'text-ds-b2 p-xs': size === 'sm' && isIconOnlyButton },
  { 'w-full flex justify-center': isFullwidth },
  { 'cursor-not-allowed	text-neutral-400': disabled },
  'font-bold',
  'focus:outline-8',
  'rounded-full',
  'outline-blue-500',
  'hover:no-underline',
];

interface IButtonLeftIconContainerProps {
  icon: JSX.Element;
  left?: boolean;
  size: IButtonSizes;
  isIconOnlyButton?: boolean;
}

export const ButtonIconContainer = ({
  icon,
  left,
  size,
  isIconOnlyButton,
}: IButtonLeftIconContainerProps): JSX.Element => (
  <div
    className={classNames('flex items-center shrink-0', {
      'w-xl': size === 'lg',
      'w-lg': size === 'md',
      'w-md': size === 'sm',
      'mr-xxs -ml-xxs': left && !isIconOnlyButton,
      '-mr-xxs ml-xxs ': !left && !isIconOnlyButton,
    })}
  >
    {icon}
  </div>
);

type IButtonContentProps = {
  fixBorder?: boolean; // Will introduce a negative 1px margin to the !container to avoid adding 2px to the height
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  size: IButtonSizes;
  fullwidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const ButtonContent: React.FC<IButtonContentProps> = ({
  className,
  fixBorder,
  leftIcon,
  rightIcon,
  size,
  children,
  fullwidth,
}) => (
  <div
    className={classNames(className, 'flex items-center justify-center', {
      'flex-grow': fullwidth,
      '-m-[1px]': fixBorder,
    })}
  >
    {leftIcon && (
      <ButtonIconContainer
        icon={leftIcon}
        size={size}
        isIconOnlyButton={!children}
        left
      />
    )}
    {children}
    {rightIcon && (
      <ButtonIconContainer
        icon={rightIcon}
        size={size}
        isIconOnlyButton={!children}
      />
    )}
  </div>
);

export const makeButtonClassnames = ({
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  fullwidth,
  variant,
  disabled,
  responsive,
}: ButtonProps): Argument[] => [
  ...makeCommonButtonClassnames({
    size,
    isIconOnlyButton: !!((leftIcon || rightIcon) && !children),
    isFullwidth: fullwidth,
    disabled,
  }),
  ...makeVariantButtonClassnames(disabled)[variant || 'primary'],
  responsive &&
    makeResponsiveButtonClassnames({
      isIconOnlyButton: !!((leftIcon || rightIcon) && !children),
    }),
];

export const Button = React.forwardRef<HTMLButtonElement, ICommonButtonProps>(
  (
    {
      variant,
      size = 'md',
      leftIcon,
      rightIcon,
      fullwidth,
      type = 'button',
      className,
      children,
      loading = false,
      onClick,
      disabledReason,
      responsive,
      ...rest
    },
    ref,
  ) => (
    <button
      className={classNames(
        className,
        makeButtonClassnames({
          size,
          leftIcon,
          rightIcon,
          variant,
          fullwidth,
          children,
          disabled: rest.disabled,
          responsive: responsive,
        }),
      )}
      ref={ref}
      type={type}
      onClick={event => {
        if (disabledReason) {
          event.preventDefault();
        } else {
          return onClick?.(event);
        }
      }}
      {...rest}
    >
      <ButtonContent
        fullwidth={fullwidth}
        fixBorder={variant === 'secondary'}
        leftIcon={leftIcon}
        size={size}
      >
        {children}
      </ButtonContent>
    </button>
  ),
);
