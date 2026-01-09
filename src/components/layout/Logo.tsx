/**
 * Logo Component
 * Brand logo with text
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

// ============================================
// Types
// ============================================

interface LogoProps {
  className?: string;
  showText?: boolean;
}

// ============================================
// Component
// ============================================

export function Logo({ className, showText = true }: LogoProps) {
  const { resolvedTheme, mounted } = useTheme();
  
  // Tema yüklenmeden önce varsayılan logo göster
  const logoSrc = mounted && resolvedTheme === 'light' ? '/logo-light.png' : '/logo.png';

  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 group',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-lg',
        className
      )}
      aria-label="Optinum Güvenlik - Ana Sayfa"
    >
      {/* Logo Image */}
      <Image
        src={logoSrc}
        alt="Optinum Güvenlik Logo"
        width={showText ? 180 : 40}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  );
}
