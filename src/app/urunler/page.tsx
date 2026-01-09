/**
 * Tüm Ürünler Sayfası
 * URL: /urunler
 */

import { UrunListesi } from "@/components/sections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ürünler | OptinumGuvenlik - Profesyonel Güvenlik Çözümleri",
  description: "Dahua profesyonel güvenlik kamerası, NVR, alarm, access kontrol ve ekipmanları. Türkiye'de güvenilir güvenlik çözümleri.",
};

export default function UrunlerPage() {
  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Tüm Ürünler Listesi */}
      <UrunListesi titleOverride="Ürün Kataloğu" />
    </main>
  );
}
