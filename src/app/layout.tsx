/**
 * Root Layout
 * Main layout wrapper with fonts, theme provider, and common elements
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppSupport } from '@/components/WhatsAppSupport';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema, ServiceSchema, FAQSchema } from '@/components/seo';
import { GoogleAnalytics, GoogleTagManager } from '@/components/analytics';

// ============================================
// Font Configuration
// ============================================

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mattech.com.tr'),
  title: {
    default: 'Mat Tech | Güvenlik Kamera, Yangın Alarm, Bariyer ve Geçiş Kontrol Sistemleri İstanbul',
    template: '%s | Mat Tech Güvenlik Sistemleri',
  },
  description:
    'İstanbul Perpa\'da 10+ yıllık tecrübe ile güvenlik kamerası, yangın alarm sistemi, hırsız alarmı, bariyer, turnike ve geçiş kontrol sistemleri kurulumu. Dahua & Hikvision yetkili bayi. ✓ Ücretsiz Keşif ✓ 7/24 Teknik Destek ✓ Profesyonel Montaj',
  keywords: [
    // Marka
    'Mat Tech',
    'Mat Tech güvenlik',
    'mattech güvenlik sistemleri',
    // Güvenlik Kameraları
    'güvenlik kamerası',
    'güvenlik kamerası fiyatları',
    'güvenlik kamera sistemleri',
    'CCTV kamera',
    'IP kamera',
    'analog kamera',
    'dome kamera',
    'bullet kamera',
    'PTZ kamera',
    'gece görüşlü kamera',
    'dış mekan kamera',
    'iç mekan kamera',
    '4K güvenlik kamerası',
    'kablosuz güvenlik kamerası',
    'wifi kamera',
    // Markalar
    'Dahua kamera',
    'Dahua güvenlik sistemleri',
    'Hikvision kamera',
    'Hikvision güvenlik sistemleri',
    // Kayıt Cihazları
    'DVR kayıt cihazı',
    'NVR kayıt cihazı',
    'XVR kayıt cihazı',
    'kamera kayıt cihazı',
    // Yangın Alarm
    'yangın alarm sistemi',
    'yangın algılama sistemi',
    'duman dedektörü',
    'ısı dedektörü',
    'yangın ihbar butonu',
    'yangın alarm paneli',
    'konvansiyonel yangın alarm',
    'adresli yangın alarm',
    // Hırsız Alarm
    'hırsız alarm sistemi',
    'alarm sistemi',
    'kablosuz alarm',
    'ev alarm sistemi',
    'işyeri alarm sistemi',
    'hareket sensörü',
    'kapı sensörü',
    'manyetik kontak',
    'alarm paneli',
    'alarm siren',
    // Bariyer Sistemleri
    'bariyer sistemi',
    'otopark bariyeri',
    'araç bariyeri',
    'kollu bariyer',
    'otomatik bariyer',
    'bariyer fiyatları',
    // Turnike Sistemleri
    'turnike sistemi',
    'tripod turnike',
    'tam boy turnike',
    'geçiş turnike',
    'turnike fiyatları',
    // Geçiş Kontrol (Access Control)
    'geçiş kontrol sistemi',
    'access kontrol',
    'kartlı geçiş sistemi',
    'parmak izi okuyucu',
    'yüz tanıma sistemi',
    'PDKS sistemi',
    'personel takip sistemi',
    // İnterkom
    'görüntülü interkom',
    'daire telefonu',
    'kapı telefonu',
    'villa interkom',
    'apartman interkom',
    // GSM Sinyal Güçlendirici
    'GSM sinyal güçlendirici',
    'cep telefonu sinyal güçlendirici',
    'sinyal amplifikatörü',
    'GSM repeater',
    'mobil sinyal güçlendirici',
    'bina içi sinyal güçlendirici',
    'ofis sinyal güçlendirici',
    '4G sinyal güçlendirici',
    '5G sinyal güçlendirici',
    'LTE sinyal güçlendirici',
    'cep telefonu çekmiyor',
    'sinyal yok çözümü',
    // Konum bazlı
    'İstanbul güvenlik kamerası',
    'Perpa güvenlik sistemleri',
    'Şişli güvenlik kamerası',
    'Mecidiyeköy güvenlik sistemleri',
    // Hizmet bazlı
    'güvenlik kamerası kurulumu',
    'kamera montajı',
    'alarm kurulumu',
    'güvenlik sistemi bakım',
    'güvenlik danışmanlık',
  ],
  authors: [{ name: 'Mat Tech Güvenlik Sistemleri' }],
  creator: 'Mat Tech',
  publisher: 'Mat Tech',
  alternates: {
    canonical: 'https://www.mattech.com.tr',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.mattech.com.tr',
    siteName: 'Mat Tech Güvenlik Sistemleri',
    title: 'Mat Tech | Güvenlik Kamera, Alarm, Bariyer Sistemleri İstanbul',
    description:
      'İstanbul\'da profesyonel güvenlik çözümleri: Kamera, yangın alarmı, hırsız alarmı, bariyer, turnike ve geçiş kontrol sistemleri. Dahua & Hikvision yetkili bayi. 10+ yıl tecrübe.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mat Tech - Güvenlik Kamera ve Alarm Sistemleri İstanbul',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mat Tech | Güvenlik Sistemleri İstanbul',
    description:
      'Güvenlik kamerası, yangın alarmı, hırsız alarmı, bariyer ve turnike sistemleri. Profesyonel kurulum, 7/24 destek.',
    creator: '@mattech',
    images: ['/og-image.png'],
    site: '@mattech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'hrZzcJR_U1ZjiSf0soDeQSdWLcKZei0SLBMzEu4gCAc',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/web-app-manifest-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/web-app-manifest-512x512.png',
      },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ============================================
// Root Layout Component
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        
        {/* SEO Structured Data - JSON-LD */}
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <ServiceSchema />
        <FAQSchema />
        
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <ThemeProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
          >
            Ana içeriğe atla
          </a>

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* Footer */}
          <Footer />

          {/* WhatsApp Support Button */}
          <WhatsAppSupport />
        </ThemeProvider>
      </body>
    </html>
  );
}
