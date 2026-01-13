'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';

// Güvenlik sistemleri için uygun iconlar
const AVAILABLE_ICONS = [
  { name: 'Camera', label: 'Kamera' },
  { name: 'Video', label: 'Video' },
  { name: 'Shield', label: 'Kalkan' },
  { name: 'ShieldCheck', label: 'Onaylı Kalkan' },
  { name: 'Lock', label: 'Kilit' },
  { name: 'Unlock', label: 'Açık Kilit' },
  { name: 'Key', label: 'Anahtar' },
  { name: 'Fingerprint', label: 'Parmak İzi' },
  { name: 'ScanFace', label: 'Yüz Tanıma' },
  { name: 'Eye', label: 'Göz' },
  { name: 'Bell', label: 'Zil' },
  { name: 'BellRing', label: 'Çalan Zil' },
  { name: 'Siren', label: 'Siren' },
  { name: 'AlertTriangle', label: 'Uyarı' },
  { name: 'Car', label: 'Araç' },
  { name: 'ParkingSquare', label: 'Park' },
  { name: 'DoorOpen', label: 'Kapı' },
  { name: 'DoorClosed', label: 'Kapalı Kapı' },
  { name: 'Flame', label: 'Yangın' },
  { name: 'Wifi', label: 'WiFi' },
  { name: 'Radio', label: 'Radyo' },
  { name: 'Monitor', label: 'Monitör' },
  { name: 'Cpu', label: 'İşlemci' },
  { name: 'HardDrive', label: 'Hard Disk' },
  { name: 'Server', label: 'Sunucu' },
  { name: 'Network', label: 'Ağ' },
  { name: 'Router', label: 'Router' },
  { name: 'Plug', label: 'Priz' },
  { name: 'Battery', label: 'Batarya' },
  { name: 'BatteryFull', label: 'Dolu Batarya' },
  { name: 'Zap', label: 'Elektrik' },
  { name: 'Settings', label: 'Ayarlar' },
  { name: 'Cog', label: 'Dişli' },
  { name: 'Wrench', label: 'Anahtar' },
  { name: 'Building', label: 'Bina' },
  { name: 'Building2', label: 'Bina 2' },
  { name: 'Home', label: 'Ev' },
  { name: 'Factory', label: 'Fabrika' },
  { name: 'Warehouse', label: 'Depo' },
  { name: 'Phone', label: 'Telefon' },
  { name: 'Smartphone', label: 'Akıllı Telefon' },
  { name: 'Tablet', label: 'Tablet' },
  { name: 'Scan', label: 'Tarama' },
  { name: 'QrCode', label: 'QR Kod' },
  { name: 'CreditCard', label: 'Kart' },
  { name: 'IdCard', label: 'Kimlik Kartı' },
  { name: 'Users', label: 'Kullanıcılar' },
  { name: 'UserCheck', label: 'Onaylı Kullanıcı' },
  { name: 'CircleCheck', label: 'Onay' },
  { name: 'CircleX', label: 'İptal' },
  { name: 'Package', label: 'Paket' },
  { name: 'Box', label: 'Kutu' },
  { name: 'Boxes', label: 'Kutular' },
];

// Dinamik icon render
function IconPreview({ iconName, className }: { iconName: string; className?: string }) {
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

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
}

interface KampanyaFormProps {
  kampanya?: Kampanya;
}

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

