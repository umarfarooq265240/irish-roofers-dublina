// usage: node probe.js <url> <outDir>
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const [url, out] = process.argv.slice(2);
const shot = (p, n, o = {}) => p.screenshot({ path: path.join(out, n), ...o });
const hideCookie = p => p.addStyleTag({ content: '#cookie-bar{display:none!important}' });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const log = {};
  // desktop
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await hideCookie(p);
    await p.waitForTimeout(1500);
    await shot(p, 'src-desktop-hero.png');
    // hover states
    await p.hover('.nx-header a[href*="survey"], .nx-header .btn, header a:has-text("Free survey")').catch(() => {});
    await p.waitForTimeout(400);
    await shot(p, 'src-desktop-hover-cta.png', { clip: { x: 1000, y: 0, width: 440, height: 90 } });
    // slow scroll to faq
    const faqY = await p.evaluate(() => document.querySelector('.nx-faq').getBoundingClientRect().top + scrollY);
    for (let y = 0; y < faqY; y += 300) { await p.mouse.wheel(0, 300); await p.waitForTimeout(60); }
    await p.waitForTimeout(2500);
    await shot(p, 'src-desktop-faq-viewport.png');
    log.faq = await p.evaluate(() => [...document.querySelectorAll('.nx-faq *, .advice-section *')].filter(e => getComputedStyle(e).opacity === '0' || e.hasAttribute('data-reveal')).slice(0, 15).map(e => `${e.tagName}.${e.className} reveal=${e.getAttribute('data-reveal')} op=${getComputedStyle(e).opacity} vis=${getComputedStyle(e).visibility}`));
    log.faqSectionStyle = await p.evaluate(() => { const s = getComputedStyle(document.querySelector('.nx-faq')); return [s.opacity, s.visibility, s.display, s.contentVisibility]; });
    log.headerScrolled = await p.evaluate(() => { const h = document.querySelector('.nx-header'); const s = getComputedStyle(h); return { cls: h.className, bg: s.backgroundColor, pos: s.position, backdrop: s.backdropFilter, h: h.getBoundingClientRect().height, shadow: s.boxShadow }; });
    await shot(p, 'src-desktop-header-scrolled.png', { clip: { x: 0, y: 0, width: 1440, height: 100 } });
    // form interactions
    await p.evaluate(() => document.querySelector('#quote').scrollIntoView());
    await p.waitForTimeout(1500);
    log.formHtml = await p.evaluate(() => document.querySelector('#quote form').outerHTML);
    const opt = p.locator('#quote form label, #quote form button[type=button]').first();
    await opt.click().catch(e => log.optErr = e.message);
    await p.waitForTimeout(500);
    await shot(p, 'src-desktop-form-selected.png');
    await p.locator('#quote form :text("Continue")').first().click().catch(e => log.contErr = e.message);
    await p.waitForTimeout(800);
    await shot(p, 'src-desktop-form-step2.png');
    // reviews tabs section
    log.rtabs = await p.evaluate(() => document.querySelector('.nx-rtabs').outerHTML.slice(0, 6000));
    await ctx.close();
  }
  // mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await hideCookie(p);
    await p.waitForTimeout(1500);
    await shot(p, 'src-mobile-hero.png');
    const toggle = p.locator('.nav-toggle, [aria-controls*="nav"], button[aria-expanded]').first();
    log.toggle = await toggle.evaluate(e => e.outerHTML).catch(e => e.message);
    await toggle.click().catch(e => log.toggleErr = e.message);
    await p.waitForTimeout(900);
    await shot(p, 'src-mobile-menu-open.png');
    await ctx.close();
  }
  fs.writeFileSync(path.join(out, 'probe.json'), JSON.stringify(log, null, 1));
  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
