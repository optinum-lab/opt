/**
 * Badge Component
 * Small label for status indicators and tags
 */

import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

// ============================================
// Styles
// ============================================

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-full
`;

const variants = {
  default: 'bg-foreground/10 text-foreground',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-accent/10 text-accent',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

// ============================================
// Component
// ============================================

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
