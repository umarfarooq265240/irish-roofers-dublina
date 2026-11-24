"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { beforeAfter, galleryItems } from "@/config/content/gallery";
import { Pic } from "./Pic";

/** Photo grid with a keyboard-friendly lightbox. */
export function GalleryGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const total = galleryItems.length;

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

  const current = open === null ? null : galleryItems[open];
  return (
    <>
      <ul className="ir-gallery-grid">
        {galleryItems.map((g, i) => (
          <li key={g.image.src}>
            <button
              type="button"
              className="ir-gallery-item"
              aria-label={`Open photo: ${g.caption}`}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
            >
              <Pic image={g.image} alt={g.image.alt} sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" />
              <span className="ir-gallery-cap">
                <b>{g.caption}</b>
                <small>{g.tag}</small>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {current ? (
        <div className="ir-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <div className="ir-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <Pic image={current.image} alt={current.image.alt} sizes="100vw" />
            <p>{current.caption}</p>
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
    </>
  );
}

function Slider({ item }: { item: (typeof beforeAfter)[number] }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="ir-ba" style={{ "--ba": `${pos}%` } as React.CSSProperties}>
      <div className="ir-ba-stage">
        <Pic image={item.after} alt={item.after.alt} sizes="(max-width: 900px) 100vw, 50vw" />
        <div className="ir-ba-before">
          <Pic image={item.before} alt={item.before.alt} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <span className="ir-ba-tag ir-ba-tag-before">Before</span>
        <span className="ir-ba-tag ir-ba-tag-after">After</span>
        <span className="ir-ba-handle" aria-hidden="true" />
        <input
          className="ir-ba-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${item.title}: drag to compare before and after`}
        />
      </div>
      <figcaption>{item.title}</figcaption>
    </figure>
  );
}

/** Before / after comparison sliders. */
export function BeforeAfterGrid() {
  return (
    <div className="ir-ba-grid">
      {beforeAfter.map((b) => (
        <Slider key={b.title} item={b} />
      ))}
    </div>
  );
}
