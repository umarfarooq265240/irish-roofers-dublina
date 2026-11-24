// Runs after `next build` (npm "postbuild"). With output: "export" + trailingSlash, Next writes route prefetch
// payloads as <route>/__next.<seg>/__PAGE__.txt but the client requests <route>/__next.<seg>.__PAGE__.txt,
// which 404s on plain static hosts (console errors, lost prefetch). Write the flat names next to the nested ones.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');
let copied = 0;

/** Copy every .txt under `src` (any depth) to `<dest>/<flatName>.<nested.path>.txt`. */
function flatten(src, flatName, dest) {
  for (const f of fs.readdirSync(src, { withFileTypes: true })) {
    const p = path.join(src, f.name);
    if (f.isDirectory()) flatten(p, `${flatName}.${f.name}`, dest);
    else if (f.name.endsWith('.txt')) {
      fs.copyFileSync(p, path.join(dest, `${flatName}.${f.name}`));
      copied++;
    }
  }
}

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith('__next.')) flatten(p, e.name, dir);
      walk(p);
    }
  }
})(OUT);

console.log(`postbuild-export: wrote ${copied} flat prefetch files`);
