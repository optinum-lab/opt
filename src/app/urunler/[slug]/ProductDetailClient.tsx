/**
 * Ürün Detay Client Component
 * İnteraktif öğeler için client-side rendering
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container, Button, Icon } from "@/components/ui";
import { formatSlug } from "@/lib/utils";
import { fiyatiFormatla } from "@/lib/product-utils";
import { fadeUp, staggerContainer, staggerChild } from "@/lib/animations";

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

interface ProductDetailClientProps {
  urun: Urun;
}

export function ProductDetailClient({ urun }: ProductDetailClientProps) {
  const handleWhatsApp = () => {
    const message = `Merhaba, ${urun.ad} ürünü hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/905454506587?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-card-border">
        <Container>
          <nav className="py-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/" 
                  className="text-foreground-secondary hover:text-red-500 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Ana Sayfa</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-foreground-secondary">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  href="/urunler" 
                  className="text-foreground-secondary hover:text-red-500 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Ürünler</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              {urun.kategoriler[0] && (
                <>
                  <li className="text-foreground-secondary">/</li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link 
                      href={`/urunler/kategori/${urun.kategoriler[0]}`} 
                      className="text-foreground-secondary hover:text-red-500 transition-colors"
                      itemProp="item"
                    >
                      <span itemProp="name">
                        {urun.kategoriler[0].charAt(0).toUpperCase() + urun.kategoriler[0].slice(1).replace("-", " ")}
                      </span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                </>
              )}
              <li className="text-foreground-secondary">/</li>
              <li className="text-foreground font-semibold" aria-current="page">
                {urun.ad}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Ürün Detayı */}
      <div className="py-12 md:py-16">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Görsel */}
            <motion.div variants={staggerChild} className="flex items-center justify-center">
              <div className="w-full relative">
                <div className="bg-card rounded-2xl overflow-hidden border border-card-border p-8">
                  <Image
                    src={urun.gorsel}
                    alt={`${urun.ad} - ${urun.uretici} güvenlik ürünü`}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                </div>
                {/* Stock Status */}
                <div className="absolute top-6 right-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md bg-red-500 text-white">
                    {urun.stok || "STOKTA"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bilgiler */}
            <motion.div variants={staggerChild} className="flex flex-col">
              {/* Üretici */}
              <p className="text-sm font-semibold text-red-500 uppercase mb-2">
                {urun.uretici}
              </p>

              {/* Başlık */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {urun.ad}
              </h1>

              {/* Açıklama */}
              <p className="text-lg text-foreground-secondary mb-6">
                {urun.uzun_açıklama || urun.açıklama}
              </p>

              {/* Kategoriler */}
              <div className="flex flex-wrap gap-2 mb-8">
                {urun.kategoriler.map((kat) => (
                  <Link key={kat} href={`/urunler/kategori/${kat}`}>
                    <span className="inline-block px-4 py-2 rounded-md bg-red-500/10 text-red-600 font-semibold uppercase tracking-wider cursor-pointer hover:bg-red-500/20 transition-colors">
                      {formatSlug(kat)}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Fiyat */}
              <div className="mb-8 p-6 bg-card rounded-lg border border-card-border">
                <p className="text-sm text-foreground-secondary mb-2">Fiyat</p>
                <p className="text-4xl font-bold text-red-500">
                  {fiyatiFormatla(urun.fiyat, urun.para_birimi)}
                </p>
              </div>

              {/* Kısa Özellikler */}
              {urun.özellikleri && urun.özellikleri.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Temel Özellikler
                  </h2>
                  <ul className="space-y-2">
                    {urun.özellikleri.slice(0, 5).map((oz, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name="check" size={20} className="text-red-500 shrink-0 mt-0.5" />
                        <span className="text-foreground-secondary">{oz}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Butonları */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button size="lg" className="flex-1" onClick={handleWhatsApp}>
                  <Icon name="shopping-cart" size={20} className="mr-2" />
                  Ürün İste
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleWhatsApp}
                >
                  <Icon name="message-circle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Teknik Özellikler */}
          {urun.teknik_ozellikler && Object.keys(urun.teknik_ozellikler).length > 0 && (
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-16 pt-12 border-t border-card-border"
            >
              {/* Başlık */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Teknik Bilgiler
              </h2>

              {/* Tab İçeriği */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(urun.teknik_ozellikler).map(([key, value]) => (
                  <motion.div 
                    key={key} 
                    variants={staggerChild} 
                    className="p-6 bg-card rounded-lg border border-card-border"
                  >
                    <h3 className="text-sm font-semibold text-foreground-secondary uppercase mb-2">
                      {key.replace(/_/g, " ")}
                    </h3>
                    <p className="text-lg font-semibold text-foreground">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </Container>
      </div>
    </main>
  );
}
