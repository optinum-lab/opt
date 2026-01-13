const { default: pngToIco } = require('png-to-ico');
const fs = require('fs');
const path = require('path');

async function generateIco() {
  console.log('🎨 favicon.ico oluşturuluyor...');
  
  try {
    const input = path.join(__dirname, '../public/favicon-32x32.png');
    const output = path.join(__dirname, '../public/favicon.ico');
    
    const buf = await pngToIco(input);
    fs.writeFileSync(output, buf);
    
    console.log('✅ favicon.ico başarıyla oluşturuldu!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
}

generateIco();
