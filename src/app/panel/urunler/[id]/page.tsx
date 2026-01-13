/**
 * Ürün Düzenleme Sayfası
 * Panel: /panel/urunler/[id]
 */

import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { UrunForm } from '../UrunForm';

export const metadata: Metadata = {
  title: 'Ürün Düzenle | Yönetim Paneli',
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
  kisa_aciklama: string | null;
  uzun_aciklama: string | null;
  stok_durumu: string | null;
  aktif: boolean;
  one_cikan: boolean;
  kampanya_id: number | null;
}

interface Kampanya {
  id: number;
  baslik: string;
  slug: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UrunDuzenlePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Ürün ve kampanyaları paralel çek
  const [{ data: urunData, error }, { data: kampanyalarData }] = await Promise.all([
    supabase
      .from('urunler')
      .select('*')
      .eq('id', id)
      .single(),
    supabase
      .from('kampanyalar')
      .select('id, baslik, slug')
      .eq('aktif', true)
      .order('sira', { ascending: true }),
  ]);

  const urun = urunData as Urun | null;
  const kampanyalar = (kampanyalarData || []) as Kampanya[];

  if (error || !urun) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/panel/urunler"
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ürün Düzenle</h1>
          <p className="text-foreground-secondary mt-1">
            {urun.ad}
          </p>
        </div>
      </div>

      {/* Form */}
      <UrunForm urun={urun} kampanyalar={kampanyalar} />
    </div>
  );
}
