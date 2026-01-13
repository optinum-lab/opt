-- Kampanyalar tablosu için yeni alanlar (Supabase SQL Editor'de çalıştırın)
-- Bu SQL mevcut tabloya yeni kolonlar ekler

-- Önce mevcut tablo varsa yeni kolonları ekle
ALTER TABLE kampanyalar 
ADD COLUMN IF NOT EXISTS fiyat VARCHAR(50),
ADD COLUMN IF NOT EXISTS eski_fiyat VARCHAR(50),
ADD COLUMN IF NOT EXISTS badge VARCHAR(100),
ADD COLUMN IF NOT EXISTS renk VARCHAR(20) DEFAULT 'red',
ADD COLUMN IF NOT EXISTS ozellikler TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS detay_baslik VARCHAR(255),
ADD COLUMN IF NOT EXISTS detay_aciklama TEXT,
ADD COLUMN IF NOT EXISTS detay_icerik TEXT,
ADD COLUMN IF NOT EXISTS paket_icerigi TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS teknik_ozellikler TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS avantajlar TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sss JSONB DEFAULT '[]';

-- Eğer tablo yoksa tamamen oluştur
-- (Önce yukarıdaki ALTER'ı deneyin, hata verirse aşağıdakini kullanın)

/*
CREATE TABLE IF NOT EXISTS kampanyalar (
  id SERIAL PRIMARY KEY,
  baslik VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  aciklama TEXT,
  gorsel TEXT,
  icon VARCHAR(100),
  link TEXT,
  sira INTEGER DEFAULT 0,
  aktif BOOLEAN DEFAULT true,
  -- Yeni alanlar
  fiyat VARCHAR(50),
  eski_fiyat VARCHAR(50),
  badge VARCHAR(100),
  renk VARCHAR(20) DEFAULT 'red',
  ozellikler TEXT[] DEFAULT '{}',
  detay_baslik VARCHAR(255),
  detay_aciklama TEXT,
  detay_icerik TEXT,
  paket_icerigi TEXT[] DEFAULT '{}',
  teknik_ozellikler TEXT[] DEFAULT '{}',
  avantajlar TEXT[] DEFAULT '{}',
  sss JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS etkinleştir
ALTER TABLE kampanyalar ENABLE ROW LEVEL SECURITY;

-- Herkes görebilir
CREATE POLICY "Kampanyaları herkes görebilir" ON kampanyalar
  FOR SELECT USING (true);

-- Sadece authenticated kullanıcılar ekleyebilir/güncelleyebilir
CREATE POLICY "Auth kullanıcılar kampanya yönetebilir" ON kampanyalar
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Anon kullanıcılar için insert izni (geliştirme aşamasında)
CREATE POLICY "Anon insert izni" ON kampanyalar
  FOR INSERT TO anon WITH CHECK (true);
  
CREATE POLICY "Anon update izni" ON kampanyalar
  FOR UPDATE TO anon USING (true) WITH CHECK (true);
*/

-- Örnek kampanya ekle (test için)
/*
INSERT INTO kampanyalar (
  baslik, slug, aciklama, fiyat, eski_fiyat, badge, renk, 
  ozellikler, paket_icerigi, teknik_ozellikler, avantajlar, sss, aktif
) VALUES (
  '4 Kameralı Sistem',
  '4-kamerali-sistem',
  'Ev ve küçük işletmeler için ideal güvenlik paketi',
  '12.500 ₺',
  '15.000 ₺',
  'En Popüler',
  'red',
  ARRAY['4 Adet 2MP Kamera', '4 Kanal Kayıt Cihazı', '500GB HDD', 'Montaj Dahil'],
  ARRAY['4 Adet 2MP Dome Kamera', '4 Kanal DVR Kayıt Cihazı', '500GB Seagate HDD', '4 Adet 12V 1A Adaptör', '100mt CCTV Kablo', 'Buat ve Sarf Malzeme'],
  ARRAY['2MP Full HD çözünürlük', '30mt gece görüşü', 'IP66 dış mekan koruması', 'H.265+ sıkıştırma', 'Mobil uygulama desteği'],
  ARRAY['Ücretsiz Keşif', '2 Yıl Garanti', 'Profesyonel Montaj', '7/24 Teknik Destek', 'Mobil Uygulama Desteği', 'Uzaktan İzleme'],
  '[{"soru": "Montaj süresi ne kadar?", "cevap": "Ortalama 3-4 saat içinde kurulum tamamlanır."}, {"soru": "Garanti kapsamı nedir?", "cevap": "2 yıl ürün ve işçilik garantisi sunuyoruz."}]'::jsonb,
  true
);
*/
