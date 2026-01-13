/**
 * Montaj Kampanya Grid Bileşeni
 * Modern, Eye-catching Campaign Cards
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface Kampanya {
  id: number;
  baslik: string;
  slug: string;
  gorsel?: string | null;
  aciklama?: string | null;
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

// Renk paletleri
const renkPaletleri: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  red: { 
    bg: "from-red-500 to-red-600", 
    text: "text-red-500", 
    border: "border-red-500/20",
    glow: "shadow-red-500/25"
  },
  blue: { 
    bg: "from-blue-500 to-blue-600", 
    text: "text-blue-500", 
    border: "border-blue-500/20",
    glow: "shadow-blue-500/25"
  },
  green: { 
    bg: "from-emerald-500 to-emerald-600", 
    text: "text-emerald-500", 
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/25"
  },
  purple: { 
    bg: "from-purple-500 to-purple-600", 
    text: "text-purple-500", 
    border: "border-purple-500/20",
    glow: "shadow-purple-500/25"
  },
  orange: { 
    bg: "from-orange-500 to-orange-600", 
    text: "text-orange-500", 
    border: "border-orange-500/20",
    glow: "shadow-orange-500/25"
  },
  teal: { 
    bg: "from-teal-500 to-teal-600", 
    text: "text-teal-500", 
    border: "border-teal-500/20",
    glow: "shadow-teal-500/25"
  },
};

// Kampanya Kartı - Premium Design
function KampanyaKart({ kampanya, index }: { kampanya: Kampanya; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const renk = kampanya.renk || "red";
  const palet = renkPaletleri[renk] || renkPaletleri.red;
  // Detay sayfasına yönlendir
  const href = `/montaj-kampanyalarimiz/${kampanya.slug}`;

  // Varsayılan özellikler
  const ozellikler = kampanya.ozellikler || [
    "Profesyonel Kurulum",
    "2 Yıl Garanti",
    "Mobil İzleme",
    "7/24 Destek"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link 
        href={href}
        className="block h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`relative h-full bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-500 ${
            isHovered 
              ? `shadow-2xl ${palet.glow} -translate-y-2` 
              : "shadow-lg shadow-black/5"
          }`}
        >
          {/* Kampanya Görseli */}
          {kampanya.gorsel ? (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={kampanya.gorsel}
                alt={kampanya.baslik}
                fill
                className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Badge - Görsel Üzerinde */}
              {kampanya.badge && (
                <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${palet.bg} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                  {kampanya.badge}
                </div>
              )}
              
              {/* Fiyat - Görsel Üzerinde */}
              {kampanya.fiyat && (
                <div className="absolute bottom-4 left-4 right-4">
                  {kampanya.eski_fiyat && (
                    <div className="text-white/70 line-through text-sm mb-1">
                      {kampanya.eski_fiyat}
                    </div>
                  )}
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {kampanya.fiyat}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Üst Gradient Bar - Görsel yoksa */}
              <div className={`h-1.5 bg-gradient-to-r ${palet.bg}`} />
              
              {/* Badge - Görsel yoksa */}
              {kampanya.badge && (
                <div className={`absolute top-5 right-5 z-10 bg-gradient-to-r ${palet.bg} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                  {kampanya.badge}
                </div>
              )}
            </>
          )}

          {/* İçerik */}
          <div className="p-6 md:p-8">
            {/* Başlık */}
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {kampanya.baslik}
            </h3>
            
            {/* Açıklama */}
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
              {kampanya.aciklama}
            </p>

            {/* Fiyat - Görsel yoksa burada göster */}
            {!kampanya.gorsel && kampanya.fiyat && (
              <div className="mb-6">
                {kampanya.eski_fiyat && (
                  <div className="text-neutral-400 line-through text-sm mb-1">
                    {kampanya.eski_fiyat}
                  </div>
                )}
                <div className={`text-3xl md:text-4xl font-bold ${palet.text}`}>
                  {kampanya.fiyat}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Montaj dahil</div>
              </div>
            )}

            {/* Özellikler */}
            <ul className="space-y-2.5 mb-6">
              {ozellikler.map((ozellik, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${palet.bg} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {ozellik}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div 
              className={`w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-300 ${
                isHovered 
                  ? `bg-gradient-to-r ${palet.bg} text-white shadow-lg` 
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Teklif Al
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// Mini Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

export function KampanyaGrid({ kampanyalar }: KampanyaGridProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Kampanya Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {kampanyalar.map((kampanya, index) => (
            <KampanyaKart key={kampanya.id} kampanya={kampanya} index={index} />
          ))}
        </div>

        {/* Neden Biz Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
              Neden <span className="text-red-500">Mat Tech</span>?
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              10 yılı aşkın tecrübemizle güvenliğiniz için çalışıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard 
              icon={
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              }
              title="Profesyonel Montaj"
              description="Uzman ekibimiz ile hızlı ve temiz kurulum"
            />
            <FeatureCard 
              icon={
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
              title="2 Yıl Garanti"
              description="Tüm ürün ve işçilik garantili"
            />
            <FeatureCard 
              icon={
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              }
              title="Mobil İzleme"
              description="Telefonunuzdan canlı izleme imkanı"
            />
            <FeatureCard 
              icon={
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              }
              title="7/24 Destek"
              description="Her zaman yanınızdayız"
            />
          </div>
        </motion.div>

        {/* CTA Section - Premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ücretsiz Keşif İsteyin
                </h3>
                <p className="text-neutral-300 max-w-lg">
                  Uzman ekibimiz mekanınızı yerinde inceleyerek size en uygun çözümü sunar. 
                  Keşif tamamen ücretsizdir.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/25"
                >
                  Ücretsiz Keşif
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/905454506587?text=Merhaba,%20montaj%20kampanyalar%C4%B1n%C4%B1z%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
