"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide behaviour for the AM Roofing clone, ported from the source theme's
 * theme.min.js and consent.min.js. The section markup is static JSX; these effects
 * add the same classes/attributes the original scripts toggle, so the ported CSS
 * drives every visual state.
 */

import { mailHref } from "@/config/site";

/* Irish formats: Eircode (routing key + 4 characters) and Irish phone numbers. */
const EIRCODE = /^(?:[AC-FHKNPRTV-Y]\d{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i;
const isIrishPhone = (v: string) => /^(\+353|00353|0)[1-9]\d{6,9}$/.test(v.replace(/[\s()-]/g, ""));
const isEircode = (v: string) => EIRCODE.test(v.trim());

/** No backend: hand the enquiry to the visitor's email app. The recipient is empty until the client email is set. */
function openMail(subject: string, lines: string[]) {
  const to = mailHref.replace("mailto:", "");
  const qs = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
  window.location.href = `mailto:${to}?${qs}`;
}

const REVEAL_GROUPS: Array<[string, number]> = [
  [".hero-stat", 90],
  [".trust-bar li", 70],
  [".section-head > *", 70],
  [".section-title", 0],
  [".split-copy > *", 70],
  [".split-media", 0],
  [".card", 80],
  [".why-card", 90],
  [".usp-item", 70],
  [".sector-card", 90],
  [".hero-bar-item", 70],
  [".nx-stat", 90],
  [".nx-trust-list li", 70],
  [".nx-client-card", 90],
  [".nx-psteps li", 90],
  [".ir-steps li", 0],
  [".nx-work2-card", 90],
  [".nx-sgrid-list li", 60],
  [".nx-standard-list li", 70],
  [".nx-rtabs-list li", 90],
  [".nx-frame", 120],
  [".nx-float-tag", 0],
  [".nx-tile", 80],
  [".nx-step", 110],
  [".nx-county", 90],
  [".nx-head > *", 80],
  [".nx-intro-copy > *", 70],
  [".nx-quote-copy > *", 70],
  [".nx-checks li", 60],
  [".nx-score", 0],
  [".nx-faq-head > *", 70],
  [".nx-detail-card", 90],
  [".x-stat", 90],
  [".x-row", 0],
  [".x-step", 80],
  [".x-review", 90],
  [".x-county", 80],
  [".x-more-list li", 40],
  [".show-card", 90],
  [".numbers-item", 90],
  [".intro-media", 0],
  [".founder-media", 0],
  [".founder-copy > *", 70],
  [".capacity-item", 80],
  [".advice-item", 60],
  [".short-copy > *", 70],
  [".short-form", 120],
  [".next-steps li", 70],
  [".director-media", 0],
  [".director-copy > *", 60],
  [".svc-row", 55],
  [".process-step", 90],
  [".area-county", 0],
  [".gallery-item", 60],
  [".review-card", 90],
  [".area-list li", 22],
  [".accred-list li", 70],
  [".faq-item", 50],
  [".quote-copy > *", 70],
  [".quote-form", 120],
  [".cta-inner > *", 90],
  [".answer-first", 0],
  [".quote-copy .ticks li", 45],
];

const SPLIT_TITLES = ".page-hero h1, .section-title, .nx-title, .cta-band h2";
const CONSENT_KEY = "am_consent_v1";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Cleanup = () => void;

function on<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  fn: (e: WindowEventMap[K]) => void,
  opts?: AddEventListenerOptions,
): Cleanup;
function on<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  fn: (e: DocumentEventMap[K]) => void,
  opts?: AddEventListenerOptions,
): Cleanup;
function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  fn: (e: HTMLElementEventMap[K]) => void,
  opts?: AddEventListenerOptions,
): Cleanup;
function on(target: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions): Cleanup {
  target.addEventListener(type, fn, opts);
  return () => target.removeEventListener(type, fn, opts);
}

