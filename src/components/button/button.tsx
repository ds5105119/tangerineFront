import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  ' w-full flex items-center justify-center rounded-full font-medium transition-all duration-75 ease-in-out focus:outline-none focus-visible:ring-0',
  {
    variants: {
      intent: {
        default: 'text-white hover:brightness-110',
        outline: 'text-gray-700 bg-white hover:bg-gray-50 shadow-primary dark:shadow-dark',
        disabled:
          'cursor-not-allowed text-gray-400 dark:text-gray-300 bg-gray-100 hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-lg',
        long: 'h-10 px-8 text-sm',
      },
      colorScheme: {
        default: '',
        indigo: '',
        blue: '',
      },
    },
    compoundVariants: [
      {
        intent: 'default',
        colorScheme: 'default',
        className: 'bg-black hover:bg-gray-700',
      },
      {
        intent: 'default',
        colorScheme: 'indigo',
        className: 'bg-indigo-600 hover:bg-indigo-500',
      },
      {
        intent: 'default',
        colorScheme: 'blue',
        className: 'bg-blue-600 hover:bg-blue-500',
      },
    ],
    defaultVariants: {
      intent: 'default',
      size: 'default',
      colorScheme: 'default',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, colorScheme, children, ...props }, ref) => {
    return (
      <button className={buttonVariants({ intent, size, colorScheme, className })} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
