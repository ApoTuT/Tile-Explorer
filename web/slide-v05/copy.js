(function (root) {
  'use strict';
  const reasons = {
    edge: '到边缘啦，换个方向试试。', finished: '目标收齐啦！',
    boundary: '到边缘啦，换个方向试试。', 'out-of-bounds': '到边缘啦，换个方向试试。',
    occupied: '这里有别的图案，先给它让个位置。', blocked: '这里有别的图案，先给它让个位置。',
    different: '碰到相同图案，才能合成。', 'different-item': '碰到相同图案，才能合成。',
    stale: '位置更新了，再滑一次就好。', 'stale-revision': '位置更新了，再滑一次就好。',
    completed: '目标收齐啦！', 'not-playing': '目标收齐啦！'
  };
  const copy = {
    title: '滑出新花样', version: 'v0.5',
    initial: '在方块上划一下，一直滑到头。',
    move: '让出一点空间，看看谁能碰到一起。',
    merged: name => name + '，收集好啦！',
    complete: '清空啦，每一块都有了新模样。',
    hints: {move: '一路滑到边缘或障碍前', merge: '一路滑过去，碰到同类就合成', 'make-room': '挪一挪，给它让路'},
    reject: reason => reasons[reason] || '这个方向被挡住了，换个方向试试。',
    labels: {
      tileAria: (name, row, col) => name + '，第 ' + (row + 1) + ' 行，第 ' + (col + 1) + ' 列。方向键一直滑到头。',
      goalAria: (name, count, total) => name + '，已收集 ' + count + '，目标 ' + total,
      cellAria: (row, col) => '第 ' + (row + 1) + ' 行，第 ' + (col + 1) + ' 列空格'
    }
  };
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {copy});
  if (typeof module !== 'undefined') module.exports = copy;
})(globalThis);
