/**
 * Container Component
 * Responsive max-width container for page sections
 */

import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
}

// ============================================
// Styles
// ============================================

const sizeStyles = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

// ============================================
// Component
// ============================================

export function Container({
  children,
  className,
  size = 'xl',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}
