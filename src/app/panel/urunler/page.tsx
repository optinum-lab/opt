/**
 * Ürün Listesi Sayfası
 * Panel: /panel/urunler
 */

import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { UrunSil } from './UrunSil';

export const metadata: Metadata = {
  title: 'Ürünler | Yönetim Paneli',
  robots: 'noindex, nofollow',
};

interface Urun {
  id: number;
  ad: string;
  slug: string;
  kategoriler: string[];
  uretici: string | null;
  gorsel: string | null;
  fiyat: number | null;
  para_birimi: string | null;
  stok_durumu: string | null;
  aktif: boolean;
  one_cikan: boolean;
  kampanya_id: number | null;
}

interface Kampanya {
  id: number;
  baslik: string;
}

export default async function UrunlerPage() {
  const supabase = await createClient();
  
  // Ürünleri ve kampanya kategorilerini çek
  const [{ data: urunlerData, error }, { data: kampanyalarData }] = await Promise.all([
    supabase
      .from('urunler')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('kampanyalar')
      .select('id, baslik')
      .eq('aktif', true)
      .order('sira', { ascending: true }),
  ]);

  const urunler = (urunlerData || []) as Urun[];
  const kampanyalar = (kampanyalarData || []) as Kampanya[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ürünler</h1>
          <p className="text-foreground-secondary mt-1">
            Tüm ürünleri yönetin, ekleyin ve düzenleyin
          </p>
        </div>
        <Link
          href="/panel/urunler/yeni"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Ürün
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          Ürünler yüklenirken hata oluştu: {error.message}
        </div>
      )}

      {/* Empty State */}
      {!error && (!urunler || urunler.length === 0) && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-neutral-50/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Henüz ürün yok</h3>
          <p className="text-foreground-secondary text-center mb-6 max-w-md">
            Ürün kataloğunuzu oluşturmaya başlayın.
          </p>
          <Link
            href="/panel/urunler/yeni"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            İlk Ürünü Ekle
          </Link>
        </div>
      )}

      {/* Ürün Listesi */}
      {urunler && urunler.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider hidden md:table-cell">
                  Üretici
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider hidden lg:table-cell">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-foreground-secondary uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-white/10 bg-white dark:bg-transparent">
              {urunler.map((urun) => {
                const kategori = kampanyalar?.find(k => k.id === urun.kampanya_id);
                return (
                  <tr key={urun.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-white/10">
                          {urun.gorsel ? (
                            <Image
                              src={urun.gorsel}
                              alt={urun.ad}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{urun.ad}</p>
                          <p className="text-xs text-foreground-muted truncate">/{urun.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-foreground-secondary">{urun.uretici || '-'}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      {kategori ? (
                        <span className="inline-flex px-2 py-1 text-xs rounded-lg bg-red-500/10 text-red-500">
                          {kategori.baslik}
                        </span>
                      ) : (
                        <span className="text-sm text-foreground-muted">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-foreground">
                        {urun.fiyat ? `${urun.fiyat.toLocaleString('tr-TR')} ${urun.para_birimi || '₺'}` : 'Fiyat yok'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        urun.aktif 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-neutral-500/10 text-neutral-500'
                      }`}>
                        {urun.aktif ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/panel/urunler/${urun.id}`}
                          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground-secondary hover:text-foreground transition-colors"
                          title="Düzenle"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <UrunSil id={urun.id} ad={urun.ad} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
