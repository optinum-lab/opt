-- Mevcut kampanyaların açıklama ve özelliklerini paket içeriğinden otomatik güncelle
-- Tarih: 2026-01-22

-- 1. Kart Özelliklerini Güncelle (paket_icerigi'nden ilk 4 öğe)
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
  AND array_length(paket_icerigi, 1) > 0
  AND (ozellikler IS NULL OR array_length(ozellikler, 1) = 0);

-- 2. Kısa Açıklamayı Güncelle (paket_icerigi'nden ilk 3 öğe + " • Montaj Dahil")
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
  AND array_length(paket_icerigi, 1) > 0
  AND (aciklama IS NULL OR aciklama = '');

-- 3. Detay Açıklamasını Güncelle (aciklama'dan kopyala)
UPDATE kampanyalar
SET detay_aciklama = aciklama
WHERE aciklama IS NOT NULL 
  AND aciklama != ''
  AND (detay_aciklama IS NULL OR detay_aciklama = '');

-- Sonuçları kontrol et
SELECT 
  id,
  baslik,
  left(aciklama, 50) as aciklama_onizleme,
  array_length(ozellikler, 1) as ozellik_sayisi,
  array_length(paket_icerigi, 1) as paket_sayisi
FROM kampanyalar
ORDER BY id;
