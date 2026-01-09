/**
 * Ürün Detay Sayfası - Dinamik Routing
 * URL: /urunler/detail/[slug]
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useParams, notFound } from "next/navigation";
import { Container, Button, Badge, Icon } from "@/components/ui";
import { 
  Urun, 
  urunVeritabaniYukle,
  urunBulSlugtan,
  stokRengiBul,
  fiyatiFormatla
} from "@/lib/product-utils";
import { fadeUp, staggerContainer, staggerChild } from "@/lib/animations";

export default function UrunDetayPage() {
  const params = useParams();
  const urunSlug = params.slug as string;

  const [urun, setUrun] = useState<Urun | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState<string | null>(null);
  const [aktifTab, setAktifTab] = useState<"ozellikleri" | "teknik">("ozellikleri");

  useEffect(() => {
    const veriYukle = async () => {
      try {
        setYukleniyor(true);
        const veriBilgisi = await urunVeritabaniYukle();
        const bulunanUrun = urunBulSlugtan(veriBilgisi.urunler, urunSlug);
        
        if (!bulunanUrun) {
          setHata("Ürün bulunamadı");
          setUrun(null);
        } else {
          setUrun(bulunanUrun);
          setHata(null);
        }
      } catch (err) {
        setHata("Ürün yüklenirken hata oluştu");
        console.error(err);
      } finally {
        setYukleniyor(false);
      }
    };

    veriYukle();
  }, [urunSlug]);

  if (yukleniyor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <p className="mt-4 text-foreground-secondary">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (hata || !urun) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {hata || "Ürün Bulunamadı"}
            </h1>
            <p className="text-foreground-secondary mb-8">
              Aradığınız ürünü bulamadık.
            </p>
            <Link href="/urunler">
              <Button>Ürünlere Geri Dön</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-28 lg:pt-32">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-card-border">
        <Container>
          <nav className="py-4 text-sm">
            <ul className="flex items-center gap-2 flex-wrap">
              <li>
                <a href="/urunler" className="text-foreground-secondary hover:text-red-500 transition-colors">
                  Ürünler
                </a>
              </li>
              <li className="text-foreground-secondary">/</li>
              {urun.kategoriler[0] && (
                <>
                  <li>
                    <a href={`/urunler/kategori/${urun.kategoriler[0]}`} className="text-foreground-secondary hover:text-red-500 transition-colors">
                      {urun.kategoriler[0].charAt(0).toUpperCase() + urun.kategoriler[0].slice(1).replace("-", " ")}
                    </a>
                  </li>
                  <li className="text-foreground-secondary">/</li>
                </>
              )}
              <li className="text-foreground font-semibold">{urun.ad}</li>
            </ul>
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
                    alt={urun.ad}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                </div>
                {/* Stok Badge */}
                <div className="absolute top-6 right-6">
                  <Badge
                    variant={
                      urun.stok_durumu === "Uygun"
                        ? "default"
                        : urun.stok_durumu === "Sınırlı"
                        ? "warning"
                        : "primary"
                    }
                    className={`text-sm px-3 py-1 ${stokRengiBul(urun.stok_durumu)}`}
                  >
                    {urun.stok_durumu}
                  </Badge>
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
                {urun.uzun_açıklama}
              </p>

              {/* Kategoriler */}
              <div className="flex flex-wrap gap-2 mb-8">
                {urun.kategoriler.map((kat) => (
                  <Link key={kat} href={`/urunler/kategori/${kat}`}>
                    <Badge variant="primary" className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
                      {kat.replace("-", " ")}
                    </Badge>
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
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Temel Özellikler
                </h3>
                <div className="space-y-2">
                  {urun.özellikleri?.slice(0, 5).map((oz, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon name="check" size={20} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="text-foreground-secondary">{oz}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Butonları */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button size="lg" className="flex-1">
                  <Icon name="shopping-cart" size={20} className="mr-2" />
                  Ürün İste
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const whatsappUrl = `https://wa.me/905551234567?text=Merhaba, ${urun.ad} ürünü hakkında bilgi almak istiyorum.`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  <Icon name="message-circle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Teknik Özellikler */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-16 pt-12 border-t border-card-border"
          >
            {/* Tab Kontrolleri */}
            <div className="flex gap-4 mb-8 border-b border-card-border">
              {[
                { id: "ozellikleri" as const, label: "Özellikler" },
                { id: "teknik" as const, label: "Teknik Bilgiler" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAktifTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition-colors relative ${
                    aktifTab === tab.id
                      ? "text-red-500"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {aktifTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab İçeriği */}
            {aktifTab === "ozellikleri" && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {urun.özellikleri?.map((oz, idx) => (
                  <motion.div key={idx} variants={staggerChild} className="flex items-start gap-3 p-4 bg-card rounded-lg">
                    <Icon name="check-circle" size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <span className="text-foreground">{oz}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {aktifTab === "teknik" && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(urun.teknik_ozellikler || {}).map(([key, value]) => (
                  <motion.div key={key} variants={staggerChild} className="p-6 bg-card rounded-lg border border-card-border">
                    <h4 className="text-sm font-semibold text-foreground-secondary uppercase mb-2">
                      {key.replace(/_/g, " ")}
                    </h4>
                    <p className="text-lg font-semibold text-foreground">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </Container>
      </div>
    </main>
  );
}
