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
        <div className="group h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
          {/* Product Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-background">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Badge */}
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              {product.category === 'recording'
                ? 'KAYIT'
                : product.category === 'camera'
                  ? 'KAMERA'
                  : 'ÜRÜN'}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col">
            {/* Title */}
            <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-red-500 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-foreground-secondary line-clamp-2 mb-4 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Specs */}
            <div className="space-y-2 mb-4 text-xs">
              {Object.entries(product.specs)
                .slice(0, 2)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center bg-neutral-50 dark:bg-neutral-800/50 rounded-lg px-3 py-2">
                    <span className="text-foreground-muted font-medium">{key}:</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
            </div>

            {/* Price */}
            <div className="border-t border-border pt-4 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-red-500">{product.price}</span>
                <div className="flex items-center gap-1 text-xs font-semibold text-red-500">
                  <span>Detaylar</span>
                  <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] font-medium bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg">
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
