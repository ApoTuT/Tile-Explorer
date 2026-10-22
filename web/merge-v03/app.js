/* Composition only: Session owns facts; guidance and effects never submit them. */
(function () {
  'use strict';
  const M = globalThis.TileMergeV03, E = M.engine, C = M.content;
  const L = M.copy.labels, T = M.copy.messages;
  const $ = id => document.getElementById(id), board = $('merge-board');
  let storage;
  try { storage = localStorage; } catch (_) { storage = null; }
  const scope = location.pathname.includes('preview') ? 'preview' : 'production';
  const store = new M.SaveStore(storage, M.levels, {scope});
  const session = new M.GameSession({levels: M.levels, store});
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduce = store.read('settings')?.reduceMotion === true;
  const isReducedMotion = () => media.matches || userReduce;
  const view = new M.View(board, $('goals'), {isReducedMotion});
  const fx = new M.Presentation({isReducedMotion});
  const audio = new TileTheater.AudioManager({
    profiles: {'merge-soft': {audio: './assets/audio/v02/strawberry.wav'}},
    settingsKey: store.key('settings')
  });
  void audio.preload(['merge-soft']);
  let transitioning = false, animating = false, keyboardSource = null;
  let lifecycle = 0, effectEpoch = 0, layoutFrame = null, tutorial = null;
  let suppressInputEvents = false, lastEvents = [], modalTrigger = null, requestedHint = false;
  const dialogs = ['levels-dialog', 'help-dialog', 'settings-dialog'].map($);
  const modalOpen = () => dialogs.some(dialog => dialog.open);
  const busy = () => transitioning || modalOpen() || document.hidden;
  const message = text => { if (text && $('message').textContent !== text) $('message').textContent = text; };
  const sum = values => Object.values(values).reduce((a, b) => a + b, 0);

  function stopEffects() {
    effectEpoch++; animating = false; fx.cancel(); audio.stopAll();
  }
  const input = M.input.bindInput({
    board, view, getState: () => session.state, commit, message,
    unlock: () => { void audio.unlock(); }, isBusy: busy, isReducedMotion,
    onGestureStart: () => { stopEffects(); keyboardSource = null; },
    onEvent: event => { if (!suppressInputEvents) tutorial?.onInput(event); }
  });
  const guide = new M.GuideView({board, view, isReducedMotion});
  tutorial = new M.TutorialController({engine: E, store, guide,
    getState: () => session.state, getRunToken: () => lifecycle, isReducedMotion, message});

  function invalidate() {
    lifecycle++; transitioning = false; keyboardSource = null;
    if (layoutFrame !== null) cancelAnimationFrame(layoutFrame);
    layoutFrame = null; tutorial.cancel(); suppressInputEvents = true;
    input.cancel(); suppressInputEvents = false; stopEffects(); view.clearTargets();
  }
  function stateMessage() {
    const state = session.state;
    if (state.status === 'won') return T.won;
    if (!E.listMergeMoves(state).length) return T.stuck;
    return state.parkingId ? T.help : session.level.subtitle;
  }
  function render({announce = true} = {}) {
    const state = session.state, level = session.level;
    view.render(state);
    $('level-label').textContent = L.level(M.levels.indexOf(level) + 1);
    $('level-title').textContent = level.title;
    $('goal-count').textContent = sum(state.delivered) + ' / ' + sum(state.goals);
    $('move-count').textContent = L.moves(state.successfulMoves);
    $('undo-button').disabled = !session.canUndo;
    $('result').hidden = state.status !== 'won';
    const last = level === M.levels.at(-1);
    $('result-title').textContent = last ? L.allComplete : L.complete;
    $('result-copy').textContent = last ? T.allWon : T.won;
    $('next-button').textContent = last ? L.levels : L.next;
    $('save-note').hidden = !store.failed;
    $('save-note').textContent = T.saveFailed;
    if (announce) message(stateMessage());
  }
  function start(level) {
    invalidate(); session.start(level); view.setLevel(level);
    board.classList.remove('has-dragged'); render(); tutorial.start(level);
  }
  async function commit(move, from) {
    if (busy()) return;
    const before = session.snapshot();
    const boxes = new Map(before.tiles.map(tile => [tile.id, view.tileBox(tile)]));
    const parkingBox = view.parkingBox(), result = session.apply(move);
    if (!result.ok) { message(M.copy.reject(result.reason)); return; }
    lastEvents = result.events; stopEffects(); keyboardSource = null;
    transitioning = true;
    const token = ++lifecycle; tutorial.cancel();
    // Native touchend completes before consumed DOM nodes disappear.
    await new Promise(resolve => requestAnimationFrame(resolve));
    if (token !== lifecycle) return;
    render(); transitioning = false;
    tutorial.onCommitted({before, move, result});
    if (!from) {
      const sourceId = E.listMergeMoves(session.state)[0]?.sourceId;
      const next = session.state.status === 'won' ? $('next-button') :
        (sourceId && view.tiles.get(sourceId)) || board.querySelector('.merge-tile.upper');
      next?.focus({preventScroll: true});
    }
    const effectToken = effectEpoch; animating = true;
    if (result.events.some(event => event.type === 'merge-deliver')) audio.play('merge-soft', {priority: 2});
    try {
      await Promise.all(result.events.map(event => fx.play(event,
        event.sourceId === move.sourceId ? from : boxes.get(event.sourceId),
        event.type === 'park' ? parkingBox : boxes.get(event.targetId),
        event.type === 'park' ? null : view.goalBox(event.resultId))));
    } catch (_) { /* Missing visual APIs cannot undo already saved facts. */ }
    finally { if (effectToken === effectEpoch) animating = false; }
  }
  function undo() {
    if (!session.canUndo || modalOpen()) return;
    invalidate(); session.undo(); render(); message(T.undo); tutorial.refresh({reason: 'undo'});
  }
  function saveSettings() {
    store.write('settings', {...store.read('settings'), soundEnabled: audio.enabled, reduceMotion: userReduce});
  }
  function updateSettings() {
    $('sound-button').setAttribute('aria-pressed', String(audio.enabled));
    $('sound-button').querySelector('b').textContent = audio.enabled ? L.soundOn : L.soundOff;
    $('reduce-motion').checked = userReduce || media.matches;
    $('reduce-motion').disabled = media.matches;
    document.documentElement.dataset.reducedMotion = String(isReducedMotion());
  }
  function openDialog(dialog, trigger) {
    invalidate(); render({announce: false}); modalTrigger = trigger; dialog.showModal();
  }
  for (const dialog of dialogs) dialog.addEventListener('close', () => {
    invalidate(); render({announce: false}); modalTrigger?.focus({preventScroll: true}); modalTrigger = null;
    if (requestedHint) { requestedHint = false; if (session.state.status === 'playing') tutorial.help(); }
    else if (session.state.status === 'playing' && !modalOpen()) tutorial.refresh({reason: 'dialog-close'});
  });
  function openLevels() {
    const progress = store.progress(); $('level-list').replaceChildren();
    M.levels.forEach((level, index) => {
      const button = document.createElement('button');
      button.className = level.id === session.level.id ? 'active' : '';
      const number = document.createElement('span'); number.className = 'number'; number.textContent = '0' + (index + 1);
      const text = document.createElement('span'), title = document.createElement('strong'), detail = document.createElement('small');
      title.textContent = level.title; detail.textContent = level.subtitle; text.append(title, detail);
      const done = document.createElement('span'); done.className = 'done'; done.textContent = progress[level.id] ? '✓' : '→';
      button.append(number, text, done);
      button.addEventListener('click', () => {
        // close fires later; defer starting so it cannot invalidate the new tutorial.
        $('levels-dialog').addEventListener('close', () => start(level), {once: true});
        $('levels-dialog').close();
      });
      $('level-list').append(button);
    });
    openDialog($('levels-dialog'), $('levels-button'));
  }
  $('undo-button').addEventListener('click', undo);
  $('restart-button').addEventListener('click', () => start(session.level));
  $('levels-button').addEventListener('click', openLevels);
  $('close-levels').addEventListener('click', () => $('levels-dialog').close());
  $('next-button').addEventListener('click', () => {
    const next = M.levels[M.levels.indexOf(session.level) + 1]; if (next) start(next); else openLevels();
  });
  $('help-button').addEventListener('click', () => openDialog($('help-dialog'), $('help-button')));
  $('close-help').addEventListener('click', () => $('help-dialog').close());
  for (const id of ['hint-button', 'replay-guide-button']) $(id).addEventListener('click', () => {
    requestedHint = true; $('help-dialog').close();
  });
  $('settings-button').addEventListener('click', () => openDialog($('settings-dialog'), $('settings-button')));
  $('close-settings').addEventListener('click', () => $('settings-dialog').close());
  $('sound-button').addEventListener('click', () => {
    audio.setEnabled(!audio.enabled); if (audio.enabled) void audio.unlock(); saveSettings(); updateSettings();
  });
  $('reduce-motion').addEventListener('change', () => {
    userReduce = $('reduce-motion').checked; invalidate(); saveSettings(); updateSettings(); render({announce: false});
  });
  media.addEventListener('change', () => { invalidate(); updateSettings(); render({announce: false}); });

  board.addEventListener('keydown', event => {
    if (modalOpen()) return;
    if (event.key === 'Escape') { invalidate(); message(T.cancelled); return; }
    const id = event.target.closest('[data-tile-id]')?.dataset.tileId, parking = event.target.id === 'parking-pad';
    if (!['Enter', ' '].includes(event.key) || (!id && !parking) || busy() || session.state.status !== 'playing') return;
    event.preventDefault(); void audio.unlock(); input.cancel();
    if (parking) {
      if (!keyboardSource) { message(T.help); return; }
      const check = E.canPark(session.state, keyboardSource);
      if (check.ok) void commit({type: 'park', sourceId: keyboardSource, revision: session.state.revision});
      else { message(M.copy.reject(check.reason)); view.reject('__parking__'); }
      return;
    }
    const tile = session.state.tiles.find(item => item.id === id);
    if (tile?.z === 1) {
      stopEffects(); keyboardSource = id; view.clearTargets();
      tutorial.onInput({type: 'gesture-start', sourceId: id, inputMode: 'keyboard'});
      event.target.classList.add('keyboard-source'); message(T.selected(C.getItemForTile(tile).name));
    } else if (keyboardSource) {
      const check = E.canMerge(session.state, keyboardSource, id);
      if (check.ok) void commit({sourceId: keyboardSource, targetId: id, revision: session.state.revision});
      else {
        view.reject(id, check.blockers); message(M.copy.reject(check.reason));
        tutorial.onInput({type: 'drop-rejected', sourceId: keyboardSource, targetId: id, reason: check.reason, inputMode: 'keyboard'});
      }
    } else message(T.help);
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !modalOpen()) { event.preventDefault(); undo(); }
  });
  function scheduleLayout() {
    if (!session.level) return;
    invalidate(); transitioning = true;
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = null; render({announce: false}); transitioning = false;
      if (!document.hidden && !modalOpen()) tutorial.refresh({reason: 'layout'});
    });
  }
  let observedSize = null;
  new ResizeObserver(entries => {
    const {width, height} = entries[0].contentRect;
    const changed = observedSize && (width !== observedSize.width || height !== observedSize.height);
    observedSize = {width, height}; if (changed) scheduleLayout();
  }).observe(board);
  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('scroll', () => { input.cancel(); tutorial.cancel(); }, {capture: true, passive: true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { invalidate(); void audio.suspend(); render({announce: false}); }
    else if (session.level && !modalOpen()) { render({announce: false}); tutorial.refresh({reason: 'visible'}); }
  });
  window.addEventListener('pagehide', () => { invalidate(); void audio.suspend(); });
  window.addEventListener('pageshow', () => { if (session.level) render({announce: false}); });
  const inspection = Object.freeze({
    get state() { return session.snapshot(); }, get historyLength() { return session.historyLength; },
    get busy() { return transitioning; }, get animating() { return animating; },
    get onboarding() { return E.clone(store.read('onboarding')); }, get lastEvents() { return E.clone(lastEvents); },
    get reducedMotion() { return isReducedMotion(); }, version: C.version, ruleset: E.RULESET, storagePrefix: store.prefix
  });
  Object.defineProperty(window, 'mergeV04', {value: inspection});
  Object.defineProperty(window, 'mergeV03', {value: inspection});
  if (!location.pathname.endsWith('/merge-v03.html')) $('classic-link').hidden = true;
  updateSettings(); const restored = session.restore(); view.setLevel(session.level); render();
  tutorial.start(session.level, {restored: Boolean(restored)});
  if (restored?.reset) message(T.restored);
})();
