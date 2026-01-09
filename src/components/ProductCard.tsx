/**
 * Product Card Component
 * Reusable product card for product listings
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Product } from '@/lib/products';
import { Icon } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`}>
        <div className="group h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-red-500/30 transition-all duration-300 cursor-pointer">
          {/* Product Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-background">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.category === 'recording'
                ? 'KAYIT'
                : product.category === 'camera'
                  ? 'KAMERA'
                  : 'ÜRÜNDesktop'}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col">
            {/* Title */}
            <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-foreground-secondary line-clamp-2 mb-3">
              {product.shortDesc}
            </p>

            {/* Specs */}
            <div className="space-y-1 mb-3 text-xs">
              {Object.entries(product.specs)
                .slice(0, 2)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-foreground-muted">{key}:</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
            </div>

            {/* Price */}
            <div className="border-t border-border pt-3 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-red-500">{product.price}</span>
                <Icon name="arrow-right" size={16} className="text-foreground-muted group-hover:text-red-500 transition-colors" />
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] bg-foreground/5 text-foreground-muted px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
