// usage: node html2jsx.js <source.html> <outComponentsDir> <assetMap.json>
// Converts static page regions into TSX components; rewrites asset URLs to /sites/amroofing/...
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const [src, outDir, mapOut] = process.argv.slice(2);

const REGIONS = [
  ['header#site-header', 'SiteHeaderMarkup'],
  ['main > section.nx-hero', 'Hero'],
  ['main > div.nx-trust', 'TrustBar'],
  ['main > section.nx-clients', 'Clients'],
  ['main > section.nx-psplit', 'Process'],
  ['main > section.nx-work2', 'RecentWork'],
  ['main > section.nx-sgrid', 'Services'],
  ['main > section.nx-standard', 'Standard'],
  ['main > section.nx-rtabs', 'Reviews'],
  ['main > section.nx-accred-row', 'Accreditations'],
  ['main > div.nx-stats-wrap', 'Stats'],
  ['main > section.nx-areas', 'Areas'],
  ['main > section.nx-quote', 'QuoteMarkup'],
  ['main > section.nx-faq', 'Faq'],
  ['main > section.advice-section', 'Advice'],
  ['main > section.nx-ctapanel', 'CtaPanel'],
  ['footer.nx-footer', 'Footer'],
  ['div.sticky-cta', 'StickyCta'],
  ['div#cookie-bar', 'CookieBarMarkup'],
];

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.setContent(fs.readFileSync(src, 'utf8'), { waitUntil: 'domcontentloaded' });
  const res = await p.evaluate((REGIONS) => {
    const ORIGIN = 'https://www.amroofingservices.co.uk';
    const assets = {};
    const localFor = (u) => {
      if (!u) return u;
      let abs;
      try { abs = new URL(u, ORIGIN + '/').href; } catch { return u; }
      if (!/\/wp-content\/(uploads|themes)\//.test(abs)) return u;
      const name = abs.split('/').pop().split('?')[0];
      const local = '/sites/amroofing/' + (/\.woff2?$/.test(name) ? 'fonts/' : 'images/') + name;
      assets[abs] = local;
      return local;
    };
    const rewriteSrcset = v => v.split(',').map(s => { const [u, ...d] = s.trim().split(/\s+/); return [localFor(u), ...d].join(' '); }).join(', ');
    const rewriteHref = v => {
      if (!v) return v;
      if (v === ORIGIN || v === ORIGIN + '/') return '/';
      if (v.startsWith(ORIGIN + '/#')) return v.slice(ORIGIN.length + 1);
      if (/\/wp-content\/uploads\//.test(v)) return localFor(v);
      return v;
    };
    const rewriteCssUrls = v => v.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, u) => `url('${localFor(u)}')`);

    const ATTR = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', minlength: 'minLength', srcset: 'srcSet', crossorigin: 'crossOrigin', autocomplete: 'autoComplete', fetchpriority: 'fetchPriority', novalidate: 'noValidate', playsinline: 'playsInline', autoplay: 'autoPlay', enctype: 'encType', inputmode: 'inputMode', enterkeyhint: 'enterKeyHint', colspan: 'colSpan', rowspan: 'rowSpan', 'accept-charset': 'acceptCharset', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', 'http-equiv': 'httpEquiv', referrerpolicy: 'referrerPolicy', datetime: 'dateTime', spellcheck: 'spellCheck', contenteditable: 'contentEditable', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', focusable: 'focusable', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'stroke-miterlimit': 'strokeMiterlimit', 'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset', 'stroke-opacity': 'strokeOpacity', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'fill-opacity': 'fillOpacity', 'clip-path': 'clipPath', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', 'font-size': 'fontSize', 'font-weight': 'fontWeight', 'font-family': 'fontFamily', 'text-anchor': 'textAnchor', 'dominant-baseline': 'dominantBaseline', 'vector-effect': 'vectorEffect', 'shape-rendering': 'shapeRendering', 'color-interpolation-filters': 'colorInterpolationFilters', 'letter-spacing': 'letterSpacing' };
    const BOOL = new Set(['open', 'required', 'hidden', 'disabled', 'noValidate', 'autoPlay', 'muted', 'loop', 'playsInline', 'multiple', 'readOnly', 'allowFullScreen', 'defaultChecked', 'controls', 'async', 'defer', 'selected', 'reversed']);
    const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
    const DROP = new Set(['script', 'noscript', 'style', 'template']);
    const q = s => JSON.stringify(s);
    const styleObj = s => {
      const parts = s.split(';').map(x => x.trim()).filter(Boolean).map(decl => {
        const i = decl.indexOf(':'); let k = decl.slice(0, i).trim(); const v = rewriteCssUrls(decl.slice(i + 1).trim());
        if (!k.startsWith('--')) k = k.replace(/-([a-z])/g, (m, c) => c.toUpperCase());
        return `${q(k)}: ${q(v)}`;
      });
      return `{{ ${parts.join(', ')} }}`;
    };
    let needsCssProps = false;
    const attrs = el => {
      const out = [];
      for (const a of el.attributes) {
        let n = a.name, v = a.value;
        if (/^on/.test(n)) continue;
        if (n === 'style') { const hv = /(^|;)\s*--/.test(v); if (hv) needsCssProps = true; const inner = styleObj(v).slice(1, -1); out.push(`style={${inner}${hv ? ' /* css-vars */' : ''}}`); continue; }
        if (n === 'src' || n === 'poster' || n === 'data-lightbox' || n === 'data-preview') v = localFor(v);
        if (n === 'srcset') v = rewriteSrcset(v);
        if (n === 'href') v = rewriteHref(v);
        if (n === 'action') { out.push(`action=${q(v)}`); continue; }
        if (el.tagName === 'INPUT' && n === 'checked') n = 'defaultChecked';
        if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && n === 'value' && !['hidden', 'radio', 'checkbox', 'submit', 'button'].includes(el.type)) n = 'defaultValue';
        if (el.tagName === 'OPTION' && n === 'selected') continue;
        const jn = ATTR[n] || (n.startsWith('data-') || n.startsWith('aria-') ? n : (n.includes(':') ? n.replace(/:([a-z])/g, (m, c) => c.toUpperCase()) : (n.includes('-') ? n.replace(/-([a-z])/g, (m, c) => c.toUpperCase()) : n)));
        if (BOOL.has(jn) && (v === '' || v === jn.toLowerCase() || v === n)) { out.push(jn); continue; }
        out.push(`${jn}=${q(v)}`);
      }
      return out.length ? ' ' + out.join(' ') : '';
    };
    const conv = (node, ind) => {
      const pad = '  '.repeat(ind);
      if (node.nodeType === 3) {
        const t = node.textContent.replace(/\s+/g, ' ');
        if (!t.trim()) return /\S/.test(node.textContent) ? '' : (node.previousSibling && node.nextSibling && node.textContent.includes(' ') && !node.textContent.includes('\n') ? pad + '{" "}' : (node.textContent.includes('\n') ? '' : pad + '{" "}'));
        if (/^[^{}<>]*$/.test(t) && t === t.trim()) return pad + t.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        return pad + `{${q(t)}}`;
      }
      if (node.nodeType !== 1) return '';
      const tag = node.tagName.toLowerCase();
      if (DROP.has(tag)) return '';
      // select default value
      let extra = '';
      if (tag === 'select') { const s = node.querySelector('option[selected]'); if (s) extra = ` defaultValue=${q(s.value)}`; }
      if (tag === 'textarea') { const v = node.textContent; return `${pad}<textarea${attrs(node)}${v ? ` defaultValue=${q(v)}` : ''} />`; }
      const open = `<${node.namespaceURI === 'http://www.w3.org/2000/svg' ? node.tagName : tag}${attrs(node)}${extra}`;
      const kids = [...node.childNodes].map(c => conv(c, ind + 1)).filter(Boolean);
      if (VOID.has(tag) || !kids.length) return `${pad}${open} />`;
      return `${pad}${open}>\n${kids.join('\n')}\n${pad}</${node.namespaceURI === 'http://www.w3.org/2000/svg' ? node.tagName : tag}>`;
    };
    const regions = REGIONS.map(([sel, name]) => {
      const el = document.querySelector(sel);
      if (!el) return { name, missing: sel };
      needsCssProps = false;
      return { name, jsx: conv(el, 2), cssProps: needsCssProps };
    });
    return { regions, assets };
  }, REGIONS);

  fs.mkdirSync(outDir, { recursive: true });
  for (const r of res.regions) {
    if (r.missing) { console.log('MISSING', r.name, r.missing); continue; }
    const body = r.jsx.replace(/ \/\* css-vars \*\//g, ' as React.CSSProperties');
    const file = `/* eslint-disable @next/next/no-img-element */\n// Ported from https://www.amroofingservices.co.uk/ (static markup).\n${/as React\.CSSProperties/.test(body) ? 'import type React from "react";\n\n' : '\n'}export function ${r.name}() {\n  return (\n${body}\n  );\n}\n`;
    fs.writeFileSync(path.join(outDir, r.name + '.tsx'), file);
    console.log('wrote', r.name, file.length);
  }
  fs.writeFileSync(mapOut, JSON.stringify(res.assets, null, 1));
  console.log('assets', Object.keys(res.assets).length);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
