/*
 * Loads the site's logic and content scripts into a Node VM context, in the
 * order they appear in index.html, so they can be tested without a browser.
 * Scripts that need the DOM (components, views and the router) are skipped.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const DOM_SCRIPTS = /^js\/(components\.js|app\.js|views\/)/;

function scriptPaths() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  return [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
}

function memoryStorage(initial) {
  const data = new Map(Object.entries(initial || {}));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => { data.set(k, String(v)); },
    removeItem: (k) => { data.delete(k); },
    clear: () => data.clear(),
    _data: data
  };
}

/**
 * @param {object} [options]
 * @param {object|null} [options.storage] initial localStorage contents; pass null for "storage blocked"
 */
function loadSite(options = {}) {
  const context = { console, Math, Date, JSON };
  if (options.storage !== null) context.localStorage = memoryStorage(options.storage);
  context.globalThis = context;
  vm.createContext(context);
  const loaded = [];
  for (const src of scriptPaths()) {
    if (DOM_SCRIPTS.test(src)) continue;
    const file = path.join(ROOT, src);
    vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: src });
    loaded.push(src);
  }
  return { RS: context.RS, context, loaded };
}

module.exports = { loadSite, scriptPaths, ROOT };
