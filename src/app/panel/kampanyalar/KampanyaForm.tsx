'use client';

import { useState, useEffect } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[iconName];
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
  // USD Bazlı Fiyatlandırma
  fiyat_usd: string | null; // Ana fiyat (USD)
  eski_fiyat_usd: string | null; // İndirimli fiyat (USD)
  fiyat: string | null; // Deprecated - uyumluluk için
  eski_fiyat: string | null; // Deprecated - uyumluluk için
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
}

interface KampanyaFormProps {
  kampanya?: Kampanya;
}

// SEO odaklı slug oluştur
function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
    'â': 'a', 'î': 'i', 'û': 'u', 'ê': 'e',
    'Â': 'a', 'Î': 'i', 'Û': 'u', 'Ê': 'e'
  };
  
  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Aksanları kaldır
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldır
    .replace(/\s+/g, '-') // Boşlukları tire yap
    .replace(/-+/g, '-') // Ardışık tireleri tekile indir
    .replace(/^-|-$/g, '') // Baş ve sondaki tireleri kaldır
    .substring(0, 100); // Max 100 karakter (SEO için ideal)
}

// Renk seçenekleri
const RENK_SECENEKLERI = [
  { value: 'red', label: 'Kırmızı', color: 'bg-red-500' },
  { value: 'blue', label: 'Mavi', color: 'bg-blue-500' },
  { value: 'green', label: 'Yeşil', color: 'bg-emerald-500' },
  { value: 'purple', label: 'Mor', color: 'bg-purple-500' },
  { value: 'orange', label: 'Turuncu', color: 'bg-orange-500' },
  { value: 'teal', label: 'Turkuaz', color: 'bg-teal-500' },
];

