/**
 * Ürün Listesi Bileşeni
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Container, Button, Icon, Badge } from "@/components/ui";
import { 
  Urun, 
  UrunVeritabani, 
  urunVeritabaniYukle,
  stokRengiBul,
  fiyatiFormatla
} from "@/lib/product-utils";
import { fadeUp, staggerContainer, staggerChild } from "@/lib/animations";

interface UrunListesiProps {
  kategoriSlug?: string;
  titleOverride?: string;
}

// Kategori iconları (Icon bileşeni için)
const KATEGORI_ICONS: Record<string, string> = {
  "kayit-cihazi": "server",
  "kamera": "camera",
  "alarm-sistemi": "bell",
  "access-kontrol": "lock",
  "ekipmanlar": "settings",
};

export function UrunListesi({ kategoriSlug, titleOverride }: UrunListesiProps) {
  const [veri, setVeri] = useState<UrunVeritabani | null>(null);
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState<string | null>(null);
  const [siralamaTipi, setSiralamaTipi] = useState<"en-yeni" | "fiyat-artan" | "fiyat-azalan">("en-yeni");
  const [aktifKategori, setAktifKategori] = useState<string | null>(kategoriSlug || null);

  useEffect(() => {
    const veriYukle = async () => {
      try {
        setYukleniyor(true);
        const veriBilgisi = await urunVeritabaniYukle();
        setVeri(veriBilgisi);
        setUrunler(veriBilgisi.urunler);
        setHata(null);
      } catch (err) {
        setHata("Ürünler yüklenirken hata oluştu");
        console.error(err);
      } finally {
        setYukleniyor(false);
      }
    };

    veriYukle();
  }, []);

  // Kategoriye göre filtrele
  const filtrelenmisUrunler = aktifKategori 
    ? urunler.filter((u) => u.kategoriler.some((k) => k.includes(aktifKategori)))
    : urunler;

  // Sırala
  const siraliUrunler = [...filtrelenmisUrunler].sort((a, b) => {
    switch (siralamaTipi) {
      case "fiyat-artan":
        return a.fiyat - b.fiyat;
      case "fiyat-azalan":
        return b.fiyat - a.fiyat;
      case "en-yeni":
      default:
        return b.id - a.id;
    }
  });

  if (yukleniyor) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <p className="mt-4 text-foreground-secondary">Ürünler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (hata) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 mb-4">{hata}</p>
        <Button onClick={() => window.location.reload()}>Yeniden Dene</Button>
      </div>
    );
  }

  if (siraliUrunler.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-foreground-secondary mb-4">Ürün bulunamadı</p>
        <Link href="/urunler">
          <Button>Tüm Ürünleri Gör</Button>
        </Link>
      </div>
    );
  }

  // Kategori başlığını al
  const kategoriAdi = veri && aktifKategori
    ? veri.kategoriler.find((k) => k.slug === aktifKategori)?.ad
    : "Tüm Ürünler";

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Başlık */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {titleOverride || kategoriAdi}
          </h1>
          <p className="text-foreground-secondary">
            {siraliUrunler.length} ürün bulundu
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        {veri && veri.kategoriler.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3">
              {/* Tümü butonu */}
              <button
                onClick={() => setAktifKategori(null)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  aktifKategori === null
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                    : "bg-card border border-card-border text-foreground hover:border-red-500/50 hover:text-red-500"
                }`}
              >
                <Icon name="apps" size={20} />
                Tümü
              </button>
              
              {/* Kategori butonları */}
              {veri.kategoriler.map((kat) => (
                <button
                  key={kat.slug}
                  onClick={() => setAktifKategori(kat.slug)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    aktifKategori === kat.slug
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                      : "bg-card border border-card-border text-foreground hover:border-red-500/50 hover:text-red-500"
                  }`}
                >
                  <Icon name={KATEGORI_ICONS[kat.slug] || "box"} size={20} />
                  {kat.ad}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sıralama Kontrolleri */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-8 p-4 bg-card rounded-lg"
        >
          <div className="text-sm text-foreground-secondary">
            Sıralama:
          </div>
          <select
            value={siralamaTipi}
            onChange={(e) => setSiralamaTipi(e.target.value as "en-yeni" | "fiyat-artan" | "fiyat-azalan")}
            className="px-3 py-2 rounded-lg border border-card-border bg-background text-foreground text-sm focus:outline-none focus:border-red-500"
          >
            <option value="en-yeni">En Yeni</option>
            <option value="fiyat-artan">Fiyat (Düşükten Yükseğe)</option>
            <option value="fiyat-azalan">Fiyat (Yüksekten Düşüğe)</option>
          </select>
        </motion.div>

        {/* Ürün Gridı */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {siraliUrunler.map((urun) => (
            <motion.div key={urun.id} variants={staggerChild}>
              <Link href={`/urunler/${urun.slug}`}>
                <div className="group h-full rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 border border-card-border cursor-pointer">
                  {/* Görsel */}
                  <div className="relative w-full h-64 overflow-hidden bg-background">
                    <Image
                      src={urun.gorsel}
                      alt={urun.ad}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                    {/* Stok Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={
                          urun.stok_durumu === "Uygun"
                            ? "default"
                            : urun.stok_durumu === "Sınırlı"
                            ? "warning"
                            : "primary"
                        }
                        className={stokRengiBul(urun.stok_durumu)}
                      >
                        {urun.stok_durumu}
                      </Badge>
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-6">
                    {/* Üretici */}
                    <p className="text-xs text-red-500 font-semibold uppercase mb-2">
                      {urun.uretici}
                    </p>

                    {/* Başlık */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                      {urun.ad}
                    </h3>

                    {/* Açıklama */}
                    <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
                      {urun.kısa_açıklama}
                    </p>

                    {/* Fiyat */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">
                        {fiyatiFormatla(urun.fiyat, urun.para_birimi)}
                      </span>
                    </div>

                    {/* Detay Butonu */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                    >
                      <Icon name="arrow-right" size={16} className="mr-2" />
                      Detaylı İncele
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
