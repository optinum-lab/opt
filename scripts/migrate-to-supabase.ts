/**
 * JSON'dan Supabase'e Ürün Migration Script
 * Kullanım: npx ts-node scripts/migrate-to-supabase.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// .env.local dosyasını yükle
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key gerekli

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY .env.local dosyasında tanımlanmalı');
  console.log('Service role key Supabase dashboard > Settings > API > service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface JsonUrun {
  id: number;
  ad: string;
  slug: string;
  kategoriler: string[];
  uretici: string;
  gorsel: string;
  fiyat: number;
  paraBirimi: string;
  stok_durumu: string;
  ozellikleri: string[];
  teknik_ozellikler: Record<string, any>;
}

interface JsonData {
  kategoriler: Array<{ id: number; ad: string; slug: string }>;
  urunler: JsonUrun[];
}

async function migrate() {
  console.log('🚀 Migration başlatılıyor...\n');

  // JSON dosyasını oku
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
  
  if (!fs.existsSync(filePath)) {
    console.error('❌ products.json dosyası bulunamadı:', filePath);
    process.exit(1);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data: JsonData = JSON.parse(fileContents);

  console.log(`📦 ${data.urunler.length} ürün bulundu\n`);

  // Batch halinde ekle (50'lik gruplar)
  const batchSize = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < data.urunler.length; i += batchSize) {
    const batch = data.urunler.slice(i, i + batchSize);
    
    const mappedBatch = batch.map(urun => ({
      ad: urun.ad,
      slug: urun.slug,
      kategoriler: urun.kategoriler || [],
      uretici: urun.uretici,
      gorsel: urun.gorsel,
      fiyat: urun.fiyat,
      para_birimi: urun.paraBirimi || 'TRY',
      stok_durumu: urun.stok_durumu || 'stokta',
      ozellikleri: urun.ozellikleri || [],
      teknik_ozellikler: urun.teknik_ozellikler || {},
      aktif: true,
      one_cikan: false,
    }));

    const { data: inserted, error } = await supabase
      .from('urunler')
      .insert(mappedBatch)
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
    console.log('Şimdi JSON dosyasını silebilirsiniz.');
  }
}

migrate().catch(console.error);
