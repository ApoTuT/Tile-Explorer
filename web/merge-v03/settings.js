/* Presentation and input tuning only. Logical recipes stay in engine.js. */
(function (root) {
  'use strict';
  const config = Object.freeze({
    dragThreshold: 6,
    snapWorldMin: 28,
    snapScreenMin: 20,
    snapWorldMax: 42,
    returnMs: 150,
    snapMs: 85,
    growMs: 140,
    deliverMs: 150,
    parkMs: 110,
  });
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {config});
  if (typeof module !== 'undefined') module.exports = config;
})(globalThis);
