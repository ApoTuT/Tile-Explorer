/* Stable state and undo ownership. Rendering never commits a rule action. */
(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileSlideV05.engine;

  class GameSession {
    constructor({levels, store}) {
      if (!Array.isArray(levels) || !levels.length) throw new Error('Levels required');
      this.levels = levels;
      this.store = store;
      this.level = null;
      this._state = null;
      this._history = [];
      this._revision = 0;
      this._lifecycle = 0;
    }
    get state() { return this._state; }
    get revision() { return this._revision; }
    get historyLength() { return this._history.length; }
    get canUndo() { return this._history.length > 0; }
    snapshot() { return this._state ? E.clone(this._state) : null; }

    async restore() {
      const lifecycle = this._lifecycle;
      const restored = this.store ? await this.store.loadSession() : null;
      if (lifecycle !== this._lifecycle) return {cancelled: true};
      this.start(restored?.level || this.levels[0], restored);
      return restored;
    }

    start(level, restored = null) {
      if (!this.levels.includes(level)) throw new Error('Unknown level');
      this._lifecycle++;
      this._revision++;
      this.level = level;
      this._state = restored?.state ? E.clone(restored.state) : E.createState(level);
      this._history = restored?.transactions ? restored.transactions.slice() : [];
      this.save();
      return this._state;
    }

    apply(action, expectedRevision = this._revision) {
      if (!this._state) return {ok: false, reason: 'not-started', state: this._state};
      if (expectedRevision !== this._revision) return {ok: false, reason: 'stale', state: this._state};
      const command = action && {type: action.type, tileId: action.tileId, direction: action.direction};
      const result = E.applyAction(this._state, command);
      if (!result.ok) return result;
      this._state = result.state;
      this._history.push(result.transaction);
      this._revision++;
      this.save();
      return result;
    }

    undo() {
      if (!this.canUndo) return false;
      this._state = E.clone(this._history.pop().before);
      this._revision++;
      this.save();
      return true;
    }

    restart() { return this.start(this.level || this.levels[0]); }

    save() {
      if (!this._state || !this.store) return;
      this.store.saveSession(this.level, this._history);
      if (this._state.status === 'won') this.store.complete(this.level);
    }
  }
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {GameSession});
  if (typeof module !== 'undefined') module.exports = GameSession;
})(globalThis);
