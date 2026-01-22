/**
 * USD/TRY Exchange Rate API
 * Multi-source strategy: fawazahmed0 currency API with fallback
 */

import { NextResponse } from 'next/server';

// ISR: 5 dakikada bir yeniden doğrula
export const revalidate = 300;

// Exchange API - Multi-source fallback strategy
const EXCHANGE_SOURCES = [
  {
    name: 'fawazahmed0-cdn',
    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    parse: (data: any) => data?.usd?.try,
  },
  {
    name: 'fawazahmed0-pages',
    url: 'https://latest.currency-api.pages.dev/v1/currencies/usd.json',
    parse: (data: any) => data?.usd?.try,
  },
  {
    name: 'fawazahmed0-dated',
    url: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${year}-${month}-${day}/v1/currencies/usd.json`;
    },
    parse: (data: any) => data?.usd?.try,
  },
];

const FALLBACK_RATE = 34.50; // Manuel fallback

export async function GET() {
  try {
    // Multi-source fallback strategy
    for (const source of EXCHANGE_SOURCES) {
      try {
        const url = typeof source.url === 'function' ? source.url() : source.url;
        const response = await fetch(url, {
          next: { revalidate: 300 }, // 5 dakika cache
        });

        if (response.ok) {
          const data = await response.json();
          const rate = source.parse(data);

          if (rate && typeof rate === 'number' && rate > 0) {
            console.log(`✅ Exchange rate fetched from ${source.name}: ${rate}`);
            return NextResponse.json({
              rate,
              source: source.name,
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (error) {
        console.warn(`⚠️ ${source.name} failed, trying next source...`);
        continue;
      }
    }

    // Tüm kaynaklar başarısız, fallback kullan
    console.warn('⚠️ All exchange sources failed, using fallback rate');
    return NextResponse.json({
      rate: FALLBACK_RATE,
      source: 'fallback',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Exchange rate API error:', error);
    return NextResponse.json(
      {
        rate: FALLBACK_RATE,
        source: 'fallback-error',
        timestamp: new Date().toISOString(),
      },
      { status: 200 } // 200 döndür ki frontend çalışmaya devam etsin
    );
  }
}
