/**
 * Site Constants
 * Centralized configuration and dummy data for Mat Tech
 */

// ============================================
// Site Configuration
// ============================================

export const siteConfig = {
  name: 'Mat Tech',
  description: 'Evler ve işletmeler için profesyonel CCTV güvenlik sistemleri. 10+ yıllık tecrübe, 5.000\'den fazla mutlu müşteri ve %99.9 kesintisiz hizmet garantisi.',
  url: 'https://www.mattech.com.tr',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/mattech',
    linkedin: 'https://linkedin.com/company/mattech',
    facebook: 'https://facebook.com/mattech',
    instagram: 'https://instagram.com/mattech',
    youtube: 'https://youtube.com/mattech',
    tiktok: 'https://tiktok.com/@mattech',
    whatsapp: 'https://wa.me/905454506587',
  },
  contact: {
    email: 'info@mattech.com.tr',
    phone: '+90 545 450 65 87',
    address: 'Perpa Ticaret Merkezi, A Blok Kat:9 No:1288, Şişli/İstanbul',
    mapUrl: 'https://maps.app.goo.gl/MDr3VLmZyjXjFTvy8',
    workingHours: '7/24 Destek',
  },
};

// ============================================
// Navigation Links
// ============================================

export const navLinks = [
  { href: '#features', label: 'Özellikler' },
  { href: '/urunler', label: 'Ürünler Kataloğu' },
  { href: '#how-it-works', label: 'Nasıl Çalışır' },
  { href: '#testimonials', label: 'Referanslar' },
  { href: '#contact', label: 'İletişim' },
];

// ============================================
// Features Data
// ============================================

export const features = [
  {
    id: 'ai-recognition',
    title: 'Yapay Zeka Yüz Tanıma',
    description: 'Gelişmiş yüz tanıma teknolojisi, tanıdık yüzleri belirler ve bilinmeyen ziyaretçiler için anında sizi uyarır.',
    icon: 'brain',
  },
  {
    id: '4k-cameras',
    title: '4K Ultra HD Kameralar',
    description: 'Kristal netliğinde 4K çözünürlük, gece gündüz her detayı üstün görüntü kalitesiyle yakalar.',
    icon: 'camera',
  },
  {
    id: 'cloud-recording',
    title: 'Bulut Kayıt',
    description: 'Güvenli bulut depolama, görüntülerinizi güvende tutar ve dünyanın her yerinden erişim sağlar.',
    icon: 'cloud',
  },
  {
    id: 'mobile-control',
    title: 'Mobil Uygulama Kontrolü',
    description: 'Kullanıcı dostu uygulamamız ile tüm güvenlik sisteminizi akıllı telefonunuzdan izleyin ve kontrol edin.',
    icon: 'smartphone',
  },
  {
    id: 'real-time-alerts',
    title: 'Anlık Uyarılar',
    description: 'Hareket algılandığında veya güvenlik olayları gerçekleştiğinde cihazlarınıza anında bildirim.',
    icon: 'bell',
  },
  {
    id: 'night-vision',
    title: 'Gelişmiş Gece Görüşü',
    description: 'Kızılötesi ve renkli gece görüş teknolojisi ile tam karanlıkta bile net görüntü.',
    icon: 'moon',
  },
];

// ============================================
// Products Data
// ============================================

