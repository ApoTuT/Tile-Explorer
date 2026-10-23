/* Compatibility entry: both merge games use the same content registry. */
(function (root) {
  'use strict';
  const content = typeof module !== 'undefined' ? require('../shared/merge-content.js') : root.TileMergeContent;
  if (!content) throw new Error('Load shared/merge-content.js before the merge content entry');
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {content});
  if (typeof module !== 'undefined') module.exports = content;
})(globalThis);
