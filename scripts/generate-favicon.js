const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'web-app-manifest-192x192.png' },
  { size: 512, name: 'web-app-manifest-512x512.png' },
];

async function generateFavicons() {
  const inputPath = path.join(__dirname, '../public/favicon.png');
  const outputDir = path.join(__dirname, '../public');

  console.log('🎨 Favicon oluşturuluyor...');

  try {
    // PNG formatında farklı boyutlar oluştur
    for (const { size, name } of sizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, name));
      console.log(`✅ ${name} oluşturuldu`);
    }

    // ICO formatı için 32x32 kullan
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(outputDir, 'favicon-32-temp.png'));

    // ICO için basit bir çözüm: 32x32 PNG'yi .ico olarak kopyala
    // Gerçek ICO formatı için to-ico paketi kullanılabilir
    console.log('✅ Favicon dosyaları oluşturuldu!');
    console.log('⚠️  Not: favicon.ico için https://www.favicon-generator.org/ gibi bir araç kullanın');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
}

generateFavicons();