export const products = [
  {
    id: 'pro-cam-4k',
    name: 'ProCam 4K',
    description: 'Yapay zeka algılama özellikli profesyonel 4K dış mekan kamerası',
    price: 8999,
    category: 'Dış Mekan',
    features: ['4K Ultra HD', 'Hava Koşullarına Dayanıklı', 'Gece Görüşü', 'Yapay Zeka Algılama'],
    image: '/images/products/pro-cam-4k.jpg',
    badge: 'En Çok Satan',
  },
  {
    id: 'smart-doorbell',
    name: 'Akıllı Kapı Zili Pro',
    description: 'Çift yönlü ses ve paket algılama özellikli video kapı zili',
    price: 5999,
    category: 'Kapı Zili',
    features: ['1080p HD', 'Çift Yönlü Ses', 'Paket Algılama', 'Hareket Bölgeleri'],
    image: '/images/products/smart-doorbell.jpg',
    badge: 'Yeni',
  },
  {
    id: 'indoor-cam',
    name: 'İç Mekan Kamera Mini',
    description: 'Gizlilik modu ve evcil hayvan algılama özellikli kompakt iç mekan kamerası',
    price: 2499,
    category: 'İç Mekan',
    features: ['1080p HD', 'Gizlilik Modu', 'Evcil Hayvan Algılama', 'Çift Yönlü Ses'],
    image: '/images/products/indoor-cam.jpg',
    badge: null,
  },
  {
    id: 'security-hub',
    name: 'Güvenlik Merkezi',
    description: 'Tüm güvenlik cihazlarınızı bağlayan merkezi kontrol ünitesi',
    price: 4499,
    category: 'Merkez',
    features: ['Çoklu Cihaz', 'Yerel Depolama', 'Pil Yedekleme', 'Akıllı Ev Entegrasyonu'],
    image: '/images/products/security-hub.jpg',
    badge: null,
  },
  {
    id: 'floodlight-cam',
    name: 'Projektör Kamera',
    description: 'Entegre 4K kameralı güçlü projektör aydınlatma',
    price: 10499,
    category: 'Dış Mekan',
    features: ['4K Ultra HD', '2500 Lümen', 'Renkli Gece Görüşü', 'Siren'],
    image: '/images/products/floodlight-cam.jpg',
    badge: 'Popüler',
  },
  {
    id: 'ptz-camera',
    name: 'PTZ Kamera Pro',
    description: 'Otomatik takip özellikli pan-tilt-zoom kamera',
    price: 13499,
    category: 'Profesyonel',
    features: ['4K Ultra HD', '360° Pan', 'Otomatik Takip', '30x Zoom'],
    image: '/images/products/ptz-camera.jpg',
    badge: null,
  },
];

// ============================================
// How It Works Steps
// ============================================

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Sisteminizi Seçin',
    description: 'Ev veya iş yeriniz için mükemmel güvenlik paketini seçin. Uzmanlarımız size özel çözüm oluşturmanıza yardımcı olabilir.',
    icon: 'package',
  },
  {
    step: 2,
    title: 'Profesyonel Kurulum',
    description: 'Sertifikalı teknisyenlerimiz, optimum kamera yerleşimi ve sistem yapılandırması için tüm kurulumu gerçekleştirir.',
    icon: 'tool',
  },
  {
    step: 3,
    title: 'İzleyin ve Koruyun',
    description: 'Güvenlik sisteminize her yerden erişin. 7/24 anlık uyarılar alın ve gönül rahatlığının tadını çıkarın.',
    icon: 'shield',
  },
];

// ============================================
// Why Choose Us / Comparison Data
// ============================================

export const comparisonFeatures = [
  { feature: '4K Ultra HD Kalite', us: true, others: false },
  { feature: 'Yapay Zeka Destekli Algılama', us: true, others: false },
  { feature: 'Ücretsiz Bulut Depolama', us: true, others: false },
  { feature: 'Aylık Ücret Yok', us: true, others: false },
  { feature: '7/24 Destek', us: true, others: true },
  { feature: 'Profesyonel Kurulum', us: true, others: true },
  { feature: '2 Yıl Garanti', us: true, others: false },
  { feature: 'Akıllı Ev Entegrasyonu', us: true, others: true },
];

export const trustBadges = [
  { name: 'ISO 27001 Sertifikalı', icon: 'shield-check' },
  { name: 'KVKK Uyumlu', icon: 'lock' },
  { name: 'TSE Onaylı', icon: 'award' },
  { name: 'Müşteri Memnuniyeti', icon: 'star' },
];

export const stats = [
  { value: '50.000+', label: 'Korunan Mekan' },
  { value: '%99.9', label: 'Çalışma Süresi' },
  { value: '7/24', label: 'Destek' },
  { value: '4.9★', label: 'Müşteri Puanı' },
];

// ============================================
// Testimonials Data
// ============================================

