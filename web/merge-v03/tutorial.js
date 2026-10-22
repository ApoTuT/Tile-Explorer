(function (root) {
  'use strict';
  const RULESET = 'merge-v04-1';
  const DEMO_MS = 1200, IDLE_MS = 4200, MAX_ROUNDS = 2, REPEAT_WINDOW_MS = 5000;
  const clone = value => JSON.parse(JSON.stringify(value));
  const copy = typeof module !== 'undefined' ? require('./copy.js') : root.TileMergeV03.copy;
  const words = (key, ...args) => typeof copy.messages[key] === 'function' ?
    copy.messages[key](...args) : copy.messages[key];

  /** Read-only teaching: only a committed rule event can record a learned action. */
  class TutorialController {
    constructor({engine, store, guide, getState, getRunToken, isReducedMotion = () => false,
      message = () => {}}) {
      this.engine = engine;
      this.store = store;
      this.guide = guide;
      this.getState = getState;
      this.getRunToken = getRunToken;
      this.isReducedMotion = isReducedMotion;
      this.message = message;
      const saved = store?.read('onboarding');
      this.record = {ruleset: RULESET, capabilities: {}, inputHints: {}};
      if (saved?.ruleset === RULESET) {
        for (const key of ['mergePair', 'parkTile', 'retrieveTile'])
          if (saved.capabilities?.[key] === true) this.record.capabilities[key] = true;
        for (const key of ['pointer', 'keyboard'])
          if (saved.inputHints?.[key] === true) this.record.inputHints[key] = true;
      }
      this.epoch = 0;
      this.timer = null;
      this.level = null;
      this.rounds = new Map();
      this.suspended = true;
      this.destroyed = false;
      this.gestureActive = false;
      this.rejection = null;
      this.suggestionCache = null;
    }

    get capabilities() { return clone(this.record.capabilities); }

    stamp() {
      const state = this.getState();
      return state && {token: this.getRunToken(), levelId: state.levelId, revision: state.revision};
    }

    sameStamp(a, b) {
      return Boolean(a && b && a.token === b.token && a.levelId === b.levelId && a.revision === b.revision);
    }

    clearPending() {
      this.epoch++;
      if (this.timer !== null) root.clearTimeout(this.timer);
      this.timer = null;
      this.guide?.hide();
    }

    later(delay, fn) {
      const epoch = this.epoch, stamp = this.stamp();
      const timer = root.setTimeout(() => {
        if (this.timer === timer) this.timer = null;
        if (this.destroyed || this.suspended || this.gestureActive || this.epoch !== epoch ||
            !this.sameStamp(stamp, this.stamp())) return;
        fn();
      }, delay);
      this.timer = timer;
    }

    start(level, {restored = false} = {}) {
      this.clearPending();
      if (this.destroyed) return;
      this.level = level;
      this.rounds.clear();
      this.suggestionCache = null;
      this.rejection = null;
      this.gestureActive = false;
      this.suspended = false;
      this.refresh({reason: restored ? 'restored' : 'start'});
    }

    teachingStage(state) {
      if (!this.level || state.status !== 'playing') return null;
      const id = this.level.tutorialId || this.level.id;
      const learned = this.record.capabilities;
      const first = id === 'learn-merge' || id === 'merge-01';
      const second = id === 'learn-parking' || id === 'merge-02';
      if (first) return learned.mergePair ? null : state.parkingId ? 'retrieveTile' : 'mergePair';
      if (!second || (learned.parkTile && learned.retrieveTile)) return null;
      if (!state.parkingId) return 'parkTile';
      return this.engine.listMergeMoves(state).some(move => move.sourceId === state.parkingId) ?
        'retrieveTile' : 'mergeAfterParking';
    }

    /** Prefer a useful merge; never present an unverified route as a correct answer. */
    suggestion() {
      const stamp = this.stamp(), state = this.getState();
      if (!state || state.status !== 'playing') return null;
      if (this.suggestionCache && this.sameStamp(stamp, this.suggestionCache.stamp))
        return this.suggestionCache.move && clone(this.suggestionCache.move);
      const rank = move => move.type === 'park' ? 2 : move.sourceId === state.parkingId ? 0 : 1;
      const candidates = this.engine.listLegalMoves(state).slice().sort((a, b) => rank(a) - rank(b));
      let selected = null;
      for (const move of candidates) {
        const result = this.engine.applyMove(state, move);
        if (!result.ok) continue;
        const check = result.state.status === 'won' ? {status: 'solved'} :
          this.engine.solve(result.state, {maxStates: 2500});
        if (check.status === 'solved') { selected = move; break; }
      }
      this.suggestionCache = {stamp, move: selected && clone(selected)};
      return selected && clone(selected);
    }

    textFor(move, state) {
      const source = state.tiles.find(tile => tile.id === move.sourceId);
      const name = root.TileMergeV03?.content?.getItemForTile(source)?.name || '';
      if (move.type === 'park') return words('tutorialPark', name);
      if (move.sourceId === state.parkingId) return words('tutorialRetrieve', name);
      return words('tutorialMerge', name);
    }

    show(move, {automatic = false, stage = null} = {}) {
      if (!move || this.destroyed || this.suspended || this.gestureActive) return false;
      const state = this.getState();
      if (state?.status !== 'playing' || !this.engine.applyMove(state, move).ok) return false;
      if (automatic) {
        const count = this.rounds.get(stage) || 0;
        if (count >= MAX_ROUNDS) return false;
        this.rounds.set(stage, count + 1);
      }
      const text = this.textFor(move, state);
      this.message(text);
      this.guide?.show({move, state, text, reducedMotion: this.isReducedMotion()});
      this.later(DEMO_MS, () => {
        this.guide?.hide();
        if (automatic) this.schedule(IDLE_MS);
      });
      return true;
    }

    schedule(delay) {
      const state = this.getState(), stage = state && this.teachingStage(state);
      if (!stage || this.suspended || this.gestureActive || (this.rounds.get(stage) || 0) >= MAX_ROUNDS) return;
      this.later(delay, () => this.show(this.suggestion(), {automatic: true, stage}));
    }

    refresh({reason = 'refresh'} = {}) {
      this.clearPending();
      if (this.destroyed || !this.level) return;
      this.suspended = false;
      this.gestureActive = false;
      this.schedule(reason === 'start' ? 550 : reason === 'committed' ? 1500 : IDLE_MS);
    }

    persist() { this.store?.write('onboarding', clone(this.record)); }

    onCommitted({before, move, result}) {
      this.clearPending();
      this.gestureActive = false;
      this.rejection = null;
      this.suggestionCache = null;
      if (this.destroyed || !result?.ok || !before || !move) return;
      let changed = false;
      const learned = this.record.capabilities;
      for (const event of result.events || []) {
        if (event.type === 'park' && move.type === 'park' && event.sourceId === move.sourceId && !learned.parkTile) {
          learned.parkTile = true; changed = true;
        }
        if (event.type === 'merge-deliver' && event.sourceId === move.sourceId && event.targetId === move.targetId) {
          if (!learned.mergePair) { learned.mergePair = true; changed = true; }
          if (before.parkingId === event.sourceId && !learned.retrieveTile) {
            learned.retrieveTile = true; changed = true;
          }
        }
      }
      if (changed) this.persist();
      this.refresh({reason: 'committed'});
    }

    onInput(event) {
      if (this.destroyed || !this.level || !event) return;
      if (event.type === 'gesture-start' || event.type === 'drag-start') {
        this.clearPending();
        this.gestureActive = true;
        return;
      }
      this.clearPending();
      this.gestureActive = false;
      if (event.type === 'tap-without-drag') {
        const mode = event.inputMode === 'keyboard' ? 'keyboard' : 'pointer';
        if (!this.record.inputHints[mode]) {
          this.record.inputHints[mode] = true;
          this.persist();
          this.message(words(mode === 'keyboard' ? 'tutorialKeyboard' : 'tap'));
        }
      } else if (event.type === 'drop-rejected') {
        const reason = event.reason || 'invalid', now = Date.now();
        const similar = this.rejection && this.rejection.reason === reason && now - this.rejection.at <= REPEAT_WINDOW_MS;
        this.rejection = {reason, at: now};
        if (similar) {
          this.rejection = null;
          // Let the real rejection/return feedback finish before revealing a suggestion.
          this.later(350, () => this.help());
          return;
        }
      }
      this.schedule(IDLE_MS);
    }

    help() {
      this.clearPending();
      if (this.destroyed || !this.level || this.gestureActive) return false;
      this.suspended = false;
      const move = this.suggestion();
      if (!move) {
        this.message(words(this.getState()?.status === 'won' ? 'won' : 'help'));
        return false;
      }
      return this.show(move);
    }

    cancel() {
      this.clearPending();
      this.gestureActive = false;
      this.suspended = true;
      this.rejection = null;
    }

    destroy() {
      this.cancel();
      this.destroyed = true;
      this.guide?.destroy();
      this.level = null;
      this.suggestionCache = null;
    }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {TutorialController});
  if (typeof module !== 'undefined') module.exports = TutorialController;
})(globalThis);
