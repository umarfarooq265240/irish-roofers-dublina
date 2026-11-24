# Image brief (Part C): what the reference shows per slot, and what we generate

Reference: amroofingservices.co.uk. Photos there are real drone and site photographs of new-build and
domestic jobs. Looks: high angle aerial or eye-level, natural light, dusk for hero and CTA, no people
except the About hero and the director. We match the CONTEXT (subject, angle, light), not the pictures.
The client's own 123 Google photos are 200 px thumbnails: used only as reference (flat roofs with torch-on felt,
slate and tile re-roofs, scaffold on red-brick terraces, hi-vis roofers, white / black / green vans).

| Slot (ours) | Reference slot | Subject / angle / light | File |
|---|---|---|---|
| Home hero | hero #1 | drone aerial, small cluster of new houses in fields, sunset sky, lit windows | hero-dublin-new-build-aerial-dusk |
| Who we work with: Homeowners | clients #1 | eye-level front of a detached brick house, tile roof, lawn, blue sky | audience-homeowners-detached-house |
| Developers | clients #2 | high angle drone, new-build site with scaffold and a plain van | audience-developers-new-build-site |
| Main contractors | clients #3 | flat membrane roof, rooflights, parapet, wide angle | audience-main-contractors-flat-roof |
| Commercial | clients #4 | high drone, large commercial building with scaffold | audience-commercial-building-roof |
| Process (home, about) | psplit | drone aerial, terrace of new slate-roofed houses, block paving | process-terrace-slate-roofs-aerial |
| Our services grid | sgrid | close drone aerial of a clay tile roof with rooflight and chimney | services-aerial-roof-rooflight |
| Recent work 1-4 | work2 | chalet house gable window; new-build rear with bi-fold doors; apartment block slate; Victorian terrace re-roofed | recent-work-1..4-* |
| Standard (home) and CTA band (inner pages) | standard / ctapanel | wide zoomed-out dusk shot of one large house with outbuilding, lit windows | standard-large-house-dusk-wide |
| Home CTA panel | ctapanel (home) | finished detached house, herringbone drive, trees, blue sky | cta-house-block-paving-driveway |
| About hero | page-hero (about) | vans parked in a yard, small figures in hi-vis, cloudy golden light | about-fleet-yard-golden-hour |
| Meet the director | director | portrait 9:16, man in hi-vis, arms crossed, dark pickup, trees | director-patrick-portrait |
| Services page hero | page-hero (services) | drone aerial at dusk, row of new houses along a lane | services-hero-aerial-dusk |
| 9 service pages | services/* | one clear subject each (flat roof, leak, slate, tiles, ridge, chimney, skylight, emergency, inspection) | existing names |
| Keep (owner likes) | | areas hero, reviews hero, contact hero | areas-dublin-rooftops, reviews-roofers-dublin, contact-roofers-dublin-14 |
| Roofing advice, costs heroes | none / generic | keep current | |

Rules: no lettering anywhere (vans plain or distant), no clothing logos, no people close up except the director portrait,
check roof lines, vans and sky/house joins on a contact sheet, drop and regenerate anything distorted.
Model: Cloudflare Phoenix 1.0 via `scripts/gen-all.js` (1344x768, portrait 768x1344), PNG in `images/`, WebP under 200 KB in `images/webp/`.
