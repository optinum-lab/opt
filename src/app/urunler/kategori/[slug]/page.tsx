/**
 * Kategori Sayfası - Dinamik Routing
 * URL: /urunler/kategori/[slug]
 */

import { notFound } from "next/navigation";
import { UrunListesi } from "@/components/sections";
import { Container } from "@/components/ui";
import { Metadata } from "next";
import { KategoriSeoContent } from "@/components/seo";

interface KategoriPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Türkçe kategori adları - SEO optimize
const KATEGORI_ISIMLERI: Record<string, string> = {
  "kayit-cihazi": "DVR ve NVR Kayıt Cihazları",
  "kamera": "Güvenlik Kameraları",
  "alarm-sistemi": "Yangın ve Hırsız Alarm Sistemleri",
  "access-kontrol": "Geçiş Kontrol ve Turnike Sistemleri",
  "ekipmanlar": "Bariyer ve Güvenlik Ekipmanları",
};

const KATEGORI_ACIKLAMALARI: Record<string, string> = {
  "kayit-cihazi": "Dahua ve Hikvision DVR, NVR, XVR kayıt cihazları. 4K destekli, uzaktan erişimli profesyonel video kayıt çözümleri.",
  "kamera": "IP kamera, dome kamera, bullet kamera, PTZ kamera. 4K çözünürlük, gece görüşü, yapay zeka destekli güvenlik kameraları.",
  "alarm-sistemi": "Yangın alarm paneli, duman dedektörü, hırsız alarm sistemi, hareket sensörü. Ev ve işyeri için 7/24 koruma.",
  "access-kontrol": "Turnike, kartlı geçiş, parmak izi okuyucu, yüz tanıma sistemi, PDKS. Profesyonel geçiş kontrol çözümleri.",
  "ekipmanlar": "Otopark bariyeri, mantar bariyer, ağ switch, PoE adaptör, kamera montaj aksesuarları ve kablolar.",
};

export async function generateMetadata({
  params,
}: KategoriPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ad = KATEGORI_ISIMLERI[slug];
  const aciklama = KATEGORI_ACIKLAMALARI[slug];

  if (!ad) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  return {
    title: `${ad} | Mat Tech Güvenlik Sistemleri İstanbul`,
    description: `${aciklama} Mat Tech - Dahua & Hikvision yetkili bayi. İstanbul'da ücretsiz keşif ve profesyonel kurulum.`,
    alternates: {
      canonical: `https://www.mattech.com.tr/urunler/kategori/${slug}`,
    },
    openGraph: {
      title: `${ad} | Mat Tech`,
      description: aciklama,
      url: `https://www.mattech.com.tr/urunler/kategori/${slug}`,
      type: 'website',
    },
  };
}

export default async function KategoriPage({ params }: KategoriPageProps) {
  const { slug } = await params;

  // Geçerli kategori kontrolü
  if (!KATEGORI_ISIMLERI[slug]) {
    notFound();
  }

  const kategoriAdi = KATEGORI_ISIMLERI[slug];

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-card-border">
        <Container>
          <nav className="py-4 text-sm">
            <ul className="flex items-center gap-2">
              <li>
                <a href="/urunler" className="text-foreground-secondary hover:text-red-500 transition-colors">
                  Ürünler
                </a>
              </li>
              <li className="text-foreground-secondary">/</li>
              <li className="text-foreground font-semibold">{kategoriAdi}</li>
            </ul>
          </nav>
        </Container>
      </div>

      {/* Kategori Başlığı */}
      <div className="bg-card border-b border-card-border py-8">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {kategoriAdi}
          </h1>
          <p className="text-foreground-secondary">
            {KATEGORI_ACIKLAMALARI[slug]}
          </p>
        </Container>
      </div>

      {/* Ürün Listesi */}
      <UrunListesi kategoriSlug={slug} />

      {/* Hidden SEO Content - Görünmez kategori bazlı içerik */}
      <KategoriSeoContent kategoriSlug={slug} kategoriAdi={kategoriAdi} />
    </main>
  );
}
