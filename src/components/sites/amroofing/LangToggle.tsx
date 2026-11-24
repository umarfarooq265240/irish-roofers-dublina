"use client";

import { useSyncExternalStore } from "react";

type Lang = "en" | "ga";

declare global {
  interface Window {
    irI18n?: { init: () => void; setLang: (l: Lang, persist?: boolean) => Promise<void> | void; lang: Lang };
    __irReady?: boolean;
  }
}

const read = (): Lang => {
  try {
    return localStorage.getItem("ir-lang") === "ga" ? "ga" : "en";
  } catch {
    return window.irI18n?.lang ?? "en";
  }
};
const subscribe = (cb: () => void) => {
  window.addEventListener("ir-lang", cb);
  return () => window.removeEventListener("ir-lang", cb);
};

/** EN / GA switch. The active language is filled green. The text swap is done by public/sites/irishroofers/i18n/translate.js. */
export function LangToggle() {
  // Server and first client render say "en" (matches the static HTML); the real value follows right after hydration.
  const lang = useSyncExternalStore(subscribe, read, () => "en" as Lang);

  const choose = (l: Lang) => {
    if (window.irI18n) void window.irI18n.setLang(l);
  };

  return (
    <div className="ir-lang" role="group" aria-label="Language" data-no-translate="">
      <button type="button" className={lang === "en" ? "is-active" : ""} aria-pressed={lang === "en"} lang="en" onClick={() => choose("en")}>
        EN
      </button>
      <button type="button" className={lang === "ga" ? "is-active" : ""} aria-pressed={lang === "ga"} lang="ga" onClick={() => choose("ga")}>
        GA
      </button>
    </div>
  );
}
