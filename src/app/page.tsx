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
import { HomeSeoContent } from '@/components/seo';

export const metadata: Metadata = {
  title: 'mattech - Mat Tech | Güvenlik Kamerası, Yangın Alarm, Bariyer Sistemleri İstanbul',
  description:
    'mattech (mat tech) - İstanbul Perpa\'da 10+ yıllık tecrübe ile güvenlik kamerası, yangın alarmı, hırsız alarmı, bariyer, turnike ve geçiş kontrol sistemleri. Dahua & Hikvision yetkili bayi. ✓ Ücretsiz Keşif ✓ 7/24 Destek',
  alternates: {
    canonical: 'https://www.mattech.com.tr',
  },
  openGraph: {
    title: 'mattech - Mat Tech | Güvenlik Kamerası, Alarm ve Bariyer Sistemleri',
    description:
      'mattech (mat tech) - İstanbul\'da profesyonel güvenlik sistemleri: Kamera, yangın alarmı, hırsız alarmı, bariyer, turnike. Dahua & Hikvision yetkili bayi.',
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

      {/* Hidden SEO Content - Görünmez sektörel içerik */}
      <HomeSeoContent />
    </>
  );
}
