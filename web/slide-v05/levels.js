(function (root) {
  'use strict';
  const tile = (id, itemId, row, col) => ({id, itemId, row, col});
  const slide = (tileId, direction) => ({type: 'slide', tileId, direction});
  const S = 'strawberry-small', C = 'car-small', T = 'tree-small';
  const level = (id, title, subtitle, rows, goals, tutorialId, tiles, referenceSolution) =>
    ({id, title, subtitle, rows, cols: 3, goals, goalOrder: Object.keys(goals), tutorialId, tiles,
      referenceSolution, solution: referenceSolution, ruleset: 'slide-v05-2'});
  const levels = [
    level('slide-01', '一滑，就碰到了', '朝同类划一下，一路滑过去合成。', 2,
      {'strawberry-large': 1}, 'learn-slide', [tile('s1', S, 0, 0), tile('s2', S, 0, 2)],
      [slide('s1', 'right')]),
    level('slide-02', '让个位置', '挪开一块，为另一对让路。', 2,
      {'strawberry-large': 1, 'sports-car': 1}, 'make-room',
      [tile('s1', S, 0, 0), tile('c1', C, 0, 1), tile('s2', S, 0, 2), tile('c2', C, 1, 0)],
      [slide('c1', 'down'), slide('s1', 'right'), slide('c2', 'right')]),
    level('slide-03', '往哪边挪，更顺手', '先找眼前的一对，再打开下一条路。', 3,
      {'strawberry-large': 1, 'sports-car': 1, 'tree-grown': 1}, 'independent',
      [tile('s1', S, 0, 0), tile('c1', C, 0, 1), tile('s2', S, 0, 2),
        tile('c2', C, 1, 0), tile('t1', T, 1, 1), tile('t2', T, 2, 0)],
      [slide('t1', 'down'), slide('c1', 'down'), slide('s1', 'right'), slide('c1', 'left'), slide('t1', 'left')])
  ];
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {levels});
  if (typeof module !== 'undefined') module.exports = levels;
})(globalThis);
