/**
 * Testimonials Section Component
 * Modern cards with customer quotes and ratings
 */

'use client';

import { motion } from 'motion/react';
import { Container, Card, Icon } from '@/components/ui';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  defaultViewport,
} from '@/lib/animations';
import { testimonials } from '@/lib/constants';

// ============================================
// Component
// ============================================

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background-secondary" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px]" />

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
            Referanslar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Binlerce</span>{' '}
            <span className="text-foreground">Mutlu Müşteri</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Optinum Güvenlik ile güvenliklerini dönüştüren müşterilerimizden dinleyin. 
            Gerçek insanlardan gerçek hikayeler.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              featured={index === 0}
            />
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-16 pt-16 border-t border-card-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">4.9</div>
              <div className="text-sm text-foreground-secondary">Ortalama Puan</div>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50K+</div>
              <div className="text-sm text-foreground-secondary">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">%98</div>
              <div className="text-sm text-foreground-secondary">Memnuniyet Oranı</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">7/24</div>
              <div className="text-sm text-foreground-secondary">Destek Hizmeti</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ============================================
// Testimonial Card Component
// ============================================

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
  };
  featured?: boolean;
}

function TestimonialCard({ testimonial, featured }: TestimonialCardProps) {
  return (
    <motion.div variants={staggerChild}>
      <Card
        className={featured ? 'md:col-span-1' : ''}
        padding="lg"
        glass={featured}
        hover={true}
      >
        {/* Quote Icon */}
        <div className="mb-6">
          <svg
            className="w-10 h-10 text-primary/20"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Icon key={i} name="star" size={18} className="text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-foreground leading-relaxed mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-card-border">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-semibold text-foreground">
              {testimonial.name}
            </div>
            <div className="text-sm text-foreground-secondary">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
