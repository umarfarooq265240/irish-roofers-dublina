import type React from "react";
import { preload } from "react-dom";
import type { ImageRef } from "@/config/types";

/** Variants are produced by scripts/optimize-images.js: <name>.webp (1024 fallback), <name>-480|768.webp, <name>-480|768|1024.avif */
export function imgSrcSet(src: string, ext: "avif" | "webp"): string {
  const base = src.replace(/\.webp$/, "");
  if (ext === "avif") return `${base}-480.avif 480w, ${base}-768.avif 768w, ${base}-1024.avif 1024w`;
  return `${base}-480.webp 480w, ${base}-768.webp 768w, ${src} 1024w`;
}

/** 1200x630 social image for a given content image. */
export function ogImageFor(src: string): string {
  return src.replace("/images/", "/og/").replace(/\.webp$/, ".jpg");
}

type PicProps = {
  image: ImageRef;
  className?: string;
  /** Overrides image.alt. Pass "" for purely decorative images. */
  alt?: string;
  /** Above-the-fold image: not lazy, high priority and preloaded. */
  eager?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
};

export function Pic({ image, className, alt, eager = false, sizes = "(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw", style }: PicProps) {
  const avif = imgSrcSet(image.src, "avif");
  const webp = imgSrcSet(image.src, "webp");
  if (eager) {
    preload(image.src, { as: "image", imageSrcSet: avif, imageSizes: sizes, type: "image/avif", fetchPriority: "high" });
  }
  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={image.src}
        srcSet={webp}
        sizes={sizes}
        width={image.width}
        height={image.height}
        className={className}
        alt={alt ?? image.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        style={style}
      />
    </picture>
  );
}
