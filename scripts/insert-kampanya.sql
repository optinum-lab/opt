-- 1. ADIM: Önce bu ALTER TABLE sorgusunu çalıştırın
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

-- 2. ADIM: Sonra bu INSERT sorgusunu çalıştırın
INSERT INTO kampanyalar (
  baslik, 
  slug, 
  aciklama,
  gorsel,
  fiyat, 
  eski_fiyat, 
  badge, 
  renk, 
  ozellikler, 
  detay_baslik,
  detay_aciklama,
  detay_icerik,
  paket_icerigi, 
  teknik_ozellikler, 
  avantajlar, 
  sss, 
  sira,
  aktif
) VALUES (
  '4 Kameralı Güvenlik Sistemi',
  '4-kamerali-guvenlik-sistemi',
  'Ev ve küçük işletmeler için ideal başlangıç paketi',
  'https://static.ticimax.cloud/66037/uploads/urunresimleri/buyuk/hikvision-4-kamerali-2-mp-hybrid-light-c34-1b.jpg',
  '12.500 ₺',
  '15.900 ₺',
  'En Popüler',
  'red',
  ARRAY[
    '4 Kanal Kayıt Cihazı',
    '4 Adet 2MP Kamera',
    '500GB HDD',
    'Montaj Dahil'
  ],
  '4 Kameralı Profesyonel Güvenlik Sistemi',
  'Evinizi veya işyerinizi 7/24 güvende tutun. Profesyonel montaj ekibimiz tarafından kurulan bu sistem, yüksek çözünürlüklü görüntü ve gece görüşü ile tam koruma sağlar. Mobil uygulama ile dünyanın her yerinden canlı izleme imkanı.',
  '<h3>Paket Hakkında</h3>
<p>4 Kameralı Güvenlik Sistemi, ev ve küçük işletmeler için tasarlanmış ekonomik ve etkili bir güvenlik çözümüdür. Dahua kalitesi ile üretilen kameralar, gece gündüz kesintisiz görüntü kaydı sağlar.</p>

<h3>Neden Bu Paketi Seçmelisiniz?</h3>
<ul>
  <li><strong>Kolay Kurulum:</strong> Uzman ekibimiz 3-4 saat içinde kurulumu tamamlar</li>
  <li><strong>Yüksek Çözünürlük:</strong> 2MP Full HD görüntü kalitesi</li>
  <li><strong>Gece Görüşü:</strong> 30 metreye kadar net gece görüntüsü</li>
  <li><strong>Uzaktan Erişim:</strong> Telefonunuzdan canlı izleme</li>
</ul>

<h3>Kurulum Süreci</h3>
<p>Siparişinizi verdikten sonra 24-48 saat içinde ücretsiz keşif için sizinle iletişime geçiyoruz. Keşif sonrası en uygun kamera konumları belirlenir ve kurulum için randevu oluşturulur.</p>',
  ARRAY[
    '4 Kanal DVR Kayıt Cihazı (H.265+ Sıkıştırma)',
    '4 Adet 2MP Dome/Bullet Kamera',
    '500GB Seagate Surveillance HDD',
    '12V 5A Sistem Adaptörü',
    '100 MT CCTV 2+1 0.50mm Güvenlik Kablosu',
    '4 Takım BNC + DC Bağlantı Ekipmanları',
    'Buat, Dübel ve Sarf Malzemeler',
    'Profesyonel Montaj Hizmeti'
  ],
  ARRAY[
    'Kamera Çözünürlük: 2MP (1920x1080) Full HD',
    'Gece Görüş Mesafesi: 30 metre IR LED',
    'Lens: 2.8mm / 3.6mm sabit lens',
    'Koruma Sınıfı: IP66 (Dış mekan uyumlu)',
    'Kayıt Cihazı: 4 Kanal DVR, H.265+ sıkıştırma',
    'HDD Kapasitesi: 500GB (yaklaşık 15 gün kayıt)',
    'Video Çıkışı: HDMI + VGA',
    'Ağ Bağlantısı: RJ45 Ethernet, P2P bulut erişim',
    'Mobil Uygulama: iOS ve Android uyumlu',
    'Hareket Algılama: Akıllı hareket sensörü'
  ],
  ARRAY[
    'Ücretsiz Keşif ve Danışmanlık',
    '2 Yıl Ürün Garantisi',
    '1 Yıl İşçilik Garantisi',
    'Profesyonel Montaj Dahil',
    '7/24 Teknik Destek Hattı',
    'Mobil Uygulama Desteği',
    'Uzaktan Canlı İzleme',
    'Hareket Algılamalı Bildirim',
    'Ücretsiz Yazılım Güncellemeleri',
    'Genişletilebilir Sistem Altyapısı'
  ],
  '[
    {
      "soru": "Kurulum ne kadar sürer?",
      "cevap": "Standart 4 kameralı sistem kurulumu ortalama 3-4 saat sürmektedir. Kablo çekimi mesafesine göre bu süre değişebilir."
    },
    {
      "soru": "Kameralar dış mekanda kullanılabilir mi?",
      "cevap": "Evet, tüm kameralarımız IP66 koruma sınıfına sahiptir ve dış mekan koşullarına dayanıklıdır. Yağmur, toz ve nem gibi dış etkenlere karşı korumalıdır."
    },
    {
      "soru": "Telefonumdan nasıl izleyebilirim?",
      "cevap": "Kurulum sonrasında iOS veya Android telefonunuza ücretsiz uygulama yüklenir. İnternet bağlantısı olan her yerden canlı görüntü izleyebilir ve kayıtlara erişebilirsiniz."
    },
    {
      "soru": "Kayıtlar ne kadar süre saklanıyor?",
      "cevap": "500GB HDD ile sürekli kayıt modunda yaklaşık 15 gün, hareket algılamalı kayıt modunda ise 30-45 gün kayıt saklanabilir."
    },
    {
      "soru": "Garanti kapsamı nedir?",
      "cevap": "Tüm ürünlerde 2 yıl üretici garantisi, montaj işçiliğinde ise 1 yıl garanti sunuyoruz. Garanti süresince arızalı ürünler ücretsiz değiştirilir."
    },
    {
      "soru": "Ödeme seçenekleri nelerdir?",
      "cevap": "Nakit, havale/EFT ve kredi kartı ile ödeme yapabilirsiniz. Kredi kartına 3-6-9 taksit imkanı sunuyoruz."
    },
    {
      "soru": "Sistemi ileride genişletebilir miyim?",
      "cevap": "Evet, kayıt cihazımız 4 kanallıdır ve şu an 4 kamera bağlıdır. Daha fazla kamera eklemek isterseniz 8 veya 16 kanallı sisteme yükseltme yapılabilir."
    }
  ]'::jsonb,
  1,
  true
);

-- 3. ADIM: Eğer kampanya zaten varsa sadece görseli güncellemek için
UPDATE kampanyalar 
SET gorsel = 'https://static.ticimax.cloud/66037/uploads/urunresimleri/buyuk/hikvision-4-kamerali-2-mp-hybrid-light-c34-1b.jpg'
WHERE slug = '4-kamerali-guvenlik-sistemi';
