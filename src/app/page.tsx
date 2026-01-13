/**
 * Home Page
 * Main landing page with all sections
 */

import type { Metadata } from 'next';
import {
  Hero,
  Features,
  CctvSuite,
  Products,
  HowItWorks,
  WhyChooseUs,
  Testimonials,
  Contact,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'Mat Tech | Profesyonel Güvenlik Kamera Sistemleri - Dahua & Hikvision',
  description:
    'Türkiye\'nin güvenilir güvenlik kamerası tedarikçisi. Dahua ve Hikvision markaları ile IP kamera, DVR, NVR sistemleri. ✓ Ücretsiz Keşif ✓ Profesyonel Kurulum ✓ 7/24 Teknik Destek. Perpa Ticaret Merkezi - İstanbul',
  alternates: {
    canonical: 'https://www.mattech.com.tr',
  },
  openGraph: {
    title: 'Mat Tech | Profesyonel Güvenlik Kamera Sistemleri',
    description:
      'Dahua ve Hikvision güvenlik kamera sistemleri. Profesyonel kurulum ve 7/24 destek. ✓ 10+ Yıl Tecrübe',
    url: 'https://www.mattech.com.tr',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section - now also includes features */}
      <Hero />

      {/* Features Section - Key capabilities */}
      <Features />

      {/* CCTV Suite - Focused CCTV capabilities */}
      <CctvSuite />

      {/* Products Section - Grid of product cards */}
      <Products />

      {/* How It Works Section - 3-step process */}
      <HowItWorks />

      {/* Why Choose Us Section - Comparison table and trust badges */}
      <WhyChooseUs />

      {/* Testimonials Section - Customer reviews */}
      <Testimonials />

      {/* Contact Section - Form and contact info */}
      <Contact />
    </>
  );
}
