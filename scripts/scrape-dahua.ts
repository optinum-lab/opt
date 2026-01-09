import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import https from 'https';

// SSL ayarları
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
  }
});

// Series sayfaları - her seriden ürün listesi çekilecek
const SERIES_PAGES: { [kategori: string]: string[] } = {
  'kayit-cihazi': [
    'https://www.dahuasecurity.com/products/All-Products/HDCVI-Recorders/5MP-Value1080p-Series',
    'https://www.dahuasecurity.com/products/All-Products/HDCVI-Recorders/4K-series',
    'https://www.dahuasecurity.com/products/All-Products/Network-Recorders/WizSense-Series',
    'https://www.dahuasecurity.com/products/All-Products/Network-Recorders/Lite-Series',
  ],
  'kamera': [
    'https://www.dahuasecurity.com/products/All-Products/Network-Cameras/WizSense-Series',
    'https://www.dahuasecurity.com/products/All-Products/Network-Cameras/Lite-Series',
    'https://www.dahuasecurity.com/products/All-Products/HDCVI-Cameras/Pro-Series',
    'https://www.dahuasecurity.com/products/All-Products/PTZ-Cameras/WizSense-Series',
  ],
  'alarm-sistemi': [
    'https://www.dahuasecurity.com/products/All-Products/Alarms/Wireless-Alarm',
    'https://www.dahuasecurity.com/products/All-Products/Alarms/Wired-Alarm',
  ],
  'access-kontrol': [
    'https://www.dahuasecurity.com/products/All-Products/Access-Control--Time-Attendance/Access-Control',
    'https://www.dahuasecurity.com/products/All-Products/Video-Intercoms/IP-Series',
  ],
  'ekipmanlar': [
    'https://www.dahuasecurity.com/products/All-Products/Accessories/Power',
    'https://www.dahuasecurity.com/products/All-Products/Transmission/Switches',
  ]
};

interface Urun {
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
  teknik_ozellikler: Record<string, string | number>;
  aciklama?: string;
}

// Slug oluştur
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\/\\]/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Series sayfasından ürün linklerini çek
async function scrapeProductLinksFromSeries(seriesUrl: string): Promise<string[]> {
  try {
    console.log(`  📂 Series scraping: ${seriesUrl}`);
    const response = await axiosInstance.get(seriesUrl);
    const $ = cheerio.load(response.data);
    
    const productLinks: string[] = [];
    
    // h3 içindeki ürün linkleri - format: /products/All-Products/.../MODEL
    $('h3 a[href*="/products/All-Products/"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        // URL parçalarını say - ürün linki en az 6 parça olmalı
        // /products/All-Products/HDCVI-Recorders/5MP-Value1080p-Series/XVR5232AN-I3/T
        const parts = href.split('/').filter(p => p);
        if (parts.length >= 5) {
          const fullUrl = href.startsWith('http') 
            ? href 
            : `https://www.dahuasecurity.com${href}`;
          if (!productLinks.includes(fullUrl)) {
            productLinks.push(fullUrl);
          }
        }
      }
    });
    
    console.log(`    ✅ ${productLinks.length} ürün linki bulundu`);
    return productLinks.slice(0, 3); // Her series'den max 3 ürün
  } catch (error: any) {
    console.log(`    ❌ Series hatası: ${error.message}`);
    return [];
  }
}

