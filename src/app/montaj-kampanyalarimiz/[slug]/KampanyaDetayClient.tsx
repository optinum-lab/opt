"use client";

/**
 * Premium E-commerce Style Kampanya Detay Component
 * Inspired by: Apple, Dribbble, Amazon, Shopee, Zalando
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { KampanyaDetay } from "./page";

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Renk paletleri
const colorThemes: Record<string, { primary: string; gradient: string; bg: string; border: string; text: string }> = {
  red: { 
    primary: "#ef4444", 
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-500",
    border: "border-red-500",
    text: "text-red-500"
  },
  blue: { 
    primary: "#3b82f6", 
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-500",
    border: "border-blue-500",
    text: "text-blue-500"
  },
  green: { 
    primary: "#10b981", 
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500",
    border: "border-emerald-500",
    text: "text-emerald-500"
  },
  purple: { 
    primary: "#8b5cf6", 
    gradient: "from-purple-500 to-violet-600",
    bg: "bg-purple-500",
    border: "border-purple-500",
    text: "text-purple-500"
  },
  orange: { 
    primary: "#f97316", 
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-500",
    border: "border-orange-500",
    text: "text-orange-500"
  },
  teal: { 
    primary: "#14b8a6", 
    gradient: "from-teal-500 to-cyan-600",
    bg: "bg-teal-500",
    border: "border-teal-500",
    text: "text-teal-500"
  },
};

// Trust Badges
const trustBadges = [
  { icon: ShieldIcon, label: "2 Yıl Garanti" },
  { icon: TruckIcon, label: "Ücretsiz Kurulum" },
  { icon: PhoneIcon, label: "7/24 Destek" },
];

interface Props {
  kampanya: KampanyaDetay;
}

export function KampanyaDetayClient({ kampanya }: Props) {
  const [activeSection, setActiveSection] = useState<string>("paket");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [usdToTry, setUsdToTry] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const theme = colorThemes[kampanya.renk || "red"] || colorThemes.red;
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Exchange Rate Hook
  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rate) {
          setUsdToTry(data.rate);
        }
      })
      .catch(() => {
        setUsdToTry(34.50);
      });
  }, []);

  // Check sticky
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsSticky(heroBottom < 80);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sticky bar göründüğünde header'ı gizle
  useEffect(() => {
    if (isSticky) {
      document.body.setAttribute('data-hide-header', 'true');
    } else {
      document.body.removeAttribute('data-hide-header');
    }
    return () => {
      document.body.removeAttribute('data-hide-header');
    };
  }, [isSticky]);

  // ESC tuşu ile lightbox kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Lightbox açıkken scroll engelle
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Varsayılan değerler
  const paketIcerigi = kampanya.paket_icerigi || kampanya.ozellikler || [];
  const teknikOzellikler = kampanya.teknik_ozellikler || [];
  const avantajlar = kampanya.avantajlar || [
    "Profesyonel Keşif ve Danışmanlık",
    "2 Yıl Üretici Garantisi",
    "Ücretsiz Profesyonel Montaj",
    "7/24 Teknik Destek Hattı",
    "Mobil Uygulama ile Uzaktan İzleme"
  ];
  const sss = kampanya.sss || [];

  const sections = [
    { id: "paket", label: "Paket İçeriği", icon: PackageIcon },
    { id: "teknik", label: "Teknik Özellikler", icon: CpuIcon },
    { id: "avantaj", label: "Avantajlar", icon: SparklesIcon },
    { id: "sss", label: "Sıkça Sorulanlar", icon: ShieldIcon },
  ];

  // WhatsApp link
  const whatsappLink = `https://wa.me/905454506587?text=${encodeURIComponent(
    `Merhaba, "${kampanya.baslik}" kampanyası hakkında bilgi almak istiyorum.`
  )}`;

  // İndirim hesapla - USD bazlı
  const calculateDiscount = () => {
    if (kampanya.eski_fiyat_usd && kampanya.fiyat_usd) {
      const oldPrice = parseFloat(kampanya.eski_fiyat_usd);
      const newPrice = parseFloat(kampanya.fiyat_usd);
      if (oldPrice > 0 && newPrice > 0 && oldPrice > newPrice) {
        return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
      }
    }
    return 0;
  };

  const discount = calculateDiscount();

  // USD → TRY Çevirisi
  const fiyatTRY = kampanya.fiyat_usd && usdToTry 
    ? (parseFloat(kampanya.fiyat_usd) * usdToTry).toLocaleString('tr-TR', { maximumFractionDigits: 0 })
    : null;
    
  const eskiFiyatTRY = kampanya.eski_fiyat_usd && usdToTry
    ? (parseFloat(kampanya.eski_fiyat_usd) * usdToTry).toLocaleString('tr-TR', { maximumFractionDigits: 0 })
    : null;

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 overflow-x-hidden">
      {/* Sticky Header - Price Card */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-lg"
          >
            <div className="container mx-auto px-4 py-2.5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Kampanya Görseli */}
                  {kampanya.gorsel && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                      <Image
                        src={kampanya.gorsel}
                        alt={kampanya.baslik}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="font-semibold text-neutral-900 dark:text-white truncate text-sm md:text-base">
                      {kampanya.baslik}
                    </h2>
                    {kampanya.fiyat_usd && fiyatTRY && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="text-base md:text-lg font-bold whitespace-nowrap"
                          style={{ color: theme.primary }}
                        >
                          ${kampanya.fiyat_usd}
                        </div>
                        <span className="text-neutral-400 text-sm">/</span>
                        <div 
                          className="text-base md:text-lg font-bold whitespace-nowrap"
                          style={{ color: theme.primary }}
                        >
                          {fiyatTRY} ₺
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
                  style={{ backgroundColor: theme.primary }}
                >
                  <WhatsAppIcon />
                  <span className="hidden sm:inline">Hemen Al</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-16 lg:pb-24 overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${theme.gradient} opacity-[0.03] rounded-full blur-3xl`} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-500 to-pink-500 opacity-[0.03] rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 mb-4 md:mb-8">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <Link href="/montaj-kampanyalarimiz" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Montaj Kampanyaları
            </Link>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <span className="text-neutral-900 dark:text-white truncate max-w-[200px]">{kampanya.baslik}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-start">
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div 
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-2xl cursor-zoom-in group"
                onClick={() => kampanya.gorsel && setIsLightboxOpen(true)}
              >
                {/* Badge */}
                {kampanya.badge && (
                  <div 
                    className="absolute top-4 left-4 z-10 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {kampanya.badge}
                  </div>
                )}
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-black text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    %{discount} İndirim
                  </div>
                )}

                {/* Zoom Icon Overlay */}
                {kampanya.gorsel && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-[5]">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-black/80 p-3 rounded-full shadow-lg">
                      <svg className="w-6 h-6 text-neutral-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                )}

                {kampanya.gorsel ? (
                  <Image
                    src={kampanya.gorsel}
                    alt={kampanya.baslik}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-32 h-32 rounded-full opacity-20"
                      style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}88)` }}
                    />
                    <PackageIcon />
                  </div>
                )}
              </div>

              {/* Trust Badges - Desktop */}
              <div className="hidden lg:flex items-center justify-center gap-6 mt-8">
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
                  >
                    <badge.icon />
                    <span className="text-sm font-medium">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-neutral-500">4.9 (127 değerlendirme)</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 md:mb-4">
                {kampanya.detay_baslik || kampanya.baslik}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 mb-4 md:mb-8 leading-relaxed">
                {kampanya.detay_aciklama || kampanya.aciklama}
              </p>

              {/* Price Card */}
              <div 
                className="p-4 md:p-6 rounded-xl md:rounded-2xl border-2 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 mb-6"
                style={{ borderColor: theme.primary }}
              >
                {/* Old Price - USD & TRY */}
                {kampanya.eski_fiyat_usd && eskiFiyatTRY && (
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 line-through text-sm">${kampanya.eski_fiyat_usd}</span>
                      <span className="text-neutral-400 line-through text-sm">{eskiFiyatTRY} ₺</span>
                    </div>
                    {discount > 0 && (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full">
                        {discount}% tasarruf
                      </span>
                    )}
                  </div>
                )}
                
                {/* Current Price - USD & TRY */}
                {kampanya.fiyat_usd && fiyatTRY ? (
                  <div className="mb-3">
                    <div className="text-xs text-neutral-500 mb-1">Kampanya Fiyatı</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-neutral-400 mb-0.5">USD</div>
                        <div 
                          className="text-2xl md:text-3xl font-bold"
                          style={{ color: theme.primary }}
                        >
                          ${kampanya.fiyat_usd}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-0.5">TRY</div>
                        <div 
                          className="text-2xl md:text-3xl font-bold"
                          style={{ color: theme.primary }}
                        >
                          {fiyatTRY} ₺
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">* Montaj ve KDV Dahil</p>
                  </div>
                ) : kampanya.fiyat ? (
                  <div className="flex items-baseline gap-2 mb-4">
                    <span 
                      className="text-4xl md:text-5xl font-bold"
                      style={{ color: theme.primary }}
                    >
                      {kampanya.fiyat}
                    </span>
                    <span className="text-neutral-500">/ montaj dahil</span>
                  </div>
                ) : null}

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <WhatsAppIcon />
                    <span className="hidden sm:inline">WhatsApp ile Sipariş Ver</span>
                    <span className="sm:hidden">WhatsApp Sipariş</span>
                  </a>
                  <a
                    href="tel:+905454506587"
                    className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                  >
                    <PhoneIcon />
                    0545 450 65 87
                  </a>
                </div>

                {/* Mini Features */}
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <CheckIcon />
                    <span>Ücretsiz Keşif</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <CheckIcon />
                    <span>2 Yıl Garanti</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <CheckIcon />
                    <span>Profesyonel Montaj</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <CheckIcon />
                    <span>7/24 Destek</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges - Mobile */}
              <div className="lg:hidden flex flex-wrap items-center justify-center gap-4">
                {trustBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full"
                  >
                    <badge.icon />
                    <span className="text-sm font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8 md:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          {/* Section Tabs */}
          <div className="flex justify-center mb-6 md:mb-12 overflow-x-auto pb-4">
            <div className="inline-flex items-center gap-1 md:gap-2 p-1 md:p-1.5 rounded-xl md:rounded-2xl bg-white dark:bg-neutral-800 shadow-lg">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl font-medium text-sm md:text-base transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? "text-white shadow-lg"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  }`}
                  style={activeSection === section.id ? { backgroundColor: theme.primary } : {}}
                >
                  <section.icon />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Paket İçeriği */}
              {activeSection === "paket" && paketIcerigi.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {paketIcerigi.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Teknik Özellikler */}
              {activeSection === "teknik" && teknikOzellikler.length > 0 && (
                <div className="grid gap-3">
                  {teknikOzellikler.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm"
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Avantajlar */}
              {activeSection === "avantaj" && avantajlar.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {avantajlar.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg transition-all group overflow-hidden"
                    >
                      <div 
                        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}dd)` }}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                            {item}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* SSS */}
              {activeSection === "sss" && sss.length > 0 && (
                <div className="space-y-4">
                  {sss.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-semibold text-neutral-900 dark:text-white pr-4">
                          {item.soru}
                        </span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          className="flex-shrink-0"
                          style={{ color: theme.primary }}
                        >
                          <ChevronDownIcon />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-700 pt-4">
                              {item.cevap}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {activeSection === "teknik" && teknikOzellikler.length === 0 && (
                <div className="text-center py-16 text-neutral-500">
                  Teknik özellikler yakında eklenecek.
                </div>
              )}
              {activeSection === "sss" && sss.length === 0 && (
                <div className="text-center py-16 text-neutral-500">
                  Sıkça sorulan sorular yakında eklenecek.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Detay İçerik */}
      {kampanya.detay_icerik && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: kampanya.detay_icerik }} />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA - Premium Design */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://w0.peakpx.com/wallpaper/705/685/HD-wallpaper-surreal-red-abstract-black-design-iphone-liquid-pattern.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority={false}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
              >
                <span className="relative flex h-2 w-2">
                  <span 
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span 
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: theme.primary }}
                  />
                </span>
                Sınırlı Süre Kampanyası
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 tracking-tight">
              Bu Fırsatı
              <span 
                className="block mt-2"
                style={{ color: theme.primary }}
              >
                Kaçırmayın!
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-neutral-400 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Profesyonel montaj dahil güvenlik sisteminizi hemen kuralım. 
              <span className="text-white font-medium"> Ücretsiz keşif</span> için bize ulaşın.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 text-white overflow-hidden shadow-2xl"
                style={{ backgroundColor: theme.primary }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}dd)` }}
                />
                <WhatsAppIcon />
                <span className="relative">WhatsApp ile Sipariş Ver</span>
              </motion.a>
              
              <motion.a
                href="tel:+905454506587"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full sm:w-auto px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <PhoneIcon />
                0545 450 65 87
              </motion.a>
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ücretsiz Keşif</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>2 Yıl Garanti</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>7/24 Destek</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/montaj-kampanyalarimiz"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm Kampanyalara Dön
          </Link>
        </div>
      </section>

      {/* Lightbox / Media Viewer */}
      <AnimatePresence>
        {isLightboxOpen && kampanya.gorsel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full max-h-[85vh] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={kampanya.gorsel}
                alt={kampanya.baslik}
                fill
                className="object-contain rounded-xl"
                quality={100}
              />
            </motion.div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-white font-semibold text-lg mb-1">{kampanya.baslik}</h3>
              {kampanya.fiyat && (
                <p className="text-white/80">{kampanya.fiyat} - Montaj Dahil</p>
              )}
              <p className="text-white/50 text-sm mt-2">Kapatmak için tıklayın veya ESC tuşuna basın</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
