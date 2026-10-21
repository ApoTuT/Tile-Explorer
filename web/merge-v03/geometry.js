/* Shared world geometry. No DOM or browser globals are required. */
(function (root) {
  'use strict';
  const SIZE = 100;
  const rect = (t, region = {x: 0, y: 0, width: SIZE, height: SIZE}) =>
    ({x: t.x + region.x, y: t.y + region.y, width: region.width, height: region.height});
  const overlaps = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width &&
    a.y < b.y + b.height && b.y < a.y + a.height;
  function visibleFraction(tile, tiles, region) {
    const r = rect(tile, region);
    const covers = tiles.filter(t => t.z > tile.z).map(t => rect(t)).filter(c => overlaps(r, c));
    const xs = [...new Set([r.x, r.x + r.width, ...covers.flatMap(c =>
      [Math.max(r.x, c.x), Math.min(r.x + r.width, c.x + c.width)])])].sort((a, b) => a - b);
    const ys = [...new Set([r.y, r.y + r.height, ...covers.flatMap(c =>
      [Math.max(r.y, c.y), Math.min(r.y + r.height, c.y + c.height)])])].sort((a, b) => a - b);
    let visible = 0;
    for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) {
      const x = (xs[i] + xs[i + 1]) / 2, y = (ys[j] + ys[j + 1]) / 2;
      if (!covers.some(c => x > c.x && x < c.x + c.width && y > c.y && y < c.y + c.height))
        visible += (xs[i + 1] - xs[i]) * (ys[j + 1] - ys[j]);
    }
    return visible / (r.width * r.height);
  }
  function bounds(tiles, padding = 20) {
    const x = Math.min(...tiles.map(t => t.x)) - padding;
    const y = Math.min(...tiles.map(t => t.y)) - padding;
    return {x, y, width: Math.max(...tiles.map(t => t.x + SIZE)) - x + padding,
      height: Math.max(...tiles.map(t => t.y + SIZE)) - y + padding};
  }
  const api = {SIZE, rect, overlaps, visibleFraction, bounds};
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {geometry: api});
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
