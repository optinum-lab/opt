/**
 * How It Works Section Component
 * Compact modern 3-step roadmap
 */

'use client';

import { motion } from 'motion/react';
import { Container, Icon } from '@/components/ui';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  defaultViewport,
} from '@/lib/animations';
import { howItWorksSteps } from '@/lib/constants';

// ============================================
// Component
// ============================================

export function HowItWorks() {
  return (
    <section 
      id="how-it-works" 
      className="py-16 md:py-20 relative overflow-hidden bg-background"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <Container>
        {/* Section Header - Compact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 font-medium text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Nasıl Çalışır
          </span>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            <span className="text-foreground">Üç Basit Adımda </span>
            <span className="text-gradient">Koruma</span>
          </h2>
          <p className="text-sm md:text-base text-foreground-secondary">
            Seçimden kuruluma kadar, ekibimiz her şeyi halleder.
          </p>
        </motion.div>

        {/* Steps - Horizontal Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative"
        >
          {/* Horizontal Line - Desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {howItWorksSteps.map((step, index) => (
              <StepCard key={step.step} step={step} index={index} isLast={index === howItWorksSteps.length - 1} />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={defaultViewport}
          className="text-center mt-10"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-white font-medium text-sm shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/25 transition-all"
          >
            Ücretsiz Keşif Talep Et
            <Icon name="arrow-right" size={16} />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}

// ============================================
// Step Card Component - Compact
// ============================================

interface StepCardProps {
  step: {
    step: number;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  return (
    <motion.div
      variants={staggerChild}
      className="relative text-center"
    >
      {/* Step Number & Icon */}
      <div className="relative z-10 mb-4">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-red-500/20"
        >
          <Icon name={step.icon} size={28} className="text-white" />
        </motion.div>

        {/* Step Number Badge */}
        <div className="absolute -top-1 -right-1 left-1/2 ml-4 w-6 h-6 rounded-full bg-background border-2 border-red-500 flex items-center justify-center">
          <span className="text-xs font-bold text-red-500">{step.step}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
        {step.title}
      </h3>
      <p className="text-xs md:text-sm text-foreground-secondary leading-relaxed">
        {step.description}
      </p>

      {/* Connector Arrow - Desktop */}
      {!isLast && (
        <div className="hidden md:flex absolute top-8 -right-4 z-20">
          <Icon name="chevron-right" size={20} className="text-red-500/40" />
        </div>
      )}
    </motion.div>
  );
}
