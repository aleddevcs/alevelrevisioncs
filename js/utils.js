/*
 * Shared helpers. Every script attaches to the single global namespace `RS`
 * (Revision Site) so the site works without a build step and from file://.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  /** Escape text for safe insertion into HTML. Use for anything a user typed. */
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
  }

  /** Remove HTML tags, leaving plain text (used for search indexing). */
  function stripTags(html) {
    return String(html == null ? '' : html).replace(/<[^>]*>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }

  /**
   * Fisher–Yates shuffle. Returns a new array; the input is not modified.
   * `rng` is optional and lets tests make shuffles repeatable.
   */
  function shuffle(list, rng) {
    var random = rng || Math.random;
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /** Small deterministic random number generator (mulberry32) for tests. */
  function seededRandom(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /**
   * Normalise a typed answer so that harmless differences (case, extra spaces,
   * a trailing full stop) do not cause a correct answer to be marked wrong.
   */
  function normaliseAnswer(value, options) {
    var opts = options || {};
    var s = String(value == null ? '' : value).trim();
    if (!opts.caseSensitive) s = s.toLowerCase();
    s = s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/−/g, '-');
    s = s.replace(/\s+/g, ' ').replace(/\.$/, '');
    if (opts.ignoreSpaces) s = s.replace(/\s/g, '');
    return s;
  }

  /**
   * Tiny DOM builder: h('button', {class: 'btn', onclick: fn}, 'Label').
   * String children become text nodes (safe). Use the `html` attribute only
   * for trusted content from the data files.
   */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (key) {
      var val = a[key];
      if (val == null || val === false) return;
      if (key === 'class') el.className = val;
      else if (key === 'html') { el.innerHTML = val; describeOverlines(el); }
      else if (key === 'text') el.textContent = val;
      else if (key.slice(0, 2) === 'on' && typeof val === 'function') el.addEventListener(key.slice(2), val);
      else if (key === 'dataset') Object.keys(val).forEach(function (k) { el.dataset[k] = val[k]; });
      else if (val === true) el.setAttribute(key, '');
      else el.setAttribute(key, val);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }

  /**
   * Content writes NOT A as <span class="ovl">A</span> (a bar over the letter).
   * Screen readers do not announce the bar, so add hidden "NOT ( … )" text.
   */
  function describeOverlines(el) {
    Array.prototype.forEach.call(el.querySelectorAll('.ovl:not([data-described])'), function (o) {
      o.setAttribute('data-described', '');
      var before = document.createElement('span');
      before.className = 'visually-hidden';
      before.textContent = 'NOT (';
      var after = document.createElement('span');
      after.className = 'visually-hidden';
      after.textContent = ')';
      o.insertBefore(before, o.firstChild);
      o.appendChild(after);
    });
  }

  function append(parent, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(parent, c); }); return; }
    parent.appendChild(typeof child === 'object' ? child : document.createTextNode(String(child)));
  }

  function formatDate(ts) {
    if (!ts) return '—';
    try {
      return new Date(ts).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return new Date(ts).toISOString();
    }
  }

  function percent(part, whole) {
    return whole > 0 ? Math.round((part / whole) * 100) : 0;
  }

  function plural(n, word, pluralWord) {
    return n + ' ' + (n === 1 ? word : (pluralWord || word + 's'));
  }

  RS.utils = {
    escapeHtml: escapeHtml,
    stripTags: stripTags,
    shuffle: shuffle,
    seededRandom: seededRandom,
    normaliseAnswer: normaliseAnswer,
    h: h,
    formatDate: formatDate,
    percent: percent,
    plural: plural
  };
})(typeof window !== 'undefined' ? window : globalThis);
