'use client';

/**
 * Fiyat Gösterim Bileşeni
 * USD ve TL fiyatlarını gösterir
 */

import { useExchangeRate } from '@/lib/useExchangeRate';

interface PriceDisplayProps {
  usdPrice: number;
  showBoth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({ 
  usdPrice, 
  showBoth = true, 
  size = 'md',
  className = '' 
}: PriceDisplayProps) {
  const { convertToTRY, formatUSD, formatTRY, loading } = useExchangeRate();
  
  const tryPrice = convertToTRY(usdPrice);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-semibold',
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-5 bg-neutral-200 dark:bg-white/10 rounded w-20"></div>
      </div>
    );
  }

  if (!showBoth) {
    return (
      <span className={`text-red-500 font-semibold ${sizeClasses[size]} ${className}`}>
        {formatTRY(tryPrice)}
      </span>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`text-red-500 font-semibold ${sizeClasses[size]}`}>
        {formatTRY(tryPrice)}
      </span>
      <span className="text-xs text-foreground-muted">
        ({formatUSD(usdPrice)})
      </span>
    </div>
  );
}

/**
 * Kompakt fiyat gösterimi (tek satır)
 */
export function PriceDisplayInline({ 
  usdPrice, 
  className = '' 
}: { usdPrice: number; className?: string }) {
  const { convertToTRY, formatUSD, formatTRY, loading } = useExchangeRate();
  
  const tryPrice = convertToTRY(usdPrice);
  
  if (loading) {
    return <span className="animate-pulse">...</span>;
  }

  return (
    <span className={className}>
      <span className="text-red-500 font-semibold">{formatTRY(tryPrice)}</span>
      <span className="text-foreground-muted text-sm ml-1">({formatUSD(usdPrice)})</span>
    </span>
  );
}
