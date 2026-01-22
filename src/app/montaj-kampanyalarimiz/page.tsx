/**
 * Montaj Kampanyalarımız Sayfası
 * URL: /montaj-kampanyalarimiz
 * Komple montaj dahil kampanya paketleri
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { KampanyaGrid } from "./KampanyaGrid";

export const metadata: Metadata = {
  title: "Montaj Kampanyalarımız | Kurulum Dahil Güvenlik Paketleri",
  description:
    "Montaj dahil güvenlik kamerası paketleri. 4'lü, 8'li, 16'lı kamera sistemleri profesyonel kurulum ile. Ücretsiz keşif ve teknik destek.",
  alternates: {
    canonical: "https://www.mattech.com.tr/montaj-kampanyalarimiz",
  },
  openGraph: {
    title: "Montaj Kampanyalarımız | Mat Tech Güvenlik Sistemleri",
    description:
      "Montaj dahil güvenlik kamera paketleri. Profesyonel kurulum, garanti ve teknik destek bir arada.",
    url: "https://www.mattech.com.tr/montaj-kampanyalarimiz",
    type: "website",
    images: [
      {
        url: "https://www.mattech.com.tr/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mat Tech Montaj Dahil Güvenlik Kamerası Kampanyaları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montaj Kampanyalarımız | Mat Tech",
    description: "Montaj dahil güvenlik kamera paketleri. Profesyonel kurulum, garanti ve teknik destek.",
    images: ["https://www.mattech.com.tr/og-image.png"],
  },
  keywords: [
    "montaj dahil kamera sistemi",
    "güvenlik kamerası kurulum",
    "4 kameralı sistem montaj",
    "8 kameralı paket fiyat",
    "profesyonel kamera kurulumu",
    "güvenlik sistemi montajı",
  ],
};

// Varsayılan montaj kampanyaları (Supabase boşsa kullanılır)
const DEFAULT_KAMPANYALAR = [
  { 
    id: 1, 
    baslik: "4 Kameralı Sistem", 
    slug: "4-kamerali-sistem", 
    gorsel: null, 
    aciklama: "Ev ve küçük işletmeler için ideal",
    fiyat: "12.500 ₺",
    eski_fiyat: "15.000 ₺",
    badge: "En Popüler",
    ozellikler: ["4 Adet 2MP Kamera", "4 Kanal Kayıt Cihazı", "500GB HDD", "Montaj Dahil"],
    renk: "red"
  },
  { 
    id: 2, 
    baslik: "8 Kameralı Sistem", 
    slug: "8-kamerali-sistem", 
    gorsel: null, 
    aciklama: "Orta ölçekli işletmeler için",
    fiyat: "22.500 ₺",
    eski_fiyat: "28.000 ₺",
    badge: "Çok Satan",
    ozellikler: ["8 Adet 2MP Kamera", "8 Kanal Kayıt Cihazı", "1TB HDD", "Montaj Dahil"],
    renk: "blue"
  },
  { 
    id: 3, 
    baslik: "16 Kameralı Sistem", 
    slug: "16-kamerali-sistem", 
    gorsel: null, 
    aciklama: "Büyük işletmeler ve tesisler için",
    fiyat: "42.500 ₺",
    eski_fiyat: "52.000 ₺",
    badge: "Profesyonel",
    ozellikler: ["16 Adet 2MP Kamera", "16 Kanal Kayıt Cihazı", "2TB HDD", "Montaj Dahil"],
    renk: "green"
  },
  { 
    id: 4, 
    baslik: "4K Ultra HD Paket", 
    slug: "4k-ultra-hd-paket", 
    gorsel: null, 
    aciklama: "En yüksek görüntü kalitesi",
    fiyat: "35.000 ₺",
    eski_fiyat: "45.000 ₺",
    badge: "Premium",
    ozellikler: ["4 Adet 4K Kamera", "4K Kayıt Cihazı", "2TB HDD", "Montaj Dahil"],
    renk: "purple"
  },
  { 
    id: 5, 
    baslik: "Villa Güvenlik Paketi", 
    slug: "villa-guvenlik-paketi", 
    gorsel: null, 
    aciklama: "Villa ve müstakil evler için komple çözüm",
    fiyat: "28.500 ₺",
    eski_fiyat: "35.000 ₺",
    badge: "Özel Teklif",
    ozellikler: ["6 Adet Kamera", "İnterkom Sistemi", "Alarm Sistemi", "Montaj Dahil"],
    renk: "orange"
  },
  { 
    id: 6, 
    baslik: "Mağaza Güvenlik Paketi", 
    slug: "magaza-guvenlik-paketi", 
    gorsel: null, 
    aciklama: "Perakende ve mağazalar için özel",
    fiyat: "18.500 ₺",
    eski_fiyat: "24.000 ₺",
    badge: "İşletme",
    ozellikler: ["4 Adet Dome Kamera", "POS Entegrasyonu", "Mobil İzleme", "Montaj Dahil"],
    renk: "teal"
  },
];

export default async function KampanyalarimizPage() {
  // Supabase'den kampanyaları çek
  const supabase = await createClient();
  const { data: kampanyalar } = await supabase
    .from('kampanyalar')
    .select('*')
    .eq('aktif', true)
    .order('sira', { ascending: true });

  // Supabase'de veri varsa onu kullan, yoksa varsayılan kampanyaları kullan
  const kampanyaListesi = kampanyalar && kampanyalar.length > 0 
    ? kampanyalar 
    : DEFAULT_KAMPANYALAR;

  // ItemList JSON-LD Schema for SEO (Kampanya Listesi)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Montaj Dahil Güvenlik Kamera Kampanyaları",
    "description": "Mat Tech güvenlik sistemleri montaj dahil kampanya paketleri",
    "numberOfItems": kampanyaListesi.length,
    "itemListElement": kampanyaListesi.map((k, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.mattech.com.tr/montaj-kampanyalarimiz/${k.slug}`,
      "name": k.baslik,
      "item": {
        "@type": "Product",
        "name": k.baslik,
        "description": k.aciklama,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "TRY",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  // OfferCatalog Schema - Google için kampanya kataloğu
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Mat Tech Güvenlik Kamera Kampanyaları",
    "description": "Montaj dahil profesyonel güvenlik kamera sistemleri",
    "url": "https://www.mattech.com.tr/montaj-kampanyalarimiz",
    "numberOfItems": kampanyaListesi.length,
    "itemListElement": kampanyaListesi.map((k) => ({
      "@type": "Offer",
      "name": k.baslik,
      "description": k.aciklama,
      "url": `https://www.mattech.com.tr/montaj-kampanyalarimiz/${k.slug}`,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "mattech - Mat Tech Güvenlik Sistemleri"
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      
      <main className="min-h-screen bg-background pt-20 md:pt-24">
      {/* Hero Section - Kompakt */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5" />
        
        {/* Üst geçiş - fade in */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        
        {/* Alt geçiş - fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              Sınırlı Süreli Kampanyalar
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Montaj <span className="text-red-500">Kampanyalarımız</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Profesyonel kurulum dahil güvenlik kamera paketleri. 
              <span className="text-red-500 font-semibold"> Ücretsiz keşif</span> ve 
              <span className="text-red-500 font-semibold"> 2 yıl garanti</span> avantajıyla.
            </p>
            
            {/* Trust badges - Kompakt */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Ücretsiz Keşif
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                2 Yıl Garanti
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                7/24 Destek
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Montaj Dahil
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                KDV Dahil
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kampanya Grid */}
      <KampanyaGrid kampanyalar={kampanyaListesi} />
    </main>
    </>
  );
}
