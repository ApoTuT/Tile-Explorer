(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileMergeV03.engine;
  const PREFIX = 'tile-explorer.merge.v04.';
  const OLD_SETTINGS = ['tile-explorer.merge.v03.settings.v1', 'tile-explorer.settings.v02'];
  const isRecord = value => value && typeof value === 'object' && !Array.isArray(value);
  class SaveStore {
    constructor(storage, levels, {scope = 'production'} = {}) {
      if (!['production', 'preview'].includes(scope)) throw new Error('Unknown save scope');
      this.storage = storage;
      this.levels = levels;
      this.scope = scope;
      this.prefix = PREFIX + (scope === 'preview' ? 'preview.' : '');
      this.failed = false;
      this.memory = Object.create(null);
      this.unsaved = new Set();
      this.migrateSoundSetting();
    }
    key(name) { return this.prefix + name + '.v1'; }
    read(name) {
      if (this.unsaved.has(name)) return E.clone(this.memory[name]);
      let raw;
      try { raw = this.storage.getItem(this.key(name)); }
      catch (_) {
        this.failed = true;
        return Object.hasOwn(this.memory, name) ? E.clone(this.memory[name]) : null;
      }
      try { return JSON.parse(raw || 'null'); } catch (_) { return null; }
    }
    write(name, value) {
      this.memory[name] = E.clone(value);
      try {
        this.storage.setItem(this.key(name), JSON.stringify(value));
        this.unsaved.delete(name);
      } catch (_) {
        this.failed = true;
        this.unsaved.add(name);
      }
    }
    migrateSoundSetting() {
      const current = this.read('settings');
      if (isRecord(current) && typeof current.soundEnabled === 'boolean') return;
      for (const key of OLD_SETTINGS) {
        let raw;
        try { raw = JSON.parse(this.storage.getItem(key) || 'null'); }
        catch (_) { continue; }
        if (isRecord(raw) && typeof raw.soundEnabled === 'boolean') {
          this.write('settings', {...(isRecord(current) ? current : {}), soundEnabled: raw.soundEnabled});
          return;
        }
      }
    }
    saveSession(level, transactions) {
      this.write('session', {levelId: level.id, ruleset: E.RULESET, definitionHash: E.definitionHash(level),
        moves: transactions.map(transaction => transaction.move)});
    }
    loadSession() {
      const saved = this.read('session');
      if (!isRecord(saved)) return null;
      const level = this.levels.find(candidate => candidate.id === saved.levelId);
      if (!level) return null;
      try {
        if (saved.ruleset !== E.RULESET || saved.definitionHash !== E.definitionHash(level) ||
            !Array.isArray(saved.moves) || saved.moves.length > 2 * E.totalGoals(level)) throw new Error('incompatible');
        return {level, ...E.replay(level, saved.moves)};
      } catch (_) { return {level, state: E.createState(level), transactions: [], reset: true}; }
    }
    progress() {
      const raw = this.read('progress'), valid = {};
      for (const level of this.levels) {
        if (isRecord(raw) && raw[level.id] === E.definitionHash(level)) valid[level.id] = raw[level.id];
      }
      return valid;
    }
    complete(level) {
      const progress = this.progress();
      progress[level.id] = E.definitionHash(level);
      this.write('progress', progress);
    }
  }
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {SaveStore});
  if (typeof module !== 'undefined') module.exports = SaveStore;
})(globalThis);
