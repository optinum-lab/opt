/**
 * Giriş Sayfası
 * Site tasarımıyla uyumlu modern giriş ekranı
 */

import { Metadata } from 'next';
import GirisForm from './GirisForm';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Giriş | Mat Tech',
  robots: 'noindex, nofollow',
};

export default function GirisPage() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background py-20">
      {/* Sophisticated Background - Site ile uyumlu */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-red-500/20 via-rose-500/10 to-transparent rounded-full blur-[120px]" />
        
        {/* Secondary accent orb */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-red-400/15 via-rose-500/10 to-transparent rounded-full blur-[100px]" />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-foreground">Hoş </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-rose-400 bg-clip-text text-transparent">Geldiniz</span>
            </h1>
          </div>

          {/* Login Card - Glassmorphism */}
          <div className="relative">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-400/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl shadow-lg shadow-red-500/25">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Giriş Yap</h2>
                  <p className="text-sm text-foreground-secondary">E-posta ve şifrenizle devam edin</p>
                </div>
              </div>
              
              <GirisForm />
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-foreground-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>Güvenli bağlantı ile korunmaktadır</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
