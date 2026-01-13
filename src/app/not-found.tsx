/**
 * 404 Not Found Page
 * Custom error page with animations and helpful navigation
 */

'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Container, Button, Icon } from '@/components/ui';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const popularLinks = [
    { href: '/', label: 'Ana Sayfa', icon: 'home' },
    { href: '/urunler', label: 'Tüm Ürünler', icon: 'package' },
    { href: '/urunler/kategori/kamera', label: 'Kameralar', icon: 'video' },
    { href: '/urunler/kategori/kayit-cihazi', label: 'Kayıt Cihazları', icon: 'hard-drive' },
    { href: '#contact', label: 'İletişim', icon: 'mail' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background-secondary flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
      </div>

      <Container className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* Large 404 Number */}
            <div className="relative inline-block">
              <motion.h1
                className="text-[180px] md:text-[240px] font-bold leading-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                <span className="text-gradient">404</span>
              </motion.h1>
              
              {/* Animated Camera Icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: [0, 10, -10, 0], scale: 1 }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.5, delay: 0.3 }
                }}
              >
                <div className="bg-red-500/20 p-8 rounded-full backdrop-blur-sm">
                  <Icon name="video-off" size={64} className="text-red-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sayfa Bulunamadı
            </h2>
            <p className="text-lg text-foreground-secondary max-w-xl mx-auto">
              Aradığınız sayfa görünmüyor! Kamera görüntülerinde de bulamadık. 
              Belki yanlış bir link tıkladınız veya sayfa taşınmış olabilir.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-6">
              Popüler Sayfalar
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {popularLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-card hover:bg-card-hover border border-card-border hover:border-red-500/30 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                      <Icon name={link.icon as any} size={24} className="text-red-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-red-500 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/" className="flex items-center gap-2">
                <Icon name="home" size={18} />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/urunler" className="flex items-center gap-2">
                <Icon name="package" size={18} />
                Ürünleri İncele
              </Link>
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-card-border"
          >
            <p className="text-sm text-foreground-muted">
              Hala yardıma mı ihtiyacınız var?{' '}
              <Link 
                href="#contact" 
                className="text-red-500 hover:text-red-600 font-medium underline underline-offset-4 transition-colors"
              >
                Bize ulaşın
              </Link>
              {' '}veya{' '}
              <Link 
                href="tel:+905454506587" 
                className="text-red-500 hover:text-red-600 font-medium underline underline-offset-4 transition-colors"
              >
                +90 545 450 65 87
              </Link>
              {' '}numaralı telefonu arayın.
            </p>
          </motion.div>
        </div>
      </Container>

      {/* Floating Elements */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="shield-alert" size={48} className="text-red-500" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 opacity-20"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Icon name="alert-circle" size={48} className="text-red-500" />
          </motion.div>
        </>
      )}
    </div>
  );
}
