// usage: node prune-css.js <theme.css> <source.html> <out.css>
// Keeps rules whose class/id tokens all exist in the page (static markup + runtime-toggled classes).
const ROOT = 'F:/New folder (3)/ai-website-cloner';
const postcss = require(require.resolve('postcss', { paths: [ROOT] }));
const fs = require('fs');
const [cssPath, htmlPath, outPath] = process.argv.slice(2);
const html = fs.readFileSync(htmlPath, 'utf8');
const classes = new Set();
for (const m of html.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).filter(Boolean).forEach(c => classes.add(c));
const ids = new Set([...html.matchAll(/id="([^"]*)"/g)].map(m => m[1]));
// classes added by theme/consent scripts at runtime
['has-js', 'no-js', 'is-open', 'nav-open', 'is-stuck', 'has-scrolled', 'is-visible', 'is-split', 'line', 'line-in', 'w', 'is-current', 'is-live',
  'is-shake', 'is-sending', 'qf-chip', 'is-on', 'is-placeholder', 'is-static', 'is-offscreen', 'is-lit', 'scroll-progress', 'to-top', 'is-active', 'is-done'].forEach(c => classes.add(c));

const strip = s => s.replace(/:(not|is|where|has)\((?:[^()]|\([^()]*\))*\)/g, '');
const selOk = sel => {
  const s = strip(sel);
  for (const m of s.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) if (!classes.has(m[1])) return false;
  for (const m of s.matchAll(/#(-?[_a-zA-Z][\w-]*)/g)) if (!ids.has(m[1])) return false;
  return true;
};
let kept = 0, dropped = 0;
const root = postcss.parse(fs.readFileSync(cssPath, 'utf8'));
root.walkRules(rule => {
  if (rule.parent && rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;
  const ok = rule.selectors.filter(selOk);
  if (!ok.length) { rule.remove(); dropped++; return; }
  rule.selectors = ok; kept++;
});
root.walkAtRules(a => { if (/^(media|supports|container|layer)$/.test(a.name) && (!a.nodes || !a.nodes.length)) a.remove(); });
root.walkDecls(d => { d.value = d.value.replace(/url\((["']?)\.\.\/fonts\/([^"')]+)\1\)/g, 'url("/sites/amroofing/fonts/$2")'); });
// pretty print
root.walk(n => { n.raws.before = '\n'; n.raws.after = '\n'; n.raws.between = n.type === 'decl' ? ': ' : ' '; if (n.type === 'decl') n.raws.before = '\n  '; });
let out = root.toString().replace(/\n{2,}/g, '\n');
fs.writeFileSync(outPath, out.trim() + '\n');
console.log('kept', kept, 'dropped', dropped, 'bytes', out.length);
