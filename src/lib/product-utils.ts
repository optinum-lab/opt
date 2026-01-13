/**
 * Ürün Veritabanı Tipleri ve Yardımcı Fonksiyonlar
 * Supabase Backend
 */

import { createClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@supabase/supabase-js';

export interface TeknikOzellikleri {
  [key: string]: string | number;
}

export interface Urun {
  id: number;
  ad: string;
  slug: string;
  kategoriler: string[];
  uretici: string;
  gorsel: string;
  fiyat: number;
  para_birimi: string;
  stok_durumu: string;
  kisa_aciklama: string | null;
  uzun_aciklama: string | null;
  ozellikleri: string[];
  teknik_ozellikler: TeknikOzellikleri;
  aktif: boolean;
  one_cikan: boolean;
  kampanya_id: number | null;
  sira: number;
  created_at: string;
  updated_at: string;
  // Legacy alias
  aciklama?: string;
}

export interface Kategori {
  id: string;
  ad: string;
  slug: string;
}

export const varsayilanKategoriler: Kategori[] = [
  { id: '1', ad: 'Kayıt Cihazı', slug: 'kayit-cihazi' },
  { id: '2', ad: 'Kamera', slug: 'kamera' },
  { id: '3', ad: 'Alarm Sistemi', slug: 'alarm-sistemi' },
  { id: '4', ad: 'Access Kontrol', slug: 'access-kontrol' },
  { id: '5', ad: 'Ekipmanlar', slug: 'ekipmanlar' },
];

function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createServerClient(url, key);
}

export async function tumUrunleriGetir(): Promise<Urun[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .order('sira', { ascending: true });
  if (error) { console.error('Ürünler hatası:', error); return []; }
  return data || [];
}

export async function tumUrunleriGetirServer(): Promise<Urun[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .order('sira', { ascending: true });
  if (error) { console.error('Ürünler hatası:', error); return []; }
  return data || [];
}

export async function oneCikanUrunleriGetir(limit: number = 6): Promise<Urun[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .eq('one_cikan', true)
    .order('sira', { ascending: true })
    .limit(limit);
  if (error) { console.error('Öne çıkan hatası:', error); return []; }
  return data || [];
}

export async function urunGetirBySlug(slug: string): Promise<Urun | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { console.error('Ürün hatası:', error); return null; }
  return data;
}

export async function urunGetirBySlugServer(slug: string): Promise<Urun | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { console.error('Ürün hatası:', error); return null; }
  return data;
}

export async function urunleriKategoriyeGoreGetir(kategoriSlug: string): Promise<Urun[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .contains('kategoriler', [kategoriSlug])
    .order('sira', { ascending: true });
  if (error) { console.error('Kategori hatası:', error); return []; }
  return data || [];
}

export async function urunleriKategoriyeGoreGetirServer(kategoriSlug: string): Promise<Urun[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .contains('kategoriler', [kategoriSlug])
    .order('sira', { ascending: true });
  if (error) { console.error('Kategori hatası:', error); return []; }
  return data || [];
}

export async function urunleriKampanyayaGoreGetir(kampanyaId: number): Promise<Urun[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .eq('kampanya_id', kampanyaId)
    .order('sira', { ascending: true });
  if (error) { console.error('Kampanya hatası:', error); return []; }
  return data || [];
}

export async function urunAra(query: string): Promise<Urun[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('*')
    .eq('aktif', true)
    .or(`ad.ilike.%${query}%,uretici.ilike.%${query}%,kisa_aciklama.ilike.%${query}%`)
    .order('sira', { ascending: true });
  if (error) { console.error('Arama hatası:', error); return []; }
  return data || [];
}

export async function tumSluglarıGetirServer(): Promise<string[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('urunler')
    .select('slug')
    .eq('aktif', true);
  if (error) { console.error('Slug hatası:', error); return []; }
  return data?.map(u => u.slug) || [];
}

// Legacy helpers (memory'de çalışır)
export function urunleriKategoriyeGoreFiltrele(urunler: Urun[], kategoriSlug: string): Urun[] {
  return urunler.filter((urun) => urun.kategoriler.some((k) => k.includes(kategoriSlug)));
}

export function urunBulSlugtan(urunler: Urun[], slug: string): Urun | undefined {
  return urunler.find((u) => u.slug === slug);
}

export function urunleriAralikFiltrele(urunler: Urun[], minFiyat?: number, maxFiyat?: number): Urun[] {
  return urunler.filter((urun) => {
    if (minFiyat && urun.fiyat < minFiyat) return false;
    if (maxFiyat && urun.fiyat > maxFiyat) return false;
    return true;
  });
}

export function urunleriAramaYap(urunler: Urun[], terim: string): Urun[] {
  const termLower = terim.toLowerCase();
  return urunler.filter((urun) =>
    urun.ad.toLowerCase().includes(termLower) ||
    (urun.kisa_aciklama?.toLowerCase().includes(termLower)) ||
    urun.uretici.toLowerCase().includes(termLower)
  );
}

export function stokRengiBul(stok: string): string {
  switch (stok.toLowerCase()) {
    case 'stokta':
    case 'uygun':
      return 'text-green-500';
    case 'sınırlı':
    case 'limited':
      return 'text-yellow-500';
    case 'sipariş üzerine':
      return 'text-orange-500';
    case 'tükendi':
    case 'yok':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

export function fiyatiFormatla(fiyat: number, paraBirimi: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: paraBirimi,
  }).format(fiyat);
}
