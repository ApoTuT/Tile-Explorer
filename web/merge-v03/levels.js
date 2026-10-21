(function (root) {
  'use strict';
  const tile = (id, x, y, z) => ({id, x, y, z, family: 'dog', stage: 'young'});
  const move = (sourceId, targetId) => ({sourceId, targetId});
  const level = (id, title, subtitle, golden, nest, tiles, solution) =>
    ({id, title, subtitle, goals: {golden}, nest, tiles, solution, tileSize: 100, ruleset: 'merge-v03-2'});
  const levels = [
    level('merge-01', '靠近一点', '把上面的小狗，斜着拖到下面的小狗上。', 1, {x: 235, y: 80},
      [tile('u1', 40, 40, 1), tile('l1', 105, 80, 0)], [move('u1', 'l1')]),
    level('merge-02', '借个位，再回来', '两张都挤住了？先拖一张到临时窝。', 2, {x: 230, y: 160},
      [tile('l0', 0, 160, 0), tile('l1', 106, 160, 0), tile('u1', 53, 80, 1), tile('u2', 53, 240, 1)],
      [{type: 'park', sourceId: 'u1'}, move('u2', 'l0'), move('u1', 'l1')]),
    level('merge-03', '挤一挤，有办法', '可以直接配对，也可以借个位再接回来。', 4, {x: 318, y: 270},
      [tile('l0', 318, 160, 0), tile('l1', 212, 160, 0), tile('l2', 0, 160, 0), tile('l3', 106, 160, 0),
        tile('u1', 218, 80, 1), tile('u2', 53, 80, 1), tile('u3', 53, 240, 1), tile('u4', 218, 240, 1)],
      [move('u2', 'l0'), move('u3', 'l2'), move('u1', 'l3'), move('u4', 'l1')])
  ];
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {levels});
  if (typeof module !== 'undefined') module.exports = levels;
})(globalThis);
