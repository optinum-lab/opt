/**
 * Döviz Kuru API Route
 * GenelPara API -> Supabase
 */

import { NextResponse } from 'next/server';
import { getUSDRate, updateExchangeRate } from '@/lib/currency';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rateData = await getUSDRate();
    
    return NextResponse.json({
      rate: rateData.usd.satis,
      alis: rateData.usd.alis,
      satis: rateData.usd.satis,
      degisim: rateData.usd.degisim,
      lastUpdate: rateData.lastUpdate,
    });
  } catch (error) {
    console.error('Exchange rate API error:', error);
    return NextResponse.json(
      { error: 'Döviz kuru alınamadı', rate: 34.50 },
      { status: 500 }
    );
  }
}

// Manuel güncelleme için POST endpoint
export async function POST() {
  try {
    const rateData = await updateExchangeRate();
    
    return NextResponse.json({
      success: true,
      rate: rateData.usd.satis,
      lastUpdate: rateData.lastUpdate,
    });
  } catch (error) {
    console.error('Exchange rate update error:', error);
    return NextResponse.json(
      { error: 'Güncelleme başarısız' },
      { status: 500 }
    );
  }
}
