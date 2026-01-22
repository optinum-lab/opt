/**
 * Kampanya Detay Sayfasi - Premium E-commerce Style
 * Apple, Dribbble, Amazon inspired design
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { KampanyaDetayClient } from "./KampanyaDetayClient";

export interface KampanyaDetay {
  id: number;
  baslik: string;
  slug: string;
  aciklama: string | null;
  gorsel: string | null;
  icon: string | null;
  fiyat: string | null;
  fiyat_usd: string | null;
  eski_fiyat_usd: string | null;
  eski_fiyat: string | null;
  badge: string | null;
  renk: string | null;
  ozellikler: string[] | null;
  detay_baslik: string | null;
  detay_aciklama: string | null;
  detay_icerik: string | null;
  paket_icerigi: string[] | null;
  teknik_ozellikler: string[] | null;
  avantajlar: string[] | null;
  sss: { soru: string; cevap: string }[] | null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: kampanya } = await supabase
    .from("kampanyalar")
    .select("baslik, aciklama, detay_aciklama, gorsel")
    .eq("slug", slug)
    .single();

  if (!kampanya) {
    return { title: "Kampanya Bulunamadi" };
  }

  return {
    title: kampanya.baslik + " | Montaj Dahil Guvenlik Paketi",
    description: kampanya.detay_aciklama || kampanya.aciklama || kampanya.baslik,
    alternates: {
      canonical: "https://www.mattech.com.tr/montaj-kampanyalarimiz/" + slug,
    },
    openGraph: {
      title: kampanya.baslik + " | Mat Tech",
      description: kampanya.detay_aciklama || kampanya.aciklama || "",
      url: "https://www.mattech.com.tr/montaj-kampanyalarimiz/" + slug,
      type: "website",
      images: kampanya.gorsel ? [{ url: kampanya.gorsel }] : [],
    },
  };
}

export default async function KampanyaDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: kampanya } = await supabase
    .from("kampanyalar")
    .select("*")
    .eq("slug", slug)
    .eq("aktif", true)
    .single() as { data: KampanyaDetay | null };

  if (!kampanya) {
    notFound();
  }

  // JSON-LD Schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": kampanya.baslik,
    "description": kampanya.aciklama,
    "image": kampanya.gorsel || "https://www.mattech.com.tr/og-image.png",
    "brand": {
      "@type": "Brand",
      "name": "mattech - Mat Tech"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.mattech.com.tr/montaj-kampanyalarimiz/${kampanya.slug}`,
      "priceCurrency": "TRY",
      "price": kampanya.fiyat?.toString() || "0",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "mattech - Mat Tech Güvenlik Sistemleri"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Güvenlik Kamerası Montaj Hizmeti",
    "name": kampanya.baslik,
    "description": kampanya.aciklama,
    "provider": {
      "@type": "LocalBusiness",
      "name": "mattech - Mat Tech Güvenlik Sistemleri",
      "image": "https://www.mattech.com.tr/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perpa Ticaret Merkezi, A Blok Kat:9 No:1288",
        "addressLocality": "Şişli",
        "addressRegion": "İstanbul",
        "postalCode": "34384",
        "addressCountry": "TR"
      },
      "telephone": "+90-545-450-6587",
      "priceRange": "₺₺",
      "url": "https://www.mattech.com.tr"
    },
    "areaServed": {
      "@type": "City",
      "name": "İstanbul"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Güvenlik Kamerası Kampanyaları",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": kampanya.baslik
          }
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://www.mattech.com.tr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Montaj Kampanyalarımız",
        "item": "https://www.mattech.com.tr/montaj-kampanyalarimiz"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": kampanya.baslik,
        "item": `https://www.mattech.com.tr/montaj-kampanyalarimiz/${kampanya.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Bu güvenlik kamerası kampanyasında montaj dahil mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, tüm kampanyalarımızda profesyonel montaj hizmeti dahildir. Uzman ekibimiz güvenlik kameralarınızı en uygun noktalara monte eder."
        }
      },
      {
        "@type": "Question",
        "name": "Güvenlik kamerası sisteminin kurulumu ne kadar sürer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standart bir güvenlik kamerası sistemi kurulumu genellikle 2-4 saat içinde tamamlanır. Kamera sayısına ve montaj koşullarına göre bu süre değişebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Kampanya kapsamındaki güvenlik kameralarının garanti süresi nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tüm güvenlik kamerası ürünlerimiz 2 yıl üretici garantisi kapsamındadır. Ayrıca montaj işçiliği için de 1 yıl garanti veriyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "İstanbul'un hangi ilçelerine güvenlik kamerası montajı yapıyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İstanbul'un tüm ilçelerine güvenlik kamerası montaj hizmeti veriyoruz. Avrupa ve Anadolu yakası dahil olmak üzere tüm semtlere aynı gün kurulum yapabiliyoruz."
        }
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hidden SEO Content - Visible to search engines only */}
      <div className="sr-only" aria-hidden="true">
        <h1>{kampanya.baslik} - Güvenlik Kamerası Kampanyası | mattech Mat Tech İstanbul Perpa</h1>
        
        <article>
          <h2>Profesyonel Güvenlik Kamerası Montaj Kampanyası</h2>
          <p>
            mattech (Mat Tech) olarak İstanbul Perpa&apos;da en uygun fiyatlı güvenlik kamerası sistemleri sunuyoruz. 
            {kampanya.baslik} kampanyamız ile ev ve işyeriniz için profesyonel CCTV çözümleri sunuyoruz.
            Montaj dahil güvenlik kamerası paketlerimiz ile huzurunuz güvence altında.
          </p>

          <h3>Güvenlik Kamerası Sistem Özellikleri</h3>
          <p>
            Bu güvenlik kamerası paketi, yüksek çözünürlüklü HD ve 4K kamera seçenekleri ile 
            gece görüşü özelliği sunar. Hikvision ve Dahua marka profesyonel güvenlik kameraları 
            ile 7/24 kesintisiz kayıt yapabilirsiniz. DVR ve NVR kayıt cihazları ile tüm 
            görüntüleriniz güvenle saklanır.
          </p>

          <h3>Güvenlik Kamerası Montaj Hizmeti İstanbul</h3>
          <p>
            İstanbul&apos;un tüm ilçelerinde profesyonel güvenlik kamerası montaj hizmeti veriyoruz.
            Kadıköy, Beşiktaş, Şişli, Bakırköy, Ataşehir, Üsküdar, Maltepe, Pendik, Kartal,
            Beylikdüzü, Esenyurt, Başakşehir, Sultangazi, Gaziosmanpaşa, Eyüpsultan, Fatih,
            Bağcılar, Küçükçekmece, Bahçelievler, Güngören, Zeytinburnu, Esenler, Bayrampaşa,
            Sarıyer, Beykoz, Çekmeköy, Sancaktepe, Sultanbeyli, Tuzla, Arnavutköy ve diğer
            tüm ilçelere aynı gün kurulum yapıyoruz.
          </p>

          <h3>CCTV Sistemleri ve Kapalı Devre Kamera</h3>
          <p>
            Kapalı devre televizyon (CCTV) sistemleri ile işyerinizi ve evinizi koruma altına alın.
            Analog ve IP kamera sistemleri, PoE destekli ağ kameraları, PTZ (Pan-Tilt-Zoom) 
            kameralar, dome kameralar, bullet kameralar ve gizli kameralar ile tam güvenlik.
            Hareket algılama sensörlü akıllı kameralar ile anlık bildirim alın.
          </p>

          <h3>Güvenlik Kamerası Fiyatları 2026</h3>
          <p>
            2026 yılının en uygun güvenlik kamerası fiyatları mattech (Mat Tech) Perpa&apos;da. Kampanyalı 
            güvenlik kamerası setleri, montaj dahil kamera paketleri, işyeri güvenlik sistemleri
            ve ev güvenlik kamerası çözümleri için hemen teklif alın. {kampanya.fiyat && `Bu kampanya sadece ${kampanya.fiyat.toLocaleString('tr-TR')} TL!`}
          </p>

          <h3>Neden mattech - Mat Tech Güvenlik Sistemleri?</h3>
          <ul>
            <li>Perpa Ticaret Merkezi A Blok Kat:9 No:1288 Şişli İstanbul</li>
            <li>10+ yıllık sektör tecrübesi</li>
            <li>Profesyonel güvenlik kamerası montaj ekibi</li>
            <li>2 yıl üretici garantisi</li>
            <li>Ücretsiz keşif hizmeti</li>
            <li>Aynı gün kurulum</li>
            <li>7/24 teknik destek: 0545 450 65 87</li>
            <li>Uygun fiyat garantisi</li>
            <li>Taksit imkanı</li>
            <li>Hikvision ve Dahua yetkili bayi</li>
          </ul>

          <h3>Güvenlik Kamerası Kurulum Aşamaları</h3>
          <p>
            1. Ücretsiz keşif ve analiz
            2. Size özel güvenlik kamerası sistemi tasarımı
            3. Profesyonel montaj ve kablolama
            4. Sistem kurulumu ve ayarları
            5. Mobil uygulama kurulumu ve eğitim
            6. Garanti belgesi teslimi
          </p>

          <h3>Güvenlik Kamerası Teknik Destek</h3>
          <p>
            Güvenlik kamerası arıza servisi, DVR kayıt cihazı tamiri, NVR sistem bakımı,
            kamera lens değişimi, kablo ve adaptör yenileme hizmetleri sunuyoruz.
            Uzaktan erişim ayarları, port yönlendirme, dinamik DNS kurulumu ve
            mobil uygulama desteği ile her zaman yanınızdayız.
          </p>

          <h4>İlgili Aramalar</h4>
          <p>
            mattech, mat tech, MatTech, MAT TECH, mattech güvenlik, mat tech güvenlik,
            mattech kamera, mat tech kamera, mattech istanbul, mat tech istanbul,
            mattech perpa, mat tech perpa, mattech iletişim, mat tech telefon,
            güvenlik kamerası, güvenlik kamerası fiyatları, güvenlik kamerası montajı,
            güvenlik kamerası istanbul, güvenlik kamerası perpa, güvenlik kamerası şişli,
            cctv kamera, kapalı devre kamera, ip kamera, hikvision kamera, dahua kamera,
            yangın alarm sistemi, hırsız alarm sistemi, bariyer sistemi, turnike sistemi,
            geçiş kontrol sistemi, plaka tanıma sistemi, görüntülü interkom,
            GSM sinyal güçlendirici, DVR kayıt cihazı, NVR kayıt cihazı,
            4 kameralı sistem, 8 kameralı sistem, 16 kameralı sistem,
            ev güvenlik kamerası, işyeri güvenlik kamerası, dükkan kamerası,
            fabrika güvenlik sistemi, depo kamerası, otopark kamerası,
            apartman güvenlik kamerası, site güvenlik sistemi, villa güvenlik kamerası,
            gece görüşlü kamera, 4k güvenlik kamerası, wifi kamera, kablosuz kamera,
            ptz kamera, dome kamera, bullet kamera, montaj dahil kamera, kurulum dahil,
            perpa güvenlik sistemleri, şişli güvenlik kamerası, mecidiyekyöy güvenlik
          </p>
        </article>
      </div>

      <KampanyaDetayClient kampanya={kampanya} />
    </>
  );
}