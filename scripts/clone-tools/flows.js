// usage: node flows.js <localUrl> <outDir>
const { chromium } = require('playwright-core');
const path = require('path');
const [url, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const log = [];
  const errs = [];
  // desktop: cookie bar + funnel + faq
  {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    p.on('pageerror', e => errs.push(e.message));
    p.on('request', r => { if (r.method() === 'POST') errs.push('POST ' + r.url()); });
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    log.push('cookie bar visible: ' + await p.isVisible('#cookie-bar'));
    await p.screenshot({ path: path.join(out, 'flow-cookie.png'), clip: { x: 0, y: 600, width: 1440, height: 300 } });
    await p.click('[data-cookie="manage"]');
    log.push('prefs open: ' + await p.isVisible('#cookie-prefs'));
    await p.click('[data-cookie="reject"]');
    log.push('cookie bar after reject: ' + await p.isVisible('#cookie-bar'));

    await p.locator('#quote').scrollIntoViewIfNeeded();
    await p.waitForTimeout(1500);
    await p.click('[data-qf-next]');
    await p.waitForTimeout(150);
    log.push('shake on empty step1: ' + await p.evaluate(() => document.querySelector('.qf-step[data-step="1"]').classList.contains('is-shake')));
    await p.locator('.qf-tile:has(input[value="Roof Repairs"])').click();
    await p.waitForTimeout(900);
    log.push('after tile -> step ' + await p.textContent('[data-qf-current]'));
    await p.locator('.qf-step[data-step="2"] .qf-tile').first().click();
    await p.waitForTimeout(900);
    log.push('after enquiry -> step ' + await p.textContent('[data-qf-current]'));
    await p.click('[data-qf-next]');
    await p.waitForTimeout(200);
    log.push('postcode error: ' + await p.textContent('#c_postcode_err'));
    await p.fill('#c_postcode', 'hp9 1aa');
    await p.click('[data-qf-next]');
    await p.waitForTimeout(800);
    log.push('step ' + await p.textContent('[data-qf-current]') + ' summary: ' + (await p.textContent('[data-qf-summary]')).replace(/\s+/g, ' '));
    await p.screenshot({ path: path.join(out, 'flow-step4.png') });
    await p.click('[data-qf-submit]');
    await p.waitForTimeout(300);
    log.push('name error: ' + await p.textContent('#c_name_err'));
    await p.fill('#c_name', 'Test Person');
    await p.fill('#c_phone', '01234 567890');
    await p.fill('#c_email', 'test@example.com');
    await p.check('input[name="consent"]');
    await p.click('[data-qf-submit]');
    await p.waitForTimeout(500);
    log.push('submit text: ' + (await p.textContent('[data-qf-submit]')).trim() + ' disabled=' + await p.isDisabled('[data-qf-submit]'));
    // faq
    await p.locator('.faq-item').nth(1).locator('summary').click();
    log.push('faq 2 open: ' + await p.evaluate(() => document.querySelectorAll('.faq-item')[1].open));
    await p.evaluate(() => window.scrollTo(0, 3000));
    await p.waitForTimeout(500);
    log.push('header stuck: ' + await p.evaluate(() => document.getElementById('site-header').classList.contains('is-stuck')) + ', to-top visible: ' + await p.evaluate(() => document.querySelector('.to-top').classList.contains('is-visible')));
  }
  // mobile menu
  {
    const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: '#cookie-bar{display:none!important}' });
    await p.click('.nav-toggle');
    await p.waitForTimeout(900);
    log.push('menu open: ' + await p.evaluate(() => document.getElementById('primary-nav').classList.contains('is-open')));
    await p.screenshot({ path: path.join(out, 'flow-mobile-menu.png') });
    await p.keyboard.press('Escape');
    await p.waitForTimeout(300);
    log.push('menu after Esc: ' + await p.evaluate(() => document.getElementById('primary-nav').classList.contains('is-open')));
  }
  console.log(log.join('\n'));
  console.log('page errors / POSTs:', errs.length ? errs : 'none');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
