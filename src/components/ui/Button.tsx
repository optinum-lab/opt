/**
 * Button Component
 * Reusable button with multiple variants and states
 */

'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { buttonHover } from '@/lib/animations';

// ============================================
// Types
// ============================================

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

// ============================================
// Styles
// ============================================

const baseStyles = `
  inline-flex items-center justify-center
  font-semibold rounded-full
  transition-colors duration-200
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
  disabled:pointer-events-none disabled:opacity-50
`;

const variants = {
  primary: `
    bg-primary text-white
    hover:bg-primary-hover
    dark:bg-primary dark:hover:bg-primary-hover
  `,
  secondary: `
    bg-foreground text-background
    hover:bg-foreground/90
    dark:bg-foreground dark:text-background
  `,
  outline: `
    border-2 border-foreground/20 text-foreground
    hover:bg-foreground/5 hover:border-foreground/40
    dark:border-foreground/20 dark:hover:border-foreground/40
  `,
  ghost: `
    text-foreground
    hover:bg-foreground/5
    dark:hover:bg-foreground/10
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
};

// ============================================
// Component
// ============================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
