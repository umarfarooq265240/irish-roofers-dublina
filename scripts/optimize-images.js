// Build responsive image variants for the site from the generated originals.
// usage: node scripts/optimize-images.js [name-filter]
// input : client/photos/raw/*.png (first batch) and images/*.png (Phoenix batch, wins when both exist)
// output (public/sites/<site>/):
//   images/<name>.webp                 1024x576 fallback (the src used in <img>)
//   images/<name>-480|768.webp         responsive webp
//   images/<name>-480|768|1024.avif    responsive avif
//   og/<name>.jpg                      1200x630 social image
// Files named director-* are portrait: 576x1024 fallback, 480/768 wide variants keep a 9:16 ratio.
// sharp drops all metadata (EXIF) by default.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SITE = 'irishroofers';
const SOURCES = [path.join(ROOT, 'client/photos/raw'), path.join(ROOT, 'images')];
const IMG = path.join(ROOT, 'public/sites', SITE, 'images');
const OG = path.join(ROOT, 'public/sites', SITE, 'og');

const MAX = 200 * 1024;
/** Encode with decreasing quality until the file is under 200 KB (SEO / page speed budget). */
async function under200(make, q0) {
  let q = q0, out;
  do { out = await make(q); q -= 6; } while (out.length > MAX && q > 25);
  return out;
}

(async () => {
  fs.mkdirSync(IMG, { recursive: true });
  fs.mkdirSync(OG, { recursive: true });
  const filter = process.argv[2];
  const files = new Map(); // name -> source path (later source wins)
  for (const dir of SOURCES) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.png'))) files.set(f.replace('.png', ''), path.join(dir, f));
  }
  for (const [name, src] of files) {
    if (filter && !name.includes(filter)) continue;
    const portrait = name.startsWith('director-');
    const ratio = portrait ? 1024 / 576 : 576 / 1024;
    const fullW = portrait ? 576 : 1024;
    const dims = (w) => [w, Math.round(w * ratio)];
    const rs = (w) => sharp(src).resize(...dims(w), { fit: 'cover', position: 'centre' });
    fs.writeFileSync(path.join(IMG, `${name}.webp`), await under200((q) => rs(fullW).webp({ quality: q }).toBuffer(), 78));
    for (const w of [480, 768]) fs.writeFileSync(path.join(IMG, `${name}-${w}.webp`), await under200((q) => rs(w).webp({ quality: q }).toBuffer(), 76));
    // avif: portrait images are only 768 px wide at source, so the 1024 variant is the same 768 frame
    for (const w of [480, 768, 1024]) {
      const ww = portrait && w > 768 ? 768 : w;
      fs.writeFileSync(path.join(IMG, `${name}-${w}.avif`), await under200((q) => rs(ww).avif({ quality: q, effort: 4 }).toBuffer(), 50));
    }
    const og = await under200((q) => sharp(src).resize(1200, 630, { fit: 'cover', position: portrait ? 'top' : 'centre' }).jpeg({ quality: q, mozjpeg: true }).toBuffer(), 80);
    fs.writeFileSync(path.join(OG, `${name}.jpg`), og);
    console.log(name.padEnd(46), 'webp', Math.round(fs.statSync(path.join(IMG, `${name}.webp`)).size / 1024) + 'KB', 'avif1024', Math.round(fs.statSync(path.join(IMG, `${name}-1024.avif`)).size / 1024) + 'KB');
  }
})();