// Ürün detay sayfasını scrape et
async function scrapeProductDetail(url: string): Promise<Partial<Urun> | null> {
  try {
    console.log(`  📄 Detay scraping: ${url}`);
    const response = await axiosInstance.get(url);
    const $ = cheerio.load(response.data);

    // Ürün adı - h3.title
    const productName = $('h3.title').first().text().trim();
    if (!productName) {
      console.log(`  ⚠️ Ürün adı bulunamadı`);
      return null;
    }

    // Açıklama - p.text
    const description = $('p.text').first().text().trim();

    // Özellikler listesi - > ile başlayan paragraflar
    const features: string[] = [];
    $('.text-wrapper div p, .text-wrapper--spe div p').each((_, el) => {
      let text = $(el).text().trim();
      if (text && text.startsWith('>')) {
        text = text.replace(/^>\s*\*?/, '').trim();
        if (text.length > 5 && text.length < 200) {
          features.push(text);
        }
      }
    });

    // Görseller - swiper içindeki img
    let imageUrl = '';
    const mainImage = $('.swiper-slide img.prodcut-img').first().attr('src');
    if (mainImage) {
      imageUrl = mainImage;
    }
    if (!imageUrl) {
      const altImage = $('img[alt="product-img"]').first().attr('src');
      if (altImage) imageUrl = altImage;
    }

    // Teknik özellikler tablodan
    const specs: Record<string, string | number> = {};
    $('table tr').each((_, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 2) {
        const key = $(cells[0]).text().trim();
        const value = $(cells[1]).text().trim();
        if (key && value && key.length < 50 && value.length < 500) {
          const keySlug = key
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
          if (keySlug && keySlug.length > 2) {
            specs[keySlug] = value;
          }
        }
      }
    });

    console.log(`  ✅ Ürün bulundu: ${productName}`);
    return {
      ad: productName,
      slug: createSlug(productName),
      gorsel: imageUrl,
      ozellikleri: features.slice(0, 8),
      teknik_ozellikler: specs,
      aciklama: description
    };
  } catch (error: any) {
    console.log(`  ❌ Detay hatası: ${error.message}`);
    return null;
  }
}

// Görseli indir
async function downloadImage(url: string, filename: string): Promise<string> {
  try {
    if (!url || !url.startsWith('http')) {
      return '/images/products/placeholder.png';
    }

    const imagesDir = path.join(process.cwd(), 'public/images/products');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const response = await axiosInstance.get(url, { responseType: 'arraybuffer' });
    let ext = '.png';
    const urlExt = path.extname(url.split('?')[0]).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(urlExt)) {
      ext = urlExt;
    }
    
    const localPath = path.join(imagesDir, `${filename}${ext}`);
    fs.writeFileSync(localPath, response.data);
    console.log(`  📥 Görsel indirildi: ${filename}${ext}`);
    
    return `/images/products/${filename}${ext}`;
  } catch (error: any) {
    console.log(`  ⚠️ Görsel indirilemedi: ${error.message}`);
    return '/images/products/placeholder.png';
  }
}

// Ana scraping fonksiyonu
async function scrapeAllProducts() {
  console.log('🚀 Dahua ürün scraping başlıyor...\n');
  
  const products: Urun[] = [];
  let productId = 1;

  for (const [kategoriSlug, seriesUrls] of Object.entries(SERIES_PAGES)) {
    console.log(`\n📁 Kategori: ${kategoriSlug}`);
    
    for (const seriesUrl of seriesUrls) {
      // Series sayfasından ürün linklerini çek
      const productLinks = await scrapeProductLinksFromSeries(seriesUrl);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      for (const productUrl of productLinks) {
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const productData = await scrapeProductDetail(productUrl);
        
        if (productData && productData.ad) {
          // Görseli indir
          let localImage = '/images/products/placeholder.png';
          if (productData.gorsel && productData.gorsel.startsWith('http')) {
            localImage = await downloadImage(productData.gorsel, productData.slug!);
          }

          const product: Urun = {
            id: productId++,
            ad: productData.ad!,
            slug: productData.slug!,
            kategoriler: [kategoriSlug],
            uretici: 'Dahua',
            gorsel: localImage,
            fiyat: Math.floor(Math.random() * 8000) + 1000,
            paraBirimi: 'TRY',
            stok_durumu: 'stokta',
            ozellikleri: productData.ozellikleri || [],
            teknik_ozellikler: productData.teknik_ozellikler || {}
          };

          products.push(product);
          console.log(`    ✓ Ürün eklendi: ${product.ad}`);
        }
      }
    }
  }

  // JSON dosyasını oluştur
  const outputData = {
    kategoriler: [
      { id: 1, ad: "Kayıt Cihazı", slug: "kayit-cihazi" },
      { id: 2, ad: "Kamera", slug: "kamera" },
      { id: 3, ad: "Alarm Sistemi", slug: "alarm-sistemi" },
      { id: 4, ad: "Access Kontrol", slug: "access-kontrol" },
      { id: 5, ad: "Ekipmanlar", slug: "ekipmanlar" }
    ],
    urunler: products
  };

  const outputPath = path.join(process.cwd(), 'public/data/products.json');
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

  console.log(`\n✨ Scraping tamamlandı!`);
  console.log(`📊 Toplam ${products.length} ürün kaydedildi: ${outputPath}`);
}

// Çalıştır
scrapeAllProducts().catch(console.error);
