/**
 * Why Choose Us Section Component
 * Apple-style comparison layout with trust badges
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
import { comparisonFeatures, trustBadges, stats } from '@/lib/constants';

// ============================================
// Component
// ============================================

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-4 block">
            Neden Biz
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Optinum Güvenlik</span>{' '}
            <span className="text-foreground">Farkı</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Geleneksel güvenlik çözümleriyle nasıl karşılaştırdığımızı görün. 
            Biz sadece daha iyi değiliz — tamamen farklı bir ligdeyiz.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass-card rounded-3xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-foreground/5 border-b border-card-border">
              <div className="p-4 md:p-6">
                <span className="text-sm font-medium text-foreground-muted">Özellik</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-card-border">
                <span className="text-sm font-bold text-gradient">Optinum</span>
              </div>
              <div className="p-4 md:p-6 text-center border-l border-card-border">
                <span className="text-sm font-medium text-foreground-muted">Diğerleri</span>
              </div>
            </div>

            {/* Table Body */}
            {comparisonFeatures.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 border-b border-card-border last:border-b-0 hover:bg-foreground/[0.02] transition-colors"
              >
                <div className="p-4 md:p-6 flex items-center">
                  <span className="text-sm text-foreground">{item.feature}</span>
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-card-border">
                  {item.us ? (
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="check" size={18} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Icon name="x" size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6 flex items-center justify-center border-l border-card-border">
                  {item.others ? (
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon name="check" size={18} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Icon name="x" size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {trustBadges.map((badge) => (
            <motion.div
              key={badge.name}
              variants={staggerChild}
              className="glass-card rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name={badge.icon} size={28} className="text-red-500" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