/* ---------- navigation ---------- */
function setupNav(): Cleanup[] {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return [];
  const setOpen = (open: boolean) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close the menu" : "Open the menu");
    document.body.classList.toggle("nav-open", open);
  };
  return [
    on(nav, "click", (e) => {
      if ((e.target as Element).closest("a")) setOpen(false);
    }),
    on(toggle, "click", () => {
      const open = !nav.classList.contains("is-open");
      setOpen(open);
      if (open) nav.querySelector("a")?.focus();
    }),
    on(document, "keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    }),
    on(document, "click", (e) => {
      const t = e.target as Node;
      if (nav.classList.contains("is-open") && !nav.contains(t) && !toggle.contains(t)) setOpen(false);
    }),
  ];
}

function setupHashLinks(): Cleanup[] {
  return [
    /* Quote buttons: on a page that has the quote funnel, scroll to it (and close the menu); otherwise the link goes to /contact/#enquiry. */
    on(document, "click", (e) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href$="#enquiry"]');
      const funnel = document.querySelector<HTMLElement>("[data-funnel]");
      if (!a || !funnel) return;
      e.preventDefault();
      document.body.classList.remove("nav-open");
      document.getElementById("primary-nav")?.classList.remove("is-open");
      funnel.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      funnel.querySelector<HTMLElement>("input:not([type=hidden]),textarea")?.focus({ preventScroll: true });
    }),
    on(document, "click", (e) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      const href = a?.getAttribute("href");
      if (!a || !href || href.length < 2) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }),
  ];
}

/* ---------- scroll-linked chrome ---------- */
function setupScroll(progress: HTMLSpanElement | null, toTop: HTMLButtonElement | null): Cleanup[] {
  const header = document.getElementById("site-header");
  const heroImg = document.querySelector<HTMLImageElement>(".hero-media img");
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    header?.classList.toggle("is-stuck", y > 40);
    document.body.classList.toggle("has-scrolled", y > 40);
    toTop?.classList.toggle("is-visible", y > 700);
    if (heroImg && !reducedMotion() && y < window.innerHeight) {
      heroImg.style.transform = `scale(1.06) translate3d(0,${(0.14 * y).toFixed(1)}px,0)`;
    }
    ticking = false;
  };
  update();
  const cleanups = [
    on(window, "scroll", () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true }),
  ];
  if (toTop) {
    cleanups.push(
      on(toTop, "click", () => {
        window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
        document.querySelector<HTMLElement>(".skip-link")?.focus();
      }),
    );
  }
  return cleanups;
}

