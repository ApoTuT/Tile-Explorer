(function (root) {
  'use strict';
  /** Functional UI language lives here; item names come from the content registry. */
  const labels = Object.freeze({
    title: '叠出新花样', subtitle: '拖一拖，看看会变成什么', version: 'v0.4',
    goal: '本关目标', parking: '暂放位', park: '暂放一张', undo: '撤销', restart: '重开',
    help: '怎么玩', settings: '设置', levels: '选关', next: '下一关', replay: '再玩一次',
    complete: '目标收齐啦！', allComplete: '全部完成！', soundOn: '音效开', soundOff: '音效关',
    level: n => '第 ' + n + ' 关', moves: n => n + ' 次操作',
    parkingAria: '暂放位，可以暂放一个上层方块',
    tileAria: (name, layer, parked, blocked) =>
      (parked ? '暂放位里的' : layer ? '上层' : '下层') + name +
      (blocked ? '，还有方块挡着' : ''),
    goalAria: (name, count, total) => name + '，已收集 ' + count + '，目标 ' + total,
    result: (name, count) => name + ' ' + count + ' 个'
  });
  const messages = Object.freeze({
    initial: () => '找相同图案，按住拖到一起。',
    tap: '按住方块，拖到同类上。',
    tutorialMerge: name => '按住' + (name || '上层方块') + '，拖到同类上。',
    tutorialPark: name => '先把' + (name || '上层方块') + '拖到暂放位，腾出空间。',
    tutorialRetrieve: name => '接回暂放的' + (name || '方块') + '，拖到同类上。',
    tutorialKeyboard: 'Enter 拿起，Tab 选落点，再按 Enter 放下。',
    parked: name => name + '先在这里等一下。',
    retrieved: name => name + '接回来，刚好配成一对！',
    merged: name => '变成' + name + '啦！',
    won: '目标收齐啦，看看下一关！',
    allWon: '三关全部完成，新花样还在继续。',
    help: '找同类，拖到一起。挤住了，先暂放一张。',
    unavailableSave: '本次可以正常游玩，进度暂时无法保存。',
    restored: '接着上次的进度继续吧。',
    cancelled: '已取消，继续试试。',
    keyboardPick: name => '已拿起' + name + '，选择同类底牌或暂放位。',
    selected: name => '已拿起' + name + '，选择同类底牌或暂放位。',
    undo: '已撤销，继续试试。',
    stuck: '挤住了？可以先暂放一张。',
    saveFailed: '本次可以正常游玩，进度暂时无法保存。'
  });
  function reject(reason) {
    const text = {
      'different-kind': '找相同图案配对。', 'different-family': '找相同图案配对。',
      'not-matching': '找相同图案配对。', 'mismatch': '找相同图案配对。',
      'recipe': '找相同图案配对。', 'layers': '把上层方块，拖到相同图案的底牌上。',
      'stale': '牌阵已更新，再试一次。',
      'blocked': '还有方块挡着，先挪开它。', 'target-blocked': '还有方块挡着，先挪开它。',
      'source-blocked': '先移动压在上面的方块。',
      'recipe': '找相同图案配对。', 'layers': '把上层方块，拖到相同图案的底牌上。',
      'stale': '牌阵已更新，再拖一次就好。',
      'parking-full': '暂放位满了，先把里面的方块接回来。',
      'nest-full': '暂放位满了，先把里面的方块接回来。',
      'same-layer': '把上层方块，拖到相同图案的底牌上。',
      'lower-source': '按住上层方块，再拖向同类。',
      'invalid-source': '按住上层方块，再拖向同类。',
      'already-parked': '把暂放的方块拖到同类上。',
      'off-target': '', 'blank': '', 'too-far': ''
    };
    return Object.hasOwn(text, reason) ? text[reason] : '靠近相同图案，再松手试试。';
  }
  const api = Object.freeze({labels, messages, reject});
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {copy: api});
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
