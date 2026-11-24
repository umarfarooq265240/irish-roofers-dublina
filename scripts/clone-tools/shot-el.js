// usage: node shot-el.js <url> <selector> <out.png> [width]
const { chromium } = require('playwright-core');
const [url, sel, out, w = '1440'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await (await b.newContext({ viewport: { width: +w, height: 900 }, isMobile: +w < 600 })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '#cookie-bar{display:none!important}' });
  await p.locator(sel).scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  console.log(await p.evaluate(s => { const f = document.querySelector(s); const q = f.querySelector('[data-funnel]'); return q ? q.className + ' | steps: ' + [...q.querySelectorAll('.qf-step')].map(x => x.className + ':' + Math.round(x.getBoundingClientRect().height)).join(', ') : 'no funnel'; }, sel));
  await p.locator(sel).screenshot({ path: out });
  await b.close();
})();
