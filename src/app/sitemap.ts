import { MetadataRoute } from 'next';
import { tumSluglarıGetirServer } from '@/lib/product-utils';

/**
 * Sitemap Generator
 * SEO için optimize edilmiş sitemap - Supabase Backend
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mattech.com.tr';
  
  // Ana sayfalar - Yüksek öncelikli
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Hizmet/Kategori sayfaları - SEO için önemli
  const categories = [
    { slug: 'kamera', priority: 0.9 },           // Güvenlik kamerası - ana hizmet
    { slug: 'alarm-sistemi', priority: 0.9 },    // Yangın/Hırsız alarm - ana hizmet
    { slug: 'access-kontrol', priority: 0.85 },  // Geçiş kontrol/turnike
    { slug: 'kayit-cihazi', priority: 0.85 },    // DVR/NVR
    { slug: 'ekipmanlar', priority: 0.8 },       // Bariyer ve ekipmanlar
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/urunler/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: cat.priority,
  }));

  // Ürün detay sayfaları - Supabase'den çek
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await tumSluglarıGetirServer();
    productPages = slugs.map((slug) => ({
      url: `${baseUrl}/urunler/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap ürün çekme hatası:', error);
  }

  // Yasal sayfalar - Düşük öncelik ama gerekli
  const legalPages = [
    'kvkk',
    'gizlilik-politikasi',
    'cerez-politikasi',
    'hizmet-sartlari',
    'mesafeli-satis',
    'iptal-iade',
  ];

  const legalRoutes = legalPages.map((page) => ({
    url: `${baseUrl}/yasal/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }));

  return [...routes, ...categoryPages, ...productPages, ...legalRoutes];
}
