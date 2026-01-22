-- kampanyalar tablosuna USD fiyat field'ları ekleme
-- Supabase SQL Editor'da çalıştırılacak

-- Tüm gerekli field'ları ekle
ALTER TABLE kampanyalar 
ADD COLUMN IF NOT EXISTS fiyat_usd TEXT,
ADD COLUMN IF NOT EXISTS eski_fiyat_usd TEXT,
ADD COLUMN IF NOT EXISTS badge TEXT,
ADD COLUMN IF NOT EXISTS renk TEXT DEFAULT 'red',
ADD COLUMN IF NOT EXISTS ozellikler TEXT[],
ADD COLUMN IF NOT EXISTS detay_baslik TEXT,
ADD COLUMN IF NOT EXISTS detay_aciklama TEXT,
ADD COLUMN IF NOT EXISTS detay_icerik TEXT,
ADD COLUMN IF NOT EXISTS paket_icerigi TEXT[],
ADD COLUMN IF NOT EXISTS teknik_ozellikler TEXT[],
ADD COLUMN IF NOT EXISTS avantajlar TEXT[],
ADD COLUMN IF NOT EXISTS sss JSONB,
ADD COLUMN IF NOT EXISTS icon TEXT,
ADD COLUMN IF NOT EXISTS link TEXT,
ADD COLUMN IF NOT EXISTS sira INTEGER DEFAULT 0;

-- Field'ların eklendiğini kontrol et
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'kampanyalar'
  AND column_name IN ('fiyat_usd', 'eski_fiyat_usd', 'badge', 'renk', 'ozellikler', 'sira')
ORDER BY column_name;

-- Kampanyaları listele
SELECT 
  id,
  baslik,
  fiyat_usd,
  eski_fiyat_usd,
  badge,
  renk,
  sira,
  aktif
FROM kampanyalar
ORDER BY sira, id;
