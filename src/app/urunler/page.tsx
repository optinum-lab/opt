/**
 * Tüm Ürünler Sayfası
 * URL: /urunler
 */

import { UrunListesi } from "@/components/sections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Güvenlik Ürünleri | Kamera, Alarm, Bariyer, Turnike Sistemleri",
  description: "Dahua ve Hikvision güvenlik kamerası, yangın alarm sistemi, hırsız alarmı, bariyer, turnike ve geçiş kontrol ürünleri. İstanbul'da ücretsiz keşif ve profesyonel kurulum.",
  alternates: {
    canonical: 'https://www.mattech.com.tr/urunler',
  },
  openGraph: {
    title: 'Güvenlik Ürünleri Kataloğu | Mat Tech',
    description: 'Profesyonel güvenlik sistemleri: Kamera, alarm, bariyer, turnike. Dahua & Hikvision yetkili bayi.',
    url: 'https://www.mattech.com.tr/urunler',
    type: 'website',
  },
};

export default function UrunlerPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Tüm Ürünler Listesi */}
      <UrunListesi titleOverride="Ürün Kataloğu" />
    </main>
  );
}