export const testimonials = [
  {
    id: 1,
    name: 'Ayşe Yılmaz',
    role: 'Ev Sahibi',
    company: 'Akıllı Ev Kullanıcısı',
    content: 'Mat Tech, ev güvenliğine bakış açımı tamamen değiştirdi. Yapay zeka algılama inanılmaz derecede doğru ve evimi her yerden kontrol edebilmek harika.',
    avatar: '/images/testimonials/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mehmet Kaya',
    role: 'Operasyon Direktörü',
    company: 'TechStart A.Ş.',
    content: 'Üç ofis lokasyonumuza Mat Tech sistemlerini kurduk. Entegrasyon sorunsuzdu ve görüntü kalitesi iş yeri güvenliğimizi önemli ölçüde artırdı.',
    avatar: '/images/testimonials/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elif Demir',
    role: 'Site Yöneticisi',
    company: 'Park Evleri Sitesi',
    content: '200\'den fazla daire için güvenlik yönetmek eskiden kabustu. Mat Tech merkezi kontrol paneli her şeyi zahmetsiz hale getirdi. Yaptığımız en iyi yatırım.',
    avatar: '/images/testimonials/avatar-3.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ali Öztürk',
    role: 'İşletme Sahibi',
    company: 'Öztürk Market',
    content: 'Geçen yılki hırsızlık girişiminden sonra Mat Tech\'e geçtik. Gece görüşü kalitesi muhteşem ve anlık uyarılar market kapalıyken bile bize huzur veriyor.',
    avatar: '/images/testimonials/avatar-4.jpg',
    rating: 5,
  },
];

// ============================================
// FAQ Data
// ============================================

export const faqs = [
  {
    question: 'Kurulum ne kadar sürer?',
    answer: 'Profesyonel kurulum, standart bir ev kurulumu için genellikle 2-4 saat sürer. Daha büyük ticari kurulumlar ek süre gerektirebilir.',
  },
  {
    question: 'Aylık abonelik ücreti var mı?',
    answer: 'Temel bulut depolama tüm kameralarla ücretsiz olarak dahildir. Genişletilmiş depolama ve gelişmiş özellikler içeren premium planlar aylık 99 TL\'den başlamaktadır.',
  },
  {
    question: 'Kameraları kendim kurabilir miyim?',
    answer: 'Evet! Kameralarımız kolay kendin-yap kurulumu için tasarlanmıştır. Ancak optimum yerleşim ve kapsama için profesyonel kurulum öneriyoruz.',
  },
  {
    question: 'İnternet bağlantım kesilirse ne olur?',
    answer: 'Tüm kameralar yerel depolama özelliğine sahiptir ve kayda devam eder. Bağlantı yeniden kurulduğunda görüntüler otomatik olarak buluta senkronize edilir.',
  },
  {
    question: 'Kameralar hava koşullarına dayanıklı mı?',
    answer: 'Dış mekan kameralarımız IP66 sınıfındadır, yani şiddetli yağmur, kar ve -20°C ile +50°C arası sıcaklıklara karşı korumalıdır.',
  },
];

// ============================================
// Footer Links
// ============================================

export const footerLinks = {
  products: [
    { label: 'Dış Mekan Kameralar', href: '#' },
    { label: 'İç Mekan Kameralar', href: '#' },
    { label: 'Video Kapı Zilleri', href: '#' },
    { label: 'Güvenlik Sistemleri', href: '#' },
    { label: 'Aksesuarlar', href: '#' },
  ],
  support: [
    { label: 'Yardım Merkezi', href: '#' },
    { label: 'Kurulum Rehberi', href: '#' },
    { label: 'Garanti', href: '#' },
    { label: 'İade', href: '#' },
    { label: 'Bize Ulaşın', href: '#' },
  ],
  company: [
    { label: 'Hakkımızda', href: '#' },
    { label: 'Kariyer', href: '#' },
    { label: 'Basın', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'İş Ortakları', href: '#' },
  ],
  legal: [
    { label: 'Gizlilik Politikası', href: '#' },
    { label: 'Kullanım Şartları', href: '#' },
    { label: 'Çerez Politikası', href: '#' },
    { label: 'KVKK', href: '#' },
  ],
};
