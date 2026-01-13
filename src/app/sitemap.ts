import { MetadataRoute } from 'next';
import productsData from '@/../../public/data/products.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mattech.com.tr';
  
  // Ana sayfalar
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

  // Kategori sayfaları
  const categories = [
    'kayit-cihazi',
    'kamera',
    'alarm-sistemi',
    'access-kontrol',
    'ekipmanlar',
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/urunler/kategori/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Ürün detay sayfaları
  const productPages = productsData.urunler.map((product: any) => ({
    url: `${baseUrl}/urunler/detail/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Yasal sayfalar
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
