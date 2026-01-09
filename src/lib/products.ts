/**
 * Product Database
 * Dahua security products with categories and details
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  shortDesc: string;
  image: string;
  price?: string;
  specs: Record<string, string>;
  tags: string[];
  manufacturer: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// ==================== CATEGORIES ====================

export const categories: Category[] = [
  {
    id: 'recording',
    name: 'KAYIT CİHAZI',
    slug: 'kayit-cihazi',
    icon: 'hard-drive',
    description: 'NVR, XVR ve Mobil Kayıt Cihazları',
    subcategories: [
      { id: 'nvr', name: 'NVR Kayıt Cihazı', slug: 'nvr-kayit-cihazi', count: 4 },
      { id: 'xvr', name: 'XVR Kayıt Cihazı', slug: 'xvr-kayit-cihazi', count: 3 },
      { id: 'mobile', name: 'Mobil Kayıt Cihazı', slug: 'mobil-kayit-cihazi', count: 2 },
    ],
  },
  {
    id: 'camera',
    name: 'KAMERA',
    slug: 'kamera',
    icon: 'camera',
    description: 'IP, Analog HD-CVI, PTZ ve Termal Kameralar',
    subcategories: [
      { id: 'ip-dome', name: 'IP Dome Kamera', slug: 'ip-dome-kamera', count: 5 },
      { id: 'ip-bullet', name: 'IP Bullet Kamera', slug: 'ip-bullet-kamera', count: 4 },
      { id: 'ptz', name: 'IP PTZ Kamera', slug: 'ip-ptz-kamera', count: 3 },
      { id: 'thermal', name: 'Termal Kamera', slug: 'termal-kamera', count: 2 },
    ],
  },
  {
    id: 'intercom',
    name: 'IP İNTERKOM',
    slug: 'interkom',
    icon: 'phone',
    description: 'İnterkom Sistemleri ve Bileşenleri',
    subcategories: [
      { id: 'monitor', name: 'İnterkom LCD Monitör', slug: 'interkom-monitor', count: 3 },
      { id: 'panel', name: 'İnterkom Zil Paneli', slug: 'interkom-zil-paneli', count: 2 },
      { id: 'switch', name: 'İnterkom Switchleri', slug: 'interkom-switch', count: 2 },
    ],
  },
  {
    id: 'alarm',
    name: 'ALARM',
    slug: 'alarm',
    icon: 'alert-circle',
    description: 'Alarm Sistemleri ve Dedektörler',
    subcategories: [
      { id: 'panel', name: 'Alarm Paneli', slug: 'alarm-paneli', count: 3 },
      { id: 'detector', name: 'Dedektör', slug: 'dedektor', count: 4 },
      { id: 'set', name: 'Hazır Setler', slug: 'alarm-set', count: 2 },
    ],
  },
];

// ==================== PRODUCTS ====================

export const products: Product[] = [
  // NVR Products
  {
    id: 'nvr2104hs-4ks2',
    name: 'Dahua NVR2104HS-4KS2 4 Kanal NVR Kayıt Cihazı',
    category: 'recording',
    subcategory: 'nvr',
    description:
      '4 Kanal 4K NVR, H.265 kodlama desteği, 2TB HDD ile gelir, 80Mbps bant genişliği, HDMI + VGA çıkışı, PoE güç kaynağı desteği.',
    shortDesc: '4 Kanal 4K NVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0000280_dahua-nvr2104hs-4ks2-4-kanal-nvr-kayit-cihazi_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '4',
      'Çözünürlük': '4K (8MP)',
      'Kodlama': 'H.265',
      'HDD': '2TB',
      'Bant Genişliği': '80Mbps',
      'Çıkış': 'HDMI + VGA',
    },
    tags: ['dahua', 'nvr', 'dahua-nvr', '4k'],
    manufacturer: 'Dahua',
  },
  {
    id: 'nvr4104hs-8p',
    name: 'Dahua NVR4104HS-8P 4 Kanal PoE NVR Kayıt Cihazı',
    category: 'recording',
    subcategory: 'nvr',
    description:
      '4 Kanal Profesyonel NVR, 8 Port PoE ile kamera beslemesi, H.265/H.264 support, 4TB kapasiteli, 100Mbps interneti',
    shortDesc: '4 Kanal PoE NVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0000281_dahua-nvr4104hs-8p_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '4',
      'PoE Portları': '8',
      'Kodlama': 'H.265/H.264',
      'HDD': '4TB',
      'Bant Genişliği': '100Mbps',
      'İşletim Süresi': '7/24',
    },
    tags: ['dahua', 'nvr', 'poe', 'profesyonel'],
    manufacturer: 'Dahua',
  },
  {
    id: 'nvr5208-8p-4ks2',
    name: 'Dahua NVR5208-8P-4KS2 8 Kanal PoE NVR 4K',
    category: 'recording',
    subcategory: 'nvr',
    description:
      '8 Kanal 4K NVR, 8 PoE port, PoE bütçesi 120W, H.265 kodlama, 8TB HDD, 160Mbps bant genişliği.',
    shortDesc: '8 Kanal 4K PoE NVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0000282_dahua-nvr5208-8p-4ks2_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '8',
      'Çözünürlük': '4K',
      'PoE Portları': '8',
      'PoE Bütçesi': '120W',
      'HDD': '8TB',
      'Bant Genişliği': '160Mbps',
    },
    tags: ['dahua', 'nvr', 'poe', '4k', '8-channel'],
    manufacturer: 'Dahua',
  },
  {
    id: 'nvr5216-16p-4ks2',
    name: 'Dahua NVR5216-16P-4KS2 16 Kanal PoE NVR 4K',
    category: 'recording',
    subcategory: 'nvr',
    description:
      '16 Kanal 4K NVR, 16 PoE port, 240W PoE bütçesi, H.265 kodlama, 16TB depolama, 320Mbps throughput.',
    shortDesc: '16 Kanal 4K PoE NVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0000283_dahua-nvr5216-16p-4ks2_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '16',
      'Çözünürlük': '4K',
      'PoE Portları': '16',
      'PoE Bütçesi': '240W',
      'HDD': '16TB',
      'Bant Genişliği': '320Mbps',
    },
    tags: ['dahua', 'nvr', 'poe', '4k', 'enterprise'],
    manufacturer: 'Dahua',
  },

  // XVR Products
  {
    id: 'xvr1a04',
    name: 'Dahua XVR1A04 4 Kanal XVR Kayıt Cihazı',
    category: 'recording',
    subcategory: 'xvr',
    description:
      'Hibrit kayıt cihazı, HDCVI, AHD, TVI, CVBS ve IP kameraları destekler. 2MP video desteği, 20Mbps bant genişliği, P2P erişim.',
    shortDesc: '4 Kanal Hibrit XVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0001945_dahua-xvr1a04-4-kanal-xvr-kayit-cihazi_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '4',
      'Kamera Desteği': 'HDCVI, AHD, TVI, CVBS, IP',
      'Çözünürlük': '2MP',
      'Bant Genişliği': '20Mbps',
      'Çıkış': 'HDMI + VGA',
      'P2P': 'Desteklenmiyor',
    },
    tags: ['dahua', 'xvr', 'hybrid', 'hdcvi'],
    manufacturer: 'Dahua',
  },
  {
    id: 'xvr5104hs-4k',
    name: 'Dahua XVR5104HS-4K 4 Kanal 4K Hibrit XVR',
    category: 'recording',
    subcategory: 'xvr',
    description:
      'Profesyonel 4K Hibrit XVR, HDCVI 4K + IP kameraları, H.265 kodlama, 4TB HDD, 5MP kadar çözünürlük.',
    shortDesc: '4 Kanal 4K Hibrit XVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0001946_dahua-xvr5104hs-4k_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '4',
      'Çözünürlük': '4K (5MP)',
      'Kamera Desteği': 'HDCVI 4K + IP',
      'Kodlama': 'H.265',
      'HDD': '4TB',
      'Bant Genişliği': '100Mbps',
    },
    tags: ['dahua', 'xvr', 'hybrid', '4k', 'profesyonel'],
    manufacturer: 'Dahua',
  },
  {
    id: 'xvr5108hs-4k',
    name: 'Dahua XVR5108HS-4K 8 Kanal 4K Hibrit XVR',
    category: 'recording',
    subcategory: 'xvr',
    description:
      '8 Kanal 4K Hibrit XVR, HDCVI 4K + IP kameraları, H.265 kodlama, 8TB HDD kapasitesi, 200Mbps bant genişliği.',
    shortDesc: '8 Kanal 4K Hibrit XVR Kayıt Cihazı',
    image: 'https://dahua-tr.com/content/images/thumbs/0001947_dahua-xvr5108hs-4k_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Kanal Sayısı': '8',
      'Çözünürlük': '4K (5MP)',
      'Kamera Desteği': 'HDCVI 4K + IP',
      'Kodlama': 'H.265',
      'HDD': '8TB',
      'Bant Genişliği': '200Mbps',
    },
    tags: ['dahua', 'xvr', 'hybrid', '4k', '8-channel'],
    manufacturer: 'Dahua',
  },

  // IP Dome Cameras
  {
    id: 'ipc-hdbw2233r-zas',
    name: 'Dahua IPC-HDBW2233R-ZAS 2MP Motörlü Zoom IP Dome Kamera',
    category: 'camera',
    subcategory: 'ip-dome',
    description:
      '2MP 1080p IP Dome Kamera, 2.7-13.5mm motörlü zoom lens, gece görüş, IP67 güvenlik, PoE destekli.',
    shortDesc: '2MP Motörlü Zoom IP Dome Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002000_dahua-ipc-hdbw2233r-zas_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '2MP (1080p)',
      'Lens': '2.7-13.5mm Motörlü Zoom',
      'Gece Görüşü': 'IR LED 30m',
      'IP Derecesi': 'IP67',
      'Güç': 'PoE',
      'WDR': 'Destekleniyor',
    },
    tags: ['dahua', 'ip-camera', 'dome', 'zoom', 'poe'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hdbw2431ep-s',
    name: 'Dahua IPC-HDBW2431EP-S 4MP Sabit Lens IP Dome Kamera',
    category: 'camera',
    subcategory: 'ip-dome',
    description:
      '4MP IP Dome, 2.8mm sabit lens, 50m IR gece görüş, mikrophone giriş, H.265 kodlama, PoE güç.',
    shortDesc: '4MP IP Dome Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002001_dahua-ipc-hdbw2431ep-s_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '4MP',
      'Lens': '2.8mm Sabit',
      'Gece Görüşü': 'IR LED 50m',
      'Ses': 'Microphone Giriş',
      'Kodlama': 'H.265',
      'PoE': 'Destekleniyor',
    },
    tags: ['dahua', 'ip-camera', 'dome', '4mp', 'poe'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hdbw4433c-a',
    name: 'Dahua IPC-HDBW4433C-A 4MP Full Color IP Dome',
    category: 'camera',
    subcategory: 'ip-dome',
    description:
      '4MP Full Color Dome Kamera, gündüz/gece renkli görüntü, 3.6mm lens, IR LED 20m, PoE beslemesi, akıllı kodlama.',
    shortDesc: '4MP Full Color IP Dome Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002002_dahua-ipc-hdbw4433c-a_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '4MP',
      'Renkli Görüş': 'Gündüz + Gece',
      'Lens': '3.6mm Sabit',
      'Gece Görüşü': 'IR LED 20m',
      'PoE': 'Destekleniyor',
      'Kodlama': 'H.265 + H.264',
    },
    tags: ['dahua', 'ip-camera', 'dome', 'full-color', '4mp'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hdbw4833e-z',
    name: 'Dahua IPC-HDBW4833E-Z 8MP Motörlü Zoom IP Dome',
    category: 'camera',
    subcategory: 'ip-dome',
    description:
      '8MP IP Dome, 2.7-12mm motörlü zoom, 50m IR, WDR teknolojisi, PoE destekli, H.265 kodlama.',
    shortDesc: '8MP Motörlü Zoom IP Dome Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002003_dahua-ipc-hdbw4833e-z_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '8MP',
      'Lens': '2.7-12mm Motörlü Zoom',
      'Gece Görüşü': 'IR LED 50m',
      'WDR': 'Destekleniyor',
      'PoE': 'Destekleniyor',
      'Kodlama': 'H.265 + H.264',
    },
    tags: ['dahua', 'ip-camera', 'dome', 'zoom', '8mp', 'pro'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hdbw4233c-s',
    name: 'Dahua IPC-HDBW4233C-S 2MP Starlight Full Color Dome',
    category: 'camera',
    subcategory: 'ip-dome',
    description:
      '2MP Starlight Full Color kamera, düşük ışıkta renkli görüntü, 3.6mm lens, PoE, akıllı iris.',
    shortDesc: '2MP Starlight Full Color IP Dome',
    image: 'https://dahua-tr.com/content/images/thumbs/0002004_dahua-ipc-hdbw4233c-s_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '2MP',
      'Teknoloji': 'Starlight Full Color',
      'Lens': '3.6mm Sabit',
      'Işık Hassasiyeti': '0.005 Lux',
      'PoE': 'Destekleniyor',
      'IR': 'LED 20m',
    },
    tags: ['dahua', 'ip-camera', 'dome', 'starlight', 'full-color'],
    manufacturer: 'Dahua',
  },

  // IP Bullet Cameras
  {
    id: 'ipc-hfw2231s-s',
    name: 'Dahua IPC-HFW2231S-S 2MP Sabit Lens IP Bullet Kamera',
    category: 'camera',
    subcategory: 'ip-bullet',
    description:
      '2MP IP Bullet, 3.6mm sabit lens, 30m IR gece görüş, IP67 dış mekan koruması, PoE beslemesi.',
    shortDesc: '2MP IP Bullet Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002010_dahua-ipc-hfw2231s-s_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '2MP (1080p)',
      'Lens': '3.6mm Sabit',
      'Gece Görüşü': 'IR LED 30m',
      'IP Derecesi': 'IP67',
      'Güç': 'PoE',
      'Format': 'Bullet',
    },
    tags: ['dahua', 'ip-camera', 'bullet', 'poe', 'outdoor'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hfw3433cp-z',
    name: 'Dahua IPC-HFW3433CP-Z 4MP Motörlü Zoom Bullet',
    category: 'camera',
    subcategory: 'ip-bullet',
    description:
      '4MP Bullet, 2.7-13.5mm motörlü zoom, 60m IR, H.265 kodlama, IP67, PoE destekli, gündüz/gece.',
    shortDesc: '4MP Motörlü Zoom Bullet Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002011_dahua-ipc-hfw3433cp-z_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '4MP',
      'Lens': '2.7-13.5mm Motörlü',
      'Gece Görüşü': 'IR LED 60m',
      'IP Derecesi': 'IP67',
      'Kodlama': 'H.265 + H.264',
      'PoE': 'Destekleniyor',
    },
    tags: ['dahua', 'ip-camera', 'bullet', 'zoom', 'pro', 'outdoor'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hfw3833cp-z-f',
    name: 'Dahua IPC-HFW3833CP-Z-F 8MP Zoom Bullet 4K',
    category: 'camera',
    subcategory: 'ip-bullet',
    description:
      '8MP 4K Bullet, 2.7-12mm zoom, 80m IR, H.265, WDR, IP67 dış mekan, PoE, turbo SD kart.',
    shortDesc: '8MP 4K Zoom Bullet Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002012_dahua-ipc-hfw3833cp-z-f_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '8MP (4K)',
      'Lens': '2.7-12mm Motörlü',
      'Gece Görüşü': 'IR LED 80m',
      'WDR': 'Destekleniyor',
      'IP Derecesi': 'IP67',
      'Kodlama': 'H.265',
    },
    tags: ['dahua', 'ip-camera', 'bullet', '4k', 'zoom', 'pro'],
    manufacturer: 'Dahua',
  },
  {
    id: 'ipc-hfw3434cp-a',
    name: 'Dahua IPC-HFW3434CP-A 4MP Full Color Bullet',
    category: 'camera',
    subcategory: 'ip-bullet',
    description:
      '4MP Full Color Bullet, gündüz/gece renkli görüntü, 3.6mm lens, PoE, IP67, akıllı kodlama.',
    shortDesc: '4MP Full Color Bullet Kamera',
    image: 'https://dahua-tr.com/content/images/thumbs/0002013_dahua-ipc-hfw3434cp-a_550.jpeg',
    price: 'Fiyat için Arayın',
    specs: {
      'Çözünürlük': '4MP',
      'Renkli Görüş': 'Gündüz + Gece',
      'Lens': '3.6mm Sabit',
      'IP Derecesi': 'IP67',
      'PoE': 'Destekleniyor',
      'IR': 'LED 20m',
    },
    tags: ['dahua', 'ip-camera', 'bullet', 'full-color', 'outdoor'],
    manufacturer: 'Dahua',
  },
];

// ==================== HELPER FUNCTIONS ====================

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getProductsBySubcategory(subcategoryId: string): Product[] {
  return products.filter((p) => p.subcategory === subcategoryId);
}

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.id === productId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getSubcategoryBySlug(categoryId: string, slug: string) {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find((sub) => sub.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