/* ---------- reveal, counters, split titles ---------- */
function countUp(el: HTMLElement) {
  const m = (el.getAttribute("data-count") || el.textContent || "").match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const target = parseFloat(num);
  const dp = (num.split(".")[1] || "").length;
  if (reducedMotion()) {
    el.textContent = pre + target.toFixed(dp) + post;
    return;
  }
  let start: number | null = null;
  el.textContent = pre + (0).toFixed(dp) + post;
  const step = (t: number) => {
    if (start === null) start = t;
    const p = Math.min((t - start) / 1100, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + (target * eased).toFixed(dp) + post;
    if (p < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

function splitLines(el: HTMLElement) {
  if (el.dataset.split === "done" || el.querySelector("*")) return;
  const words = (el.textContent || "").replace(/\s+/g, " ").trim().split(" ");
  if (!words[0] || words.length > 40) return;
  el.textContent = "";
  const spans = words.map((w, i) => {
    const s = document.createElement("span");
    s.className = "w";
    s.textContent = w;
    el.appendChild(s);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    return s;
  });
  const lines: string[][] = [];
  let lastTop: number | null = null;
  for (const s of spans) {
    const top = s.getBoundingClientRect().top;
    if (lastTop === null || Math.abs(top - lastTop) > 2) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(s.textContent || "");
  }
  el.textContent = "";
  lines.forEach((line, i) => {
    const outer = document.createElement("span");
    outer.className = "line";
    const inner = document.createElement("span");
    inner.className = "line-in";
    inner.style.setProperty("--line-delay", `${85 * i}ms`);
    inner.textContent = line.join(" ");
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < lines.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "done";
}

function setupReveal(): Cleanup[] {
  const targets: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();
  for (const [sel, stagger] of REVEAL_GROUPS) {
    let parent: Node | null = null;
    let n = 0;
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      // Skip revealed elements and ones claimed by an earlier group; re-runs (StrictMode) re-observe pending ones.
      if (seen.has(el) || el.getAttribute("data-reveal") === "in") return;
      seen.add(el);
      if (el.parentNode !== parent) {
        parent = el.parentNode;
        n = 0;
      }
      el.setAttribute("data-reveal", "");
      if (stagger) el.style.setProperty("--reveal-delay", `${Math.min(n * stagger, 480)}ms`);
      n++;
      targets.push(el);
    });
  }

  let io: IntersectionObserver | null = null;
  if (reducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.setAttribute("data-reveal", "in"));
  } else {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-reveal", "in");
            io?.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => io?.observe(el));
  }

  const counters = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          countUp(e.target as HTMLElement);
          counters.unobserve(e.target);
        }
      }),
    { threshold: 0.4 },
  );
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counters.observe(el));

  // Highlight nav items whose section is mid-viewport.
  const current = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        document
          .querySelector(`.nav-list a[href$="#${e.target.id}"]`)
          ?.classList.toggle("is-current", e.isIntersecting);
      }),
    { rootMargin: "-45% 0px -45% 0px" },
  );
  document.querySelectorAll("main section[id]").forEach((s) => current.observe(s));

  // Line-split section titles below the fold (after fonts settle).
  let idle = 0;
  if (!reducedMotion()) {
    idle = window.setTimeout(() => {
      const vh = window.innerHeight || 800;
      document.querySelectorAll<HTMLElement>(SPLIT_TITLES).forEach((el) => {
        if (el.getBoundingClientRect().top <= 0.9 * vh) return;
        splitLines(el);
        if (el.dataset.split !== "done") return;
        el.classList.add("is-split");
        if (!el.hasAttribute("data-reveal")) {
          el.setAttribute("data-reveal", "");
          if (io) io.observe(el);
          else el.setAttribute("data-reveal", "in");
        }
      });
    }, 300);
  }

  return [() => io?.disconnect(), () => counters.disconnect(), () => current.disconnect(), () => window.clearTimeout(idle)];
}

/* ---------- pointer effects ---------- */
function setupPointer(): Cleanup[] {
  const cleanups: Cleanup[] = [];
  document.querySelectorAll<HTMLElement>(".card, .why-card, .review-card, [data-spot]").forEach((el) => {
    cleanups.push(
      on(el, "pointermove", (e) => {
        if (reducedMotion()) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      }),
    );
  });
  if (!reducedMotion() && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll<HTMLElement>(".btn-accent, .nx-btn-volt, .to-top").forEach((el) => {
      cleanups.push(
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mag-x", `${(0.16 * (e.clientX - r.left - r.width / 2)).toFixed(1)}px`);
          el.style.setProperty("--mag-y", `${(0.22 * (e.clientY - r.top - r.height / 2)).toFixed(1)}px`);
        }),
        on(el, "pointerleave", () => {
          el.style.setProperty("--mag-x", "0px");
          el.style.setProperty("--mag-y", "0px");
        }),
      );
    });
  }
  const disclosure = document.querySelector<HTMLDetailsElement>(".footer-disclosure");
  if (disclosure && window.matchMedia("(max-width: 680px)").matches) disclosure.open = false;
  return cleanups;
}

