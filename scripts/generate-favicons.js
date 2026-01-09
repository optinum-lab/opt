const sharp = require('sharp');
const _pngToIco = require('png-to-ico');
const pngToIco = _pngToIco && _pngToIco.default ? _pngToIco.default : _pngToIco;
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const faviconDir = path.join(publicDir, 'favicon');
const logoCandidates = [path.join(publicDir, 'logo.png'), path.join(publicDir, 'logo-light.png'), path.join(publicDir, 'file.svg')];

async function findLogo() {
  for (const p of logoCandidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No source logo found in public/');
}

async function generate() {
  const src = await findLogo();
  console.log('Using source:', src);

  // Ensure favicon dir exists
  if (!fs.existsSync(faviconDir)) fs.mkdirSync(faviconDir, { recursive: true });

  // Sizes to generate as PNGs
  const pngSizes = [16, 32, 48, 96, 180, 192, 512];

  // Convert SVG to PNG if needed and resize
  for (const size of pngSizes) {
    const out = path.join(faviconDir, `favicon-${size}x${size}.png`);
    await sharp(src)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(out);
    console.log('Wrote', out);
  }

  // Create apple-touch-icon (180x180)
  const appleOut = path.join(faviconDir, 'apple-touch-icon.png');
  await sharp(src).resize(180, 180).png({ quality: 90 }).toFile(appleOut);
  console.log('Wrote', appleOut);

  // Create maskable 192/512 (web manifest) - already covered by pngSizes but write explicitly
  const mask192 = path.join(faviconDir, 'web-app-manifest-192x192.png');
  const mask512 = path.join(faviconDir, 'web-app-manifest-512x512.png');
  await sharp(src).resize(192, 192).png({ quality: 90 }).toFile(mask192);
  await sharp(src).resize(512, 512).png({ quality: 90 }).toFile(mask512);
  console.log('Wrote maskable icons');

  // Generate favicon.ico from 16,32,48
  const icoOut = path.join(faviconDir, 'favicon.ico');
  const icoBuf = await pngToIco([
    path.join(faviconDir, 'favicon-16x16.png'),
    path.join(faviconDir, 'favicon-32x32.png'),
    path.join(faviconDir, 'favicon-48x48.png'),
  ]);
  fs.writeFileSync(icoOut, icoBuf);
  console.log('Wrote', icoOut);

  console.log('All favicons generated successfully.');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
