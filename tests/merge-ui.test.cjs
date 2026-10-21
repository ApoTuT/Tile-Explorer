'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const E = require('../web/merge-v03/engine.js');
const levels = require('../web/merge-v03/levels.js');
const SaveStore = require('../web/merge-v03/storage.js');
const mapStorage = () => { const map = new Map(); return {getItem: k => map.get(k), setItem: (k, v) => map.set(k, v), map}; };
test('session restoration replays actual moves, reconstructs complete undo history and isolates old progress', () => {
  const storage = mapStorage(), store = new SaveStore(storage, levels);
  storage.setItem('tile-explorer.settings.v02', '{"soundEnabled":false}');
  const first = E.applyMove(E.createState(levels[2]), levels[2].solution[0]);
  store.saveSession(levels[2], [first.transaction]);
  const restored = new SaveStore(storage, levels).loadSession();
  assert.deepEqual(restored.state, first.state); assert.equal(restored.transactions.length, 1);
  assert.deepEqual(E.undo(restored.state, restored.transactions[0]), E.createState(levels[2]));
  store.complete(levels[0]);
  assert.deepEqual(Object.keys(store.progress()), ['merge-01']);
  assert.equal(storage.getItem('tile-explorer.settings.v02'), '{"soundEnabled":false}');
});
test('a complete park-and-merge journal longer than the goal count survives refresh and every undo', () => {
  const storage = mapStorage(), store = new SaveStore(storage, levels), level = levels[1];
  const played = E.replay(level, level.solution);
  assert.equal(played.state.status, 'won');
  assert.ok(played.transactions.length > level.goals.golden);
  store.saveSession(level, played.transactions);
  const restored = new SaveStore(storage, levels).loadSession();
  assert.deepEqual(restored.state, played.state);
  assert.equal(restored.transactions.length, 3);
  assert.equal(restored.reset, undefined);
  let state = restored.state;
  state = E.undo(state, restored.transactions[2]);
  assert.equal(state.nestId, 'u1');
  assert.equal(state.delivered.golden, 1);
  state = E.undo(state, restored.transactions[1]);
  assert.equal(state.nestId, 'u1');
  assert.equal(state.delivered.golden, 0);
  state = E.undo(state, restored.transactions[0]);
  assert.deepEqual(state, E.createState(level));
});
function putLegacySession(storage, levelId, definitionHash, moves, ruleset = 'merge-v03-1') {
  storage.setItem('tile-explorer.merge.v03.session.v1',
    JSON.stringify({levelId, definitionHash, moves, ruleset}));
}
test('the recognized old third-level screenshot session migrates into a recoverable nest-enabled state', () => {
  const storage = mapStorage();
  const moves = [{sourceId: 'u1', targetId: 'l0'}, {sourceId: 'u4', targetId: 'l1'}];
  putLegacySession(storage, 'merge-03', '2578f2fc', moves);
  const store = new SaveStore(storage, levels), restored = store.loadSession();
  assert.equal(restored.migrated, true);
  assert.equal(restored.reset, undefined);
  assert.equal(restored.state.ruleset, E.RULESET);
  assert.equal(restored.state.nestId, null);
  assert.equal(restored.state.delivered.golden, 2);
  assert.deepEqual(restored.state.tiles.map(tile => tile.id).sort(), ['l2', 'l3', 'u2', 'u3']);
  assert.equal(E.listMergeMoves(restored.state).length, 0);
  assert.ok(E.listLegalMoves(restored.state).some(move => move.type === 'park'));
  assert.equal(E.solve(restored.state).status, 'solved');
  assert.equal(restored.transactions.length, 2);
  assert.deepEqual(E.undo(restored.state, restored.transactions[1]), E.replay(levels[2], moves.slice(0, 1)).state);
  // Saving again upgrades the envelope, so subsequent refreshes use the current ruleset.
  store.saveSession(restored.level, restored.transactions);
  const saved = JSON.parse(storage.getItem('tile-explorer.merge.v03.session.v1'));
  assert.equal(saved.ruleset, E.RULESET);
  assert.equal(saved.definitionHash, E.definitionHash(levels[2]));
  const refreshed = new SaveStore(storage, levels).loadSession();
  assert.equal(refreshed.migrated, false);
  assert.deepEqual(refreshed.state, restored.state);
});
test('the recognized old second-level route resets when it cannot be replayed on the new layout', () => {
  const storage = mapStorage();
  putLegacySession(storage, 'merge-02', '347a78a0', [{sourceId: 'u1', targetId: 'l0'}]);
  const restored = new SaveStore(storage, levels).loadSession();
  assert.equal(restored.reset, true);
  assert.deepEqual(restored.state, E.createState(levels[1]));
  assert.deepEqual(restored.transactions, []);
});
test('legacy migration requires the exact known ruleset and matching per-level hash and only old merge actions', () => {
  const cases = [
    {hash: 'unknown', ruleset: 'merge-v03-1', moves: []},
    {hash: '96c3ec83', ruleset: 'merge-v03-1', moves: []},
    {hash: '2578f2fc', ruleset: 'merge-v03-unknown', moves: []},
    {hash: '2578f2fc', ruleset: 'merge-v03-1', moves: [{type: 'park', sourceId: 'u2'}]},
  ];
  for (const entry of cases) {
    const storage = mapStorage();
    putLegacySession(storage, 'merge-03', entry.hash, entry.moves, entry.ruleset);
    const restored = new SaveStore(storage, levels).loadSession();
    assert.equal(restored.reset, true);
    assert.deepEqual(restored.state, E.createState(levels[2]));
    assert.deepEqual(restored.transactions, []);
  }
  const storage = mapStorage();
  putLegacySession(storage, 'merge-01', '96c3ec83', [{sourceId: 'u1', targetId: 'l1'}]);
  const restored = new SaveStore(storage, levels).loadSession();
  assert.equal(restored.migrated, true);
  assert.equal(restored.state.status, 'won');
});
test('malformed, tampered and obsolete sessions reset safely and retain independent completed levels', () => {
  const storage = mapStorage(), store = new SaveStore(storage, levels);
  store.complete(levels[1]);
  for (const patch of [{definitionHash: 'old'}, {ruleset: 'old'}, {moves: [{sourceId: 'missing', targetId: 'l1'}]},
    {moves: [levels[0].solution[0], levels[0].solution[0]]}]) {
    store.saveSession(levels[0], []);
    const key = 'tile-explorer.merge.v03.session.v1';
    storage.setItem(key, JSON.stringify({...JSON.parse(storage.getItem(key)), ...patch}));
    assert.deepEqual(store.loadSession().state, E.createState(levels[0]));
    assert.deepEqual(Object.keys(store.progress()), ['merge-02']);
  }
  storage.setItem('tile-explorer.merge.v03.session.v1', '{');
  assert.equal(store.loadSession(), null);
});
test('blocked localStorage still keeps session and completion in memory', () => {
  const store = new SaveStore({getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }}, levels);
  store.complete(levels[0]); store.saveSession(levels[1], []);
  assert.equal(store.failed, true);
  assert.deepEqual(Object.keys(store.progress()), ['merge-01']);
  assert.equal(store.loadSession().level.id, 'merge-02');
});
test('new audio asset and settings options keep standalone H5 relative and old defaults compatible', () => {
  const storage = mapStorage(), context = vm.createContext({localStorage: storage});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/audio-manager.js'), 'utf8'), context);
  const Manager = context.TileTheater.AudioManager;
  const old = new Manager(), fresh = new Manager({assetBase: './assets/audio/v02/', settingsKey: 'new'});
  assert.equal(old._url('dog'), '/assets/audio/v02/dog.wav');
  assert.equal(fresh._url('dog'), './assets/audio/v02/dog.wav');
  fresh.setEnabled(false);
  assert.equal(JSON.parse(storage.getItem('new')).soundEnabled, false);
  assert.equal(storage.getItem('tile-explorer.settings.v02'), undefined);
});
test('cancelled delivery removes actors and cannot run a stale completion callback', async () => {
  let removed = 0, cancelAnimation;
  const actor = {style: {}, classList: {add() {}}, append() {}, remove() { removed++; },
    animate() { return {finished: new Promise((_, reject) => { cancelAnimation = () => reject(new Error('cancel')); }), cancel() { cancelAnimation(); }}; }};
  const context = vm.createContext({TileMergeV03: {asset: name => name}, matchMedia: () => ({matches: false}),
    document: {createElement: tag => tag === 'div' ? actor : {}, body: {append() {}}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/merge-v03/presentation.js'), 'utf8'), context);
  const fx = new context.TileMergeV03.Presentation();
  const promise = fx.play({}, null, {left: 0, top: 0, width: 80, height: 80}, {left: 0, top: 10});
  fx.cancel();
  assert.equal(await promise, false);
  assert.equal(fx.actors.size, 0); assert.equal(fx.animations.size, 0); assert.ok(removed >= 1);
});
