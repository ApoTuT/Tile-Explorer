/* Composition only: rules and history live in Session, never in visual effects. */
(async function () {
  'use strict';
  const M = globalThis.TileSlideV05, E = M.engine, C = globalThis.TileMergeContent;
  const $ = id => document.getElementById(id), board = $('board');
  let local;
  try { local = localStorage; } catch (_) { local = null; }
  const scope = location.pathname.includes('preview') ? 'preview' : 'production';
  const store = new M.SaveStore(local, M.levels, {scope});
  const session = new M.GameSession({levels: M.levels, store});
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let settings = store.settings(), runToken = 0, transition = true, frame = null, tutorial;
  let requested = null, dialogTrigger = null, pendingLevel = null, lastEvents = [], resolveHandoff = null;
  const reduced = () => media.matches || settings.reducedMotion;
  const dialogs = ['level-dialog', 'help-dialog', 'settings-dialog'].map($);
  const modalOpen = () => dialogs.some(dialog => dialog.open);
  const busy = () => transition || modalOpen() || document.hidden || !session.state;
  const stateForInput = () => session.state && {...session.state, revision: session.revision};
  const message = text => { if (text) $('status').textContent = text; };
  const announce = text => { $('announcement').textContent = text || ''; };
  const view = new M.View({board, goals: $('goals'), isReducedMotion: reduced});
  const fx = M.presentation.createPresentation({board, view, isReducedMotion: reduced});
  const audio = new TileTheater.AudioManager({profiles: {'merge-soft': {audio: './assets/audio/v02/strawberry.wav'}}, settingsKey: store.key('settings')});
  audio.setEnabled(settings.soundEnabled);
  void audio.preload(['merge-soft']);

  function stopEffects() { fx.cancel(); audio.stopAll(); }
  const input = M.input.bindInput({board, view, engine: E, getState: stateForInput, commit,
    isBusy: busy, isReducedMotion: reduced, undo,
    onStart: () => { stopEffects(); view.settle(); void audio.unlock(); tutorial?.onInput({type: 'gesture-start'}); },
    onEnd: () => { if (!busy()) tutorial?.onInput({type: 'gesture-end'}); },
    onReject: result => { message(M.copy.reject ? M.copy.reject(result.reason) : '这边被挡住了，换个方向试试。'); tutorial?.onInput({type: 'rejected'}); }
  });
  tutorial = new M.TutorialController({store, getState: () => session.state, getLevel: () => session.level,
    getStamp: () => ({levelId: session.level?.id, definitionHash: session.state?.definitionHash, revision: session.revision, runToken}),
    show: hint => view.guide(hint, {reducedMotion: reduced()}), clear: () => view.clearGuide(), message,
    findHint: M.solver.findHint, isReducedMotion: reduced});

  function invalidate() {
    runToken++;
    if (frame !== null) cancelAnimationFrame(frame);
    resolveHandoff?.(); resolveHandoff = null;
    frame = null; transition = false; input.cancel(); tutorial.suspend(); stopEffects(); view.cancelFeedback(); view.clearPreview(); view.clearGuide(); view.settle();
  }
  function render({speak = false} = {}) {
    if (!session.state) return;
    const state = session.state, index = M.levels.indexOf(session.level);
    view.render(state, session.level);
    $('level-number').textContent = String(index + 1).padStart(2, '0');
    $('level-title').textContent = session.level.title;
    $('step-count').textContent = String(state.successfulMoves);
    $('undo-button').disabled = !session.canUndo;
    $('win-panel').hidden = state.status !== 'won';
    $('next-button').textContent = index === M.levels.length - 1 ? '再选一关' : '下一关';
    const text = state.status === 'won' ? '收齐啦！空位越来越多，下一关再试试。' : session.level.subtitle;
    message(text);
    if (speak) announce(state.status === 'won' ? '本关目标全部完成。' : '第 ' + (index + 1) + ' 关，' + session.level.title);
    $('save-note').hidden = !store.failed;
    $('save-note').textContent = '本次进度保存在内存中，刷新可能丢失本关进度。';
  }
  function start(level) {
    if (!level) return;
    invalidate(); session.start(level); render({speak: true}); tutorial.start(level);
  }
  async function commit(action, context = {}) {
    if (busy()) return {ok: false, reason: 'busy'};
    const expected = typeof context === 'number' ? context : context.expectedRevision;
    const before = session.snapshot();
    const result = session.apply({type: 'slide', tileId: action.tileId, direction: action.direction}, expected ?? session.revision);
    if (!result.ok) { message(M.copy.reject ? M.copy.reject(result.reason) : '换个方向试试。'); return result; }
    stopEffects(); tutorial.suspend(); lastEvents = result.events;
    transition = true;
    const token = ++runToken;
    await new Promise(resolve => { resolveHandoff = resolve; frame = requestAnimationFrame(() => { frame = null; resolveHandoff = null; resolve(); }); });
    if (token !== runToken) return result;
    render(); transition = false;
    tutorial.resume(); tutorial.onAction(result);
    fx.play(result.events, {before, state: session.state});
    const merge = result.events.find(event => event.type === 'merged-and-delivered');
    if (merge) { audio.play('merge-soft', {priority: 2}); announce(C.items[merge.resultId].name + '已收集。'); }
    if (session.state.status === 'won') {
      announce('本关目标全部完成。');
      if (context.inputMode === 'keyboard') $('next-button').focus({preventScroll: true});
    } else if (context.inputMode === 'keyboard' && !session.state.tiles.some(tile => tile.id === action.tileId)) {
      view.focusTile(session.state.tiles[0]?.id);
    }
    return result;
  }
  function undo() {
    if (!session.canUndo || modalOpen()) return;
    invalidate(); session.undo(); render(); message('回到上一步，再试一个方向。'); tutorial.resume();
  }
  function updateSettings() {
    $('sound-toggle').checked = settings.soundEnabled;
    $('motion-toggle').checked = reduced();
    $('motion-toggle').disabled = media.matches;
    document.documentElement.dataset.reducedMotion = String(reduced());
  }
  function openDialog(dialog, trigger) {
    if (!session.state) return;
    invalidate(); render(); dialogTrigger = trigger; dialog.showModal();
  }
  function openLevels() {
    const progress = store.progress(); $('level-list').replaceChildren();
    for (const [index, level] of M.levels.entries()) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'level-option' + (session.level === level ? ' current' : '');
      const number = document.createElement('span'), text = document.createElement('span'), title = document.createElement('strong'), detail = document.createElement('small'), mark = document.createElement('span');
      number.className = 'level-option-number'; number.textContent = String(index + 1).padStart(2, '0');
      title.textContent = level.title; detail.textContent = level.subtitle; text.append(title, detail);
      mark.className = 'level-option-mark'; mark.textContent = progress[level.id] ? '✓' : '→';
      button.append(number, text, mark);
      button.addEventListener('click', () => { pendingLevel = level; $('level-dialog').close(); });
      $('level-list').append(button);
    }
    openDialog($('level-dialog'), $('level-button'));
  }
  for (const dialog of dialogs) {
    dialog.addEventListener('close', () => {
      invalidate(); render(); dialogTrigger?.focus({preventScroll: true}); dialogTrigger = null;
      if (pendingLevel) { const level = pendingLevel; pendingLevel = null; start(level); return; }
      if (requested) {
        const action = requested; requested = null;
        if (action === 'replay') tutorial.replay(); else void tutorial.requestHint();
      } else if (!modalOpen() && !document.hidden) tutorial.resume();
    });
  }
  for (const button of document.querySelectorAll('[data-close-dialog]')) button.addEventListener('click', () => button.closest('dialog').close());
  $('level-button').addEventListener('click', openLevels);
  $('undo-button').addEventListener('click', undo);
  $('restart-button').addEventListener('click', () => start(session.level));
  $('next-button').addEventListener('click', () => {
    const next = M.levels[M.levels.indexOf(session.level) + 1]; if (next) start(next); else openLevels();
  });
  $('help-button').addEventListener('click', () => openDialog($('help-dialog'), $('help-button')));
  $('settings-button').addEventListener('click', () => openDialog($('settings-dialog'), $('settings-button')));
  $('hint-button').addEventListener('click', () => { requested = 'hint'; $('help-dialog').close(); });
  $('replay-guide-button').addEventListener('click', () => { requested = 'replay'; $('help-dialog').close(); });
  $('sound-toggle').addEventListener('change', () => {
    settings.soundEnabled = $('sound-toggle').checked; audio.setEnabled(settings.soundEnabled);
    if (settings.soundEnabled) void audio.unlock(); store.saveSettings(settings); updateSettings();
  });
  $('motion-toggle').addEventListener('change', () => {
    invalidate(); settings.reducedMotion = $('motion-toggle').checked;
    store.saveSettings(settings); updateSettings(); render(); if (!modalOpen() && !document.hidden) tutorial.resume();
  });
  media.addEventListener('change', () => { invalidate(); updateSettings(); render(); if (!modalOpen()) tutorial.resume(); });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey && !event.repeat && !event.defaultPrevented && !modalOpen() && !board.contains(event.target)) { event.preventDefault(); undo(); }
  });
  window.addEventListener('resize', () => { if (session.state) { invalidate(); render(); if (!modalOpen()) tutorial.resume(); } });
  window.addEventListener('scroll', () => { input.cancel(); view.clearPreview(); }, {capture: true, passive: true});
  document.addEventListener('visibilitychange', () => {
    if (!session.state) return;
    invalidate(); render();
    if (document.hidden) void audio.suspend(); else if (!modalOpen()) tutorial.resume();
  });
  window.addEventListener('pagehide', () => { invalidate(); void audio.suspend(); });
  window.addEventListener('pageshow', () => { if (session.state && !document.hidden) { render(); if (!modalOpen()) tutorial.resume(); } });
  const inspection = Object.freeze({version: '0.5.0', ruleset: E.RULESET, storagePrefix: store.prefix,
    get state() { return session.snapshot(); }, get historyLength() { return session.historyLength; },
    get revision() { return session.revision; }, get busy() { return busy(); },
    get lastEvents() { return E.clone(lastEvents); }, get onboarding() { return E.clone(store.read('onboarding')); },
    get reducedMotion() { return reduced(); }, get storageFailed() { return store.failed; }
  });
  Object.defineProperty(window, 'slideV05', {value: inspection});
  try {
    updateSettings(); const restored = await session.restore();
    transition = false; render({speak: true}); tutorial.start(session.level);
    if (restored?.reset) message('玩法已更新为一滑到底，这一关重新开始。音效设置已保留。');
  } catch (error) {
    message('游戏暂时没有载入，请刷新再试。');
    console.error(error);
  }
})();
