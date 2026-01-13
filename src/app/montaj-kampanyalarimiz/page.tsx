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

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Hero Section - Eye-catching */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Sınırlı Süreli Kampanyalar
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Montaj <span className="text-red-500">Kampanyalarımız</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Profesyonel kurulum dahil güvenlik kamera paketleri. 
              <span className="text-red-500 font-semibold">Ücretsiz keşif</span> ve 
              <span className="text-red-500 font-semibold"> 2 yıl garanti</span> avantajıyla.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ücretsiz Keşif
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2 Yıl Garanti
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                7/24 Destek
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Montaj Dahil
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kampanya Grid */}
      <KampanyaGrid kampanyalar={kampanyaListesi} />
    </main>
  );
}
