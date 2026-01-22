/**
 * Hero Section Component
 * Apple/Dribbble-inspired modern hero with monitor video showcase
 */

'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { useDeviceCapabilities } from '@/lib/deviceOptimization';
import Image from 'next/image';
import { Container, Button, Badge, Icon } from '@/components/ui';
import {
  heroTitle,
  heroSubtitle,
  heroCTA,
  heroImage,
  staggerContainer,
} from '@/lib/animations';
import { stats } from '@/lib/constants';

// ============================================
// Component
// ============================================

export function Hero() {
  const deviceCaps = useDeviceCapabilities();

  // Parallax for monitor showcase - full page scroll
  // Disable parallax on mobile devices
  const { scrollYProgress } = useScroll();
  const rawScale = useTransform(
    scrollYProgress, 
    deviceCaps.isMobile ? [0, 1] : [0.04, 0.32, 0.70], 
    deviceCaps.isMobile ? [1, 1] : [0.985, 1.035, 0.99]
  );
  const rawY = useTransform(
    scrollYProgress,
    deviceCaps.isMobile ? [0, 1] : [0.04, 0.32, 0.70],
    deviceCaps.isMobile ? [0, 0] : [14, -14, 8]
  );
  const rawRotateX = useTransform(
    scrollYProgress,
    deviceCaps.isMobile ? [0, 1] : [0.04, 0.32, 0.70],
    deviceCaps.isMobile ? [0, 0] : [3, -4, 2]
  );
  const monitorScale = useSpring(rawScale, { stiffness: 150, damping: 20, mass: 0.85 });
  const monitorY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.85 });
  const monitorRotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20, mass: 0.85 });
  const { resolvedTheme, mounted } = useTheme();
  const monitorFrameSrc = mounted && resolvedTheme === 'dark'
    ? '/hero/monitor-mattech-dark.png'
    : '/hero/monitor-mattech.png';

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-red-500/20 via-rose-500/10 to-transparent rounded-full blur-[120px]" />
        
        {/* Secondary accent orb */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-red-400/15 via-rose-500/10 to-transparent rounded-full blur-[100px]" />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <Container className="relative pt-24 pb-12 md:pt-28 lg:pt-32">
        {/* Hero Header - Centered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Floating Badge */}
          <motion.div variants={heroSubtitle} className="mb-6">
            <Badge 
              variant="primary" 
              size="md" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 backdrop-blur-sm hover:bg-red-500/15 transition-colors duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">Yeni Nesil Güvenlik Teknolojisi</span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={heroTitle}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="block text-foreground mb-2">Güvenliğin</span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-rose-500 bg-clip-text text-transparent">
              Yeni Adresi
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroSubtitle}
            className="text-lg md:text-xl lg:text-2xl text-foreground-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            10+ yıllık tecrübe, 5.000'den fazla mutlu müşteri ve %99.9 kesintisiz 
            hizmet garantisiyle evinizi ve işyerinizi güvence altına alıyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-base font-semibold rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon 
                  name="calendar" 
                  size={18} 
                />
                Ücretsiz Keşif Talep Et
                <Icon 
                  name="arrow-right" 
                  size={18} 
                  className="transition-transform group-hover:translate-x-1" 
                />
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="group px-8 py-4 text-base font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-300"
            >
              <Icon name="phone" size={18} className="mr-2 text-red-500" />
              <span>0545 450 65 87</span>
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={heroCTA}
            className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Product Showcase - Monitor with Video */}
        <motion.div
          variants={heroImage}
          initial="hidden"
          animate="visible"
          className="relative max-w-5xl mx-auto mt-8 md:mt-12"
          style={{ scale: monitorScale, y: monitorY, rotateX: monitorRotateX, transformPerspective: 1200, willChange: 'transform' }}
        >
          {/* Main Product Display */}
          <div className="relative px-4 sm:px-0">
            {/* Ambient glow behind monitor */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 via-rose-500/15 to-transparent rounded-[2rem] blur-[80px] scale-90 opacity-70" />
            
            {/* Monitor Container */}
            <div className="relative">
              {/* Monitor Frame Image */}
              <div className="relative z-10">
                <div className="relative z-30 pointer-events-none">
                  <Image
                    src={monitorFrameSrc}
                    alt="Mat Tech Güvenlik Monitör"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                
                {/* Video inside monitor screen */}
                <div 
                  className="absolute z-10"
                  style={{
                    top: '2.5%',
                    left: '50%',
                    width: 'min(1120px, 96%)',
                    height: 'min(690px, 77%)',
                    transform: 'translateX(-50%)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <video
                    src="https://res.cloudinary.com/dqmz7zz8m/video/upload/v1767962962/four-security-camera-views-of-industrial-warehouse-2025-12-17-11-09-10-utc_mbz8aa.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      objectFit: 'contain',
                      background: '#000',
                      border: 'none',
                      overflow: 'hidden',
                    }}
                  />
                </div>
              </div>
              
              {/* Live indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-[8%] left-[6%] flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 z-20"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-xs sm:text-sm font-medium">CANLI</span>
                <span className="hidden sm:inline text-white/60 text-xs sm:text-sm">• 4K HDR</span>
              </motion.div>
              
              {/* AI Detection Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute top-[8%] right-[6%] flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-500/90 to-rose-500/90 backdrop-blur-md border border-white/20 shadow-lg shadow-red-500/20 z-20"
              >
                <Icon name="cpu" size={14} className="text-white" />
                <span className="text-white text-xs sm:text-sm font-medium">AI Aktif</span>
              </motion.div>
            </div>
            
            {/* Floating Feature Cards - Desktop only */}
            {/* Left card */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
              className="hidden lg:block absolute -left-6 xl:-left-12 top-1/4 z-30"
            >
              <div className="flex items-center gap-3 px-4 xl:px-5 py-3 xl:py-4 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl shadow-black/10 dark:shadow-black/40 border border-black/5 dark:border-white/10 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Icon name="shield-check" size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">7/24 Koruma</div>
                  <div className="text-xs text-foreground-muted">Kesintisiz izleme</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
              className="hidden lg:block absolute -right-6 xl:-right-12 top-1/3 z-30"
            >
              <div className="flex items-center gap-3 px-4 xl:px-5 py-3 xl:py-4 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl shadow-black/10 dark:shadow-black/40 border border-black/5 dark:border-white/10 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <Icon name="cpu" size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">AI Destekli</div>
                  <div className="text-xs text-foreground-muted">Akıllı algılama</div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom notification card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, type: "spring", stiffness: 100 }}
              className="hidden sm:block absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 z-30"
            >
              <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl shadow-black/15 dark:shadow-black/50 border border-black/5 dark:border-white/10 hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                  <Icon name="bell" size={16} className="text-white" />
                </div>
                <div className="pr-2 sm:pr-4">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Anlık Bildirimler</div>
                  <div className="text-[10px] sm:text-xs text-foreground-muted">Tüm cihazlarınıza anında uyarı</div>
                </div>
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                    <Icon name="smartphone" size={10} className="text-foreground-muted" />
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                    <Icon name="laptop" size={10} className="text-foreground-muted" />
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 border-2 border-white dark:border-neutral-900 items-center justify-center">
                    <Icon name="watch" size={10} className="text-foreground-muted" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Mobile Feature Cards - Show below image on mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:hidden px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-neutral-900 shadow-lg border border-black/5 dark:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md shadow-green-500/20">
                <Icon name="shield-check" size={18} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-foreground">7/24</div>
                <div className="text-[10px] text-foreground-muted">Koruma</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-neutral-900 shadow-lg border border-black/5 dark:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-md shadow-red-500/20">
                <Icon name="cpu" size={18} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-foreground">AI</div>
                <div className="text-[10px] text-foreground-muted">Destekli</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-neutral-900 shadow-lg border border-black/5 dark:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Icon name="bell" size={18} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-foreground">Anlık</div>
                <div className="text-[10px] text-foreground-muted">Bildirim</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
