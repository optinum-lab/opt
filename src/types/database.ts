/**
 * Supabase Database Types
 * Veritabanı şeması için TypeScript tipleri
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      kategoriler: {
        Row: {
          id: number;
          ad: string;
          slug: string;
          aciklama: string | null;
          gorsel: string | null;
          sira: number;
          aktif: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          ad: string;
          slug: string;
          aciklama?: string | null;
          gorsel?: string | null;
          sira?: number;
          aktif?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          ad?: string;
          slug?: string;
          aciklama?: string | null;
          gorsel?: string | null;
          sira?: number;
          aktif?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      urunler: {
        Row: {
          id: number;
          ad: string;
          slug: string;
          uretici: string;
          gorsel: string | null;
          fiyat: number;
          para_birimi: string;
          kisa_aciklama: string | null;
          uzun_aciklama: string | null;
          ozellikler: Json;
          teknik_ozellikler: Json;
          stok_durumu: string;
          aktif: boolean;
          one_cikan: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          ad: string;
          slug: string;
          uretici: string;
          gorsel?: string | null;
          fiyat: number;
          para_birimi?: string;
          kisa_aciklama?: string | null;
          uzun_aciklama?: string | null;
          ozellikler?: Json;
          teknik_ozellikler?: Json;
          stok_durumu?: string;
          aktif?: boolean;
          one_cikan?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          ad?: string;
          slug?: string;
          uretici?: string;
          gorsel?: string | null;
          fiyat?: number;
          para_birimi?: string;
          kisa_aciklama?: string | null;
          uzun_aciklama?: string | null;
          ozellikler?: Json;
          teknik_ozellikler?: Json;
          stok_durumu?: string;
          aktif?: boolean;
          one_cikan?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      urun_kategoriler: {
        Row: {
          id: number;
          urun_id: number;
          kategori_id: number;
        };
        Insert: {
          id?: number;
          urun_id: number;
          kategori_id: number;
        };
        Update: {
          id?: number;
          urun_id?: number;
          kategori_id?: number;
        };
      };
      kampanyalar: {
        Row: {
          id: number;
          baslik: string;
          slug: string;
          aciklama: string | null;
          gorsel: string | null;
          indirim_orani: number | null;
          baslangic_tarihi: string | null;
          bitis_tarihi: string | null;
          aktif: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          baslik: string;
          slug: string;
          aciklama?: string | null;
          gorsel?: string | null;
          indirim_orani?: number | null;
          baslangic_tarihi?: string | null;
          bitis_tarihi?: string | null;
          aktif?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          baslik?: string;
          slug?: string;
          aciklama?: string | null;
          gorsel?: string | null;
          indirim_orani?: number | null;
          baslangic_tarihi?: string | null;
          bitis_tarihi?: string | null;
          aktif?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      ayarlar: {
        Row: {
          id: number;
          anahtar: string;
          deger: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          anahtar: string;
          deger: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          anahtar?: string;
          deger?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Tablo tipleri için kısa yollar
export type Kategori = Database['public']['Tables']['kategoriler']['Row'];
export type KategoriInsert = Database['public']['Tables']['kategoriler']['Insert'];
export type KategoriUpdate = Database['public']['Tables']['kategoriler']['Update'];

export type Urun = Database['public']['Tables']['urunler']['Row'];
export type UrunInsert = Database['public']['Tables']['urunler']['Insert'];
export type UrunUpdate = Database['public']['Tables']['urunler']['Update'];

export type Kampanya = Database['public']['Tables']['kampanyalar']['Row'];
export type KampanyaInsert = Database['public']['Tables']['kampanyalar']['Insert'];
export type KampanyaUpdate = Database['public']['Tables']['kampanyalar']['Update'];

export type Ayar = Database['public']['Tables']['ayarlar']['Row'];
