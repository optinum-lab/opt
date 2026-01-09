/**
 * Kategori Sayfası - Dinamik Routing
 * URL: /urunler/kategori/[slug]
 */

import { notFound } from "next/navigation";
import { UrunListesi } from "@/components/sections";
import { Container } from "@/components/ui";
import { Metadata } from "next";

interface KategoriPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Türkçe kategori adları
const KATEGORI_ISIMLERI: Record<string, string> = {
  "kayit-cihazi": "Kayıt Cihazları",
  "kamera": "IP Kameralar",
  "alarm-sistemi": "Alarm Sistemleri",
  "access-kontrol": "Access Kontrol Sistemleri",
  "ekipmanlar": "Ekipmanlar ve Aksesuarlar",
};

const KATEGORI_ACIKLAMALARI: Record<string, string> = {
  "kayit-cihazi": "Güvenlik kamera sistemleriniz için profesyonel NVR, XVR ve mobil kayıt cihazları",
  "kamera": "4K Ultra HD, termal ve PTZ özellikleriyle akıllı IP kameralar",
  "alarm-sistemi": "24/7 koruma için entegre alarm panelleri ve dedektörleri",
  "access-kontrol": "Biyometrik parmak izi, yüz tanıma ve kart sistemi çözümleri",
  "ekipmanlar": "Ağ anahtarları, monitörler, kablolar ve diğer ekipmanlar",
};

export async function generateMetadata({
  params,
}: KategoriPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ad = KATEGORI_ISIMLERI[slug];

  if (!ad) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  return {
    title: `${ad} | OptinumGuvenlik - Profesyonel Güvenlik Çözümleri`,
    description: KATEGORI_ACIKLAMALARI[slug],
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
    </main>
  );
}
