/**
 * Input Component
 * Form input with various states and icons
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

// ============================================
// Styles
// ============================================

const inputStyles = `
  w-full px-4 py-3
  bg-background-secondary
  border border-card-border
  rounded-xl
  text-foreground
  placeholder:text-foreground-muted
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// ============================================
// Component
// ============================================

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputStyles,
              icon && 'pl-12',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
