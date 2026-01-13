/**
 * Panel Dashboard Ana Sayfa
 * Site tasarımıyla uyumlu modern dashboard
 */

import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard | Yönetim Paneli',
  robots: 'noindex, nofollow',
};

export default async function PanelDashboard() {
  const supabase = await createClient();
  
  // İstatistikleri çek
  const [
    { count: urunSayisi },
    { count: kategoriSayisi },
    { count: kampanyaSayisi },
  ] = await Promise.all([
    supabase.from('urunler').select('*', { count: 'exact', head: true }),
    supabase.from('kategoriler').select('*', { count: 'exact', head: true }),
    supabase.from('kampanyalar').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    {
      label: 'Toplam Ürün',
      value: urunSayisi || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-red-500 to-rose-500',
      shadowColor: 'shadow-red-500/25',
    },
    {
      label: 'Kategori',
      value: kategoriSayisi || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: 'from-rose-500 to-pink-500',
      shadowColor: 'shadow-rose-500/25',
    },
    {
      label: 'Kampanya',
      value: kampanyaSayisi || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      gradient: 'from-red-600 to-red-500',
      shadowColor: 'shadow-red-600/25',
    },
  ];

  const quickActions = [
    {
      label: 'Yeni Ürün',
      href: '/panel/urunler/yeni',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Yeni Kategori',
      href: '/panel/kategoriler/yeni',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Yeni Kampanya',
      href: '/panel/kampanyalar/yeni',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Site Ayarları',
      href: '/panel/ayarlar',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground-secondary mt-2">Yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative group"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`} />
            
            <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white shadow-lg ${stat.shadowColor}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-foreground-secondary mt-1">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-rose-500/10 to-red-400/10 rounded-2xl blur-xl opacity-50" />
        
        <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-neutral-200/50 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground">Hızlı İşlemler</h2>
            <p className="text-sm text-foreground-secondary mt-1">Sık kullanılan işlemlere hızlıca erişin</p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl hover:bg-gradient-to-r hover:from-red-500/10 hover:via-rose-500/10 hover:to-red-400/10 border border-transparent hover:border-red-500/20 transition-all duration-300"
              >
                <div className="p-2.5 bg-gradient-to-br from-red-500/10 to-rose-500/10 group-hover:from-red-500 group-hover:to-rose-500 rounded-xl text-red-500 group-hover:text-white transition-all duration-300">
                  {action.icon}
                </div>
                <span className="font-medium text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
