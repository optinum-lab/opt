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
  metadataBase: new URL('https://optinumguvenlik.com'),
  title: {
    default: 'Optinum Güvenlik | Yapay Zeka Destekli Premium Güvenlik Çözümleri',
    template: '%s | Optinum Güvenlik',
  },
  description:
    'Evler ve işletmeler için gelişmiş yapay zeka destekli güvenlik çözümleri. 4K kameralar, akıllı uyarılar ve bulut kayıt ile yeni nesil gözetimi deneyimleyin.',
  keywords: [
    'CCTV',
    'güvenlik kameraları',
    'akıllı güvenlik',
    'yapay zeka gözetim',
    'ev güvenliği',
    'işletme güvenliği',
    '4K kameralar',
    'bulut kayıt',
  ],
  authors: [{ name: 'Optinum Güvenlik' }],
  creator: 'Optinum Güvenlik',
  publisher: 'Optinum Güvenlik',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://optinumguvenlik.com',
    siteName: 'Optinum Güvenlik',
    title: 'Optinum Güvenlik | Yapay Zeka Destekli Premium Güvenlik Çözümleri',
    description:
      'Evler ve işletmeler için gelişmiş yapay zeka destekli güvenlik çözümleri. 4K kameralar, akıllı uyarılar ve bulut kayıt ile yeni nesil gözetimi deneyimleyin.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Optinum Güvenlik - Premium Güvenlik Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optinum Güvenlik | Yapay Zeka Destekli Premium Güvenlik Çözümleri',
    description:
      'Evler ve işletmeler için gelişmiş yapay zeka destekli güvenlik çözümleri.',
    creator: '@optinumguvenlik',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
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
      <body className={`${inter.variable} font-sans antialiased`}>
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
