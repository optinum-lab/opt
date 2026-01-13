/**
 * Products Section Component
 * Grid-based product showcase with hover animations
 */

'use client';

import { motion } from 'motion/react';
import { Container, Card, Badge, Button, Icon } from '@/components/ui';
import {
  staggerContainer,
  staggerChild,
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import { useEffect, useState } from 'react';
import { Urun } from '@/lib/product-utils';
import { cn } from '@/lib/utils';

// ============================================
// Component
// ============================================

export function Products() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => setUrunler(data.urunler.slice(0, 6))) // İlk 6 ürünü göster
      .catch(() => setUrunler([]));
  }, []);

  return (
    <section id="products" className="py-20 md:py-28 lg:py-32">
      <Container>
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <span className="text-red-500 font-semibold text-xs uppercase tracking-widest mb-3 block">
            Ürünler
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-5">
            <span className="text-foreground">Her İhtiyaca Uygun</span>
            <br />
            <span className="text-gradient">Güvenlik Çözümleri</span>
          </h2>
          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
            İç mekan kameralarından profesyonel PTZ sistemlere kadar, eviniz veya işletmeniz için mükemmel çözümü bulun.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-14"
        >
          {urunler.map((urun) => (
            <ProductCard
              key={urun.id}
              product={{
                id: urun.slug,
                name: urun.ad,
                description: urun.ozellikleri?.[0] || urun.aciklama || '',
                price: urun.fiyat,
                category: urun.kategoriler?.[0] || '',
                features: urun.ozellikleri || [],
                image: urun.gorsel,
                badge: urun.stok_durumu === 'stokta' ? 'STOKTA' : null,
              }}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center"
        >
          <a href="/urunler" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-foreground hover:text-red-500 transition-colors group border border-border/40 rounded-lg hover:border-red-500/30 hover:bg-red-500/5">
            Tüm Ürünleri Görüntüle
            <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

// ============================================
// Product Card Component
// ============================================

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    features: string[];
    image: string;
    badge: string | null;
  };
}

import Image from 'next/image';
import Link from 'next/link';
import { formatSlug } from '@/lib/utils';

function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div variants={staggerChild}>
      <Link href={`/urunler/${product.id}`} className="block h-full">
        <div className="group h-full rounded-xl overflow-hidden bg-card border border-border/50 hover:border-border/80 transition-all duration-300 hover:shadow-sm flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[5/4] bg-background-secondary/40 overflow-hidden flex-shrink-0">
            {/* Product Image */}
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="camera" size={40} className="text-foreground-muted/20" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Category & Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                {formatSlug(product.category)}
              </span>
              {product.badge && (
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-red-500 text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-foreground transition-colors duration-300 leading-snug">
              {product.name}
            </h3>

            {/* Features - Minimal */}
            {product.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3 flex-grow">
                {product.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="text-[11px] px-2 py-0.5 rounded bg-foreground/5 text-foreground-muted leading-none"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-foreground/5 text-foreground-muted leading-none">
                    +{product.features.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Price & CTA */}
            <div className="border-t border-border/30 pt-3 mt-auto">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-red-500 text-lg">
                  {product.price} ₺
                </span>
                <div className="flex items-center gap-1.5 text-foreground-secondary group-hover:text-foreground transition-colors duration-300">
                  <span className="text-[12px] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Gözat
                  </span>
                  <Icon name="arrow-right" size={14} className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
