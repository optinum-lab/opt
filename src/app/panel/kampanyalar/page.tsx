/**
 * Kampanya Listesi Sayfası
 * Panel: /panel/kampanyalar
 */

import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { KampanyaSil } from './KampanyaSil';

export const metadata: Metadata = {
  title: 'Kampanyalar | Yönetim Paneli',
  robots: 'noindex, nofollow',
};

export default async function KampanyalarPage() {
  const supabase = await createClient();
  
  const { data: kampanyalar, error } = await supabase
    .from('kampanyalar')
    .select('*')
    .order('sira', { ascending: true });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kampanyalar</h1>
          <p className="text-foreground-secondary mt-1">
            Kampanyalarımız sayfasında görüntülenen kategorileri yönetin
          </p>
        </div>
        <Link
          href="/panel/kampanyalar/yeni"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Kampanya
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          Kampanyalar yüklenirken hata oluştu: {error.message}
        </div>
      )}

      {/* Empty State */}
      {!error && (!kampanyalar || kampanyalar.length === 0) && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-neutral-50/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Henüz kampanya yok</h3>
          <p className="text-foreground-secondary text-center mb-6 max-w-md">
            Kampanyalarımız sayfasında görüntülenecek kategorileri buradan ekleyebilirsiniz.
          </p>
          <Link
            href="/panel/kampanyalar/yeni"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            İlk Kampanyayı Ekle
          </Link>
        </div>
      )}

      {/* Kampanya Listesi */}
      {kampanyalar && kampanyalar.length > 0 && (
        <div className="grid gap-4">
          {kampanyalar.map((kampanya, index) => (
            <div
              key={kampanya.id}
              className="group relative p-4 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10 hover:border-red-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Sıra */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center text-sm font-medium text-foreground-secondary">
                  {index + 1}
                </div>

                {/* Görsel */}
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-white/10">
                  {kampanya.gorsel ? (
                    <Image
                      src={kampanya.gorsel}
                      alt={kampanya.baslik}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bilgiler */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{kampanya.baslik}</h3>
                  <p className="text-sm text-foreground-secondary truncate">{kampanya.aciklama || 'Açıklama yok'}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-foreground-muted">/{kampanya.slug}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${kampanya.aktif ? 'bg-green-500/10 text-green-500' : 'bg-neutral-500/10 text-neutral-500'}`}>
                      {kampanya.aktif ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>

                {/* Aksiyonlar */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/panel/kampanyalar/${kampanya.id}`}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground-secondary hover:text-foreground transition-colors"
                    title="Düzenle"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <KampanyaSil id={kampanya.id} baslik={kampanya.baslik} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
