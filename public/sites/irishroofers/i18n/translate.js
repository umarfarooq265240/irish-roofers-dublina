/* EN / GA (Irish) switch for the static site.
 * Replaces visible English text with the Irish from /sites/irishroofers/i18n/ga.json, and restores English on demand.
 * Runs only after React has hydrated (SiteBehaviors sets window.__irReady and calls init()).
 * Text is matched exactly (whitespace collapsed). Anything missing from the dictionary stays English.
 * Mark an element data-no-translate to skip it. */
(function () {
  'use strict';
  var DICT_URL = '/sites/irishroofers/i18n/ga.json';
  var ATTRS = ['aria-label', 'placeholder', 'alt', 'title'];
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE)$/;
  var lang = 'en';
  var dict = null;
  var loading = null;
  var textRecords = new Map(); // first node -> { nodes, orig }
  var nodeToRecord = new WeakMap();
  var attrRecords = new Map(); // element -> { attr: original }
  var observer = null;
  var pending = new Set();
  var timer = 0;

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function hasLetters(s) { return /[A-Za-zÀ-ſ]/.test(s); }
  function skipped(el) {
    for (var e = el; e; e = e.parentElement) {
      if (SKIP.test(e.tagName) || (e.hasAttribute && e.hasAttribute('data-no-translate'))) return true;
    }
    return false;
  }

  /** Runs of adjacent text nodes under one parent (comments ignored) are one sentence (React splits interpolations). */
  function textRuns(root) {
    var runs = [];
    var parents = [];
    var base = root.nodeType === 1 ? root : root.parentElement;
    if (!base || skipped(base)) return runs;
    if (root.nodeType === 3) parents.push(root.parentElement);
    else {
      parents.push(root);
      var all = root.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) parents.push(all[i]);
    }
    for (var p = 0; p < parents.length; p++) {
      var par = parents[p];
      if (!par || SKIP.test(par.tagName) || par.hasAttribute('data-no-translate')) continue;
      if (root.nodeType !== 3 && skipped(par)) continue;
      var run = [];
      var kids = par.childNodes;
      for (var k = 0; k <= kids.length; k++) {
        var n = kids[k];
        if (n && n.nodeType === 3) { run.push(n); continue; }
        if (n && n.nodeType === 8) continue;
        if (run.length) { runs.push(run); run = []; }
      }
    }
    return runs;
  }

  function applyRun(run) {
    var rec = nodeToRecord.get(run[0]);
    var english = rec && rec.nodes.length === run.length && rec.applied ? rec.orig.join('') : run.map(function (n) { return n.nodeValue; }).join('');
    var key = norm(english);
    if (!key || !hasLetters(key)) return;
    var holder = run[0].parentElement;
    var irish = (holder && holder.getAttribute && holder.getAttribute('data-ga')) || dict[key];
    if (!irish) return;
    var lead = english.match(/^\s*/)[0];
    var trail = english.match(/\s*$/)[0];
    if (!(rec && rec.applied)) {
      rec = { nodes: run.slice(), orig: run.map(function (n) { return n.nodeValue; }), applied: true };
      textRecords.set(run[0], rec);
      run.forEach(function (n) { nodeToRecord.set(n, rec); });
    }
    run[0].nodeValue = lead + irish + trail;
    for (var i = 1; i < run.length; i++) run[i].nodeValue = '';
  }

  function applyAttrs(root) {
    var els = root.nodeType === 1 ? [root].concat([].slice.call(root.querySelectorAll('[aria-label],[placeholder],[alt],[title]'))) : [];
    els.forEach(function (el) {
      if (skipped(el)) return;
      ATTRS.forEach(function (a) {
        var v = el.getAttribute(a);
        if (!v) return;
        var rec = attrRecords.get(el);
        var orig = rec && rec[a] !== undefined ? rec[a].orig : v;
        var irish = dict[norm(orig)];
        if (!irish) return;
        if (!rec) { rec = {}; attrRecords.set(el, rec); }
        rec[a] = { orig: orig, applied: irish };
        el.setAttribute(a, irish);
      });
    });
  }

  function translateTree(root) {
    if (!dict || lang !== 'ga') return;
    textRuns(root).forEach(applyRun);
    applyAttrs(root.nodeType === 1 ? root : root.parentElement || document.body);
  }

  function restoreAll() {
    textRecords.forEach(function (rec) {
      rec.nodes.forEach(function (n, i) { n.nodeValue = rec.orig[i]; });
      rec.applied = false;
    });
    textRecords.clear();
    attrRecords.forEach(function (rec, el) {
      Object.keys(rec).forEach(function (a) { el.setAttribute(a, rec[a].orig); });
    });
    attrRecords.clear();
  }

  function flush() {
    timer = 0;
    if (lang !== 'ga' || !dict) { pending.clear(); return; }
    var items = Array.from(pending);
    pending.clear();
    stopObserving();
    items.forEach(function (n) {
      if (n.isConnected) translateTree(n);
    });
    startObserving();
  }

  function schedule(n) {
    pending.add(n);
    if (!timer) timer = window.setTimeout(flush, 30);
  }

  function startObserving() {
    if (!observer) {
      observer = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'childList') {
            m.addedNodes.forEach(function (n) { if (n.nodeType === 1 || n.nodeType === 3) schedule(n); });
          } else if (m.type === 'characterData') {
            var rec = nodeToRecord.get(m.target);
            if (rec && rec.applied) {
              // React rewrote one node of a translated run: take the new English as the original and translate again.
              var i = rec.nodes.indexOf(m.target);
              if (i >= 0 && m.target.nodeValue !== '' ) {
                var isOurs = i === 0 && dict[norm(rec.orig.join(''))] && m.target.nodeValue.indexOf(dict[norm(rec.orig.join(''))]) !== -1;
                if (!isOurs) { rec.orig[i] = m.target.nodeValue; rec.applied = true; schedule(m.target.parentElement); }
              }
            } else if (m.target.parentElement) schedule(m.target.parentElement);
          } else if (m.type === 'attributes') {
            if (!attrRecords.has(m.target) || attrRecords.get(m.target)[m.attributeName] === undefined || attrRecords.get(m.target)[m.attributeName].applied !== m.target.getAttribute(m.attributeName)) schedule(m.target);
          }
        });
      });
    }
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  function stopObserving() { if (observer) observer.disconnect(); }

  function load() {
    if (dict) return Promise.resolve(dict);
    if (!loading) {
      loading = fetch(DICT_URL, { cache: 'force-cache' })
        .then(function (r) { return r.json(); })
        .then(function (d) { dict = d; return d; })
        .catch(function () { loading = null; return null; });
    }
    return loading;
  }

  function setTitle(toIrish) {
    if (!window.__irTitle) window.__irTitle = document.title;
    var t = toIrish && dict && dict[norm(window.__irTitle)];
    document.title = t || window.__irTitle;
  }

  function setLang(next, persist) {
    lang = next === 'ga' ? 'ga' : 'en';
    if (persist !== false) { try { localStorage.setItem('ir-lang', lang); } catch { /* storage blocked */ } }
    document.documentElement.setAttribute('lang', lang === 'ga' ? 'ga' : 'en-IE');
    window.dispatchEvent(new CustomEvent('ir-lang', { detail: lang }));
    if (lang === 'en') {
      stopObserving();
      restoreAll();
      setTitle(false);
      startObserving();
      return Promise.resolve();
    }
    return load().then(function () {
      if (lang !== 'ga' || !dict) return;
      stopObserving();
      translateTree(document.body);
      setTitle(true);
      startObserving();
    });
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('ir-lang'); } catch { /* ignore */ }
    if (saved === 'ga') setLang('ga', false);
    // Route changes in the App Router swap the page text without a reload.
    if (window.__irTitleObs) return;
    window.__irTitleObs = true;
    new MutationObserver(function () {
      if (window.__irTitle && document.title !== window.__irTitle && lang === 'ga' && dict && document.title !== dict[norm(window.__irTitle)]) {
        window.__irTitle = document.title;
        setTitle(true);
      }
    }).observe(document.querySelector('title') || document.head, { childList: true, subtree: true, characterData: true });
  }

  window.irI18n = {
    init: init,
    setLang: setLang,
    get lang() { return lang; },
    /** For the dictionary builder: every translatable string on the page, as it will be matched. */
    collect: function (root) {
      var out = [];
      textRuns(root || document.body).forEach(function (run) {
        var t = norm(run.map(function (n) { return n.nodeValue; }).join(''));
        if (t && hasLetters(t)) out.push(['t', t]);
      });
      var base = root || document.body;
      [base].concat([].slice.call(base.querySelectorAll('[aria-label],[placeholder],[alt],[title]'))).forEach(function (el) {
        if (skipped(el)) return;
        ATTRS.forEach(function (a) { var v = el.getAttribute(a); if (v && hasLetters(v)) out.push([a, norm(v)]); });
      });
      return out;
    },
  };
  if (window.__irReady) init();
})();
