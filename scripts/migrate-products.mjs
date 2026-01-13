/**
 * Ürün Migration Script
 * Node.js ile çalıştır: node scripts/migrate-products.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// .env.local yükle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL veya Key bulunamadı!');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.log('Key:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Migration başlatılıyor...\n');

  // JSON dosyasını oku
  const filePath = path.join(__dirname, '..', 'public', 'data', 'products.json');
  
  if (!fs.existsSync(filePath)) {
    console.error('❌ products.json bulunamadı:', filePath);
    process.exit(1);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  if (!data.urunler) {
    console.error('❌ JSON içinde urunler bulunamadı');
    process.exit(1);
  }

  console.log(`📦 ${data.urunler.length} ürün bulundu\n`);

  // Batch halinde ekle
  const batchSize = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < data.urunler.length; i += batchSize) {
    const batch = data.urunler.slice(i, i + batchSize);
    
    const mappedBatch = batch.map((urun, idx) => ({
      ad: urun.ad,
      slug: urun.slug,
      kategoriler: urun.kategoriler || [],
      uretici: urun.uretici || null,
      gorsel: urun.gorsel || null,
      fiyat: urun.fiyat || null,
      para_birimi: 'USD',
      stok_durumu: urun.stok_durumu || 'stokta',
      kisa_aciklama: urun.ozellikleri?.[0]?.substring(0, 500) || null,
      uzun_aciklama: urun.ozellikleri?.slice(0, 3).join(' ').substring(0, 2000) || null,
      ozellikleri: urun.ozellikleri || [],
      teknik_ozellikler: urun.teknik_ozellikler || {},
      aktif: true,
      one_cikan: false,
      sira: i + idx,
    }));

    const { data: inserted, error } = await supabase
      .from('urunler')
      .upsert(mappedBatch, { onConflict: 'slug' })
      .select('id');

    if (error) {
      console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} hatası:`, error.message);
      errorCount += batch.length;
    } else {
      successCount += inserted?.length || 0;
      console.log(`✅ Batch ${Math.floor(i / batchSize) + 1}: ${inserted?.length || 0} ürün eklendi`);
    }
  }

  console.log('\n========================================');
  console.log(`✅ Başarılı: ${successCount} ürün`);
  console.log(`❌ Hatalı: ${errorCount} ürün`);
  console.log('========================================\n');
  
  if (successCount > 0) {
    console.log('🎉 Migration tamamlandı!');
  }
}

migrate().catch(console.error);
