// Copy the client's Google Maps photos that best match each website image slot into client/manus-references/,
// renamed to the target image name, so they can be uploaded to Manus as composition references.
const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, '..', 'Irish_Roofers_Dublin,_Roofing_Repairs_-_Google_Maps');
const OUT = path.join(__dirname, '..', 'client', 'manus-references');
const MAP = {
  'hero-dublin-new-build-aerial-dusk': 10091, 'services-hero-aerial-dusk': 10079, 'about-fleet-yard-golden-hour': 10103,
  'audience-homeowners-detached-house': 10022, 'audience-developers-new-build-site': 10119, 'audience-main-contractors-flat-roof': 10092, 'audience-commercial-building-roof': 10105,
  'process-terrace-slate-roofs-aerial': 10031, 'services-aerial-roof-rooflight': 10018,
  'recent-work-1-gable-window-clay-tile': 10108, 'recent-work-2-new-build-rear-bifold': 10080, 'recent-work-3-apartment-slate-rooflights': 10070, 'recent-work-4-victorian-terrace-reroofed': 10034,
  'standard-large-house-dusk-wide': 10060, 'cta-house-block-paving-driveway': 10076,
  'about-section-aerial-new-slate-roof': 10114, 'process-about-scaffold-terrace-aerial': 10062, 'director-patrick-portrait': 10047, 'contact-side-aerial-terrace': 10036, 'service-detail-roofers-at-work': 10088,
  'flat-roof-repair-dublin': 10010, 'leaking-roof-repair-dublin': 10004, 'slate-roof-repair-dublin-14': 10068, 'tiled-roofing-dublin': 10056, 'ridge-tile-repair-dublin': 10040,
  'chimney-repair-dublin': 10027, 'skylight-installation-dublin': 10101, 'emergency-roof-repair-dublin': 10030, 'roof-inspection-dublin': 10115,
  'gallery-01-hipped-slate-roof': 10028, 'gallery-02-slate-roof-ladder': 10014, 'gallery-03-flat-roof-rooflight': 10104, 'gallery-04-new-slate-blue-sky': 10037, 'gallery-05-brown-tiled-roof': 10023, 'gallery-06-membrane-and-battens-stage': 10073,
  'gallery-07-scaffold-terrace-job': 10044, 'gallery-08-chimney-and-slate': 10123, 'gallery-09-skylights-on-slate': 10036, 'gallery-10-lead-hip-detail': 10074, 'gallery-11-large-flat-roof': 10090, 'gallery-12-red-brick-reroof': 10107,
  'before-after-1-slate-before': 10017, 'before-after-1-slate-after': 10013, 'before-after-2-flat-roof-before': 10009, 'before-after-2-flat-roof-after': 10010,
  'before-after-3-gutter-before': 10085, 'before-after-3-gutter-after': 10086, 'before-after-4-tiled-roof-before': 10055, 'before-after-4-tiled-roof-after': 10056,
};
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const [name, id] of Object.entries(MAP)) fs.copyFileSync(path.join(SRC, `${id}.jpeg`), path.join(OUT, `${name}__REF.jpg`));
console.log(Object.keys(MAP).length, 'reference photos copied');
