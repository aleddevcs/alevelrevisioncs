/*
 * Hash router and site-wide controls (theme, mobile menu, search box).
 * Routes:
 *   #/                         home
 *   #/topic/:id[/:tab]         topic (tabs: notes, flashcards, questions, exam, tracing)
 *   #/quiz[?topic=id]          quiz setup
 *   #/quiz/run, #/quiz/results quiz runner and results
 *   #/dashboard, #/about       dashboard and about pages
 *   #/search?q=...             search results
 *   #/question/:id             a single practice question
 * A second "#" in the hash is treated as an in-page anchor, e.g. #/topic/x/notes#note-2
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});
  var SITE = 'CS Revision Hub';
  var appEl = document.getElementById('app');
  var firstRender = true;
  var lastPath = null;

  function parse(hash) {
    var raw = (hash || '').replace(/^#/, '');
    var anchor = null;
    var hashPos = raw.indexOf('#');
    if (hashPos !== -1) { anchor = raw.slice(hashPos + 1); raw = raw.slice(0, hashPos); }
    var query = {};
    var qPos = raw.indexOf('?');
    if (qPos !== -1) {
      raw.slice(qPos + 1).split('&').forEach(function (pair) {
        if (!pair) return;
        var kv = pair.split('=');
        try { query[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); } catch (e) { /* ignore malformed */ }
      });
      raw = raw.slice(0, qPos);
    }
    var parts = raw.split('/').filter(Boolean);
    return { parts: parts, query: query, anchor: anchor, path: '/' + parts.join('/') };
  }

  function resolve(route) {
    var p = route.parts;
    if (!p.length) return { view: 'home', nav: 'home' };
    switch (p[0]) {
      case 'topic': return { view: 'topic', nav: 'home', params: { id: p[1], tab: p[2] } };
      case 'quiz':
        if (p[1] === 'run') return { view: 'quizRun', nav: 'quiz', title: 'Quiz' };
        if (p[1] === 'results') return { view: 'quizResults', nav: 'quiz', title: 'Quiz results' };
        return { view: 'quizSetup', nav: 'quiz', title: 'Quiz' };
      case 'dashboard': return { view: 'dashboard', nav: 'dashboard', title: 'Dashboard' };
      case 'about': return { view: 'about', nav: 'about', title: 'About' };
      case 'search': return { view: 'search', nav: null, title: 'Search' };
      case 'question': return { view: 'question', nav: 'home', params: { id: p[1] }, title: 'Practice question' };
      default: return { view: 'notFound', nav: null, title: 'Page not found' };
    }
  }

  function setTitle(t) { document.title = t ? t + ' – ' + SITE : SITE + ' – A-level Computer Science practice'; }

  function render() {
    var route = parse(location.hash);
    var target = resolve(route);
    var params = target.params || {};
    params.query = route.query;

    appEl.innerHTML = '';
    setTitle(target.title);
    if (target.view !== 'search') document.getElementById('search-input').value = '';
    try {
      RS.views[target.view].render(appEl, params);
    } catch (err) {
      appEl.innerHTML = '';
      appEl.appendChild(RS.ui.emptyState('Sorry, something went wrong showing this page. Try reloading, or go back to the topics list.', RS.utils.h('a', { class: 'btn', href: '#/' }, 'Topics')));
      if (root.console) console.error(err);
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-nav]'), function (a) {
      if (a.getAttribute('data-nav') === target.nav) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    closeNav();

    var samePage = route.path === lastPath;
    lastPath = route.path;
    if (route.anchor) {
      var el = document.getElementById(route.anchor);
      if (el) { el.scrollIntoView(); el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); el.classList.add('is-target'); }
    } else if (!firstRender) {
      if (!samePage) root.scrollTo(0, 0);
      var focusEl = appEl.querySelector('[data-autofocus]') || appEl.querySelector('h1');
      if (focusEl) { focusEl.setAttribute('tabindex', '-1'); focusEl.focus({ preventScroll: samePage }); }
    }
    firstRender = false;
  }

  function go(hash, replace) {
    if (location.hash === hash) { render(); return; }
    if (replace) { history.replaceState(null, '', hash); render(); } else location.hash = hash;
  }

  /* ----- Theme ----- */
  var themeBtn = document.getElementById('theme-toggle');
  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function syncThemeButton() {
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }
  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('alrcs.theme', next); } catch (e) { /* not persisted */ }
    syncThemeButton();
  });
  syncThemeButton();

  /* ----- Mobile navigation ----- */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  function closeNav() { nav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  navToggle.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); navToggle.focus(); }
  });

  /* ----- Header search ----- */
  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var q = document.getElementById('search-input').value.trim();
    go('#/search?q=' + encodeURIComponent(q));
  });

  if (!RS.store.persistent) document.getElementById('storage-warning').hidden = false;

  RS.app = { go: go, refresh: render, setTitle: setTitle, parse: parse };
  root.addEventListener('hashchange', render);
  render();
})(window);
