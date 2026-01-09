import fs from 'fs';
import path from 'path';

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public/images/products');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`📁 Created directory: ${imagesDir}`);
}

// Product image colors (for variety)
const products = [
  { slug: 'dahua-xvr1a04-4-kanal', color: '#1a1a2e', label: 'XVR 4CH' },
  { slug: 'dahua-hdcvi-2mp-dome', color: '#16213e', label: '2MP DOME' },
  { slug: 'dahua-hdcvi-4mp-bullet', color: '#0f3460', label: '4MP BULLET' },
  { slug: 'dahua-nvr-8-kanal', color: '#1a1a2e', label: 'NVR 8CH' },
  { slug: 'dahua-alarm-acusense', color: '#e94560', label: 'ALARM' },
  { slug: 'dahua-access-kapi-kilidi', color: '#2a2a3e', label: 'LOCK' },
  { slug: 'dahua-rfid-okuyucu', color: '#3a3a4e', label: 'RFID' },
  { slug: 'dahua-guc-kaynagi-5a', color: '#4a4a5e', label: 'PSU' },
  { slug: 'dahua-kamera-kutusu-ss', color: '#5a5a6e', label: 'BOX' },
  { slug: 'dahua-ptz-kontrol', color: '#6a6a7e', label: 'PTZ' },
  { slug: 'dahua-4mp-boxed', color: '#2a2a5e', label: '4MP BOX' },
  { slug: 'dahua-ptz-dome-30x', color: '#1a4a5e', label: 'PTZ 30X' },
];

// Create SVG placeholder for each product
products.forEach(({ slug, color, label }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="grad-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#grad-${slug})"/>
    
    <!-- Product shape placeholder -->
    <rect x="80" y="60" width="240" height="280" fill="none" stroke="#fff" stroke-width="2" rx="10"/>
    <circle cx="200" cy="150" r="40" fill="#fff" opacity="0.1"/>
    <rect x="100" y="220" width="200" height="80" fill="#fff" opacity="0.05" rx="5"/>
    
    <!-- Dahua logo text -->
    <text x="200" y="350" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle" opacity="0.9">DAHUA</text>
    
    <!-- Product label -->
    <text x="200" y="380" font-family="Arial, sans-serif" font-size="16" fill="#ccc" text-anchor="middle" opacity="0.8">${label}</text>
  </svg>`;

  const filePath = path.join(imagesDir, `${slug}.jpg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ Created: ${slug}.jpg`);
});

console.log(`\n✨ All ${products.length} placeholder images created successfully!`);
