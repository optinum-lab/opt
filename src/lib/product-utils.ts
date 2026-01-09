/**
 * Ürün Veritabanı Tipleri ve Yardımcı Fonksiyonlar
 */

export interface AltKategori {
  id: string;
  ad: string;
  slug: string;
}

export interface Kategori {
  id: string;
  ad: string;
  slug: string;
  aciklama: string;
  gorsel: string;
  altKategori: AltKategori[];
}

export interface TeknikOzellikleri {
  [key: string]: string | number;
}

export interface Urun {
  id: number;
  ad: string;
  slug: string;
  kategoriler: string[];
  uretici: string;
  gorsel: string;
  fiyat: number;
  para_birimi: "TRY" | "USD" | "EUR";
  kısa_açıklama: string;
  uzun_açıklama: string;
  özellikleri: string[];
  teknik_ozellikler: TeknikOzellikleri;
  stok_durumu: "Uygun" | "Sınırlı" | "Sipariş Üzerine" | "Tükendi";
}

export interface UrunVeritabani {
  kategoriler: Kategori[];
  urunler: Urun[];
}

/**
 * Ürün veritabanını yükle
 */
export async function urunVeritabaniYukle(): Promise<UrunVeritabani> {
  try {
    const response = await fetch("/data/products.json");
    if (!response.ok) throw new Error("Ürün veritabanı yüklenemedi");
    return await response.json();
  } catch (error) {
    console.error("Veritabanı yükleme hatası:", error);
    throw error;
  }
}

/**
 * Kategoriye göre ürünleri filtrele
 */
export function urunleriKategoriyeGoreFiltrele(
  urunler: Urun[],
  kategoriSlug: string
): Urun[] {
  return urunler.filter((urun) =>
    urun.kategoriler.some((k) => k.includes(kategoriSlug))
  );
}

/**
 * Slug'a göre kategoriyi bul
 */
export function kategoriBulSlugtan(
  kategoriler: Kategori[],
  slug: string
): Kategori | undefined {
  return kategoriler.find((k) => k.slug === slug);
}

/**
 * Slug'a göre ürünü bul
 */
export function urunBulSlugtan(urunler: Urun[], slug: string): Urun | undefined {
  return urunler.find((u) => u.slug === slug);
}

/**
 * Fiyata göre ürünleri sırala
 */
export function urunleriAralikFiltrele(
  urunler: Urun[],
  minFiyat?: number,
  maxFiyat?: number
): Urun[] {
  return urunler.filter((urun) => {
    if (minFiyat && urun.fiyat < minFiyat) return false;
    if (maxFiyat && urun.fiyat > maxFiyat) return false;
    return true;
  });
}

/**
 * Ürünleri arama terimine göre filtrele
 */
export function urunleriAramaYap(
  urunler: Urun[],
  terim: string
): Urun[] {
  const terimi = terim.toLowerCase();
  return urunler.filter(
    (urun) =>
      urun.ad.toLowerCase().includes(terimi) ||
      urun.kısa_açıklama.toLowerCase().includes(terimi) ||
      urun.uretici.toLowerCase().includes(terimi)
  );
}

/**
 * Stok durumuna göre renk dön
 */
export function stokRengiBul(stok: string): string {
  switch (stok) {
    case "Uygun":
      return "text-green-500";
    case "Sınırlı":
      return "text-yellow-500";
    case "Sipariş Üzerine":
      return "text-orange-500";
    case "Tükendi":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

/**
 * Fiyatı formatla
 */
export function fiyatiFormatla(fiyat: number, paraBirimi: string = "TRY"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: paraBirimi,
  }).format(fiyat);
}
