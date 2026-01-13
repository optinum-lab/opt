'use client';

/**
 * Döviz Kuru Hook
 * Client-side Supabase'den kur okuma
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ExchangeRateContextType {
  usdRate: number;
  loading: boolean;
  lastUpdate: string | null;
  convertToTRY: (usd: number) => number;
  formatUSD: (amount: number) => string;
  formatTRY: (amount: number) => string;
}

const ExchangeRateContext = createContext<ExchangeRateContextType | null>(null);

export function ExchangeRateProvider({ children }: { children: ReactNode }) {
  const [usdRate, setUsdRate] = useState<number>(34.50);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('exchange_rates')
          .select('satis, updated_at')
          .eq('currency', 'USD')
          .single();

        if (!error && data) {
          setUsdRate(parseFloat(data.satis));
          setLastUpdate(new Date(data.updated_at).toLocaleTimeString('tr-TR'));
        }
      } catch (error) {
        console.error('Döviz kuru çekilemedi:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
    
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToTRY = (usd: number) => Math.round(usd * usdRate * 100) / 100;
  
  const formatUSD = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  
  const formatTRY = (amount: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

  return (
    <ExchangeRateContext.Provider value={{
      usdRate,
      loading,
      lastUpdate,
      convertToTRY,
      formatUSD,
      formatTRY,
    }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRate() {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error('useExchangeRate must be used within ExchangeRateProvider');
  }
  return context;
}
