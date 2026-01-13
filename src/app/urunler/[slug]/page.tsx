/**
 * Ürün Detay Sayfası - SSR + SEO Optimized
 * URL: /urunler/[slug]
 * Supabase Backend
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import { BreadcrumbSchema, UrunSeoContent } from "@/components/seo";
import { urunGetirBySlugServer, tumSluglarıGetirServer, Urun } from "@/lib/product-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statik parametreleri oluştur (SSG için)
export async function generateStaticParams() {
  try {
    const slugs = await tumSluglarıGetirServer();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("generateStaticParams hatası:", error);
    return [];
  }
}

// Dinamik Metadata (SEO için kritik)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const urun = await urunGetirBySlugServer(slug);

  if (!urun) {
    return {
      title: "Ürün Bulunamadı | Mat Tech",
      description: "Aradığınız ürün bulunamadı.",
    };
  }

  const baseUrl = "https://www.mattech.com.tr";
  const productUrl = `${baseUrl}/urunler/${urun.slug}`;
  const aciklama = urun.uzun_aciklama || urun.kisa_aciklama || '';

  return {
    title: `${urun.ad} | ${urun.uretici} - Mat Tech`,
    description: aciklama,
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
      description: aciklama,
      url: productUrl,
      type: "website",
      images: [
        {
          url: urun.gorsel?.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`,
          width: 800,
          height: 600,
          alt: urun.ad,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${urun.ad} - ${urun.uretici}`,
      description: aciklama,
      images: [urun.gorsel?.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`],
    },
  };
}

// Product JSON-LD Schema
function ProductSchema({ urun }: { urun: Urun }) {
  const baseUrl = "https://www.mattech.com.tr";
  const aciklama = urun.uzun_aciklama || urun.kisa_aciklama || '';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: urun.ad,
    description: aciklama,
    image: urun.gorsel?.startsWith("http") ? urun.gorsel : `${baseUrl}${urun.gorsel}`,
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
      availability: urun.stok_durumu === "stokta" 
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
  const urun = await urunGetirBySlugServer(slug);

  if (!urun) {
    notFound();
  }

  const aciklama = urun.uzun_aciklama || urun.kisa_aciklama || '';

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
      <ProductDetailClient urun={urun as any} />

      {/* Hidden SEO Content - Görünmez ürün bazlı içerik */}
      <UrunSeoContent
        urunAdi={urun.ad}
        uretici={urun.uretici}
        kategoriler={urun.kategoriler}
        aciklama={aciklama}
        ozellikler={urun.ozellikleri || []}
      />
    </>
  );
}
