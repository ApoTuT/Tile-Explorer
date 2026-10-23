/* Versioned action logs are replayed by the real kernel, including cyclic moves. */
(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileSlideV05.engine;
  const PREFIX = 'tile-explorer.slide.v05.';
  const MAX_ACTIONS = 50000, MAX_BYTES = 2 * 1024 * 1024, REPLAY_BATCH = 100;
  const record = value => Boolean(value && typeof value === 'object' && !Array.isArray(value));
  const bytes = value => typeof TextEncoder === 'function' ? new TextEncoder().encode(value).length : value.length * 2;
  const yieldTask = () => new Promise(resolve => root.setTimeout(resolve, 0));
  const settingsOf = value => {
    const valid = {};
    if (!record(value)) return valid;
    for (const key of ['soundEnabled', 'reducedMotion'])
      if (typeof value[key] === 'boolean') valid[key] = value[key];
    return valid;
  };

  class SaveStore {
    constructor(storage, levels, {scope = 'production'} = {}) {
      if (!['production', 'preview'].includes(scope)) throw new Error('Unknown save scope');
      this.storage = storage;
      this.levels = levels;
      this.scope = scope;
      this.prefix = PREFIX + (scope === 'preview' ? 'preview.' : '');
      this.failed = false;
      this.failureReason = null;
      this.memory = Object.create(null);
      this.unsaved = new Set();
      this.invalid = new Set();
      this.migrateSettings();
    }
    key(name) { return this.prefix + name + '.v1'; }
    read(name) {
      if (this.unsaved.has(name)) return E.clone(this.memory[name]);
      let raw;
      try { raw = this.storage?.getItem(this.key(name)); }
      catch (_) {
        this.failed = true;
        this.failureReason = 'unavailable';
        return Object.hasOwn(this.memory, name) ? E.clone(this.memory[name]) : null;
      }
      if (raw == null) return null;
      if (typeof raw !== 'string' || raw.length > MAX_BYTES || bytes(raw) > MAX_BYTES) {
        this.invalid.add(name);
        return null;
      }
      try {
        const parsed = JSON.parse(raw);
        if (name === 'session' && !record(parsed)) this.invalid.add(name);
        return parsed;
      }
      catch (_) { this.invalid.add(name); return null; }
    }
    write(name, value) {
      this.memory[name] = E.clone(value);
      this.invalid.delete(name);
      let serialized;
      try {
        serialized = JSON.stringify(value);
        if (serialized.length > MAX_BYTES || bytes(serialized) > MAX_BYTES ||
            (name === 'session' && value.actions.length > MAX_ACTIONS)) {
          this.failed = true;
          this.failureReason = 'limit';
          this.unsaved.add(name);
          return false;
        }
        if (!this.storage) throw new Error('Storage unavailable');
        this.storage.setItem(this.key(name), serialized);
        this.unsaved.delete(name);
        return true;
      } catch (_) {
        this.failed = true;
        this.failureReason = 'unavailable';
        this.unsaved.add(name);
        return false;
      }
    }
    migrateSettings() {
      const current = settingsOf(this.read('settings'));
      if (Object.keys(current).length === 2) return;
      let previous;
      try {
        const key = 'tile-explorer.merge.v04.' + (this.scope === 'preview' ? 'preview.' : '') + 'settings.v1';
        const raw = this.storage?.getItem(key);
        if (typeof raw === 'string' && raw.length <= 2048) previous = JSON.parse(raw);
      } catch (_) { return; }
      const inherited = settingsOf(previous);
      if (typeof previous?.reduceMotion === 'boolean') inherited.reducedMotion = previous.reduceMotion;
      const merged = {...inherited, ...current};
      if (Object.keys(merged).length > Object.keys(current).length) this.write('settings', merged);
    }
    settings() { return {soundEnabled: true, reducedMotion: false, ...settingsOf(this.read('settings'))}; }
    saveSettings(value) { return this.write('settings', settingsOf(value)); }
    saveSession(level, transactions) {
      return this.write('session', {schemaVersion: 1, ruleset: E.RULESET, levelId: level.id,
        definitionHash: E.definitionHash(level), actions: transactions.map(transaction => E.clone(transaction.action))});
    }
    async loadSession({isCancelled = () => false} = {}) {
      const saved = this.read('session');
      const first = this.levels[0];
      const level = record(saved) ? this.levels.find(candidate => candidate.id === saved.levelId) : null;
      const reset = candidate => ({level: candidate || first, state: E.createState(candidate || first), transactions: [], reset: true});
      if (!record(saved)) return this.invalid.has('session') ? reset(first) : null;
      if (!level) return reset(first);
      try {
        if (saved.schemaVersion !== 1 || saved.ruleset !== E.RULESET ||
            saved.definitionHash !== E.definitionHash(level) || !Array.isArray(saved.actions) ||
            saved.actions.length > MAX_ACTIONS) throw new Error('Incompatible action log');
        let state = E.createState(level);
        const transactions = [];
        for (let index = 0; index < saved.actions.length; index++) {
          if (isCancelled()) return null;
          const action = saved.actions[index];
          if (!record(action) || action.type !== 'slide' || typeof action.tileId !== 'string' ||
              !['up', 'down', 'left', 'right'].includes(action.direction)) throw new Error('Invalid action');
          const result = E.applyAction(state, {type: 'slide', tileId: action.tileId, direction: action.direction});
          if (!result.ok) throw new Error('Illegal action log');
          state = result.state;
          transactions.push(result.transaction);
          if ((index + 1) % REPLAY_BATCH === 0) await yieldTask();
        }
        return {level, state, transactions};
      } catch (_) { return reset(level); }
    }
    progress() {
      const raw = this.read('progress'), valid = {};
      for (const level of this.levels)
        if (record(raw) && raw[level.id] === E.definitionHash(level)) valid[level.id] = raw[level.id];
      return valid;
    }
    complete(level) {
      const progress = this.progress();
      progress[level.id] = E.definitionHash(level);
      return this.write('progress', progress);
    }
  }
  SaveStore.LIMITS = Object.freeze({MAX_ACTIONS, MAX_BYTES, REPLAY_BATCH});
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {SaveStore});
  if (typeof module !== 'undefined') module.exports = SaveStore;
})(globalThis);
