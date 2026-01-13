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
import { OrganizationSchema, WebsiteSchema } from '@/components/seo';
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
    default: 'Mat Tech | Profesyonel Güvenlik Kamera Sistemleri ve CCTV Çözümleri',
    template: '%s | Mat Tech',
  },
  description:
    'Dahua ve Hikvision markaları ile profesyonel güvenlik kamera sistemleri. Ev ve işyeri için IP kamera, DVR, NVR kurulum ve teknik destek hizmetleri. ✓ 7/24 Destek ✓ Ücretsiz Keşif',
  keywords: [
    'güvenlik kamerası',
    'CCTV',
    'IP kamera',
    'güvenlik kamera sistemleri',
    'Dahua kamera',
    'Hikvision kamera',
    'DVR',
    'NVR',
    'kamera kurulumu',
    'güvenlik sistemleri',
    'kayıt cihazı',
    'alarm sistemi',
    'access kontrol',
    'güvenlik ekipmanları',
    'ev güvenlik kamerası',
    'işyeri güvenlik kamerası',
    'gece görüşlü kamera',
    'dış mekan kamera',
    'iç mekan kamera',
    'kablosuz kamera',
  ],
  authors: [{ name: 'Mat Tech' }],
  creator: 'Mat Tech',
  publisher: 'Mat Tech',
  alternates: {
    canonical: 'https://www.mattech.com.tr',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.mattech.com.tr',
    siteName: 'Mat Tech',
    title: 'Mat Tech | Profesyonel Güvenlik Kamera Sistemleri',
    description:
      'Dahua ve Hikvision güvenlik kamera sistemleri. Ev ve işyeri için profesyonel CCTV kurulum ve teknik destek. ✓ 10+ Yıl Tecrübe ✓ 7/24 Hizmet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mat Tech - Profesyonel Güvenlik Kamera Sistemleri',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mat Tech | Profesyonel Güvenlik Kamera Sistemleri',
    description:
      'Dahua ve Hikvision güvenlik kamera sistemleri. Profesyonel kurulum ve 7/24 teknik destek.',
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
        
        <OrganizationSchema />
        <WebsiteSchema />
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