export function KampanyaForm({ kampanya }: KampanyaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'temel' | 'detay' | 'icerik'>('temel');
  
  // Mevcut kampanyada paket içeriğinden otomatik özellikleri hesapla
  const getAutoOzellikler = (paketIcerigiText: string) => {
    if (!paketIcerigiText) return '';
    const paketItems = paketIcerigiText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 4);
    return paketItems.join('\n');
  };

  // Kısa açıklama oluştur - Paket içeriğinden ilk 2-3 öğeyi özetle
  const getAutoAciklama = (paketIcerigiText: string, baslik: string) => {
    if (!paketIcerigiText) {
      // Paket içeriği yoksa başlıktan basit açıklama oluştur
      return `${baslik} - Profesyonel montaj dahil, 2 yıl garantili`;
    }
    const paketItems = paketIcerigiText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 3); // İlk 3 öğe
    
    if (paketItems.length > 0) {
      return paketItems.join(' • ') + ' • Montaj Dahil';
    }
    return `${baslik} - Profesyonel montaj dahil, 2 yıl garantili`;
  };

  const getInitialAciklama = () => {
    if (kampanya?.aciklama) {
      return kampanya.aciklama;
    }
    // Açıklama boşsa, paket içeriğinden oluştur
    if (kampanya?.paket_icerigi && kampanya.paket_icerigi.length > 0) {
      return getAutoAciklama(
        kampanya.paket_icerigi.join('\n'), 
        kampanya.baslik || ''
      );
    }
    return '';
  };

  // Mevcut kampanyada boş alanları otomatik doldur
  const getInitialOzellikler = () => {
    if (kampanya?.ozellikler && kampanya.ozellikler.length > 0) {
      return kampanya.ozellikler.join('\n');
    }
    // Özellikler boşsa, paket içeriğinden al
    if (kampanya?.paket_icerigi && kampanya.paket_icerigi.length > 0) {
      return getAutoOzellikler(kampanya.paket_icerigi.join('\n'));
    }
    return '';
  };

  const getInitialDetayAciklama = () => {
    if (kampanya?.detay_aciklama) {
      return kampanya.detay_aciklama;
    }
    // Detay açıklama boşsa, ana açıklamayı kullan
    return kampanya?.aciklama || '';
  };

  const [formData, setFormData] = useState({
    baslik: kampanya?.baslik || '',
    slug: kampanya?.slug || '',
    aciklama: getInitialAciklama(),
    gorsel: kampanya?.gorsel || '',
    icon: kampanya?.icon || '',
    link: kampanya?.link || '',
    sira: kampanya?.sira || 0,
    aktif: kampanya?.aktif ?? true,
    // USD Bazlı Fiyatlandırma
    fiyat_usd: kampanya?.fiyat_usd || '',
    eski_fiyat_usd: kampanya?.eski_fiyat_usd || '',
    badge: kampanya?.badge || '',
    renk: kampanya?.renk || 'red',
    ozellikler: getInitialOzellikler(),
    detay_baslik: kampanya?.detay_baslik || '',
    detay_aciklama: getInitialDetayAciklama(),
    detay_icerik: kampanya?.detay_icerik || '',
    paket_icerigi: (kampanya?.paket_icerigi || []).join('\n'),
    teknik_ozellikler: (kampanya?.teknik_ozellikler || []).join('\n'),
    avantajlar: (kampanya?.avantajlar || []).join('\n'),
    sss: kampanya?.sss || [],
  });

  // Paket içeriği değiştiğinde kart özelliklerini ve açıklamayı otomatik güncelle
  useEffect(() => {
    if (formData.paket_icerigi) {
      const paketItems = formData.paket_icerigi
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      // Kart özelliklerini güncelle (ilk 4 öğe)
      const ozellikler = paketItems.slice(0, 4).join('\n');
      
      // Kısa açıklamayı güncelle (ilk 3 öğe)
      const aciklama = paketItems.length > 0 
        ? paketItems.slice(0, 3).join(' • ') + ' • Montaj Dahil'
        : '';
      
      setFormData(prev => ({
        ...prev,
        ozellikler,
        aciklama
      }));
    }
  }, [formData.paket_icerigi]);

  // Ana açıklama değiştiğinde detay açıklaması boşsa otomatik doldur
  useEffect(() => {
    if (formData.aciklama && !formData.detay_aciklama) {
      setFormData(prev => ({
        ...prev,
        detay_aciklama: formData.aciklama
      }));
    }
  }, [formData.aciklama, formData.detay_aciklama]);

  // Kur state - Sadece önizleme için
  const [usdToTry, setUsdToTry] = useState<number | null>(null);

  // Kur çekme - Exchange API ile fallback destekli
  useEffect(() => {
    fetch('/api/exchange-rate')
      .then(res => res.json())
      .then(data => {
        if (data && data.rate) {
          setUsdToTry(data.rate);
        }
      })
      .catch(() => {
        // Fallback: manuel değer
        setUsdToTry(34.50);
      });
  }, []);

  // Slug'un manuel olarak değiştirilip değiştirilmediğini takip et
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!kampanya?.slug);

  const handleBaslikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const baslik = e.target.value;
    setFormData(prev => ({
      ...prev,
      baslik,
      // Eğer slug manuel değiştirilmediyse otomatik güncelle
      slug: slugManuallyEdited ? prev.slug : slugify(baslik),
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Slug'a yazılan değeri de slugify ile temizle
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    setFormData(prev => ({ ...prev, slug: cleanSlug }));
    setSlugManuallyEdited(true);
  };

  const handleRegenerateSlug = () => {
    setFormData(prev => ({ ...prev, slug: slugify(prev.baslik) }));
    setSlugManuallyEdited(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      // Satır başlarına göre array'e çevir - boş array kontrolü
      const parseLines = (text: string) => {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        return lines.length > 0 ? lines : null;
      };
      
      // SSS validation - boş veya geçersiz ise null
      const validSss = Array.isArray(formData.sss) && formData.sss.length > 0 
        ? formData.sss 
        : null;
      
      const data = {
        baslik: formData.baslik,
        slug: formData.slug,
        aciklama: formData.aciklama || null,
        gorsel: formData.gorsel || null,
        icon: formData.icon || null,
        link: formData.link || null,
        sira: Number(formData.sira) || 0,
        aktif: Boolean(formData.aktif),
        // USD Bazlı Fiyatlandırma
        fiyat_usd: formData.fiyat_usd || null,
        eski_fiyat_usd: formData.eski_fiyat_usd || null,
        fiyat: null, // Deprecated
        eski_fiyat: null, // Deprecated
        badge: formData.badge || null,
        renk: formData.renk || null,
        ozellikler: parseLines(formData.ozellikler),
        detay_baslik: formData.detay_baslik || null,
        detay_aciklama: formData.detay_aciklama || null,
        detay_icerik: formData.detay_icerik || null,
        paket_icerigi: parseLines(formData.paket_icerigi),
        teknik_ozellikler: parseLines(formData.teknik_ozellikler),
        avantajlar: parseLines(formData.avantajlar),
        sss: validSss,
        updated_at: new Date().toISOString(),
      };
      
      console.log('📤 Gönderilen data:', JSON.stringify(data, null, 2));
      
      if (kampanya) {
        // Güncelle
        const { data: result, error } = await supabase
          .from('kampanyalar')
          .update(data as never)
          .eq('id', kampanya.id)
          .select();

        if (error) {
          console.error('❌ Supabase update hatası:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw new Error(error.message || 'Güncelleme başarısız');
        }
        console.log('✅ Kampanya başarıyla güncellendi:', result);
      } else {
        // Yeni ekle
        const { data: result, error } = await supabase
          .from('kampanyalar')
          .insert(data as never)
          .select();

        if (error) {
          console.error('❌ Supabase insert hatası:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw new Error(error.message || 'Ekleme başarısız');
        }
        console.log('✅ Kampanya başarıyla eklendi:', result);
      }

      router.push('/panel/kampanyalar');
      router.refresh();
    } catch (err: unknown) {
      console.error('❌ Form hatası:', err);
      if (err && typeof err === 'object') {
        console.error('Hata detayı:', JSON.stringify(err, null, 2));
      }
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

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-white/5 rounded-xl">
        {[
          { id: 'temel', label: 'Temel Bilgiler' },
          { id: 'detay', label: 'Detay Sayfası' },
          { id: 'icerik', label: 'İçerik & SSS' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-neutral-800 text-foreground shadow-sm'
                : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Temel Bilgiler */}
      {activeTab === 'temel' && (
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
                  <span className="text-xs font-normal text-foreground-muted ml-2">(SEO için otomatik oluşturulur)</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-mono text-sm"
                      placeholder="kampanya-url-slug"
                    />
                    {slugManuallyEdited && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                        Manuel
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    className="px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-foreground transition-all text-sm font-medium flex items-center gap-2"
                    title="Başlıktan yeniden oluştur"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Yenile
                  </button>
                </div>
                <p className="text-xs text-foreground-muted flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    mattech.com.tr/montaj-kampanyalarimiz/{formData.slug || 'slug'}
                  </span>
                </p>
              </div>

              {/* Açıklama - Otomatik */}
              <div className="space-y-2 mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Kısa Açıklama
                </label>
                <p className="text-xs text-foreground-muted mb-2">
                  ✨ Otomatik doldurulur: Paket İçeriği&apos;nden ilk 3 öğe alınır (isterseniz değiştirebilirsiniz)
                </p>
                <textarea
                  value={formData.aciklama}
                  onChange={(e) => setFormData(prev => ({ ...prev, aciklama: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                  placeholder="Paket İçeriği bölümünü doldurduğunuzda burası otomatik güncellenecek..."
                />
              </div>

              {/* USD Fiyatlandırma - Ana Fiyat ve İndirimli Fiyat */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">Fiyatlar USD olarak girilir, ön yüzde otomatik TRY'ye çevrilir</span>
                </div>
                {usdToTry && (
                  <p className="text-xs text-blue-700 dark:text-blue-300">💱 Güncel kur: 1 USD = {usdToTry.toFixed(2)} ₺</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    İndirimli Fiyat (USD) <span className="text-red-500">*</span>
                    <span className="text-xs font-normal text-foreground-muted ml-2">(Güncel kampanya fiyatı)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.fiyat_usd}
                      onChange={(e) => setFormData(prev => ({ ...prev, fiyat_usd: e.target.value }))}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                      placeholder="310.00"
                      required
                    />
                  </div>
                  {formData.fiyat_usd && usdToTry && (
                    <div className="text-sm">
                      <span className="text-foreground-muted">≈ </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {(parseFloat(formData.fiyat_usd) * usdToTry).toLocaleString('tr-TR', {maximumFractionDigits:0})} ₺
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Eski Fiyat (USD)
                    <span className="text-xs font-normal text-foreground-muted ml-2">(İndirim göstermek için)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.eski_fiyat_usd}
                      onChange={(e) => setFormData(prev => ({ ...prev, eski_fiyat_usd: e.target.value }))}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                      placeholder="370.00"
                    />
                  </div>
                  {formData.eski_fiyat_usd && usdToTry && (
                    <div className="text-sm">
                      <span className="text-foreground-muted">≈ </span>
                      <span className="font-bold text-red-600 dark:text-red-400 line-through">
                        {(parseFloat(formData.eski_fiyat_usd) * usdToTry).toLocaleString('tr-TR', {maximumFractionDigits:0})} ₺
                      </span>
                    </div>
                  )}
                  {formData.fiyat_usd && formData.eski_fiyat_usd && parseFloat(formData.eski_fiyat_usd) > parseFloat(formData.fiyat_usd) && (
                    <div className="text-xs font-bold text-green-600 dark:text-green-400">
                      🎉 %{Math.round(((parseFloat(formData.eski_fiyat_usd) - parseFloat(formData.fiyat_usd)) / parseFloat(formData.eski_fiyat_usd)) * 100)} indirim
                    </div>
                  )}
                </div>
              </div>

              {/* Badge */}
              <div className="space-y-2 mb-4">
                <label className="block text-sm font-medium text-foreground">
                  Rozet (Badge)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                  placeholder="En Popüler, Çok Satan, Premium..."
                />
              </div>

              {/* Renk */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tema Rengi
                </label>
                <div className="flex gap-2 flex-wrap">
                  {RENK_SECENEKLERI.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, renk: r.value }))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        formData.renk === r.value
                          ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10'
                          : 'border-neutral-200 dark:border-white/10 hover:border-neutral-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${r.color}`} />
                      <span className="text-sm">{r.label}</span>
                    </button>
                  ))}
                </div>
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

            {/* Kart Özellikleri - Otomatik */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
              <h2 className="text-lg font-semibold text-foreground mb-4">Kart Özellikleri</h2>
              <p className="text-xs text-foreground-muted mb-3">
                ✨ Otomatik doldurulur: Paket İçeriği&apos;nden ilk 4 öğe alınır
              </p>
              <textarea
                value={formData.ozellikler}
                readOnly
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 text-foreground/70 cursor-not-allowed resize-none text-sm"
                placeholder="Paket İçeriği bölümünü doldurduğunuzda burası otomatik güncellenecek..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Detay Sayfası */}
      {activeTab === 'detay' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detay Sayfası Bilgileri</h2>
            
            {/* Detay Başlık */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Detay Sayfası Başlığı
              </label>
              <input
                type="text"
                value={formData.detay_baslik}
                onChange={(e) => setFormData(prev => ({ ...prev, detay_baslik: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                placeholder="Boş bırakırsanız ana başlık kullanılır"
              />
            </div>

            {/* Detay Açıklama - Otomatik */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Detay Sayfası Açıklaması
              </label>
              <p className="text-xs text-foreground-muted mb-2">
                ✨ Otomatik doldurulur: Kısa Açıklama alanından alınır (isterseniz değiştirebilirsiniz)
              </p>
              <textarea
                value={formData.detay_aciklama}
                onChange={(e) => setFormData(prev => ({ ...prev, detay_aciklama: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                placeholder="Kısa Açıklama alanını doldurduğunuzda burası otomatik güncellenecek..."
              />
            </div>

            {/* Paket İçeriği */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Paket İçeriği
              </label>
              <p className="text-xs text-foreground-muted mb-2">Her satıra bir öğe yazın</p>
              <textarea
                value={formData.paket_icerigi}
                onChange={(e) => setFormData(prev => ({ ...prev, paket_icerigi: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none text-sm"
                placeholder="4 Adet 2MP Dome Kamera&#10;4 Kanal DVR Kayıt Cihazı&#10;500GB Harddisk&#10;4 Adet 12V 1A Adaptör&#10;100mt Kablo&#10;Buat ve Sarf Malzeme"
              />
            </div>

            {/* Teknik Özellikler */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium text-foreground">
                Teknik Özellikler
              </label>
              <p className="text-xs text-foreground-muted mb-2">Her satıra bir özellik yazın</p>
              <textarea
                value={formData.teknik_ozellikler}
                onChange={(e) => setFormData(prev => ({ ...prev, teknik_ozellikler: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none text-sm"
                placeholder="2MP Full HD çözünürlük&#10;30mt gece görüşü&#10;IP66 dış mekan koruması&#10;H.265+ sıkıştırma&#10;Mobil uygulama desteği"
              />
            </div>

            {/* Avantajlar */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Avantajlar
              </label>
              <p className="text-xs text-foreground-muted mb-2">Her satıra bir avantaj yazın</p>
              <textarea
                value={formData.avantajlar}
                onChange={(e) => setFormData(prev => ({ ...prev, avantajlar: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none text-sm"
                placeholder="Ücretsiz Keşif&#10;2 Yıl Garanti&#10;Profesyonel Montaj&#10;7/24 Teknik Destek"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: İçerik & SSS */}
      {activeTab === 'icerik' && (
        <div className="space-y-6">
          {/* Detaylı İçerik */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detaylı İçerik (HTML)</h2>
            <p className="text-xs text-foreground-muted mb-3">HTML formatında zengin içerik yazabilirsiniz</p>
            <textarea
              value={formData.detay_icerik}
              onChange={(e) => setFormData(prev => ({ ...prev, detay_icerik: e.target.value }))}
              rows={10}
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none text-sm font-mono"
              placeholder="<h3>Paket Hakkında</h3>&#10;<p>Bu paket ev ve küçük işletmeler için idealdir...</p>"
            />
          </div>

          {/* SSS */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-neutral-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Sık Sorulan Sorular</h2>
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  sss: [...prev.sss, { soru: '', cevap: '' }]
                }))}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                + Soru Ekle
              </button>
            </div>

            {formData.sss.length === 0 ? (
              <p className="text-foreground-muted text-sm text-center py-8">
                Henüz soru eklenmemiş. &ldquo;Soru Ekle&rdquo; butonuna tıklayın.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.sss.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-xs font-medium text-foreground-secondary">Soru {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          sss: prev.sss.filter((_, i) => i !== index)
                        }))}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Sil
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.soru}
                      onChange={(e) => {
                        const newSss = [...formData.sss];
                        newSss[index].soru = e.target.value;
                        setFormData(prev => ({ ...prev, sss: newSss }));
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 mb-2 text-sm"
                      placeholder="Soru..."
                    />
                    <textarea
                      value={item.cevap}
                      onChange={(e) => {
                        const newSss = [...formData.sss];
                        newSss[index].cevap = e.target.value;
                        setFormData(prev => ({ ...prev, sss: newSss }));
                      }}
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none text-sm"
                      placeholder="Cevap..."
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
