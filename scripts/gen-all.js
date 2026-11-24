// Generate all site images sequentially via Cloudflare Workers AI.
//   Pass 1 (default): FLUX.1 schnell, very cheap in neurons, so the whole set fits in one daily free allowance.
//   Pass 2 (--phoenix): re-makes the high-visibility images (hq: true) with Leonardo Phoenix 1.0 for better realism.
//                        Phoenix uses many more neurons, so it runs last and may only finish a few per day.
// usage: node scripts/gen-all.js [--phoenix] [--wait] [--limit N] [--seed N] [name-filter]
//   --wait      on a rate limit, sleep 15 minutes and retry (leave it running until the daily quota resets)
//   --limit N   only generate the first N missing images
//   --seed N    fixed seed (use a different one to redo an image that came out wrong)
// output: images/<name>.png and images/webp/<name>.webp (under 200 KB)
// Skips images that already exist. To redo one image: delete images/<name>.png and run with its name (and a new --seed).
// Without --wait it stops cleanly on a rate-limit / quota error and reports how many were completed.
// Keys come from .env / .env.local / cloudef.env (CF_ACCOUNT_ID, CF_API_TOKEN), all gitignored.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
for (const f of ['.env', '.env.local', 'cloudef.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

// Phoenix: binary JPEG out, supports negative_prompt, guidance 2-10, num_steps 1-50, up to 2048px.
// Lucid Origin: JSON {image: base64}, no negative_prompt, steps 1-40, up to 2500px.
// FLUX schnell: JSON {result:{image: base64}}, prompt + steps only, square 1024 output (cropped to the slot ratio below).
const FLUX = { id: '@cf/black-forest-labs/flux-1-schnell', negative: false, body: { steps: 8 }, square: true };
const PHOENIX_MODELS = [
  { id: '@cf/leonardo/phoenix-1.0', negative: true, body: { guidance: 4, num_steps: 30 } },
  { id: '@cf/leonardo/lucid-origin', negative: false, body: { guidance: 4.5, steps: 30 } },
];
const NEGATIVE = 'distorted, deformed, extra fingers, extra limbs, blurry, low quality, watermark, text, unrealistic proportions';
const STYLE = 'professional photograph, natural lighting, sharp focus, realistic, high detail';
const MAX_WEBP_BYTES = 200 * 1024;
const WIDE = [1344, 768]; // 16:9, banners and cards
const TALL = [768, 1344]; // 9:16, director portrait

// Scenes follow the reference site's slot context (see client/IMAGE-BRIEF.md). No lettering, no logos.
// hq: true = also re-made with Phoenix in pass 2.
const IMAGES = [
  // home + page banners
  { name: 'hero-dublin-new-build-aerial-dusk', hq: true, scene: 'high drone aerial photograph of a small new-build housing development of red-brick houses with grey slate roofs and a curving driveway, green fields around it on the edge of Dublin, glowing orange and pink sunset sky, warm lit windows' },
  { name: 'services-hero-aerial-dusk', hq: true, scene: 'drone aerial photograph of a row of new detached houses with brown tiled roofs along a quiet lane, fields beyond, dusk sky with soft orange clouds, warm lit windows' },
  { name: 'about-fleet-yard-golden-hour', hq: true, scene: 'a row of plain unmarked white work vans parked in a tarmac yard, three small distant figures in hi-vis jackets standing together, cloudy sky with golden evening light, trees behind' },
  // who we work with
  { name: 'audience-homeowners-detached-house', scene: 'front view of a detached red-brick two-storey house with a brown clay tiled roof, tidy green lawn, paved driveway and a small tree, blue sky with white clouds, eye-level' },
  { name: 'audience-developers-new-build-site', scene: 'high angle drone photograph of a new-build housing site, several houses with new brown concrete tiled roofs and scaffolding, a plain white van parked on the road, bright cloudy sky' },
  { name: 'audience-main-contractors-flat-roof', scene: 'wide angle view across a large flat commercial roof with a black rubber membrane, rows of skylights and a low parapet wall, blue sky with clouds' },
  { name: 'audience-commercial-building-roof', scene: 'high angle drone photograph of a large new commercial building with scaffolding around it and a tiled pitched roof section, construction site, overcast sky' },
  // process, services grid
  { name: 'process-terrace-slate-roofs-aerial', scene: 'drone aerial photograph of a terrace of new-build townhouses with grey slate roofs and block-paved parking in front, a plain white van parked, bright overcast sky' },
  { name: 'services-aerial-roof-rooflight', scene: 'close drone aerial photograph of a brown clay tiled roof of a large house with a big rooflight and a brick chimney, garden below, soft afternoon light' },
  // recent work (dummy cases)
  { name: 'recent-work-1-gable-window-clay-tile', scene: 'low angle photograph of a detached chalet-style house with a clay tiled roof and a large triangular gable window, blue sky with clouds' },
  { name: 'recent-work-2-new-build-rear-bifold', scene: 'rear view of a new brick-built detached house with a tiled roof and large bi-fold glass doors opening onto a neat lawn, blue sky' },
  { name: 'recent-work-3-apartment-slate-rooflights', scene: 'front view of a modern apartment building with a grey slate roof, rooflights and balconies on a tree-lined street, autumn leaves' },
  { name: 'recent-work-4-victorian-terrace-reroofed', scene: 'street view of a terrace of Victorian red-brick houses in Dublin with newly re-roofed slate roofs and chimneys, bright sky' },
  // standard / cta
  { name: 'standard-large-house-dusk-wide', hq: true, scene: 'wide zoomed-out photograph at dusk of one large detached house with a barn-style outbuilding, grey slate roofs and warm lit windows, gravel driveway in front, orange sunset sky behind trees' },
  { name: 'cta-house-block-paving-driveway', scene: 'finished detached red-brick house with a dormer window, tiled roof and a block-paved herringbone driveway, mature trees behind and blue sky with clouds' },
  // director
  { name: 'director-patrick-portrait', hq: true, scene: 'portrait of a friendly middle-aged roofing contractor in a plain high-visibility yellow jacket standing in the centre with his arms crossed beside a plain dark pickup truck, trees behind, shallow depth of field, soft overcast light', size: TALL },
  // service pages (the flat roof test image already exists)
  { name: 'flat-roof-repair-dublin', scene: 'view from above of a large flat roof with a freshly laid black EPDM rubber membrane and two rooflights, brick extension walls, overcast sky' },
  { name: 'leaking-roof-repair-dublin', scene: 'front of a semi-detached house with natural muted brick and a wet grey tiled roof after rain, ridge and chimney visible, overcast rainy sky' },
  { name: 'slate-roof-repair-dublin-14', scene: 'close-up of a natural dark grey slate roof being re-slated, neat rows of slates on timber battens at the edge, a brick chimney in the background' },
  { name: 'tiled-roofing-dublin', scene: 'newly tiled roof of a semi-detached house with brown concrete tiles, a ridge and a small scaffold at the gable, blue sky' },
  { name: 'ridge-tile-repair-dublin', scene: 'low angle view along the ridge line of a clay tiled roof with freshly pointed ridge tiles, sky behind' },
  { name: 'chimney-repair-dublin', scene: 'close view of a red-brick chimney stack with lead flashing at its base on a grey slate roof of a Victorian terrace house, blue sky' },
  { name: 'skylight-installation-dublin', scene: 'drone aerial view of a slate pitched roof with two newly fitted skylight roof windows on a detached house' },
  { name: 'emergency-roof-repair-dublin', scene: 'side view of a house roof with a large blue plastic tarpaulin sheet covering a damaged section held down with timber battens, wet grey slate roof, stormy dark grey sky' },
  { name: 'roof-inspection-dublin', scene: 'two-storey red-brick house seen from the front garden with an aluminium extension ladder leaning against the gutter and the grey tiled roof above, nobody in shot, bright sky' },
  // about / contact / service-detail extras
  { name: 'about-section-aerial-new-slate-roof', scene: 'drone aerial of a large house with a freshly laid grey slate roof and a chimney, garden below, bright light' },
  { name: 'process-about-scaffold-terrace-aerial', scene: 'drone aerial photograph of a terrace of red-brick houses with scaffolding along the front and part of one roof stripped to timber battens, a plain white van parked in the street, overcast sky' },
  { name: 'contact-side-aerial-terrace', scene: 'drone aerial of a new terrace with grey slate roofs, two rooflights and block paving, trees around, soft light' },
  { name: 'service-detail-roofers-at-work', scene: 'two small distant roofers in hi-vis working on a pitched slate roof seen from a drone, a ladder at the eaves and scaffold, bright overcast sky' },
  // gallery
  { name: 'gallery-01-hipped-slate-roof', scene: 'new hipped slate roof with neat lead hip detail, blue sky, three-quarter view' },
  { name: 'gallery-02-slate-roof-ladder', scene: 'slate roof in a diagonal view with a roofing ladder lying on it, sunny sky with clouds' },
  { name: 'gallery-03-flat-roof-rooflight', scene: 'finished torch-on flat roof with a glazed rooflight and clean upstands, overcast light' },
  { name: 'gallery-04-new-slate-blue-sky', scene: 'fresh grey slate roof sweeping away from the camera, rooftops and blue sky behind' },
  { name: 'gallery-05-brown-tiled-roof', scene: 'new brown tiled roof with straight rows and a ridge, scaffold at the edge, sky behind' },
  { name: 'gallery-06-membrane-and-battens-stage', scene: 'roof under construction, close view of timber rafters and battens covered with black breathable membrane, a few rows of new tiles laid at the top, daylight, sky above' },
  { name: 'gallery-07-scaffold-terrace-job', scene: 'street view of a Victorian red-brick terrace with plain scaffold up and a roof being replaced, overcast' },
  { name: 'gallery-08-chimney-and-slate', scene: 'red-brick chimney stack with white chimney pots standing on a grey slate roof, lead flashing around its base, blue sky, detailed' },
  { name: 'gallery-09-skylights-on-slate', scene: 'three skylights set in a grey slate roof with clean flashings, blue sky' },
  { name: 'gallery-10-lead-hip-detail', scene: 'close view of the ridge of a grey slate roof with lead flashing along the hip, straight clean edges, sharp detail, blue sky' },
  { name: 'gallery-11-large-flat-roof', scene: 'large flat roof with a fresh membrane, distant buildings and trees, wide view, overcast' },
  { name: 'gallery-12-red-brick-reroof', scene: 'street view of a three-storey red-brick Georgian house with scaffolding on the front and two small roofers far above at the roof edge, bright sky' },
  // before / after pairs: same seed and same words except the roof condition, so the framing matches
  { name: 'before-after-1-slate-before', seed: 4101, scene: 'diagonal view of a house roof with a brick chimney, old weathered grey slate roof with moss and slipped cracked slates, rusty flashing' },
  { name: 'before-after-1-slate-after', seed: 4101, scene: 'diagonal view of a house roof with a brick chimney, brand new dark grey slate roof, neat rows, clean lead flashing' },
  { name: 'before-after-2-flat-roof-before', seed: 4202, scene: 'view across a flat roof with a rooflight, old cracked blistered felt with ponding water and moss' },
  { name: 'before-after-2-flat-roof-after', seed: 4202, scene: 'view across a flat roof with a rooflight, smooth new black EPDM membrane, clean upstands, dry' },
  { name: 'before-after-3-gutter-before', seed: 4303, scene: 'close view along the edge of a pitched roof showing a black plastic gutter full of autumn leaves and debris with standing water, stained fascia' },
  { name: 'before-after-3-gutter-after', seed: 4303, scene: 'close view along the edge of a pitched roof showing a black plastic gutter, clean, empty and dry with no leaves, autumn trees blurred in the background, fresh fascia' },
  { name: 'before-after-4-tiled-roof-before', seed: 4404, scene: 'pitched roof seen from the side with a brick chimney, old roof with half the tiles missing exposing timber battens and black membrane' },
  { name: 'before-after-4-tiled-roof-after', seed: 4404, scene: 'pitched roof seen from the side with a brick chimney, complete neat new brown tiled roof' },
];

const RATE = /429|rate.?limit|quota|neurons|daily|too many|exceeded|4006|3036/i;
class RateLimitError extends Error {}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(model, prompt, [width, height], seed) {
  const { CF_ACCOUNT_ID: id, CF_API_TOKEN: token } = process.env;
  if (!id || !token) throw new Error('CF_ACCOUNT_ID / CF_API_TOKEN missing');
  const body = model.square ? { prompt, ...model.body } : { prompt, width, height, ...model.body };
  if (seed !== undefined) body.seed = seed;
  if (model.negative) body.negative_prompt = NEGATIVE;
  else if (!model.square) body.prompt = `${prompt}. Avoid: ${NEGATIVE}`; // lucid-origin has no negative_prompt field
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const type = r.headers.get('content-type') || '';
  if (r.ok && type.startsWith('image/')) return Buffer.from(await r.arrayBuffer()); // raw binary
  const text = await r.text();
  let j = {};
  try { j = JSON.parse(text); } catch { /* not json */ }
  const b64 = (j.result && j.result.image) || j.image; // base64 JSON
  if (r.ok && b64) return Buffer.from(b64, 'base64');
  const msg = `${model.id} HTTP ${r.status}: ${(JSON.stringify(j.errors || j) || text).slice(0, 220)}`;
  if (r.status === 429 || RATE.test(msg)) throw new RateLimitError(msg);
  const e = new Error(msg);
  e.status = r.status;
  throw e;
}

// Stable Horde (free community GPUs, anonymous key). SDXL 1.0 / Juggernaut XL, 1024x576 or 576x1024, upscaled in save().
const sleep2 = (ms) => new Promise((r) => setTimeout(r, ms));
async function horde(prompt, [width, height], seed) {
  const H = { 'Content-Type': 'application/json', apikey: process.env.HORDE_KEY || '0000000000', 'Client-Agent': 'sitebuild:1:anon' };
  const w = width >= height ? 1024 : 576, h = width >= height ? 576 : 1024;
  const body = {
    prompt: prompt + ' ### ' + NEGATIVE,
    params: { width: w, height: h, steps: 28, cfg_scale: 6.5, sampler_name: 'k_euler_a', n: 1, ...(seed !== undefined ? { seed: String(seed) } : {}) },
    models: ['Juggernaut XL', 'SDXL 1.0'],
    r2: true,
    slow_workers: true,
  };
  const r = await fetch('https://aihorde.net/api/v2/generate/async', { method: 'POST', headers: H, body: JSON.stringify(body) });
  const j = await r.json();
  if (!j.id) throw new Error('Horde: ' + JSON.stringify(j).slice(0, 160));
  for (let i = 0; i < 100; i++) {
    await sleep2(6000);
    const c = await (await fetch('https://aihorde.net/api/v2/generate/check/' + j.id)).json();
    if (c.faulted) throw new Error('Horde faulted');
    if (c.done) break;
  }
  const st = await (await fetch('https://aihorde.net/api/v2/generate/status/' + j.id)).json();
  const g = st.generations && st.generations[0];
  if (!g || !g.img) throw new Error('Horde: no image');
  if (g.censored) throw new Error('Horde: censored');
  const buf = g.img.startsWith('http') ? Buffer.from(await (await fetch(g.img)).arrayBuffer()) : Buffer.from(g.img, 'base64');
  return buf;
}
let hordeBlocked = false;

// Hugging Face FLUX.1-schnell Space (free, no key). Quality is better than Cloudflare's schnell and it takes exact sizes.
const HF = 'https://black-forest-labs-flux-1-schnell.hf.space/gradio_api';
// Optional HF_TOKEN (free Hugging Face read token in .env.local) gives a much bigger GPU quota than anonymous use.
const hfHeaders = (extra = {}) => ({ ...extra, ...(process.env.HF_TOKEN ? { Authorization: `Bearer ${process.env.HF_TOKEN}` } : {}) });
let hfBlocked = false;
async function hf(prompt, [width, height], seed) {
  const r = await fetch(`${HF}/call/infer`, { method: 'POST', headers: hfHeaders({ 'Content-Type': 'application/json' }), body: JSON.stringify({ data: [prompt, seed ?? 0, seed === undefined, width, height, 4] }) });
  if (!r.ok) throw new Error(`HF ${r.status}`);
  const { event_id } = await r.json();
  const t = await (await fetch(`${HF}/call/infer/${event_id}`, { headers: hfHeaders(), signal: AbortSignal.timeout(240000) })).text();
  const m = t.match(/"url": "([^"]+)"/);
  if (!m) throw new Error('HF: ' + t.slice(0, 160).replace(/\s+/g, ' '));
  return Buffer.from(await (await fetch(m[1])).arrayBuffer());
}

let phoenixIdx = 0;
async function gen(prompt, size, seed, usePhoenix) {
  if (!usePhoenix && !hordeBlocked) {
    try {
      return { buf: await horde(prompt, size, seed), model: 'horde/SDXL' };
    } catch (e) {
      console.log('Horde failed:', e.message.slice(0, 120));
      if (/Too Many|limit|forbidden|403|429/i.test(e.message)) { await sleep(20000); }
      throw e;
    }
  }
  if (!usePhoenix && !hfBlocked) {
    try {
      return { buf: await hf(prompt, size, seed), model: 'hf/FLUX.1-schnell' };
    } catch (e) {
      console.log('HF failed, falling back to Cloudflare FLUX:', e.message.slice(0, 120));
      hfBlocked = true;
    }
  }
  if (!usePhoenix) return { buf: await call(FLUX, prompt, size, seed), model: FLUX.id };
  for (;;) {
    try {
      return { buf: await call(PHOENIX_MODELS[phoenixIdx], prompt, size, seed), model: PHOENIX_MODELS[phoenixIdx].id };
    } catch (e) {
      // model missing / not enabled on this account -> try the next model
      const unavailable = !(e instanceof RateLimitError) && [400, 403, 404].includes(e.status) && /model|no such|not found|access|authori[sz]/i.test(e.message);
      if (unavailable && phoenixIdx < PHOENIX_MODELS.length - 1) {
        console.log(`model unavailable (${e.message.slice(0, 120)}), falling back to ${PHOENIX_MODELS[phoenixIdx + 1].id}`);
        phoenixIdx++;
        continue;
      }
      throw e;
    }
  }
}

async function save(name, buf, [w, h]) {
  const png = path.join(ROOT, 'images', `${name}.png`);
  const webp = path.join(ROOT, 'images', 'webp', `${name}.webp`);
  // exact slot size (FLUX returns a square, which is cropped to the slot ratio)
  const fit = await sharp(buf).resize(w, h, { fit: 'cover', position: 'centre' }).toBuffer();
  await sharp(fit).png({ compressionLevel: 9 }).toFile(png);
  let q = 82, out;
  do { out = await sharp(fit).webp({ quality: q, effort: 5 }).toBuffer(); q -= 6; } while (out.length > MAX_WEBP_BYTES && q > 20);
  fs.writeFileSync(webp, out);
  return out.length;
}

(async () => {
  const args = process.argv.slice(2);
  const li = args.indexOf('--limit');
  const si = args.indexOf('--seed');
  const limit = li >= 0 ? parseInt(args[li + 1], 10) : Infinity;
  const seed = si >= 0 ? parseInt(args[si + 1], 10) : undefined;
  const phoenix = args.includes('--phoenix');
  const wait = args.includes('--wait');
  const sh = args.indexOf('--shard');
  const [shardI, shardN] = sh >= 0 ? args[sh + 1].split('/').map(Number) : [0, 1];
  const filter = args.find((a, i) => !a.startsWith('--') && i !== li + 1 && i !== si + 1 && i !== sh + 1);
  const marks = path.join(ROOT, 'images', '.phoenix');
  fs.mkdirSync(path.join(ROOT, 'images', 'webp'), { recursive: true });
  fs.mkdirSync(marks, { recursive: true });
  let done = 0, skipped = 0, failed = 0, stopped = false;
  let todo = IMAGES.filter(({ name }) => !filter || name.includes(filter));
  if (phoenix) todo = todo.filter((i) => i.hq);
  todo = todo.filter((_, i) => i % shardN === shardI);
  for (const { name, scene, size = WIDE, seed: imgSeed } of todo) {
    const useSeed = seed ?? imgSeed;
    if (done >= limit) break;
    const exists = fs.existsSync(path.join(ROOT, 'images', `${name}.png`));
    // pass 1 skips existing files; pass 2 skips images already made with Phoenix
    if (phoenix ? fs.existsSync(path.join(marks, name)) : exists) { skipped++; console.log('skip (done)', name); continue; }
    const prompt = `${scene}, ${STYLE}`;
    let ok = false;
    for (let t = 1; t <= 3 && !ok;) {
      try {
        const { buf, model } = await gen(prompt, size, useSeed, phoenix);
        const bytes = await save(name, buf, size);
        if (phoenix) fs.writeFileSync(path.join(marks, name), model);
        done++; ok = true;
        console.log(`ok ${name} [${model}] png + webp ${Math.round(bytes / 1024)} KB`);
      } catch (e) {
        if (e instanceof RateLimitError) {
          if (wait) { console.log(new Date().toISOString(), 'rate limited, waiting 15 min:', e.message.slice(0, 90)); await sleep(15 * 60 * 1000); continue; }
          stopped = true; console.log('RATE LIMIT / QUOTA:', e.message); break;
        }
        console.log('retry', t, name, e.message);
        t++;
        await sleep(10000);
      }
    }
    if (stopped) break;
    if (!ok) { failed++; console.log('FAILED', name); }
  }
  const remaining = todo.length - skipped - done - failed;
  console.log(`\n${stopped ? 'Stopped at the rate limit. ' : ''}Completed ${done} new image(s), skipped ${skipped} done, failed ${failed}, ${remaining} not yet generated. Re-run the same command to continue.`);
  process.exit(stopped ? 2 : 0);
})();
