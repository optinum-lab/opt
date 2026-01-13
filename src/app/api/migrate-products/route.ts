/**
 * Ürün Migration API
 * products.json -> Supabase
 * Sadece bir kez çalıştırılacak
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Supabase client (service role gerekebilir, anon key ile deneyelim)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // JSON dosyasını oku
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'products.json bulunamadı' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!data.urunler || !Array.isArray(data.urunler)) {
      return NextResponse.json({ error: 'Geçersiz JSON formatı' }, { status: 400 });
    }

    const urunler = data.urunler;
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Batch halinde ekle (50'lik gruplar)
    const batchSize = 50;

    for (let i = 0; i < urunler.length; i += batchSize) {
      const batch = urunler.slice(i, i + batchSize);
      
      const mappedBatch = batch.map((urun: any) => ({
        ad: urun.ad,
        slug: urun.slug,
        kategoriler: urun.kategoriler || [],
        uretici: urun.uretici || null,
        gorsel: urun.gorsel || null,
        fiyat: urun.fiyat || null,
        para_birimi: 'USD', // Artık USD kullanıyoruz
        stok_durumu: urun.stok_durumu || 'stokta',
        kisa_aciklama: urun.ozellikleri?.[0] || null,
        uzun_aciklama: urun.ozellikleri?.slice(0, 3).join(' ') || null,
        ozellikleri: urun.ozellikleri || [],
        teknik_ozellikler: urun.teknik_ozellikler || {},
        aktif: true,
        one_cikan: false,
        sira: i,
      }));

      const { data: inserted, error } = await supabase
        .from('urunler')
        .upsert(mappedBatch, { onConflict: 'slug' })
        .select('id');

      if (error) {
        errorCount += batch.length;
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        successCount += inserted?.length || 0;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration tamamlandı`,
      total: urunler.length,
      successCount,
      errorCount,
      errors: errors.slice(0, 5), // İlk 5 hatayı göster
    });

  } catch (error) {
    console.error('Migration hatası:', error);
    return NextResponse.json(
      { error: 'Migration başarısız', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint. POST isteği gönderin.',
    usage: 'POST /api/migrate-products',
  });
}
