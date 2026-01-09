/**
 * Features Section Component
 * Grid of feature cards with icons and descriptions
 */

'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Container, Card, Icon } from '@/components/ui';
import {
  staggerContainer,
  staggerChild,
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import { features } from '@/lib/constants';

// Antigravity component'i client-side only olarak yükle
const Antigravity = dynamic(() => import('@/components/Antigravity'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background-secondary" />
});

// ============================================
// Component
// ============================================

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Antigravity Background - z-0 ile aynı katmanda, mouse events alabilsin */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Antigravity
          count={110}
          magnetRadius={13}
          ringRadius={14}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={2}
          lerpSpeed={0.06}
          color="#ff0000"
          autoAnimate={false}
          particleVariance={3}
          rotationSpeed={0.1}
          depthFactor={0}
          pulseSpeed={0.5}
          particleShape="capsule"
          fieldStrength={30}
        />
      </div>

      {/* İçerik - pointer-events-none ile mouse eventleri geçirsin */}
      <Container className="relative z-10 pointer-events-none">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
            Özellikler
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Tam Koruma İçin</span>
            <br />
            <span className="text-gradient">Gelişmiş Teknoloji</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Son teknoloji güvenlik çözümlerimiz, yapay zeka, kristal netliğinde 
            görüntüleme ve kesintisiz bağlantıyı bir araya getirerek 7/24 koruma sağlar.
          </p>
        </motion.div>

        {/* Features Grid - Kartlara pointer-events-auto ekle, tıklanabilir olsun */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ============================================
// Feature Card Component
// ============================================

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <motion.div variants={staggerChild} className="pointer-events-auto">
      <Card
        className="h-full group"
        padding="sm"
        hover={true}
      >
        {/* Icon */}
        <div className="mb-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
            <Icon name={feature.icon} size={20} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2">
          {feature.title}
        </h3>
        <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-3">
          {feature.description}
        </p>

        {/* Daha Fazla Link */}
        <div className="mt-3 pt-2 border-t border-card-border">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors group/link"
          >
            Detay
            <Icon 
              name="arrow-right" 
              size={12} 
              className="transition-transform group-hover/link:translate-x-0.5" 
            />
          </a>
        </div>
      </Card>
    </motion.div>
  );
}
