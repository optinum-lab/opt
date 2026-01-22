-- TÜM kampanyaların açıklama ve özelliklerini paket içeriğinden otomatik güncelle (FULL UPDATE)
-- Tarih: 2026-01-22
-- DİKKAT: Bu script mevcut manuel girilen açıklamaları da değiştirir!

-- 1. Kart Özelliklerini Güncelle (paket_icerigi'nden ilk 4 öğe) - HERKESİ GÜNCELLE
UPDATE kampanyalar
SET ozellikler = (
  SELECT array_agg(item ORDER BY rn)
  FROM (
    SELECT 
      unnest(paket_icerigi) as item,
      row_number() OVER () as rn
    FROM kampanyalar k2
    WHERE k2.id = kampanyalar.id
    LIMIT 4
  ) subq
)
WHERE paket_icerigi IS NOT NULL 
  AND array_length(paket_icerigi, 1) > 0;

-- 2. Kısa Açıklamayı Güncelle (paket_icerigi'nden ilk 3 öğe + " • Montaj Dahil") - HERKESİ GÜNCELLE
UPDATE kampanyalar
SET aciklama = (
  SELECT string_agg(item, ' • ' ORDER BY rn) || ' • Montaj Dahil'
  FROM (
    SELECT 
      unnest(paket_icerigi) as item,
      row_number() OVER () as rn
    FROM kampanyalar k2
    WHERE k2.id = kampanyalar.id
    LIMIT 3
  ) subq
)
WHERE paket_icerigi IS NOT NULL 
  AND array_length(paket_icerigi, 1) > 0;

-- 3. Detay Açıklamasını Güncelle (aciklama'dan kopyala) - HERKESİ GÜNCELLE
UPDATE kampanyalar
SET detay_aciklama = aciklama
WHERE aciklama IS NOT NULL 
  AND aciklama != '';

-- Sonuçları kontrol et
SELECT 
  id,
  baslik,
  aciklama,
  ozellikler,
  left(detay_aciklama, 50) as detay_aciklama_onizleme
FROM kampanyalar
ORDER BY id;
