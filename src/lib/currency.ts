/**
 * Döviz Kuru Servisi
 * Supabase + GenelPara API
 */

import { createClient } from '@supabase/supabase-js';

export interface ExchangeRate {
  usd: {
    alis: number;
    satis: number;
    degisim: number;
  };
  lastUpdate: string;
}

// Supabase client (server-side)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Supabase'den kuru oku
 */
export async function getExchangeRateFromDB(): Promise<ExchangeRate | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .eq('currency', 'USD')
      .single();

    if (error || !data) return null;

    return {
      usd: {
        alis: parseFloat(data.alis),
        satis: parseFloat(data.satis),
        degisim: parseFloat(data.degisim || 0),
      },
      lastUpdate: data.updated_at,
    };
  } catch {
    return null;
  }
}

/**
 * GenelPara API'den kuru çek ve Supabase'e kaydet
 */
export async function updateExchangeRate(): Promise<ExchangeRate> {
  const supabase = getSupabase();
  
  try {
    const response = await fetch(
      'https://api.genelpara.com/json/?list=doviz&sembol=USD',
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('API yanıt vermedi');

    const data = await response.json();
    
    if (!data.USD) throw new Error('USD verisi bulunamadı');

    const rate = {
      alis: parseFloat(data.USD.alis) || 34.50,
      satis: parseFloat(data.USD.satis) || 34.60,
      degisim: parseFloat(data.USD.degisim) || 0,
    };

    // Supabase'e kaydet
    await supabase
      .from('exchange_rates')
      .upsert({
        currency: 'USD',
        alis: rate.alis,
        satis: rate.satis,
        degisim: rate.degisim,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'currency' });

    return {
      usd: rate,
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Döviz kuru güncelleme hatası:', error);
    
    // Hata durumunda DB'den oku
    const dbRate = await getExchangeRateFromDB();
    if (dbRate) return dbRate;
    
    // Fallback
    return {
      usd: { alis: 34.50, satis: 34.60, degisim: 0 },
      lastUpdate: new Date().toISOString(),
    };
  }
}

/**
 * Kuru getir (önce DB, sonra API)
 */
export async function getUSDRate(): Promise<ExchangeRate> {
  // Önce DB'den kontrol et
  const dbRate = await getExchangeRateFromDB();
  
  if (dbRate) {
    // 5 dakikadan eski mi?
    const lastUpdate = new Date(dbRate.lastUpdate).getTime();
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (now - lastUpdate < fiveMinutes) {
      return dbRate;
    }
  }
  
  // Güncelle ve döndür
  return updateExchangeRate();
}

/**
 * USD'yi TL'ye çevir
 */
export function convertUSDtoTRY(usdAmount: number, rate: number): number {
  return Math.round(usdAmount * rate * 100) / 100;
}

/**
 * Fiyatı formatla
 */
export function formatPrice(amount: number, currency: 'USD' | 'TRY' = 'TRY'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Her iki para biriminde fiyat
 */
export function formatDualPrice(usdAmount: number, usdRate: number): {
  usd: string;
  try: string;
  tryRaw: number;
} {
  const tryAmount = convertUSDtoTRY(usdAmount, usdRate);
  return {
    usd: formatPrice(usdAmount, 'USD'),
    try: formatPrice(tryAmount, 'TRY'),
    tryRaw: tryAmount,
  };
}
