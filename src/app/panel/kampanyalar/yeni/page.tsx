/**
 * Yeni Kampanya Ekleme Sayfası
 * Panel: /panel/kampanyalar/yeni
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { KampanyaForm } from '../KampanyaForm';

export const metadata: Metadata = {
  title: 'Yeni Kampanya | Yönetim Paneli',
  robots: 'noindex, nofollow',
};

export default function YeniKampanyaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/panel/kampanyalar"
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Yeni Kampanya</h1>
          <p className="text-foreground-secondary mt-1">
            Kampanyalarımız sayfasına yeni kategori ekleyin
          </p>
        </div>
      </div>

      {/* Form */}
      <KampanyaForm />
    </div>
  );
}