/* ---------- quote funnel ---------- */
function setupFunnel(): Cleanup[] {
  const root = document.querySelector<HTMLElement>("[data-funnel]");
  const form = root?.querySelector("form");
  if (!root || !form) return [];
  const steps = Array.from(root.querySelectorAll<HTMLFieldSetElement>(".qf-step"));
  const next = root.querySelector<HTMLButtonElement>("[data-qf-next]");
  const back = root.querySelector<HTMLButtonElement>("[data-qf-back]");
  const submit = root.querySelector<HTMLButtonElement>("[data-qf-submit]");
  const bar = root.querySelector<HTMLElement>(".qf-progress-bar span");
  const counter = root.querySelector<HTMLElement>("[data-qf-current]");
  const summary = root.querySelector<HTMLElement>("[data-qf-summary]");
  const skipNote = root.querySelector<HTMLElement>("[data-qf-skipnote]");
  const total = steps.length;
  let current = 0;
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

  const checked = (name: string) =>
    form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? "";
  const field = <T extends HTMLElement>(name: string) => form.querySelector<T>(`[name="${name}"]`);

  const setError = (el: HTMLInputElement | HTMLTextAreaElement, msg: string) => {
    const err = document.getElementById(`${el.id}_err`);
    if (msg) {
      el.setAttribute("aria-invalid", "true");
      if (err) {
        err.textContent = msg;
        err.hidden = false;
        el.setAttribute("aria-describedby", err.id);
      }
    } else {
      el.removeAttribute("aria-invalid");
      if (err) {
        err.textContent = "";
        err.hidden = true;
      }
    }
  };

  const shake = (el: Element | null) => {
    if (!el) return;
    el.classList.add("is-shake");
    later(() => el.classList.remove("is-shake"), 500);
  };

  const validate = (i: number): boolean => {
    const step = steps[i];
    const id = step.getAttribute("data-step");
    if (id === "1" && !checked("service")) {
      shake(step);
      return false;
    }
    let ok = true;
    step.querySelectorAll<HTMLInputElement>("[data-qf-required]").forEach((el) => {
      const empty = !el.value.trim();
      setError(el, empty ? el.getAttribute("data-qf-required") || "" : "");
      if (empty && ok) {
        el.focus();
        ok = false;
      }
    });
    if (id === "3") {
      const code = field<HTMLInputElement>("eircode");
      if (code && code.value.trim() && !isEircode(code.value)) {
        setError(code, "That does not look like an Eircode, for example D14 W2Y4.");
        if (ok) {
          code.focus();
          ok = false;
        }
      }
    }
    if (id === "4") {
      const name = field<HTMLInputElement>("name");
      const phone = field<HTMLInputElement>("phone");
      const email = field<HTMLInputElement>("email");
      const consent = field<HTMLInputElement>("consent");
      const checks: Array<[HTMLInputElement | null, string]> = [
        [name, name && name.value.trim().length < 2 ? "Please enter your name." : ""],
        [phone, phone && !isIrishPhone(phone.value) ? "Please enter a valid Irish phone number, for example 086 050 8558." : ""],
        [email, email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "Please enter a valid email address." : ""],
      ];
      for (const [el, msg] of checks) {
        if (!el) continue;
        setError(el, msg);
        if (msg && ok) {
          el.focus();
          ok = false;
        }
      }
      if (consent && !consent.checked) {
        shake(consent.closest(".consent"));
        if (ok) consent.focus();
        ok = false;
      }
    }
    return ok;
  };

  const renderSummary = () => {
    if (!summary) return;
    const chips: Array<[string, string, number]> = [];
    const service = checked("service");
    if (service) chips.push(["What", service, 0]);
    const enquiry = form.querySelector<HTMLInputElement>('input[name="enquiry"]:checked');
    if (enquiry) chips.push(["For", enquiry.closest("label")?.textContent?.trim() || enquiry.value, 1]);
    const postcode = field<HTMLInputElement>("eircode")?.value.trim();
    if (postcode) chips.push(["Where", postcode.toUpperCase(), 2]);
    summary.replaceChildren(
      ...chips.map(([label, value, target]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "qf-chip";
        const small = document.createElement("small");
        small.textContent = label;
        const span = document.createElement("span");
        span.textContent = value;
        b.append(small, span);
        b.setAttribute("aria-label", `Change ${label.toLowerCase()}, currently ${value}`);
        b.addEventListener("click", () => show(target));
        return b;
      }),
    );
    summary.hidden = chips.length === 0;
  };

  const show = (i: number, focus = true) => {
    current = Math.max(0, Math.min(total - 1, i));
    steps.forEach((s, idx) => {
      s.classList.toggle("is-active", idx === current);
      s.classList.toggle("is-done", idx < current);
      s.setAttribute("aria-hidden", idx === current ? "false" : "true");
      s.querySelectorAll<HTMLElement>("input,select,textarea,button").forEach((el) => {
        el.tabIndex = idx === current ? 0 : -1;
      });
    });
    if (bar) bar.style.width = `${((current + 1) / total) * 100}%`;
    if (counter) counter.textContent = String(current + 1);
    if (back) back.hidden = current === 0;
    const last = current === total - 1;
    if (next) next.hidden = last;
    if (submit) submit.hidden = !last;
    if (skipNote) skipNote.hidden = steps[current].getAttribute("data-step") !== "2";
    if (last) renderSummary();
    if (!focus) return;
    const stepEl = steps[current];
    const input =
      stepEl.querySelector<HTMLElement>("input:checked") ||
      stepEl.querySelector<HTMLElement>("input:not([type=hidden]),textarea");
    const q = stepEl.querySelector<HTMLElement>(".qf-q");
    if (q) {
      q.setAttribute("tabindex", "-1");
      q.focus({ preventScroll: true });
    }
    const top = root.getBoundingClientRect().top;
    if (top < 80 || top > 0.6 * window.innerHeight) {
      root.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    }
    const sid = stepEl.getAttribute("data-step");
    if (input && sid !== "1" && sid !== "2") later(() => input.focus({ preventScroll: true }), 350);
  };

  root.classList.add("is-live");
  const cleanups: Cleanup[] = [];
  if (next) cleanups.push(on(next, "click", () => validate(current) && show(current + 1)));
  if (back) cleanups.push(on(back, "click", () => show(current - 1)));
  form.querySelectorAll<HTMLInputElement>(".qf-tile input").forEach((input) => {
    cleanups.push(
      on(input, "change", () => {
        const idx = steps.indexOf(input.closest(".qf-step") as HTMLFieldSetElement);
        if (idx === current && idx < total - 1) later(() => show(current + 1), 260);
      }),
    );
  });
  cleanups.push(
    on(form, "keydown", (e) => {
      if (e.key === "Enter" && (e.target as Element).tagName !== "TEXTAREA" && current < total - 1) {
        e.preventDefault();
        if (validate(current)) show(current + 1);
      }
    }),
    on(form, "submit", (e) => {
      // Local clone: never post enquiries to the real business.
      e.preventDefault();
      for (let i = 0; i < total; i++) {
        if (!validate(i)) {
          show(i);
          return;
        }
      }
      const val = (n: string) => field<HTMLInputElement>(n)?.value.trim() ?? "";
      openMail(`Roof quote request: ${checked("service") || "general enquiry"}`, [
        `Service: ${checked("service")}`,
        `Situation: ${checked("enquiry")}`,
        `Eircode: ${val("eircode").toUpperCase()}`,
        `Name: ${val("name")}`,
        `Phone: ${val("phone")}`,
        `Email: ${val("email")}`,
        "",
        val("message"),
      ]);
      const sent = root.querySelector<HTMLElement>("[data-qf-sent]");
      if (sent) sent.hidden = false;
      if (submit) {
        submit.classList.add("is-sending");
        if (submit.firstChild) submit.firstChild.textContent = "Opening your email app ";
      }
    }),
  );
  show(0, false);
  return [...cleanups, () => timers.forEach((t) => window.clearTimeout(t))];
}

