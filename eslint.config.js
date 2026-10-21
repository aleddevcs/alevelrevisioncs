// ESLint flat config. The site itself uses plain browser scripts that share the global `RS`.
'use strict';

const browserGlobals = {
  window: 'readonly', document: 'readonly', location: 'readonly', history: 'readonly', localStorage: 'readonly',
  console: 'readonly', setTimeout: 'readonly', URL: 'readonly', Blob: 'readonly', FileReader: 'readonly',
  getComputedStyle: 'readonly', globalThis: 'readonly', RS: 'readonly'
};
const nodeGlobals = {
  require: 'readonly', module: 'writable', process: 'readonly', __dirname: 'readonly', console: 'readonly', URL: 'readonly', Buffer: 'readonly'
};
const rules = {
  'no-undef': 'error',
  'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
  'no-redeclare': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-unreachable': 'error',
  'no-constant-condition': 'error',
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-self-assign': 'error',
  'eqeqeq': ['error', 'smart'],
  'no-var': 'off'
};

module.exports = [
  { ignores: ['node_modules/**', 'test-results/**', 'playwright-report/**'] },
  {
    files: ['js/**/*.js', 'data/**/*.js'],
    languageOptions: { ecmaVersion: 2018, sourceType: 'script', globals: browserGlobals },
    rules
  },
  {
    files: ['tests/**/*.js', 'scripts/**/*.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: nodeGlobals },
    rules
  },
  {
    // Callbacks passed to page.evaluate() run in the browser.
    files: ['tests/e2e/**/*.js'],
    languageOptions: { globals: { ...nodeGlobals, ...browserGlobals } }
  }
];
