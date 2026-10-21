/* Owns stable game state and history; never knows about DOM or animation. */
(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileMergeV03.engine;

  class GameSession {
    constructor({levels, store}) {
      this.levels = levels;
      this.store = store;
      this.level = null;
      this._state = null;
      this._history = [];
    }

    get state() { return this._state; }
    get historyLength() { return this._history.length; }
    get canUndo() { return this._history.length > 0; }
    snapshot() { return E.clone(this._state); }

    restore() {
      const restored = this.store.loadSession();
      this.start(restored?.level || this.levels[0], restored);
      return restored;
    }

    start(level, restored = null) {
      if (!this.levels.includes(level)) throw new Error('Unknown level');
      this.level = level;
      this._state = restored?.state || E.createState(level);
      this._history = [...(restored?.transactions || [])];
      this.save();
      return this._state;
    }

    apply(move) {
      const result = E.applyMove(this._state, move);
      if (!result.ok) return result;
      this._state = result.state;
      this._history.push(result.transaction);
      this.save();
      return result;
    }

    undo() {
      if (!this.canUndo) return false;
      const transaction = this._history.at(-1);
      this._state = E.undo(this._state, transaction);
      this._history.pop();
      this.save();
      return true;
    }

    restart() { return this.start(this.level); }

    save() {
      this.store.saveSession(this.level, this._history);
      if (this._state.status === 'won') this.store.complete(this.level);
    }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {GameSession});
  if (typeof module !== 'undefined') module.exports = GameSession;
})(globalThis);
