// usage: node compare.js <srcUrl> <localUrl> <outDir> [sliceH]
const { chromium } = require('playwright-core');
const sharp = require(require.resolve('sharp', { paths: ['F:/New folder (3)/ai-website-cloner'] }));
const fs = require('fs');
const path = require('path');
const [srcUrl, localUrl, out, sh = '1000'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });

async function capture(browser, url, vp, mobile, tag) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200)); });
  p.on('pageerror', e => errors.push('pageerror: ' + e.message.slice(0, 200)));
  p.on('response', r => { if (r.status() >= 400 && r.url().startsWith(url.replace(/\/$/, ''))) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await p.addStyleTag({ content: '#cookie-bar{display:none!important}' });
  await p.waitForTimeout(1200);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 250) { await p.mouse.wheel(0, 250); await p.waitForTimeout(70); }
  await p.waitForTimeout(1800);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1200);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const file = path.join(out, `${tag}.png`);
  await p.screenshot({ path: file, fullPage: true });
  await ctx.close();
  return { file, errors, overflow };
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const report = {};
  for (const [name, vp, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
    const a = await capture(browser, srcUrl, vp, mobile, `${name}-src`);
    const b = await capture(browser, localUrl, vp, mobile, `${name}-local`);
    const ma = await sharp(a.file).metadata(), mb = await sharp(b.file).metadata();
    report[name] = { srcHeight: ma.height, localHeight: mb.height, localErrors: b.errors, localOverflow: b.overflow, srcOverflow: a.overflow };
    const H = Math.max(ma.height, mb.height), W = vp.width, gap = 20, S = parseInt(sh, 10) * (mobile ? 1.6 : 1);
    for (let y = 0, i = 0; y < H; y += S, i++) {
      const hh = Math.min(S, H - y);
      const part = async (f, m) => {
        const h2 = Math.max(0, Math.min(hh, m.height - y));
        if (!h2) return null;
        return sharp(f).extract({ left: 0, top: y, width: Math.min(W, m.width), height: h2 }).png().toBuffer();
      };
      const pa = await part(a.file, ma), pb = await part(b.file, mb);
      const comp = [];
      if (pa) comp.push({ input: pa, left: 0, top: 0 });
      if (pb) comp.push({ input: pb, left: W + gap, top: 0 });
      const merged = await sharp({ create: { width: W * 2 + gap, height: Math.round(hh), channels: 3, background: '#ff00ff' } })
        .composite(comp).png().toBuffer();
      await sharp(merged).resize({ width: mobile ? W * 2 + gap : 1600 }).png()
        .toFile(path.join(out, `cmp-${name}-${String(i).padStart(2, '0')}.png`));
    }
  }
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
