/**
 * Montaj Kampanya Grid Bileşeni
 * Kompakt, Modern ve Scalable Design - 20+ kampanya için optimize
 * USD Fiyatlandırma: Dinamik TRY çevirisi
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface Kampanya {
  id: number;
  baslik: string;
  slug: string;
  gorsel?: string | null;
  aciklama?: string | null;
  // USD Bazlı Fiyatlandırma
  fiyat_usd?: string | null;
  eski_fiyat_usd?: string | null;
  // Deprecated ama uyumluluk için
  fiyat?: string;
  eski_fiyat?: string;
  badge?: string;
  ozellikler?: string[];
  renk?: string;
  link?: string | null;
}

interface KampanyaGridProps {
  kampanyalar: Kampanya[];
}

// Minimalist renk paletleri
const renkPaletleri: Record<string, { accent: string; bg: string; hover: string }> = {
  red: { accent: "bg-red-500", bg: "bg-red-50 dark:bg-red-950/20", hover: "hover:border-red-500" },
  blue: { accent: "bg-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20", hover: "hover:border-blue-500" },
  green: { accent: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", hover: "hover:border-emerald-500" },
  purple: { accent: "bg-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20", hover: "hover:border-purple-500" },
  orange: { accent: "bg-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20", hover: "hover:border-orange-500" },
  teal: { accent: "bg-teal-500", bg: "bg-teal-50 dark:bg-teal-950/20", hover: "hover:border-teal-500" },
};

// Kompakt Kampanya Kartı - E-Ticaret Stili - Tamamen Dinamik
function KampanyaKart({ 
  kampanya, 
  index, 
  usdToTry 
}: { 
  kampanya: Kampanya; 
  index: number;
  usdToTry: number | null;
}) {
  const renk = kampanya.renk || "red";
  const palet = renkPaletleri[renk] || renkPaletleri.red;
  const href = `/montaj-kampanyalarimiz/${kampanya.slug}`;

  // USD → TRY Dönüşümü
  let fiyatTRY = '';
  let eskiFiyatTRY = '';
  
  if (kampanya.fiyat_usd && usdToTry) {
    const usdFiyat = parseFloat(kampanya.fiyat_usd);
    if (!isNaN(usdFiyat)) {
      fiyatTRY = (usdFiyat * usdToTry).toLocaleString('tr-TR', { maximumFractionDigits: 0 });
    }
  }
  
  if (kampanya.eski_fiyat_usd && usdToTry) {
    const usdEskiFiyat = parseFloat(kampanya.eski_fiyat_usd);
    if (!isNaN(usdEskiFiyat)) {
      eskiFiyatTRY = (usdEskiFiyat * usdToTry).toLocaleString('tr-TR', { maximumFractionDigits: 0 });
    }
  }

  // İndirim yüzdesini dinamik hesapla
  const indirimlimi = Boolean(kampanya.eski_fiyat_usd && kampanya.fiyat_usd);
  let indirimYuzdesi = 0;
  if (indirimlimi) {
    try {
      const eskiFiyatNum = parseFloat(kampanya.eski_fiyat_usd!);
      const yeniFiyatNum = parseFloat(kampanya.fiyat_usd!);
      if (!isNaN(eskiFiyatNum) && !isNaN(yeniFiyatNum) && eskiFiyatNum > yeniFiyatNum) {
        indirimYuzdesi = Math.round(((eskiFiyatNum - yeniFiyatNum) / eskiFiyatNum) * 100);
      }
    } catch (e) {
      console.warn('Fiyat hesaplama hatası:', e);
    }
  }

  // Badge gösterim kontrolü - İndirim varsa öncelik indirime
  const gosterilecekBadge = indirimYuzdesi > 0 
    ? { text: `%${indirimYuzdesi} İndirim`, color: 'bg-red-500' }
    : kampanya.badge 
    ? { text: kampanya.badge, color: palet.accent }
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link 
        href={href}
        className="group block h-full"
      >
        <div className="relative h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden transition-all duration-500 ease-out hover:shadow-lg hover:border-red-500/30 hover:-translate-y-1">
          
          {/* Badge - Dinamik (sadece varsa göster) */}
          {gosterilecekBadge && (
            <div className="absolute top-2 left-2 z-10">
              <div className={`${gosterilecekBadge.color} text-white text-xs font-bold px-2 py-1 rounded shadow-lg`}>
                {gosterilecekBadge.text}
              </div>
            </div>
          )}

          {/* Görsel - Dinamik (yoksa placeholder) */}
          <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            {kampanya.gorsel ? (
              <Image
                src={kampanya.gorsel}
                alt={kampanya.baslik || 'Kampanya'}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
            )}
          </div>

          {/* İçerik - Dinamik */}
          <div className="p-3">
            {/* Başlık - Dinamik */}
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1 line-clamp-2 min-h-[2.5rem] transition-colors duration-300 ease-out group-hover:text-red-500">
              {kampanya.baslik || 'Kampanya Paketi'}
            </h3>
            
            {/* Açıklama - Dinamik (yoksa gösterme) */}
            {kampanya.aciklama && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 line-clamp-1">
                {kampanya.aciklama}
              </p>
            )}

            {/* Fiyat Bölümü - Dinamik USD & TRY */}
            <div className="mb-3">
              {/* Eski fiyat - sadece varsa ve indirim varsa göster */}
              {eskiFiyatTRY && indirimlimi && kampanya.eski_fiyat_usd && (
                <div className="flex items-center justify-between text-xs text-neutral-400 line-through mb-1">
                  <span>${kampanya.eski_fiyat_usd}</span>
                  <span>{eskiFiyatTRY} ₺</span>
                </div>
              )}
              
              {/* Güncel fiyat - USD ve TRY */}
              {fiyatTRY && kampanya.fiyat_usd ? (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">USD</div>
                    <div className="text-base font-bold text-red-500">
                      ${kampanya.fiyat_usd}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">TRY</div>
                    <div className="text-base font-bold text-red-500">
                      {fiyatTRY} ₺
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-lg font-bold text-red-500 text-center mb-2">
                  Teklif Al
                </div>
              )}
            </div>

            {/* Montaj & KDV Bilgisi - Kompakt, Fiyat Altında */}
            {fiyatTRY && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400 mb-2 px-2">
                <svg className="w-2.5 h-2.5 text-green-600 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Montaj + KDV Dahil</span>
              </div>
            )}

            {/* CTA Butonu */}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded transition-all duration-300 ease-out">
              Detaylı İncele
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Kompakt Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</h4>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

