/**
 * Product Image Downloader
 * Mevcut products.json'daki URL'lerden resimleri lokal'e indir
 */

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

interface Product {
  id: number;
  ad: string;
  slug: string;
  kategoriler: string[];
  uretici: string;
  gorsel: string;
  gorsel_local?: string;
  fiyat: number;
  para_birimi: string;
  kısa_açıklama: string;
  uzun_açıklama: string;
  özellikleri: string[];
  teknik_ozellikler: Record<string, string>;
  stok_durumu: string;
}

interface UrunVeritabani {
  kategoriler: Array<{ id: number; ad: string; slug: string }>;
  urunler: Product[];
}

async function downloadImage(imageUrl: string, filename: string): Promise<string> {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'products');
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filepath = path.join(dir, filename);

    // Eğer dosya zaten varsa, skip et
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Mevcut: ${filename}`);
      return `/images/products/${filename}`;
    }

    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      maxRedirects: 5,
    });

    await pipeline(response.data, createWriteStream(filepath));
    console.log(`✅ İndirildi: ${filename}`);
    return `/images/products/${filename}`;
  } catch (error) {
    console.error(`❌ Hata ${filename}:`, error instanceof Error ? error.message : error);
    return imageUrl; // Fallback to original URL
  }
}

async function downloadAllProductImages(): Promise<void> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ products.json bulunamadı!');
      return;
    }

    const data: UrunVeritabani = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`🚀 ${data.urunler.length} ürün resmi indiriliyor...\n`);

    for (let i = 0; i < data.urunler.length; i++) {
      const product = data.urunler[i];
      if (product.gorsel && !product.gorsel.startsWith('/')) {
        const filename = `${product.slug}.jpg`;
        const localPath = await downloadImage(product.gorsel, filename);
        product.gorsel = localPath;
        
        // Her 3 ürün sonra rate limit
        if ((i + 1) % 3 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    // Güncellenmiş JSON'u kaydet
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`\n✅ Tüm görseller indirildi ve products.json güncellendi!`);
    console.log(`📊 Toplam ürün: ${data.urunler.length}`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

downloadAllProductImages();
