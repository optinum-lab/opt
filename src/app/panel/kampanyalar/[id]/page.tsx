/**
 * Kampanya Düzenleme Sayfası
 * Panel: /panel/kampanyalar/[id]
 */

import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KampanyaForm } from '../KampanyaForm';

export const metadata: Metadata = {
  title: 'Kampanya Düzenle | Yönetim Paneli',
  robots: 'noindex, nofollow',
};

interface Kampanya {
  id: number;
  baslik: string;
  slug: string;
  aciklama: string | null;
  gorsel: string | null;
  icon: string | null;
  link: string | null;
  sira: number;
  aktif: boolean;
  fiyat_usd: string | null;
  fiyat: string | null;
  eski_fiyat: string | null;
  badge: string | null;
  renk: string | null;
  ozellikler: string[] | null;
  detay_baslik: string | null;
  detay_aciklama: string | null;
  detay_icerik: string | null;
  paket_icerigi: string[] | null;
  teknik_ozellikler: string[] | null;
  avantajlar: string[] | null;
  sss: { soru: string; cevap: string }[] | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function KampanyaDuzenlePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('kampanyalar')
    .select('*')
    .eq('id', id)
    .single();

  const kampanya = data as Kampanya | null;

  if (error || !kampanya) {
    notFound();
  }

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
          <h1 className="text-2xl font-bold text-foreground">Kampanya Düzenle</h1>
          <p className="text-foreground-secondary mt-1">
            {kampanya.baslik}
          </p>
        </div>
      </div>

      {/* Form */}
      <KampanyaForm kampanya={kampanya} />
    </div>
  );
}
