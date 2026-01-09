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
    <section id="products" className="py-24 md:py-32">
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
            Ürünler
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Her İhtiyaca Uygun</span>
            <br />
            <span className="text-gradient">Güvenlik Çözümleri</span>
          </h2>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            İç mekan kameralarından profesyonel PTZ sistemlere kadar, eviniz 
            veya işletmeniz için mükemmel güvenlik çözümünü bulun.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                badge: urun.stok_durumu === 'stokta' ? 'Stokta' : null,
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
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="/urunler">
              Tüm Ürünleri Görüntüle
              <Icon name="arrow-right" size={20} />
            </a>
          </Button>
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

function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div variants={staggerChild}>
      <Card
        className="h-full group overflow-hidden"
        padding="none"
        hover={true}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-background-secondary overflow-hidden">
          {/* Product Image */}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
                <Icon name="camera" size={48} className="text-foreground-muted" />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <Button size="sm">
              Detaylı İncele
            </Button>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge 
                variant={product.badge === 'New' ? 'primary' : product.badge === 'Best Seller' ? 'success' : 'secondary'}
                size="sm"
              >
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground-secondary">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name & Price */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-red-500 transition-colors">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-foreground">
              {product.price} ₺
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground-secondary mb-4">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 rounded-md text-xs bg-foreground/5 text-foreground-muted"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="px-2 py-1 rounded-md text-xs bg-foreground/5 text-foreground-muted">
                +{product.features.length - 3} daha
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
