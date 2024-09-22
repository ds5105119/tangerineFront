import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-[#E27932] text-white hover:bg-[#C66B2D]',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        active: 'bg-white text-[#E27932]',
      },
      size: {
        l: 'h-11 px-8 text-base',
        m: 'h-[34px] px-6 text-sm',
        ms: 'h-8 px-4 text-sm',
        s: 'h-7 px-3 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'm',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'button';

    return (
      <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

export default Button;
