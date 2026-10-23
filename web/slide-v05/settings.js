(function (root) {
  'use strict';
  const config = Object.freeze({
    axisThreshold: 8, axisRatio: 1.35, releaseFraction: .18,
    releaseMin: 12, releaseMax: 24, moveMs: 125, returnMs: 110,
    blockedPx: 6, growMs: 130, deliverMs: 220, boardPadding: 12, boardGap: 7,
    travelMs: distance => Math.min(300, 100 + Math.max(1, distance) * 50),
    winDelayMs: 700,
    tutorialDelayMs: 600, tutorialIdleMs: 4000, tutorialDemoMs: 1200, tutorialRounds: 2
  });
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {config});
  if (typeof module !== 'undefined') module.exports = config;
})(globalThis);
