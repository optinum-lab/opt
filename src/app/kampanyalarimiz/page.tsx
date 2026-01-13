/**
 * Kampanyalarımız Sayfası
 * URL: /kampanyalarimiz
 * Veriler Supabase'den çekilir
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { KampanyaGrid } from "./KampanyaGrid";

export const metadata: Metadata = {
  title: "Kampanyalarımız | Güvenlik Sistemleri Fırsatları",
  description:
    "Güvenlik kamerası, alarm sistemi, bariyer ve geçiş kontrol sistemlerinde özel kampanyalar. Dahua ve Hikvision ürünlerinde en uygun fiyatlar.",
  alternates: {
    canonical: "https://www.mattech.com.tr/kampanyalarimiz",
  },
  openGraph: {
    title: "Kampanyalarımız | Mat Tech Güvenlik Sistemleri",
    description:
      "Güvenlik sistemlerinde özel fırsatlar ve kampanyalar. Profesyonel çözümler uygun fiyatlarla.",
    url: "https://www.mattech.com.tr/kampanyalarimiz",
    type: "website",
  },
  keywords: [
    "güvenlik kamerası kampanya",
    "alarm sistemi fiyat",
    "bariyer sistemi kampanya",
    "turnike sistemi fiyat",
    "dahua kampanya",
    "hikvision indirim",
  ],
};

// Varsayılan kategoriler (Supabase boşsa kullanılır)
const DEFAULT_KATEGORILER = [
  { id: 1, baslik: "Güvenlik Kamera Sistemleri", slug: "guvenlik-kameralari-ve-kamera-kayit-cihazlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/guvenlik-kameralari-ve-kamera-kayit-cihazlari", aciklama: "IP ve Analog kamera sistemleri" },
  { id: 2, baslik: "Otopark Bariyeri", slug: "otopark-bariyeri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/otopark-bariyeri", aciklama: "Otomatik bariyer sistemleri" },
  { id: 3, baslik: "Plaka Tanıma Sistemleri", slug: "plaka-tanima-sistemleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/plaka-tanima-sistemleri", aciklama: "LPR ve ANPR sistemleri" },
  { id: 4, baslik: "Otomatik Kapı Motorları", slug: "kayar-kapi-motorlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/kayar-kapi-motorlari", aciklama: "Kayar ve kanatlı kapı motorları" },
  { id: 5, baslik: "Parmak İzi Okuma Cihazları", slug: "parmak-izi-okuma-cihazlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/parmak-izi-okuma-cihazlari", aciklama: "Biyometrik geçiş sistemleri" },
  { id: 6, baslik: "Kartlı Geçiş Cihazları", slug: "kartli-gecis-cihazlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/kartli-gecis-cihazlari", aciklama: "RFID ve NFC okuyucular" },
  { id: 7, baslik: "Yüz Tanıma Cihazları", slug: "yuz-tanima-cihazlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/yuz-tanima-cihazlari", aciklama: "AI destekli yüz tanıma" },
  { id: 8, baslik: "Tripod 3 Kollu Turnikeler", slug: "tripod-3-kollu-turnikeler", gorsel: "https://www.yazilimvitrin.com/resim/kategori/tripod-3-kollu-turnikeler", aciklama: "Geçiş kontrol turnikeleri" },
  { id: 9, baslik: "Hızlı Geçiş Turnikeleri", slug: "hizli-gecis-turnikeleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/hizli-gecis-turnikeleri", aciklama: "Speed gate sistemleri" },
  { id: 10, baslik: "Boy Turnikeler", slug: "boy-turnikeler", gorsel: "https://www.yazilimvitrin.com/resim/kategori/boy-turnikeler", aciklama: "Tam boy döner kapı sistemleri" },
  { id: 11, baslik: "Hırsız Alarm Sistemleri", slug: "hirsiz-alarm-sistemleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/hirsiz-alarm-sistemleri", aciklama: "Kablosuz ve kablolu alarm" },
  { id: 12, baslik: "Yangın Algılama Sistemleri", slug: "yangin-algilama-ve-alarm-sistemleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/yangin-algilama-ve-alarm-sistemleri", aciklama: "Duman ve ısı dedektörleri" },
  { id: 13, baslik: "Elektromanyetik Kilitler", slug: "elektromanyetik-kilitler", gorsel: "https://www.yazilimvitrin.com/resim/kategori/elektromanyetik-kilitler", aciklama: "Manyetik kapı kilitleri" },
  { id: 14, baslik: "Access Kontrol Panelleri", slug: "access-kontrol-panelleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/access-kontrol-panelleri", aciklama: "Merkezi kontrol üniteleri" },
  { id: 15, baslik: "HGS / OGS Sistemleri", slug: "hgs-ogs-sistemleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/hgs-ogs-sistemleri", aciklama: "Otomatik geçiş sistemleri" },
  { id: 16, baslik: "Kişisel Park Bariyerleri", slug: "kisisel-park-bariyerleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/kisisel-park-bariyerleri", aciklama: "Manuel ve otomatik park koruma" },
  { id: 17, baslik: "Mantar Bariyer", slug: "mantar-bariyer", gorsel: "https://www.yazilimvitrin.com/resim/kategori/mantar-bariyer", aciklama: "Yükselen bariyer sistemleri" },
  { id: 18, baslik: "Road Blocker", slug: "road-blocker", gorsel: "https://www.yazilimvitrin.com/resim/kategori/road-blocker", aciklama: "Yüksek güvenlik bariyerleri" },
  { id: 19, baslik: "X-Ray Cihazları", slug: "x-ray-cihazlari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/x-ray-cihazlari", aciklama: "Bagaj tarama sistemleri" },
  { id: 20, baslik: "Metal Dedektörler", slug: "kapi-tipi-metal-ust-arama-dedektorleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/kapi-tipi-metal-ust-arama-dedektorleri", aciklama: "Kapı tipi metal arama" },
  { id: 21, baslik: "İnterkom Sistemleri", slug: "interkom-sistemleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/interkom-sistemleri", aciklama: "Görüntülü ve sesli interkom" },
  { id: 22, baslik: "Network Ürünleri", slug: "network-urunleri", gorsel: "https://www.yazilimvitrin.com/resim/kategori/network-urunleri", aciklama: "Switch ve ağ ekipmanları" },
  { id: 23, baslik: "Adaptörler ve Aküler", slug: "adaptorler-ve-akuler", gorsel: "https://www.yazilimvitrin.com/resim/kategori/adaptorler-ve-akuler", aciklama: "Güç kaynakları" },
  { id: 24, baslik: "UPS Güç Kaynakları", slug: "ups-guc-kaynaklari", gorsel: "https://www.yazilimvitrin.com/resim/kategori/ups-guc-kaynaklari", aciklama: "Kesintisiz güç kaynağı" },
];

export default async function KampanyalarimizPage() {
  // Supabase'den kampanyaları çek
  const supabase = await createClient();
  const { data: kampanyalar } = await supabase
    .from('kampanyalar')
    .select('*')
    .eq('aktif', true)
    .order('sira', { ascending: true });

  // Supabase'de veri varsa onu kullan, yoksa varsayılan kategorileri kullan
  const kategoriler = kampanyalar && kampanyalar.length > 0 
    ? kampanyalar 
    : DEFAULT_KATEGORILER;

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Hero Section - Minimal */}
      <section className="py-12 md:py-16 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Ürün Kategorileri
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Profesyonel güvenlik çözümleri için tüm kategorilerimizi keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* Kampanya Grid */}
      <KampanyaGrid kategoriler={kategoriler} />
    </main>
  );
}
