/**
 * Card Component
 * Flexible card with glassmorphism and hover effects
 */

'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

// ============================================
// Types
// ============================================

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// ============================================
// Styles
// ============================================

const baseStyles = `
  rounded-2xl
  bg-card-bg
  border border-card-border
  transition-shadow duration-300
`;

const glassStyles = `
  glass-card
  border-glass-border
`;

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ============================================
// Component
// ============================================

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = true,
      glass = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={hover ? cardHover : undefined}
        initial={hover ? 'rest' : undefined}
        whileHover={hover ? 'hover' : undefined}
        className={cn(
          baseStyles,
          glass && glassStyles,
          paddingStyles[padding],
          hover && 'hover:shadow-lg dark:hover:shadow-2xl',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// ============================================
// Card Header Component
// ============================================

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

// ============================================
// Card Title Component
// ============================================

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

const CardTitle = ({ children, className, as: Component = 'h3' }: CardTitleProps) => {
  return (
    <Component className={cn('text-xl font-semibold text-foreground', className)}>
      {children}
    </Component>
  );
};

// ============================================
// Card Description Component
// ============================================

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p className={cn('text-foreground-secondary text-sm leading-relaxed', className)}>
      {children}
    </p>
  );
};

// ============================================
// Card Content Component
// ============================================

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

// ============================================
// Card Footer Component
// ============================================

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('mt-4 pt-4 border-t border-card-border', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
