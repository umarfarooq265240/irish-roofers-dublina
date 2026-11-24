// usage: node outline.js <html>  — prints static body structure (no JS executed)
const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.setContent(fs.readFileSync(process.argv[2], 'utf8'), { waitUntil: 'domcontentloaded' });
  console.log(await p.evaluate(() => {
    const d = e => `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).join('.') : ''}`;
    const out = [];
    for (const c of document.body.children) {
      out.push(d(c) + ` (${c.outerHTML.length})`);
      if (c.tagName === 'MAIN') for (const s of c.children) out.push('  ' + d(s) + ` (${s.outerHTML.length})`);
    }
    return out.join('\n');
  }));
  await b.close();
})();
