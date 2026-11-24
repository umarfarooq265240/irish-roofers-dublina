import type { ImageRef } from "../types";

/**
 * Gallery page content. DUMMY images (AI-generated placeholders): replace the files in
 * public/sites/irishroofers/images with real job photos (same names) before launch.
 */
const IMG = "/sites/irishroofers/images";
const img = (file: string, alt: string): ImageRef => ({ src: `${IMG}/${file}.webp`, alt, width: 1024, height: 576 });

export const galleryItems = [
  { image: img("gallery-01-hipped-slate-roof", "New hipped slate roof with neat lead hips on a house in Dublin"), caption: "Hipped slate roof with lead hips", tag: "Slate" },
  { image: img("gallery-02-slate-roof-ladder", "Natural slate roof with a roofing ladder, Dublin"), caption: "Slate roof repair with ladder access", tag: "Slate" },
  { image: img("gallery-03-flat-roof-rooflight", "Finished torch-on flat roof with a glazed rooflight in Dublin"), caption: "Torch-on flat roof with rooflight", tag: "Flat roof" },
  { image: img("gallery-04-new-slate-blue-sky", "Freshly laid grey slate roof against a blue sky, Dublin"), caption: "New slate roof", tag: "Slate" },
  { image: img("gallery-05-brown-tiled-roof", "New brown tiled roof with scaffold at the gable, Dublin"), caption: "New tiled roof", tag: "Tiles" },
  { image: img("gallery-06-membrane-and-battens-stage", "Roof stripped to membrane and battens before re-tiling, Dublin"), caption: "Membrane and battens stage", tag: "In progress" },
  { image: img("gallery-07-scaffold-terrace-job", "Victorian red-brick terrace in Dublin with scaffold for a roof replacement"), caption: "Terrace roof replacement", tag: "In progress" },
  { image: img("gallery-08-chimney-and-slate", "Chimney stack with new lead flashing on a slate roof, Dublin"), caption: "Chimney with new lead flashing", tag: "Chimneys" },
  { image: img("gallery-09-skylights-on-slate", "Three skylights fitted into a grey slate roof in Dublin"), caption: "Skylights in slate", tag: "Skylights" },
  { image: img("gallery-10-lead-hip-detail", "Lead covered hip and valley detail on a slate roof"), caption: "Leadwork detail", tag: "Leadwork" },
  { image: img("gallery-11-large-flat-roof", "Large flat roof with a fresh membrane in Dublin"), caption: "Large flat roof, new membrane", tag: "Flat roof" },
  { image: img("gallery-12-red-brick-reroof", "Red-brick building with scaffold during a re-roof in Dublin"), caption: "Re-roof under scaffold", tag: "In progress" },
];

export const beforeAfter = [
  { title: "Slate roof re-slated", before: img("before-after-1-slate-before", "Before: weathered mossy slate roof with slipped slates"), after: img("before-after-1-slate-after", "After: new dark grey slate roof with clean lead flashing") },
  { title: "Flat roof re-covered", before: img("before-after-2-flat-roof-before", "Before: cracked old flat roof felt with ponding water"), after: img("before-after-2-flat-roof-after", "After: new smooth black EPDM flat roof membrane") },
  { title: "Gutter and valley relined", before: img("before-after-3-gutter-before", "Before: gutter blocked with leaves and standing water"), after: img("before-after-3-gutter-after", "After: gutter cleaned and relined, dry and neat") },
  { title: "Roof stripped and re-tiled", before: img("before-after-4-tiled-roof-before", "Before: pitched roof stripped to timber battens"), after: img("before-after-4-tiled-roof-after", "After: neatly finished brown tiled roof with ridge") },
];
