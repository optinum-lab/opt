/**
 * Textarea Component
 * Multi-line text input for forms
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

// ============================================
// Styles
// ============================================

const textareaStyles = `
  w-full px-4 py-3
  bg-background-secondary
  border border-card-border
  rounded-xl
  text-foreground
  placeholder:text-foreground-muted
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
  disabled:opacity-50 disabled:cursor-not-allowed
  resize-none
  min-h-[120px]
`;

// ============================================
// Component
// ============================================

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textareaStyles,
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
