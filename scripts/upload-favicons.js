// Favicon dosyalarını Cloudinary'ye yükle ve URL'leri güncelle
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const faviconFiles = [
  { file: 'public/favicon.ico', publicId: 'favicon/favicon', name: 'favicon' },
  { file: 'public/favicon-16x16.png', publicId: 'favicon/favicon-16x16', name: 'favicon-16x16' },
  { file: 'public/favicon-96x96.png', publicId: 'favicon/favicon-96x96', name: 'favicon-96x96' },
  { file: 'public/apple-touch-icon.png', publicId: 'favicon/apple-touch-icon', name: 'apple-touch-icon' },
  { file: 'public/web-app-manifest-192x192.png', publicId: 'favicon/web-app-manifest-192x192', name: 'web-app-manifest-192x192' },
  { file: 'public/web-app-manifest-512x512.png', publicId: 'favicon/web-app-manifest-512x512', name: 'web-app-manifest-512x512' },
];

const uploadedUrls = {};

async function uploadFavicons() {
  console.log('🚀 Favicon dosyaları yükleniyor...\n');

  for (const item of faviconFiles) {
    try {
      console.log(`📤 Yükleniyor: ${item.file}`);
      
      const result = await cloudinary.uploader.upload(item.file, {
        public_id: item.publicId,
        folder: 'favicon',
        resource_type: 'image',
        overwrite: true,
      });
      
      uploadedUrls[item.name] = result.secure_url;
      console.log(`✅ Başarılı: ${result.secure_url}\n`);
    } catch (error) {
      console.error(`❌ Hata (${item.file}):`, error.message);
    }
  }

  // Layout.tsx'i güncelle
  updateLayoutFile();
}

function updateLayoutFile() {
  console.log('\n📝 layout.tsx güncelleniyor...');
  
  const layoutPath = 'src/app/layout.tsx';
  let layoutContent = fs.readFileSync(layoutPath, 'utf-8');

  // Icons object'ini güncelle
  const iconsConfig = `  icons: {
    icon: '${uploadedUrls['favicon']}',
    shortcut: '${uploadedUrls['favicon-16x16']}',
    apple: '${uploadedUrls['apple-touch-icon']}',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '${uploadedUrls['web-app-manifest-192x192']}',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '${uploadedUrls['web-app-manifest-512x512']}',
      },
    ],
  },`;

  // icons: { ile başlayan ve },\n  manifest ile biten bloğu bul ve değiştir
  const iconsRegex = /icons:\s*{[\s\S]*?},\s*(?=manifest:)/;
  
  if (iconsRegex.test(layoutContent)) {
    layoutContent = layoutContent.replace(iconsRegex, iconsConfig + '\n  ');
    fs.writeFileSync(layoutPath, layoutContent, 'utf-8');
    console.log('✅ layout.tsx güncellendi!\n');
    
    console.log('📋 Yüklenen URL\'ler:');
    Object.entries(uploadedUrls).forEach(([name, url]) => {
      console.log(`  ${name}: ${url}`);
    });
  } else {
    console.error('❌ icons config bulunamadı!');
  }
}

uploadFavicons().catch(console.error);
