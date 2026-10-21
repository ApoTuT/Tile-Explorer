/* Browser composition: session owns facts, view owns nodes, input owns gestures. */
(function () {
  'use strict';
  const M = globalThis.TileMergeV03;
  const E = M.engine;
  const $ = id => document.getElementById(id);
  const board = $('merge-board');
  const view = new M.View(board, $('goals'));
  const fx = new M.Presentation();
  let storage;
  try { storage = globalThis.localStorage; } catch (_) { storage = null; }
  const store = new M.SaveStore(storage, M.levels);
  const session = new M.GameSession({levels: M.levels, store});
  const audio = new TileTheater.AudioManager({
    assetBase: './assets/audio/v02',
    settingsKey: 'tile-explorer.merge.v03.settings.v1',
  });
  void audio.preload(['dog']);

  let transitioning = false;
  let animating = false;
  let keyboardSource = null;
  let lifecycle = 0;
  let effectEpoch = 0;
  let layoutFrame = null;

  function message(text) { $('message').textContent = text; }

  function stopEffects() {
    effectEpoch++;
    animating = false;
    fx.cancel();
    audio.stopAll();
  }

  const input = M.input.bindInput({
    board, view,
    getState: () => session.state,
    commit,
    message,
    unlock: () => { void audio.unlock(); },
    isBusy: () => transitioning || $('levels-dialog').open,
    onGestureStart: () => {
      stopEffects();
      keyboardSource = null;
    },
  });

  function invalidate() {
    lifecycle++;
    transitioning = false;
    keyboardSource = null;
    if (layoutFrame !== null) cancelAnimationFrame(layoutFrame);
    layoutFrame = null;
    input.cancel();
    stopEffects();
    view.clearTargets();
  }

  function stateMessage() {
    const state = session.state;
    if (state.status === 'won') return '配对完成，金毛都到家啦。';
    if (state.status === 'stuck') return '暂时没有落点，试试撤销上一步。';
    if (!E.listMergeMoves(state).length) return '都挤住了？拖一张上层小狗到临时窝借个位。';
    if (!state.nestId) return session.level.subtitle;
    return state.tiles.filter(tile => tile.z === 1).length === 1 ?
      '把临时窝里的小狗拖回底牌，完成这一对。' :
      '另一只可以配对了，别忘了接回窝里的小狗。';
  }

  function render({announce = true} = {}) {
    const state = session.state;
    const level = session.level;
    view.render(state);
    $('level-label').textContent = '第 ' + (M.levels.indexOf(level) + 1) + ' 关 / 3';
    $('level-title').textContent = level.title;
    $('goal-count').textContent = state.delivered.golden + ' / ' + state.goals.golden;
    $('move-count').textContent = state.successfulMoves + ' 次操作';
    $('undo-button').disabled = !session.canUndo;
    $('result').hidden = state.status !== 'won';
    const last = level === M.levels.at(-1);
    $('result-title').textContent = last ? '都长大啦！' : '长大啦！';
    $('result-copy').textContent = last ? '三关完成，给每只小狗一个家。' : '金毛已经到家，继续认识新伙伴。';
    $('next-button').textContent = last ? '再选一关 ↗' : '下一关 →';
    $('save-note').hidden = !store.failed;
    $('save-note').textContent = '暂时无法保存到设备，仍然可以继续玩。';
    if (announce) message(stateMessage());
  }

  function start(level) {
    invalidate();
    session.start(level);
    view.setLevel(level);
    board.classList.remove('has-dragged');
    render();
  }

  async function commit(move, from) {
    if (transitioning) return;
    const target = session.state.tiles.find(tile => tile.id === move.targetId);
    const targetBox = move.type === 'park' ? view.nestBox() : target && view.tileBox(target);
    const result = session.apply(move);
    if (!result.ok) {
      message('这次没有放好，再试一下。');
      return;
    }
    stopEffects();
    keyboardSource = null;
    transitioning = true;
    const token = ++lifecycle;
    // Persist first, then let the native pointer/touch event finish before
    // removing consumed nodes. Only this frame gates the next input.
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (token !== lifecycle) return;
    render();
    transitioning = false;
    if (!from) {
      const sourceId = E.listMergeMoves(session.state)[0]?.sourceId;
      const next = session.state.status === 'won' ? $('next-button') :
        (sourceId && board.querySelector('[data-tile-id="' + sourceId + '"]')) ||
        board.querySelector('.animal-tile.upper');
      next?.focus({preventScroll: true});
    }
    const event = result.events[0];
    const goal = event.type === 'park' ? null :
      $('goals').children[event.ordinal - 1].getBoundingClientRect();
    const effectToken = effectEpoch;
    animating = true;
    if (event.type !== 'park') audio.play('dog', {priority: 2});
    try {
      await fx.play(event, from, targetBox, goal);
    } catch (_) {
      // A missing motion API cannot roll back a committed action.
    } finally {
      if (effectToken === effectEpoch) animating = false;
    }
    // An old effect finishing must never re-render over a new gesture.
  }

  function undo() {
    if (!session.canUndo) return;
    invalidate();
    session.undo();
    render();
    message('回到刚才，再试另一种配对。');
  }

  function updateSoundLabel() {
    $('sound-button').setAttribute('aria-pressed', String(audio.enabled));
    $('sound-button').querySelector('b').textContent = audio.enabled ? '音效开' : '音效关';
  }

  function openLevels() {
    invalidate();
    render({announce: false});
    const progress = store.progress();
    const descriptions = ['一次靠近，学会长大', '借位、腾空、再接回来', '多配几对，挤住了也有办法'];
    $('level-list').replaceChildren();
    M.levels.forEach((level, index) => {
      const button = document.createElement('button');
      button.className = level.id === session.level.id ? 'active' : '';
      const number = document.createElement('span');
      number.className = 'number';
      number.textContent = '0' + (index + 1);
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      const detail = document.createElement('small');
      title.textContent = level.title;
      detail.textContent = descriptions[index];
      copy.append(title, detail);
      const done = document.createElement('span');
      done.className = 'done';
      done.textContent = progress[level.id] ? '✓' : '→';
      button.append(number, copy, done);
      button.addEventListener('click', () => {
        $('levels-dialog').close();
        start(level);
      });
      $('level-list').append(button);
    });
    $('levels-dialog').showModal();
  }

  $('undo-button').addEventListener('click', undo);
  $('restart-button').addEventListener('click', () => start(session.level));
  $('levels-button').addEventListener('click', openLevels);
  $('close-levels').addEventListener('click', () => $('levels-dialog').close());
  $('next-button').addEventListener('click', () => {
    const next = M.levels[M.levels.indexOf(session.level) + 1];
    if (next) start(next);
    else openLevels();
  });
  $('sound-button').addEventListener('click', () => {
    audio.setEnabled(!audio.enabled);
    if (audio.enabled) void audio.unlock();
    updateSoundLabel();
  });

  board.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      input.cancel();
      keyboardSource = null;
      view.clearTargets();
      return;
    }
    const id = event.target.closest('[data-tile-id]')?.dataset.tileId;
    const nest = event.target.id === 'nest-pad';
    if (!['Enter', ' '].includes(event.key) || (!id && !nest) ||
        transitioning || session.state.status !== 'playing') return;
    event.preventDefault();
    void audio.unlock();
    if (nest) {
      if (keyboardSource && E.canPark(session.state, keyboardSource).ok)
        void commit({type: 'park', sourceId: keyboardSource, revision: session.state.revision});
      return;
    }
    const tile = session.state.tiles.find(item => item.id === id);
    if (tile?.z === 1) {
      stopEffects();
      keyboardSource = id;
      view.clearTargets();
      event.target.classList.add('keyboard-source');
      message('已拿起小狗。Tab 选底牌或临时窝，Enter 放下。');
    } else if (keyboardSource) {
      const check = E.canMerge(session.state, keyboardSource, id);
      if (check.ok) void commit({sourceId: keyboardSource, targetId: id, revision: session.state.revision});
      else {
        view.reject(id, check.blockers);
        message('这里还压着另一只小狗，试试其他落点。');
      }
    }
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !$('levels-dialog').open) {
      event.preventDefault();
      undo();
    }
  });

  function scheduleLayout() {
    if (!session.level) return;
    invalidate();
    transitioning = true;
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = null;
      render({announce: false});
      transitioning = false;
    });
  }
  let observedSize = null;
  new ResizeObserver(entries => {
    const {width, height} = entries[0].contentRect;
    const changed = observedSize && (width !== observedSize.width || height !== observedSize.height);
    observedSize = {width, height};
    if (changed) scheduleLayout();
  }).observe(board);
  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('scroll', () => input.cancel(), {capture: true, passive: true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      invalidate();
      void audio.suspend();
      render({announce: false});
    }
  });
  window.addEventListener('pagehide', () => {
    invalidate();
    void audio.suspend();
  });
  window.addEventListener('pageshow', () => {
    if (session.level) render({announce: false});
  });

  Object.defineProperty(window, 'mergeV03', {value: Object.freeze({
    get state() { return session.snapshot(); },
    get historyLength() { return session.historyLength; },
    get busy() { return transitioning; },
    get animating() { return animating; },
    ruleset: E.RULESET,
  })});
  if (!location.pathname.endsWith('/merge-v03.html')) $('classic-link').hidden = true;
  updateSoundLabel();
  const restored = session.restore();
  view.setLevel(session.level);
  render();
  if (restored?.migrated) message('牌阵更新啦，已保留这局进度。挤住时可以拖到临时窝。');
  else if (restored?.reset) message('借位玩法更新啦，这一关从新的牌阵开始。');
})();
