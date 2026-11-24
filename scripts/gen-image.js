// Generate a realistic photo for the site.
// usage: node scripts/gen-image.js <name> "<scene>" [provider] [aspect]
//   provider: hf (free FLUX Space, default) | gemini (Nano Banana) | cloudflare (Workers AI FLUX)
//   aspect:   16:9 (default) | 4:3 | 1:1
// output: client/photos/raw/<name>.png
// keys are read from .env.local and cloudef.env (both gitignored):
//   GEMINI_API_KEY, GEMINI_IMAGE_MODEL (optional), CF_ACCOUNT_ID, CF_API_TOKEN
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
for (const f of ['.env.local', 'cloudef.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const [name, scene, provider = 'hf', aspect = '16:9'] = process.argv.slice(2);
if (!name || !scene) { console.log('usage: node scripts/gen-image.js <name> "<scene>" [hf|gemini|cloudflare] [16:9|4:3|1:1]'); process.exit(1); }
const prompt = `Photorealistic DSLR photograph, ${scene}, Dublin suburb house, overcast Irish sky, soft natural light, 35mm lens, sharp realistic detail, natural colours, no text, no logos, no watermark`;
const SIZES = { '16:9': [1344, 768], '4:3': [1152, 864], '1:1': [1024, 1024] };
const [W, H] = SIZES[aspect] || SIZES['16:9'];

async function hf() {
  const B = 'https://black-forest-labs-flux-1-schnell.hf.space/gradio_api';
  const r = await fetch(`${B}/call/infer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [prompt, 0, true, W, H, 4] }) });
  const { event_id } = await r.json();
  const t = await (await fetch(`${B}/call/infer/${event_id}`, { signal: AbortSignal.timeout(180000) })).text();
  const m = t.match(/"url": "([^"]+)"/);
  if (!m) throw new Error('HF: ' + t.slice(0, 200));
  return Buffer.from(await (await fetch(m[1])).arrayBuffer());
}

async function gemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY missing in .env.local');
  const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: aspect } },
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${j.error?.message || JSON.stringify(j).slice(0, 200)}`);
  const part = j.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!part) throw new Error('Gemini returned no image: ' + JSON.stringify(j).slice(0, 200));
  return Buffer.from(part.inlineData.data, 'base64');
}

async function cloudflare() {
  const { CF_ACCOUNT_ID: id, CF_API_TOKEN: token } = process.env;
  if (!id || !token) throw new Error('CF_ACCOUNT_ID / CF_API_TOKEN missing in cloudef.env');
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/@cf/black-forest-labs/flux-1-schnell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ prompt, steps: 8 }),
  });
  const j = await r.json();
  if (!r.ok || !j.result?.image) throw new Error(`Cloudflare ${r.status}: ${JSON.stringify(j.errors || j).slice(0, 200)}`);
  return Buffer.from(j.result.image, 'base64');
}

(async () => {
  const run = { hf, gemini, cloudflare }[provider];
  if (!run) throw new Error('unknown provider ' + provider);
  const buf = await run();
  fs.mkdirSync(path.join(ROOT, 'client/photos/raw'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `client/photos/raw/${name}.png`), buf);
  console.log('ok', provider, name, buf.length, 'bytes');
})().catch(e => { console.log('ERR', provider, name, e.message); process.exit(1); });