/* ---------- short enquiry forms (area / service / costs pages) ---------- */
function setupShortForms(): Cleanup[] {
  return Array.from(document.querySelectorAll<HTMLFormElement>("form.short-form")).map((form) =>
    on(form, "submit", (e) => {
      // No backend: hand the enquiry to the visitor's email app, and show the phone number as the alternative.
      e.preventDefault();
      const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
      const live = form.querySelector<HTMLElement>(".form-live");
      const eircode = form.querySelector<HTMLInputElement>('[name="eircode"]');
      const phone = form.querySelector<HTMLInputElement>('[name="phone"]');
      const consent = form.querySelector<HTMLInputElement>('[name="consent"]');
      const fail = (msg: string, el: HTMLElement | null) => {
        if (live) live.textContent = msg;
        el?.focus();
      };
      if (!eircode || !isEircode(eircode.value)) return fail("Please enter a valid Eircode, for example D14 W2Y4.", eircode);
      if (!phone || !isIrishPhone(phone.value)) return fail("Please enter a valid Irish phone number, for example 086 050 8558.", phone);
      if (!consent?.checked) return fail("Please tick the box to agree.", consent);
      if (live) live.textContent = "";
      openMail(`Callback request: ${form.dataset.topic ?? "roofing"}`, [
        `Topic: ${form.dataset.topic ?? ""}`,
        `Eircode: ${eircode.value.trim().toUpperCase()}`,
        `Phone: ${phone.value.trim()}`,
      ]);
      if (button) button.textContent = "Opening your email app";
    }),
  );
}

