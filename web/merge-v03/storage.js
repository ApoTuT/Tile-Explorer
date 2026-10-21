(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileMergeV03.engine;
  const PREFIX = 'tile-explorer.merge.v03.';
  const LEGACY_HASHES = {'merge-01': '96c3ec83', 'merge-02': '347a78a0', 'merge-03': '2578f2fc'};
  class SaveStore {
    constructor(storage, levels) {
      this.storage = storage; this.levels = levels; this.failed = false;
      this.memory = {}; this.unsaved = new Set();
    }
    read(key) {
      if (this.unsaved.has(key)) return E.clone(this.memory[key]);
      let raw;
      try { raw = this.storage.getItem(PREFIX + key + '.v1'); }
      catch (_) { this.failed = true; return this.memory[key] || null; }
      try { return JSON.parse(raw || 'null'); } catch (_) { return null; }
    }
    write(key, value) {
      this.memory[key] = E.clone(value);
      try { this.storage.setItem(PREFIX + key + '.v1', JSON.stringify(value)); this.unsaved.delete(key); }
      catch (_) { this.failed = true; this.unsaved.add(key); }
    }
    saveSession(level, transactions) {
      this.write('session', {levelId: level.id, ruleset: E.RULESET, definitionHash: E.definitionHash(level),
        moves: transactions.map(t => t.move)});
    }
    loadSession() {
      const saved = this.read('session');
      if (!saved) return null;
      const level = this.levels.find(l => l.id === saved.levelId);
      if (!level) return null;
      try {
        const migrated = saved.ruleset === 'merge-v03-1' && saved.definitionHash === LEGACY_HASHES[level.id];
        if ((!migrated && (saved.ruleset !== E.RULESET || saved.definitionHash !== E.definitionHash(level))) ||
            !Array.isArray(saved.moves) || saved.moves.length > level.goals.golden * 2 ||
            (migrated && saved.moves.some(move => move.type))) throw new Error('incompatible');
        const result = E.replay(level, saved.moves);
        return {level, ...result, migrated};
      } catch (_) { return {level, state: E.createState(level), transactions: [], reset: true}; }
    }
    progress() {
      const raw = this.read('progress'), valid = {};
      for (const level of this.levels) {
        if (raw && raw[level.id] === E.definitionHash(level)) valid[level.id] = raw[level.id];
      }
      return valid;
    }
    complete(level) { const progress = this.progress(); progress[level.id] = E.definitionHash(level); this.write('progress', progress); }
  }
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {SaveStore});
  if (typeof module !== 'undefined') module.exports = SaveStore;
})(globalThis);
