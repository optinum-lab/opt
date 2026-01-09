/**
 * Product Detail Page
 * Individual product page with specs and details
 */

'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Container, Button, Icon, Badge } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { getProductById, getProductsByCategory, products } from '@/lib/products';
import { fadeUp, defaultViewport } from '@/lib/animations';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-background via-background to-background/60">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/products" className="text-foreground-secondary hover:text-foreground">
                Ürünler
              </Link>
              <span className="text-foreground-muted">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>

            {/* Manufacturer */}
            <Badge variant="primary" className="w-fit">
              {product.manufacturer}
            </Badge>
          </motion.div>
        </Container>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Product Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-card border border-border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              {/* Title & Description */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                {/* Short Description */}
                <p className="text-lg text-foreground-secondary mb-4">{product.shortDesc}</p>

                {/* Full Description */}
                <p className="text-base text-foreground-secondary leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-6 bg-card rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-4">Teknik Özellikler</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start gap-4">
                      <span className="font-medium text-foreground min-w-[150px]">{key}</span>
                      <span className="text-foreground-secondary text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-600 mb-2">Fiyat Bilgisi</p>
                  <p className="text-2xl font-bold text-red-500">{product.price}</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Icon name="phone" size={18} className="mr-2" />
                    Fiyat Sor
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                  >
                    <Icon name="heart" size={18} className="mr-2" />
                    Kaydet
                  </Button>
                </div>

                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full"
                >
                  <Icon name="messageCircle" size={18} className="mr-2" />
                  WhatsApp'tan Bilgi Al
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="border-t border-border pt-16"
            >
              <h2 className="text-2xl font-bold mb-8">İlgili Ürünler</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}