/* ---------- cookie consent ---------- */
function setupConsent(): Cleanup[] {
  const bar = document.getElementById("cookie-bar");
  const prefs = document.getElementById("cookie-prefs");
  if (!bar || !prefs) return [];
  const manage = bar.querySelector<HTMLElement>('[data-cookie="manage"]');
  const analytics = document.getElementById("cookie-analytics") as HTMLInputElement | null;
  const marketing = document.getElementById("cookie-marketing") as HTMLInputElement | null;
  const read = (): { necessary?: boolean; analytics?: boolean; marketing?: boolean } | null => {
    try {
      return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null");
    } catch {
      return null;
    }
  };
  const open = () => {
    bar.hidden = false;
    bar.querySelector("button")?.focus({ preventScroll: true });
  };
  const save = (choice: string, a: boolean, m: boolean) => {
    // Analytics/marketing scripts are intentionally not loaded in the clone.
    try {
      window.localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ necessary: true, analytics: a, marketing: m, at: new Date().toISOString(), choice }),
      );
    } catch {
      /* storage unavailable */
    }
    bar.hidden = true;
  };
  const cleanups = [
    on(bar, "click", (e) => {
      const btn = (e.target as Element).closest?.("[data-cookie]");
      const action = btn?.getAttribute("data-cookie");
      if (action === "accept") save("accept_all", true, true);
      if (action === "reject") save("reject_all", false, false);
      if (action === "manage") {
        const show = prefs.hidden;
        prefs.hidden = !show;
        manage?.setAttribute("aria-expanded", show ? "true" : "false");
        if (show) analytics?.focus();
      }
      if (action === "save") save("custom", !!analytics?.checked, !!marketing?.checked);
    }),
    on(document, "click", (e) => {
      if (!(e.target as Element).closest?.('[data-cookie="reopen"]')) return;
      e.preventDefault();
      const c = read();
      if (c) {
        if (analytics) analytics.checked = !!c.analytics;
        if (marketing) marketing.checked = !!c.marketing;
      }
      prefs.hidden = false;
      manage?.setAttribute("aria-expanded", "true");
      open();
    }),
  ];
  const existing = read();
  if (!existing || existing.necessary === undefined) open();
  return cleanups;
}

export function SiteBehaviors() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const toTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanups = [
      ...setupNav(),
      ...setupHashLinks(),
      ...setupScroll(progressRef.current, toTopRef.current),
      ...setupReveal(),
      ...setupPointer(),
      ...setupFunnel(),
      ...setupShortForms(),
      ...setupConsent(),
    ];
    // Hydration is done: the EN / GA script may now rewrite text (it waits for this flag).
    window.__irReady = true;
    window.irI18n?.init();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <button ref={toTopRef} type="button" className="to-top" aria-label="Back to the top of the page">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path d="M12 20V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
      </button>
    </>
  );
}