export function KampanyaGrid({ kampanyalar }: KampanyaGridProps) {
  // Exchange Rate Hook - Runtime TRY Conversion
  const [usdToTry, setUsdToTry] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rate) {
          setUsdToTry(data.rate);
        }
      })
      .catch(() => {
        // Fallback: Manuel değer
        setUsdToTry(34.50);
      });
  }, []);

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Kampanya Kartları - 4 Sütun Responsive Grid - Mobilde 2 Sütun */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {kampanyalar.map((kampanya, index) => (
            <KampanyaKart 
              key={kampanya.id} 
              kampanya={kampanya} 
              index={index} 
              usdToTry={usdToTry} 
            />
          ))}
        </div>

        {/* Neden Biz Section - Kompakt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
              Neden <span className="text-red-500">Mat Tech</span>?
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              10 yılı aşkın tecrübemizle güvenliğiniz için çalışıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FeatureCard 
              icon={
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              }
              title="Profesyonel Montaj"
              description="Uzman ekip ile kurulum"
            />
            <FeatureCard 
              icon={
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
              title="2 Yıl Garanti"
              description="Ürün ve işçilik garantili"
            />
            <FeatureCard 
              icon={
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              }
              title="Mobil İzleme"
              description="Canlı izleme imkanı"
            />
            <FeatureCard 
              icon={
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              }
              title="7/24 Destek"
              description="Her zaman yanınızdayız"
            />
          </div>
        </motion.div>

        {/* CTA Section - Daha Kompakt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 md:p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Ücretsiz Keşif İsteyin
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl">
                  Uzman ekibimiz mekanınızı inceleyerek en uygun çözümü sunar. Keşif tamamen ücretsiz.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                >
                  Ücretsiz Keşif
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/905454506587?text=Merhaba,%20montaj%20kampanyalar%C4%B1n%C4%B1z%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
