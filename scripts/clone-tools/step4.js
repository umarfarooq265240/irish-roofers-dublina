// Navigate funnel to step 4 WITHOUT submitting; report label styles. usage: node step4.js <url> <out.png>
const { chromium } = require('playwright-core');
const [url, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '#cookie-bar{display:none!important}' });
  await p.locator('#quote').scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  await p.locator('.qf-tile:has(input[value="Roof Repairs"])').click(); await p.waitForTimeout(900);
  await p.locator('.qf-step[data-step="2"] .qf-tile').first().click(); await p.waitForTimeout(900);
  await p.fill('#c_postcode', 'HP9'); await p.click('[data-qf-next]'); await p.waitForTimeout(1200);
  console.log(await p.evaluate(() => [...document.querySelectorAll('.qf-step[data-step="4"] label, .qf-step[data-step="4"] .consent span')].slice(0, 5).map(l => { const s = getComputedStyle(l); return `${l.tagName}.${l.className} "${l.textContent.trim().slice(0, 30)}" color=${s.color} op=${s.opacity} reveal=${l.closest('[data-reveal]')?.getAttribute('data-reveal')} split=${l.dataset.split}`; }).join('\n')));
  await p.screenshot({ path: out });
  await b.close();
})();
