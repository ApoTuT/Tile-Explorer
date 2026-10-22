(function (root) {
  'use strict';
  const tile = (id, x, y, z, family) => ({id, x, y, z, family, stage: 'base'});
  const move = (sourceId, targetId) => ({sourceId, targetId});
  const level = (id, title, subtitle, goals, parkingSlot, tutorialId, tiles, solution) =>
    ({id, title, subtitle, goals, goalOrder: Object.keys(goals), parkingSlot: {...parkingSlot, capacity: 1},
      tutorialId, tiles, solution, tileSize: 100, ruleset: 'merge-v04-1'});
  const levels = [
    level('merge-01', '拖过去，变大啦', '把小草莓拖到另一颗小草莓上。',
      {'strawberry-large': 1}, {x: 235, y: 80}, 'learn-merge',
      [tile('u1', 40, 40, 1, 'strawberry'), tile('l1', 105, 80, 0, 'strawberry')],
      [move('u1', 'l1')]),
    level('merge-02', '先借个位', '找相同图案；挤住时可以先暂放一张。',
      {'strawberry-large': 1, 'sports-car': 1}, {x: 230, y: 160}, 'learn-parking',
      [tile('l0', 0, 160, 0, 'car'), tile('l1', 106, 160, 0, 'strawberry'),
        tile('u1', 53, 80, 1, 'strawberry'), tile('u2', 53, 240, 1, 'car')],
      [{type: 'park', sourceId: 'u1'}, move('u2', 'l0'), move('u1', 'l1')]),
    level('merge-03', '试着自己来', '水果、汽车、树苗，看看会变成什么。',
      {'strawberry-large': 2, 'sports-car': 1, 'tree-grown': 1}, {x: 318, y: 270}, 'independent',
      [tile('l0', 318, 160, 0, 'tree'), tile('l1', 212, 160, 0, 'strawberry'),
        tile('l2', 0, 160, 0, 'strawberry'), tile('l3', 106, 160, 0, 'car'),
        tile('u1', 218, 80, 1, 'strawberry'), tile('u2', 53, 80, 1, 'strawberry'),
        tile('u3', 53, 240, 1, 'car'), tile('u4', 218, 240, 1, 'tree')],
      [move('u4', 'l0'), move('u1', 'l1'), {type: 'park', sourceId: 'u2'}, move('u3', 'l3'), move('u2', 'l2')])
  ];
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {levels});
  if (typeof module !== 'undefined') module.exports = levels;
})(globalThis);
