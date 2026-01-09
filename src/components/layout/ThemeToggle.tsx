/**
 * Theme Toggle Component
 * Button to switch between light and dark modes
 */

'use client';

import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { Icon } from '@/components/ui';
import { cn } from '@/lib/utils';

// ============================================
// Component
// ============================================

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme, mounted } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          'p-2 rounded-full w-9 h-9',
          className
        )}
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'p-2 rounded-full',
        'text-foreground-secondary hover:text-foreground',
        'hover:bg-foreground/5',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {resolvedTheme === 'dark' ? (
          <Icon name="sun" size={20} />
        ) : (
          <Icon name="moon" size={20} />
        )}
      </motion.div>
    </motion.button>
  );
}
