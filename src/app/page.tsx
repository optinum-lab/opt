/**
 * Home Page
 * Main landing page with all sections
 */

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
