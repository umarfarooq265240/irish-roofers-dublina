// Prepare the client-supplied logo and partner logos for the site.
// input : client/assets/logo-irish-roofers-source.png, client/assets/partners-logos.png
// output: public/sites/irishroofers/images/logo-irish-roofers-dublin.{png,webp} and partners/<name>.png
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'public/sites/irishroofers/images');
const PARTNERS = path.join(IMG, 'partners');

// crop boxes [left, top, width, height] measured on the 1368x325 strip
const BOXES = {
  iko: [50, 20, 225, 95],
  'campion-insurance': [310, 25, 245, 75],
  cedral: [570, 35, 250, 50],
  trustedpeople: [840, 40, 235, 45],
  'blue-bangor-slate': [1090, 20, 255, 85],
  rcca: [190, 140, 215, 95],
  cif: [505, 130, 115, 115],
  moy: [770, 130, 110, 105],
  proseo: [1000, 150, 175, 60],
};

(async () => {
  fs.mkdirSync(PARTNERS, { recursive: true });
  const logo = sharp(path.join(ROOT, 'client/assets/logo-irish-roofers-source.png')).trim();
  const buf = await logo.resize({ width: 520 }).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(path.join(IMG, 'logo-irish-roofers-dublin.png'), buf);
  await sharp(buf).webp({ quality: 90 }).toFile(path.join(IMG, 'logo-irish-roofers-dublin.webp'));
  const m = await sharp(buf).metadata();
  console.log('logo', m.width + 'x' + m.height);

  const strip = path.join(ROOT, 'client/assets/partners-logos.png');
  // flatten on white so the tiles look the same on any background
  const flat = await sharp(strip).flatten({ background: '#ffffff' }).toBuffer();
  for (const [name, [left, top, width, height]] of Object.entries(BOXES)) {
    const out = path.join(PARTNERS, `${name}.png`);
    const cut = await sharp(flat).extract({ left, top, width, height }).toBuffer();
    const b = await sharp(cut).trim({ background: '#ffffff', threshold: 12 }).extend({ top: 6, bottom: 6, left: 6, right: 6, background: '#ffffff' }).png({ compressionLevel: 9 }).toBuffer();
    fs.writeFileSync(out, b);
    const mm = await sharp(b).metadata();
    console.log(name, mm.width + 'x' + mm.height);
  }
})();
