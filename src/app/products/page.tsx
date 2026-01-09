/**
 * Products Page
 * Dynamic product listing with categories and filters
 */

'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Container, Badge } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { categories, products, getProductsByCategory, getProductsBySubcategory } from '@/lib/products';
import { staggerContainer, staggerChild, fadeUp, defaultViewport } from '@/lib/animations';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Determine which products to display
  let displayedProducts = products;
  let selectedCategoryObj = null;
  let selectedSubcategoryObj = null;

  if (selectedCategory) {
    selectedCategoryObj = categories.find((c) => c.id === selectedCategory);
    displayedProducts = getProductsByCategory(selectedCategory);

    if (selectedSubcategory) {
      selectedSubcategoryObj = selectedCategoryObj?.subcategories.find(
        (sub) => sub.id === selectedSubcategory
      );
      displayedProducts = getProductsBySubcategory(selectedSubcategory);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background via-background to-background/60">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <Badge variant="primary" className="mb-4 px-4 py-1.5 rounded-full border-red-500/40 text-red-500">
              Ürün Kataloğu
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Dahua Güvenlik Ürünleri
            </h1>
            <p className="text-lg text-foreground-secondary">
              Kayıt cihazlarından kameralara, interkom sistemlerinden alarm çözümlerine kadar eksiksiz güvenlik ürün yelpazesi.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Categories & Products */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar - Categories */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="sticky top-20">
                <h2 className="text-lg font-bold mb-4">Kategoriler</h2>

                <div className="space-y-2">
                  {/* All Products */}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                      selectedCategory === null
                        ? 'bg-red-500 text-white font-semibold'
                        : 'text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    Tüm Ürünler ({products.length})
                  </button>

                  {/* Categories */}
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          );
                          setSelectedSubcategory(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all font-medium ${
                          selectedCategory === category.id
                            ? 'bg-red-500/20 text-red-500'
                            : 'text-foreground hover:bg-foreground/5'
                        }`}
                      >
                        {category.name}
                      </button>

                      {/* Subcategories */}
                      {selectedCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pl-4 space-y-1 mt-2"
                        >
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedSubcategory(sub.id)}
                              className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                                selectedSubcategory === sub.id
                                  ? 'bg-red-500 text-white font-semibold'
                                  : 'text-foreground-secondary hover:text-foreground hover:bg-foreground/5'
                              }`}
                            >
                              {sub.name} ({sub.count})
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content - Products */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-8 text-sm">
                <span className="text-foreground-secondary">Ürünler</span>
                {selectedCategoryObj && (
                  <>
                    <span className="text-foreground-muted">/</span>
                    <span className="text-foreground font-medium">{selectedCategoryObj.name}</span>
                  </>
                )}
                {selectedSubcategoryObj && (
                  <>
                    <span className="text-foreground-muted">/</span>
                    <span className="text-foreground font-medium">{selectedSubcategoryObj.name}</span>
                  </>
                )}
              </div>

              {/* Product Count */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">
                  {selectedSubcategoryObj
                    ? selectedSubcategoryObj.name
                    : selectedCategoryObj
                      ? selectedCategoryObj.name
                      : 'Tüm Ürünler'}
                </h2>
                <p className="text-foreground-secondary mt-2">
                  {displayedProducts.length} ürün bulundu
                </p>
              </div>

              {/* Products Grid */}
              {displayedProducts.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {displayedProducts.map((product, index) => (
                    <motion.div key={product.id} variants={staggerChild}>
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-foreground-secondary">Bu kategoride ürün bulunamadı.</p>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
