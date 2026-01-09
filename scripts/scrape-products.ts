/**
 * Product Scraper Script
 * Dahua TR'den ürünleri indir ve lokal resimleri kaydet
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const DOMAIN = 'https://dahua-tr.com';
const PRODUCT_CATEGORIES = [
  'kayit-cihazi',
  'kamera',
  'alarm-sistemi',
  'access-kontrol',
  'ekipmanlar',
];

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

interface ScrapedData {
  kategoriler: Array<{ id: number; ad: string; slug: string }>;
  urunler: Product[];
}

// Yardımcı Fonksiyonlar
async function downloadImage(imageUrl: string, filename: string): Promise<string> {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'products');
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filepath = path.join(dir, filename);

    // Eğer dosya zaten varsa, skip et
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipped (exists): ${filename}`);
      return `/images/products/${filename}`;
    }

    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    await pipeline(response.data, createWriteStream(filepath));
    console.log(`✅ Downloaded: ${filename}`);
    return `/images/products/${filename}`;
  } catch (error) {
    console.error(`❌ Failed to download ${filename}:`, error instanceof Error ? error.message : error);
    return imageUrl; // Fallback to original URL
  }
}

async function scrapeProductList(categorySlug: string): Promise<Product[]> {
  try {
    const url = `${DOMAIN}/urun-kategorisi/${categorySlug}/`;
    console.log(`📥 Scraping: ${url}`);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const products: Product[] = [];
    let productId = 1;

    // Ürün kartlarını bul
    $('.product-item, .product-card, [data-product-id]').each((index, element) => {
      try {
        const $el = $(element);
        
        // Ürün adı
        const name = $el.find('.product-title, h3, .product-name').text().trim();
        if (!name) return;

        // Ürün resmi
        const imageUrl = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');
        
        // Fiyat
        const priceText = $el.find('.price, .product-price, [class*="fiyat"]').text().match(/\d+[.,]\d+/)?.[0] || '0';
        const price = parseFloat(priceText.replace(',', '.'));

        // Slug oluştur
        const slug = `dahua-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '')}`;

        if (name && imageUrl) {
          const imageFilename = `${slug}.jpg`;
          
          products.push({
            id: productId++,
            ad: name,
            slug: slug,
            kategoriler: [categorySlug],
            uretici: 'Dahua',
            gorsel: imageUrl,
            gorsel_local: imageFilename,
            fiyat: price || 0,
            para_birimi: 'TRY',
            kısa_açıklama: name,
            uzun_açıklama: `${name} - Dahua profesyonel güvenlik çözümü`,
            özellikleri: ['Dahua mühendisliği', 'Türkiye garantisi'],
            teknik_ozellikler: {
              model: name,
              uretici: 'Dahua',
            },
            stok_durumu: 'Uygun',
          });
        }
      } catch (e) {
        console.warn('Ürün parse hatası:', e);
      }
    });

    console.log(`✨ ${products.length} ürün bulundu: ${categorySlug}`);
    return products;
  } catch (error) {
    console.error(`❌ Scraping failed for ${categorySlug}:`, error instanceof Error ? error.message : error);
    return [];
  }
}

async function scrapeAllProducts(): Promise<ScrapedData> {
  console.log('🚀 Dahua TR Ürün Scraper başlıyor...\n');

  const allProducts: Product[] = [];
  let currentId = 1;

  // Her kategori için ürünleri çek
  for (const categorySlug of PRODUCT_CATEGORIES) {
    const products = await scrapeProductList(categorySlug);
    
    // ID'leri güncelle
    products.forEach((p) => {
      p.id = currentId++;
    });

    allProducts.push(...products);
    
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Resimleri indir
  console.log(`\n📸 ${allProducts.length} ürün resmi indiriliyor...\n`);
  
  for (const product of allProducts) {
    if (product.gorsel) {
      const filename = product.gorsel_local || `${product.slug}.jpg`;
      const localPath = await downloadImage(product.gorsel, filename);
      product.gorsel_local = localPath;
    }
  }

  const scrapedData: ScrapedData = {
    kategoriler: PRODUCT_CATEGORIES.map((slug, idx) => ({
      id: idx + 1,
      ad: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      slug,
    })),
    urunler: allProducts,
  };

  return scrapedData;
}

async function saveData(data: ScrapedData): Promise<void> {
  const outputPath = path.join(process.cwd(), 'public', 'data', 'products.json');
  
  // Klasörü oluştur
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // JSON'u kaydet
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n💾 Veriler kaydedildi: ${outputPath}`);
  console.log(`📊 Toplam ürün: ${data.urunler.length}`);
}

async function main(): Promise<void> {
  try {
    const data = await scrapeAllProducts();
    await saveData(data);
    console.log('\n✅ Scraping tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

main();
