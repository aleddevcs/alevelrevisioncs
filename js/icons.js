/*
 * Topic icons as inline SVG paths (24×24 grid, drawn with `stroke: currentColor`).
 * A topic file chooses one with its `icon` property.
 */
(function (root) {
  'use strict';
  var RS = (root.RS = root.RS || {});

  var PATHS = {
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    memory: '<rect x="2" y="7" width="20" height="10" rx="1.5"/><path d="M6 11h2v2H6zM11 11h2v2h-2zM16 11h2v2h-2zM5 17v3M9 17v3M15 17v3M19 17v3"/>',
    binary: '<path d="M6 4v6M4 5l2-1M15 4h3v6h-3zM5 14h3v6H5zM16 14v6M14 15l2-1"/>',
    tree: '<circle cx="12" cy="4.5" r="2.5"/><circle cx="6" cy="19.5" r="2.5"/><circle cx="18" cy="19.5" r="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 7v2.5M10.3 13.8 7.4 17.5M13.7 13.8l2.9 3.7"/>',
    sort: '<path d="M4 20V14M9 20V9M14 20V11M19 20V4"/><path d="M3 22h18"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M10.8 7.2 6.2 16.8M13.2 7.2l4.6 9.6M7.5 19h9"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM8.5 12l2 2 4-4M8.5 18h7"/>',
    logic: '<path d="M4 6h5a6 6 0 0 1 0 12H4z"/><path d="M15 12h5M1 9h3M1 15h3"/>'
  };

  function icon(name, className) {
    var paths = PATHS[name] || PATHS.code;
    return '<svg class="' + (className || 'icon') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths + '</svg>';
  }

  RS.icons = { icon: icon, names: Object.keys(PATHS) };
})(typeof window !== 'undefined' ? window : globalThis);
