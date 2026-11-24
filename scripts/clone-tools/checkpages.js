// usage: node checkpages.js <baseUrl> <path>...   -> console errors, 4xx/5xx requests, horizontal overflow at 390 and 1440
const { chromium } = require('playwright-core');
const [base, ...paths] = process.argv.slice(2);
(async () => {
  const br = await chromium.launch({ channel: 'chrome' });
  for (const path of paths) for (const w of [390, 1440]) {
    const ctx = await br.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 600 });
    const p = await ctx.newPage(); const bad = [];
    p.on('console', m => { if (m.type() === 'error') bad.push('console: ' + m.text().slice(0, 120)); });
    p.on('pageerror', e => bad.push('pageerror: ' + e.message.slice(0, 120)));
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().slice(0, 120)); });
    await p.goto(base + path, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 400) { await p.mouse.wheel(0, 400); await p.waitForTimeout(40); }
    const o = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (o > 0) bad.push('horizontal overflow ' + o + 'px');
    console.log(path, w, bad.length ? bad.join(' | ') : 'ok');
    await ctx.close();
  }
  await br.close();
})();
