import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'appearance-none inline-flex items-center justify-center rounded-full font-medium transition-all duration-75 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        default: 'bg-[#E27932] text-white hover:bg-[#C66B2D]',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        active: 'bg-gray-200 text-[#767676] hover:brightness-90',
        disabled: 'bg-[#FFC7A7] text-white',
      },
      size: {
        l: 'h-11 px-8 text-base',
        m: 'h-[34px] px-6 text-sm',
        ms: 'h-8 px-4 text-sm',
        s: 'h-7 px-3 text-xs',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'm',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const RoundButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, children, ...props }, ref) => {
    return (
      <button className={buttonVariants({ intent, size, className })} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

RoundButton.displayName = 'RoundButton';

export default RoundButton;
