// usage: node slice.js <png> <outPrefix> <sliceHeight>
const sharp = require(require.resolve('sharp', { paths: ['F:/New folder (3)/ai-website-cloner'] }));
const [src, prefix, hStr] = process.argv.slice(2);
const sh = parseInt(hStr || '1100', 10);
(async () => {
  const { width, height } = await sharp(src).metadata();
  let i = 0;
  for (let y = 0; y < height; y += sh, i++) {
    const h = Math.min(sh, height - y);
    await sharp(src).extract({ left: 0, top: y, width, height: h }).toFile(`${prefix}-${String(i).padStart(2, '0')}.png`);
  }
  console.log(width, height, i);
})();
