# Favicon'ları Cloudinary'ye Manuel Yükleme

## Gerekli Dosyalar:
1. favicon.ico
2. favicon-16x16.png
3. favicon-32x32.png
4. favicon-96x96.png
5. apple-touch-icon.png
6. web-app-manifest-192x192.png
7. web-app-manifest-512x512.png

## Manuel Yükleme Adımları:

### 1. Cloudinary Dashboard'a Girin
- https://cloudinary.com/console/media_library

### 2. "favicon" Klasörü Oluşturun
- Media Library > Upload > Create Folder: "favicon"

### 3. Her Dosyayı Sürükle-Bırak ile Yükleyin
- `public/favicon.ico` → favicon klasörüne
- `public/favicon-16x16.png` → favicon klasörüne
- `public/favicon-32x32.png` → favicon klasörüne
- `public/favicon-96x96.png` → favicon klasörüne
- `public/apple-touch-icon.png` → favicon klasörüne
- `public/web-app-manifest-192x192.png` → favicon klasörüne
- `public/web-app-manifest-512x512.png` → favicon klasörüne

### 4. Public ID'leri Kaydedin
Yüklenen her dosyanın URL'ini şu formatta alın:
```
https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/favicon/[filename]
```

### 5. layout.tsx'i Güncelleyin
Zaten güncellenmiş durumda! Cloud name: `dkxbhuvvp`

## Mevcut URL'ler (layout.tsx'de):
```typescript
icons: {
  icon: 'https://res.cloudinary.com/dkxbhuvvp/image/upload/v1737565820/favicon/favicon.ico',
  shortcut: 'https://res.cloudinary.com/dkxbhuvvp/image/upload/v1737565820/favicon/favicon-16x16.png',
  apple: 'https://res.cloudinary.com/dkxbhuvvp/image/upload/v1737565820/favicon/apple-touch-icon.png',
  other: [
    {
      sizes: '192x192',
      url: 'https://res.cloudinary.com/dkxbhuvvp/image/upload/v1737565820/favicon/web-app-manifest-192x192.png',
    },
    {
      sizes: '512x512',
      url: 'https://res.cloudinary.com/dkxbhuvvp/image/upload/v1737565820/favicon/web-app-manifest-512x512.png',
    },
  ],
}
```

## Test:
1. `npm run build`
2. Tarayıcıda favicon'un göründüğünü kontrol edin
3. Chrome DevTools > Application > Manifest kontrol

## Not:
- Version number (v1737565820) değişebilir, Cloudinary'nin verdiği değeri kullanın
- Dosyalar public olmalı (Access Control: Public)
