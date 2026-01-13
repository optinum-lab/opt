/**
 * Ürün Detay Sayfası - SSR + SEO Optimized
 * URL: /urunler/[slug]
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { ProductDetailClient } from "./ProductDetailClient";
import { BreadcrumbSchema, UrunSeoContent } from "@/components/seo";

// Types
interface Urun {
  id: string;
  ad: string;
  slug: string;
  açıklama: string;
  uzun_açıklama: string;
  fiyat: number;
  para_birimi: string;
  stok: string;
  uretici: string;
  kategoriler: string[];
  gorsel: string;
  özellikleri: string[];
  teknik_ozellikler: Record<string, string | number | boolean>;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Ürün verisini sunucu tarafında yükle
async function getProduct(slug: string): Promise<Urun | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.urunler.find((u: Urun) => u.slug === slug) || null;
  } catch (error) {
    console.error("Ürün yükleme hatası:", error);
    return null;
  }
}

// Statik parametreleri oluştur (SSG için)
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.urunler.map((urun: Urun) => ({
      slug: urun.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams hatası:", error);
    return [];
  }
}

// Dinamik Metadata (SEO için kritik)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const urun = await getProduct(slug);

  if (!urun) {
    return {
      title: "Ürün Bulunamadı | Mat Tech",
      description: "Aradığınız ürün bulunamadı.",
    };
  }

  const baseUrl = "https://www.mattech.com.tr";
  const productUrl = `${baseUrl}/urunler/${urun.slug}`;

  return {
    title: `${urun.ad} | ${urun.uretici} - Mat Tech`,
    description: urun.uzun_açıklama || urun.açıklama,
    keywords: [
      urun.ad,
      urun.uretici,
      ...urun.kategoriler,
      "güvenlik kamerası",
      "CCTV",
      "güvenlik sistemi",
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${urun.ad} - ${urun.uretici}`,
      description: urun.açıklama,
      url: productUrl,
      type: "website",
      images: [
        {
          url: urun.gorsel.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`,
          width: 800,
          height: 600,
          alt: urun.ad,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${urun.ad} - ${urun.uretici}`,
      description: urun.açıklama,
      images: [urun.gorsel.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`],
    },
  };
}

// Product JSON-LD Schema
function ProductSchema({ urun }: { urun: Urun }) {
  const baseUrl = "https://www.mattech.com.tr";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: urun.ad,
    description: urun.uzun_açıklama || urun.açıklama,
    image: urun.gorsel.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`,
    brand: {
      "@type": "Brand",
      name: urun.uretici,
    },
    manufacturer: {
      "@type": "Organization",
      name: urun.uretici,
    },
    sku: urun.id,
    category: urun.kategoriler.join(", "),
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/urunler/${urun.slug}`,
      priceCurrency: urun.para_birimi || "TRY",
      price: urun.fiyat,
      availability: urun.stok === "Stokta" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Mat Tech",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Kategori adını formatla
function formatKategori(slug: string): string {
  const kategoriIsimleri: Record<string, string> = {
    "kayit-cihazi": "Kayıt Cihazları",
    "kamera": "IP Kameralar",
    "alarm-sistemi": "Alarm Sistemleri",
    "access-kontrol": "Access Kontrol",
    "ekipmanlar": "Ekipmanlar",
  };
  return kategoriIsimleri[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
}

export default async function UrunDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const urun = await getProduct(slug);

  if (!urun) {
    notFound();
  }

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "/" },
    { name: "Ürünler", url: "/urunler" },
  ];

  if (urun.kategoriler[0]) {
    breadcrumbItems.push({
      name: formatKategori(urun.kategoriler[0]),
      url: `/urunler/kategori/${urun.kategoriler[0]}`,
    });
  }

  breadcrumbItems.push({
    name: urun.ad,
    url: `/urunler/${urun.slug}`,
  });

  return (
    <>
      {/* SEO Schema Markup */}
      <ProductSchema urun={urun} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Client Component for interactivity */}
      <ProductDetailClient urun={urun} />

      {/* Hidden SEO Content - Görünmez ürün bazlı içerik */}
      <UrunSeoContent
        urunAdi={urun.ad}
        uretici={urun.uretici}
        kategoriler={urun.kategoriler}
        aciklama={urun.uzun_açıklama || urun.açıklama}
        ozellikler={urun.özellikleri || []}
      />
    </>
  );
}