export function KampanyaForm({ kampanya }: KampanyaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    baslik: kampanya?.baslik || '',
    slug: kampanya?.slug || '',
    aciklama: kampanya?.aciklama || '',
    gorsel: kampanya?.gorsel || '',
    icon: kampanya?.icon || '',
    link: kampanya?.link || '',
    sira: kampanya?.sira || 0,
    aktif: kampanya?.aktif ?? true,
  });

  const handleBaslikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const baslik = e.target.value;
    setFormData(prev => ({
      ...prev,
      baslik,
      slug: prev.slug || slugify(baslik),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      if (kampanya) {
        // Güncelle
        const { error } = await supabase
          .from('kampanyalar')
          .update({
            baslik: formData.baslik,
            slug: formData.slug,
            aciklama: formData.aciklama || null,
            gorsel: formData.gorsel || null,
            icon: formData.icon || null,
            link: formData.link || null,
            sira: formData.sira,
            aktif: formData.aktif,
            updated_at: new Date().toISOString(),
          })
          .eq('id', kampanya.id);

        if (error) throw error;
      } else {
        // Yeni ekle
        const { error } = await supabase
          .from('kampanyalar')
          .insert({
            baslik: formData.baslik,
            slug: formData.slug,
            aciklama: formData.aciklama || null,
            gorsel: formData.gorsel || null,
            icon: formData.icon || null,
            link: formData.link || null,
            sira: formData.sira,
            aktif: formData.aktif,
          });

        if (error) throw error;
      }

      router.push('/panel/kampanyalar');
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sol Kolon - Ana Bilgiler */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Temel Bilgiler</h2>
            
            {/* Başlık */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Başlık <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.baslik}
                onChange={handleBaslikChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                placeholder="Kampanya başlığı"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                placeholder="kampanya-url-slug"
              />
              <p className="text-xs text-foreground-muted">
                Kategori sayfasına yönlendirilecek: /urunler/kategori/{formData.slug || 'slug'}
              </p>
            </div>

            {/* Açıklama */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Açıklama
              </label>
              <textarea
                value={formData.aciklama}
                onChange={(e) => setFormData(prev => ({ ...prev, aciklama: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                placeholder="Kısa açıklama"
              />
            </div>

            {/* Link (Opsiyonel) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Özel Link (Opsiyonel)
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                placeholder="/ozel-sayfa veya https://..."
              />
              <p className="text-xs text-foreground-muted">
                Boş bırakırsanız slug kullanılır
              </p>
            </div>
          </div>

          {/* Sıra ve Durum */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ayarlar</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Sıra */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Sıra
                </label>
                <input
                  type="number"
                  value={formData.sira}
                  onChange={(e) => setFormData(prev => ({ ...prev, sira: parseInt(e.target.value) || 0 }))}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                />
              </div>

              {/* Aktif */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Durum
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, aktif: !prev.aktif }))}
                  className={`w-full px-4 py-3 rounded-xl border font-medium transition-all ${
                    formData.aktif
                      ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                      : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-foreground-secondary'
                  }`}
                >
                  {formData.aktif ? 'Aktif' : 'Pasif'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Görsel */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Görsel</h2>
            
            {/* Önizleme */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 mb-4">
              {formData.gorsel ? (
                <>
                  <Image
                    src={formData.gorsel}
                    alt="Kampanya görseli"
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
                if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {
                  setFormData(prev => ({ ...prev, gorsel: result.info.secure_url as string }));
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
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-foreground-secondary">
                veya URL girin
              </label>
              <input
                type="url"
                value={formData.gorsel}
                onChange={(e) => setFormData(prev => ({ ...prev, gorsel: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-sm"
                placeholder="https://example.com/gorsel.jpg"
              />
            </div>
          </div>

          {/* Icon (Opsiyonel) */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">İkon (Opsiyonel)</h2>
            
            {/* Seçili Icon Önizleme */}
            {formData.icon && (
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white">
                  <IconPreview iconName={formData.icon} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{formData.icon}</p>
                  <p className="text-xs text-foreground-secondary">Seçili ikon</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: '' }))}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-foreground-secondary hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Icon Grid */}
            <div className="max-h-64 overflow-y-auto rounded-xl border border-neutral-200 dark:border-white/10">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 p-2">
                {AVAILABLE_ICONS.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon: icon.name }))}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                      formData.icon === icon.name
                        ? 'bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25'
                        : 'hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground-secondary hover:text-foreground'
                    }`}
                    title={icon.label}
                  >
                    <IconPreview iconName={icon.name} className="w-5 h-5" />
                    <span className="text-[10px] mt-1 truncate w-full text-center">{icon.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-foreground-muted mt-2">Bir ikon seçin veya boş bırakın</p>
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
          {loading ? 'Kaydediliyor...' : kampanya ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}
