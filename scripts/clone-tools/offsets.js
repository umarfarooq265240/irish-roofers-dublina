// usage: node offsets.js <srcUrl> <localUrl> <width>
const { chromium } = require('playwright-core');
const [a, b, w = '1440'] = process.argv.slice(2);
(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  const get = async url => {
    const ctx = await br.newContext({ viewport: { width: +w, height: 900 }, isMobile: +w < 600 });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 250) { await p.mouse.wheel(0, 250); await p.waitForTimeout(60); }
    await p.waitForTimeout(1500);
    const r = await p.evaluate(() => [...document.querySelectorAll('header#site-header, main > *, footer')].map(e => [(e.className || '').toString().split(' ').slice(-1)[0], Math.round(e.getBoundingClientRect().height)]));
    await ctx.close();
    return r;
  };
  const A = await get(a), B = await get(b);
  A.forEach((x, i) => { const y = B[i] || ['-', 0]; console.log(String(x[0]).padEnd(22), String(x[1]).padStart(6), String(y[1]).padStart(6), x[1] !== y[1] ? '  <-- ' + (y[1] - x[1]) : '', x[0] !== y[0] ? ' name:' + y[0] : ''); });
  await br.close();
})();
