/* Read-only, cancellable suggestions. Only committed rule events teach an ability. */
(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileSlideV05.engine;
  const clone = value => JSON.parse(JSON.stringify(value));
  const DEFAULT_TIMINGS = Object.freeze({initialMs: 600, idleMs: 4200, demoMs: 1200, actionMs: 1500, maxRounds: 2});

  class TutorialController {
    constructor({store, getState, getLevel, getStamp, show = () => {}, clear = () => {},
      message = () => {}, findHint, isReducedMotion = () => false, timings = {}}) {
      this.store = store;
      this.getState = getState;
      this.getLevel = getLevel || (() => this.level);
      this.getStamp = getStamp || (() => {
        const state = this.getState();
        return state && {levelId: state.levelId, definitionHash: state.definitionHash, revision: state.revision};
      });
      this.showGuide = show;
      this.clearGuide = clear;
      this.message = message;
      this.findHint = findHint;
      this.isReducedMotion = isReducedMotion;
      this.timings = {...DEFAULT_TIMINGS, ...timings};
      this.record = {ruleset: E.RULESET, capabilities: {}};
      const saved = store?.read('onboarding');
      if (saved?.ruleset === E.RULESET)
        for (const key of ['slideEmpty', 'slideToEnd', 'mergePair', 'makeRoom'])
          if (saved.capabilities?.[key] === true) this.record.capabilities[key] = true;
      this.level = null;
      this.epoch = 0;
      this.timer = null;
      this.pending = null;
      this.rounds = new Map();
      this.suspended = true;
      this.gestureActive = false;
      this.destroyed = false;
      this.roomMoved = false;
      this.rejections = 0;
    }
    get capabilities() { return clone(this.record.capabilities); }
    stamp() { const value = this.getStamp(); return value == null ? null : JSON.stringify(value); }
    valid(epoch, stamp) {
      return !this.destroyed && !this.suspended && !this.gestureActive &&
        epoch === this.epoch && stamp !== null && stamp === this.stamp() && this.getState()?.status === 'playing';
    }
    clearPending() {
      this.epoch++;
      if (this.timer !== null) root.clearTimeout(this.timer);
      this.timer = null;
      this.pending?.abort();
      this.pending = null;
      this.clearGuide();
    }
    later(delay, callback) {
      const epoch = this.epoch, stamp = this.stamp();
      const timer = root.setTimeout(() => {
        if (this.timer === timer) this.timer = null;
        if (this.valid(epoch, stamp)) callback();
      }, delay);
      this.timer = timer;
    }
    stage() {
      if (this.getState()?.status !== 'playing') return null;
      const level = this.getLevel() || this.level;
      const id = level?.tutorialId || level?.id;
      if (id === 'slide-01' || id === 'learn-slide') {
        return this.record.capabilities.mergePair ? null : 'mergePair';
      }
      if (id === 'slide-02' || id === 'make-room') return this.record.capabilities.makeRoom ? null : 'makeRoom';
      return null;
    }
    start(level) {
      this.clearPending();
      if (this.destroyed) return;
      this.level = level;
      this.roomMoved = false;
      this.rejections = 0;
      this.rounds.clear();
      this.suspended = false;
      this.gestureActive = false;
      this.schedule(this.timings.initialMs);
    }
    schedule(delay = this.timings.idleMs) {
      const stage = this.stage();
      if (!stage || this.destroyed || this.suspended || this.gestureActive ||
          (this.rounds.get(stage) || 0) >= this.timings.maxRounds) return;
      this.later(delay, () => { void this.suggest({automatic: true, stage}); });
    }
    textFor(kind, stage) {
      if (kind === 'merge') return '朝同类划一下，一路滑过去合成。';
      if (stage === 'makeRoom') return '挪一挪，给它让路。';
      return '在方块上划一下，滑到边缘或障碍前才停。';
    }
    async suggest({automatic = false, stage = this.stage()} = {}) {
      if (this.destroyed || this.suspended || this.gestureActive || this.getState()?.status !== 'playing' ||
          typeof this.findHint !== 'function') return false;
      const epoch = this.epoch, stamp = this.stamp();
      if (!this.valid(epoch, stamp)) return false;
      const controller = typeof root.AbortController === 'function' ? new root.AbortController() : {abort() {}, signal: undefined};
      this.pending?.abort();
      this.pending = controller;
      let hint;
      try {
        hint = await this.findHint(E.clone(this.getState()), {signal: controller.signal,
          isCancelled: () => !this.valid(epoch, stamp), maxMs: 1000, sliceMs: 4});
      } catch (_) {
        if (this.valid(epoch, stamp) && !automatic) this.message('暂时没找到提示，再试着挪一挪。');
        return false;
      } finally {
        if (this.pending === controller) this.pending = null;
      }
      if (!this.valid(epoch, stamp)) return false;
      if (hint?.status !== 'solved' || !hint.action) {
        if (!automatic && hint?.status !== 'cancelled') this.message('暂时没找到提示，再试着挪一挪。');
        return false;
      }
      const action = hint.action;
      const inspection = E.inspectAction(this.getState(), action);
      if (!inspection.ok) return false;
      if (automatic) {
        const count = this.rounds.get(stage) || 0;
        if (count >= this.timings.maxRounds) return false;
        this.rounds.set(stage, count + 1);
      }
      const text = this.textFor(inspection.kind, stage);
      this.message(text);
      this.showGuide({tileId: action.tileId, direction: action.direction, kind: inspection.kind,
        action: clone(action), text, reducedMotion: this.isReducedMotion()});
      this.later(this.timings.demoMs, () => {
        this.clearGuide();
        if (automatic) this.schedule(this.timings.idleMs);
      });
      return true;
    }
    onAction(value) {
      this.clearPending();
      this.gestureActive = false;
      this.rejections = 0;
      const result = value?.result || value;
      if (this.destroyed || !result?.ok) { this.schedule(); return; }
      let changed = false;
      const level = this.getLevel() || this.level;
      const second = level?.id === 'slide-02' || level?.tutorialId === 'make-room';
      for (const event of result.events || []) {
        if (['tile-moved', 'merged-and-delivered'].includes(event.type) && !this.record.capabilities.slideToEnd) {
          this.record.capabilities.slideToEnd = true; changed = true;
        }
        if (event.type === 'tile-moved') {
          if (!this.record.capabilities.slideEmpty) { this.record.capabilities.slideEmpty = true; changed = true; }
          if (second) this.roomMoved = true;
        }
        if (event.type === 'merged-and-delivered') {
          if (!this.record.capabilities.mergePair) { this.record.capabilities.mergePair = true; changed = true; }
          if (second && this.roomMoved && !this.record.capabilities.makeRoom) {
            this.record.capabilities.makeRoom = true; changed = true;
          }
        }
      }
      if (changed) this.store?.write('onboarding', clone(this.record));
      this.schedule(this.timings.actionMs);
    }
    onInput(event = {}) {
      this.clearPending();
      if (this.destroyed) return;
      this.gestureActive = event.type === 'gesture-start';
      if (this.gestureActive) return;
      if (event.type === 'rejected') {
        this.rejections++;
        if (this.rejections === 2) this.message('换个方向，或把挡路的方块挪开试试。');
      }
      this.schedule();
    }
    requestHint() {
      this.clearPending();
      if (this.destroyed || this.gestureActive) return Promise.resolve(false);
      this.suspended = false;
      return this.suggest();
    }
    replay() { return this.requestHint(); }
    suspend() {
      this.clearPending();
      this.suspended = true;
      this.gestureActive = false;
    }
    resume() {
      this.clearPending();
      if (this.destroyed) return;
      this.suspended = false;
      this.gestureActive = false;
      this.schedule();
    }
    destroy() {
      this.suspend();
      this.destroyed = true;
      this.level = null;
    }
  }
  TutorialController.DEFAULT_TIMINGS = DEFAULT_TIMINGS;
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {TutorialController});
  if (typeof module !== 'undefined') module.exports = TutorialController;
})(globalThis);
