'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

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

interface UrunFormProps {
  urun?: Urun;
  kampanyalar: Kampanya[];
}

// Sabit kategoriler
const URUN_KATEGORILERI = [
  { slug: 'kayit-cihazi', ad: 'Kayıt Cihazı' },
  { slug: 'kamera', ad: 'Kamera' },
  { slug: 'alarm-sistemi', ad: 'Alarm Sistemi' },
  { slug: 'access-kontrol', ad: 'Access Kontrol' },
  { slug: 'ekipmanlar', ad: 'Ekipmanlar' },
];

// Slug oluştur
function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
  };
  
  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function UrunForm({ urun, kampanyalar }: UrunFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    ad: urun?.ad || '',
    slug: urun?.slug || '',
    kategoriler: urun?.kategoriler || [] as string[],
    uretici: urun?.uretici || '',
    gorsel: urun?.gorsel || '',
    fiyat: urun?.fiyat?.toString() || '',
    kisa_aciklama: urun?.kisa_aciklama || '',
    uzun_aciklama: urun?.uzun_aciklama || '',
    stok_durumu: urun?.stok_durumu || 'stokta',
    aktif: urun?.aktif ?? true,
    one_cikan: urun?.one_cikan ?? false,
    kampanya_id: urun?.kampanya_id?.toString() || '',
  });

  // Kategori toggle fonksiyonu
  const toggleKategori = (slug: string) => {
    setFormData(prev => ({
      ...prev,
      kategoriler: prev.kategoriler.includes(slug)
        ? prev.kategoriler.filter(k => k !== slug)
        : [...prev.kategoriler, slug]
    }));
  };

  const handleAdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ad = e.target.value;
    setFormData(prev => ({
      ...prev,
      ad,
      slug: prev.slug || slugify(ad),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const data = {
        ad: formData.ad,
        slug: formData.slug,
        kategoriler: formData.kategoriler,
        uretici: formData.uretici || null,
        gorsel: formData.gorsel || null,
        fiyat: formData.fiyat ? parseFloat(formData.fiyat) : null,
        para_birimi: 'USD',
        kisa_aciklama: formData.kisa_aciklama || null,
        uzun_aciklama: formData.uzun_aciklama || null,
        stok_durumu: formData.stok_durumu || 'stokta',
        aktif: formData.aktif,
        one_cikan: formData.one_cikan,
        kampanya_id: formData.kampanya_id ? parseInt(formData.kampanya_id) : null,
        updated_at: new Date().toISOString(),
      };

      if (urun) {
        const { error } = await supabase
          .from('urunler')
          .update(data as never)
          .eq('id', urun.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('urunler')
          .insert(data as never);
        if (error) throw error;
      }

      router.push('/panel/urunler');
      router.refresh();
    } catch (err: unknown) {
      console.error('Form hatası:', err);
      const errorMessage = err instanceof Error ? err.message : 'Bir hata oluştu';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sol Kolon - Ana Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temel Bilgiler */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Temel Bilgiler</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Ürün Adı */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Ürün Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ad}
                  onChange={handleAdChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                  placeholder="Ürün adı"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                  placeholder="urun-slug"
                />
              </div>

              {/* Üretici */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Üretici / Marka
                </label>
                <input
                  type="text"
                  value={formData.uretici}
                  onChange={(e) => setFormData(prev => ({ ...prev, uretici: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                  placeholder="Dahua, Hikvision..."
                />
              </div>

              {/* Kısa Açıklama */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Kısa Açıklama
                </label>
                <textarea
                  value={formData.kisa_aciklama}
                  onChange={(e) => setFormData(prev => ({ ...prev, kisa_aciklama: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                  placeholder="Ürün hakkında kısa açıklama..."
                />
              </div>

              {/* Uzun Açıklama */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Detaylı Açıklama
                </label>
                <textarea
                  value={formData.uzun_aciklama}
                  onChange={(e) => setFormData(prev => ({ ...prev, uzun_aciklama: e.target.value }))}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                  placeholder="Ürün hakkında detaylı açıklama..."
                />
              </div>
            </div>
          </div>

          {/* Fiyat ve Stok */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Fiyat & Stok</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* USD Fiyat */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Fiyat (USD) <span className="text-foreground-muted text-xs">Dolar cinsinden</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.fiyat}
                    onChange={(e) => setFormData(prev => ({ ...prev, fiyat: e.target.value }))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-foreground-muted">
                  Sitede otomatik TL karşılığı gösterilecek
                </p>
              </div>

              {/* Stok Durumu */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Stok Durumu
                </label>
                <select
                  value={formData.stok_durumu}
                  onChange={(e) => setFormData(prev => ({ ...prev, stok_durumu: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                >
                  <option value="stokta">Stokta</option>
                  <option value="sinirli">Sınırlı Stok</option>
                  <option value="tukendi">Tükendi</option>
                  <option value="siparis">Siparişe Özel</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ürün Kategorileri */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ürün Kategorileri</h2>
            
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {URUN_KATEGORILERI.map((kat) => (
                <button
                  key={kat.slug}
                  type="button"
                  onClick={() => toggleKategori(kat.slug)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                    formData.kategoriler.includes(kat.slug)
                      ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                      : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-foreground-secondary hover:bg-neutral-100 dark:hover:bg-white/10'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    formData.kategoriler.includes(kat.slug)
                      ? 'border-red-500 bg-red-500'
                      : 'border-neutral-300 dark:border-white/30'
                  }`}>
                    {formData.kategoriler.includes(kat.slug) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{kat.ad}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-foreground-muted mt-3">
              Ürünün görüntüleneceği kategorileri seçin (birden fazla seçilebilir)
            </p>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="space-y-6">
          {/* Görsel */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ürün Görseli</h2>
            
            {/* Önizleme */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 mb-4">
              {formData.gorsel ? (
                <>
                  <Image
                    src={formData.gorsel}
                    alt="Ürün görseli"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gorsel: '' }))}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground-muted">
                  <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Görsel yok</span>
                </div>
              )}
            </div>

            {/* Cloudinary Upload */}
            <CldUploadWidget
              uploadPreset="mattech_upload"
              options={{
                maxFiles: 1,
                resourceType: 'image',
                sources: ['local', 'url', 'camera'],
                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                maxFileSize: 5000000,
              }}
              onSuccess={(result) => {
                if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
                  setFormData(prev => ({ ...prev, gorsel: (result.info as { secure_url: string }).secure_url }));
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/10 text-foreground font-medium hover:bg-neutral-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Görsel Yükle
                </button>
              )}
            </CldUploadWidget>

            {/* Manuel URL */}
            <div className="mt-3">
              <input
                type="url"
                value={formData.gorsel}
                onChange={(e) => setFormData(prev => ({ ...prev, gorsel: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm"
                placeholder="veya URL girin..."
              />
            </div>
          </div>

          {/* Kampanya Kategorisi */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Kategori</h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Kampanya Kategorisi
              </label>
              <select
                value={formData.kampanya_id}
                onChange={(e) => setFormData(prev => ({ ...prev, kampanya_id: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
              >
                <option value="">Kategori seçin...</option>
                {kampanyalar.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.baslik}
                  </option>
                ))}
              </select>
              <p className="text-xs text-foreground-muted">
                Ürünün görüntüleneceği kategori
              </p>
            </div>
          </div>

          {/* Ayarlar */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ayarlar</h2>
            
            <div className="space-y-3">
              {/* Aktif */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, aktif: !prev.aktif }))}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  formData.aktif
                    ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                    : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-foreground-secondary'
                }`}
              >
                <span className="font-medium">Aktif</span>
                <div className={`w-10 h-6 rounded-full transition-colors ${formData.aktif ? 'bg-green-500' : 'bg-neutral-300 dark:bg-white/20'}`}>
                  <div className={`w-4 h-4 mt-1 rounded-full bg-white transition-transform ${formData.aktif ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </button>

              {/* Öne Çıkan */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, one_cikan: !prev.one_cikan }))}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  formData.one_cikan
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-foreground-secondary'
                }`}
              >
                <span className="font-medium">Öne Çıkan</span>
                <div className={`w-10 h-6 rounded-full transition-colors ${formData.one_cikan ? 'bg-amber-500' : 'bg-neutral-300 dark:bg-white/20'}`}>
                  <div className={`w-4 h-4 mt-1 rounded-full bg-white transition-transform ${formData.one_cikan ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-white/10 text-foreground font-medium hover:bg-neutral-200 dark:hover:bg-white/20 transition-all"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-50 transition-all"
        >
          {loading ? 'Kaydediliyor...' : urun ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}
