"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { oldGallery, oldGalleryTags } from "@/config/content/oldGallery";

const BASE = "/sites/irishroofers/gallery/";
const STEP = 24;

const TAG_ALT: Record<string, string> = {
  "Flat roofs": "Flat roof work in Dublin",
  "Slate roofs": "Slate roof work in Dublin",
  "Tiled roofs": "Tiled roof work in Dublin",
  "Commercial flat roofs": "Commercial flat roof in Dublin",
  Skylights: "Skylight installation in Dublin",
  "Roof repairs": "Roof repair in Dublin",
  "Emergency repairs": "Emergency roof repair in Dublin",
  "New roofs": "New roof installation in Dublin",
};

/** Filterable photo grid with a keyboard-friendly lightbox. Photos load 24 at a time. */
export function PhotoGallery() {
  const [tag, setTag] = useState<string>("All");
  const [shown, setShown] = useState(STEP);
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const list = useMemo(() => (tag === "All" ? oldGallery : oldGallery.filter((g) => g.tag === tag)), [tag]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: oldGallery.length };
    for (const g of oldGallery) c[g.tag] = (c[g.tag] ?? 0) + 1;
    return c;
  }, []);
  const total = list.length;
  const visible = list.slice(0, shown);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    document.body.classList.add("lb-open");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("lb-open");
    };
  }, [open, close, step]);

  const alt = (g: (typeof oldGallery)[number], i: number) => `${TAG_ALT[g.tag] ?? "Roofing work in Dublin"}, photo ${i + 1}`;
  const current = open === null ? null : list[open];

  return (
    <div className="ir-pg">
      <div className="ir-pg-filters" role="group" aria-label="Filter photos by type of work">
        {["All", ...oldGalleryTags].map((t) => (
          <button
            key={t}
            type="button"
            className="ir-pg-chip"
            aria-pressed={tag === t}
            onClick={() => {
              setTag(t);
              setShown(STEP);
            }}
          >
            {t}
            <span aria-hidden="true">{counts[t] ?? 0}</span>
          </button>
        ))}
      </div>
      <ul className="ir-pg-grid">
        {visible.map((g, i) => (
          <li key={g.id}>
            <button
              type="button"
              className="ir-pg-item"
              aria-label={`Open photo ${i + 1}: ${TAG_ALT[g.tag] ?? "Roofing work"}`}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}${g.id}-t.webp`} width={640} height={480} loading="lazy" decoding="async" alt={alt(g, i)} />
              <span className="ir-pg-cap">{g.tag}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="ir-pg-foot">
        <p aria-live="polite">
          Showing {visible.length} of {total} photos
        </p>
        {shown < total ? (
          <button type="button" className="btn btn-outline" onClick={() => setShown((s) => s + STEP)}>
            Show more photos
          </button>
        ) : null}
      </div>
      {current ? (
        <div className="ir-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <div className="ir-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}${current.id}.webp`} width={current.w} height={current.h} alt={alt(current, open ?? 0)} />
            <p>
              {current.tag} · {(open ?? 0) + 1} of {total}
            </p>
            <button ref={closeRef} type="button" className="ir-lightbox-btn ir-lightbox-close" onClick={close} aria-label="Close photo viewer">
              ×
            </button>
            <button type="button" className="ir-lightbox-btn ir-lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
              ‹
            </button>
            <button type="button" className="ir-lightbox-btn ir-lightbox-next" onClick={() => step(1)} aria-label="Next photo">
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
