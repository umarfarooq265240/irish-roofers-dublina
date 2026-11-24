// usage: node inspect.js <url> <outDir>
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const [url, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });

async function settle(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const results = {};
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: name === 'mobile', hasTouch: name === 'mobile' });
    const page = await ctx.newPage();
    const assets = new Set();
    page.on('response', r => { const t = r.request().resourceType(); if (['image', 'font', 'stylesheet', 'media', 'script'].includes(t)) assets.add(`${t}\t${r.status()}\t${r.headers()['content-type'] || ''}\t${r.url()}`); });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await settle(page);
    await page.screenshot({ path: path.join(out, `src-${name}-full.png`), fullPage: true });
    await page.screenshot({ path: path.join(out, `src-${name}-top.png`) });
    results[name] = await page.evaluate(() => {
      const cs = (el, props) => { const s = getComputedStyle(el); const o = {}; props.forEach(p => o[p] = s[p]); return o; };
      const P = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'padding', 'margin', 'textTransform', 'textAlign', 'borderRadius', 'display', 'gap', 'maxWidth', 'position'];
      const r = el => { const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y + scrollY), Math.round(b.width), Math.round(b.height)]; };
      const top = [...document.body.querySelectorAll('body > *, body > * > header, body > * > main > *, body > * > footer, main > *, header, footer, section')]
        .filter((e, i, a) => a.indexOf(e) === i && e.getBoundingClientRect().height > 0 && !['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT'].includes(e.tagName))
        .map(e => ({ tag: e.tagName, id: e.id, cls: e.className && e.className.baseVal === undefined ? e.className : '', rect: r(e), style: cs(e, P), text: e.innerText.replace(/\s+/g, ' ').slice(0, 300) }));
      const text = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,li,span,label,input,textarea,blockquote')]
        .filter(e => e.getBoundingClientRect().height > 0 && (e.children.length === 0 || /^H|P|A|BUTTON$/.test(e.tagName)))
        .slice(0, 400)
        .map(e => ({ tag: e.tagName, cls: typeof e.className === 'string' ? e.className : '', href: e.getAttribute('href'), rect: r(e), text: (e.innerText || e.value || e.placeholder || '').replace(/\s+/g, ' ').slice(0, 200), style: cs(e, P) }));
      const imgs = [...document.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, alt: i.alt, rect: r(i), natural: [i.naturalWidth, i.naturalHeight], fit: getComputedStyle(i).objectFit, pos: getComputedStyle(i).objectPosition }));
      const bgs = [...document.querySelectorAll('*')].map(e => ({ e, b: getComputedStyle(e).backgroundImage })).filter(x => x.b && x.b !== 'none').map(x => ({ cls: typeof x.e.className === 'string' ? x.e.className : x.e.tagName, rect: r(x.e), bg: x.b.slice(0, 300), size: getComputedStyle(x.e).backgroundSize, pos: getComputedStyle(x.e).backgroundPosition }));
      const svgs = [...document.querySelectorAll('svg')].map(s => ({ rect: r(s), parent: s.parentElement.className, html: s.outerHTML.slice(0, 3000) }));
      const fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`);
      return { title: document.title, height: document.body.scrollHeight, top, text, imgs, bgs, svgs, fonts, htmlClass: document.documentElement.className, bodyClass: document.body.className };
    });
    results[name].assets = [...assets];
    await ctx.close();
  }
  fs.writeFileSync(path.join(out, 'inspect.json'), JSON.stringify(results, null, 1));
  await browser.close();
  console.log('ok', results.desktop.height, results.mobile.height);
})().catch(e => { console.error(e); process.exit(1); });
