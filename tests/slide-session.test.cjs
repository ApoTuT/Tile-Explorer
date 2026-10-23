'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/slide-v05/engine.js');
const levels = require('../web/slide-v05/levels.js');
const SaveStore = require('../web/slide-v05/storage.js');
const GameSession = require('../web/slide-v05/session.js');
const move = (tileId, direction) => ({type: 'slide', tileId, direction});

function setup({scope = 'production', storage, values = new Map()} = {}) {
  storage ||= {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value)};
  const store = new SaveStore(storage, levels, {scope});
  const session = new GameSession({levels, store});
  return {store, session, values, storage};
}

test('session commits and saves one action, restores exact undo history, and rejects stale input', async () => {
  const {session, store} = setup();
  session.start(levels[0]);
  const revision = session.revision;
  const action = {...move('s1', 'right'), revision: -99};
  assert.equal(session.apply(action, revision).ok, true);
  assert.equal(session.historyLength, 1);
  assert.equal(session.apply(move('s1', 'right'), revision).reason, 'stale');
  const savedState = session.snapshot();
  const reopened = new GameSession({levels, store});
  await reopened.restore();
  assert.deepEqual(reopened.state, savedState);
  const reopenedRevision = reopened.revision;
  assert.equal(reopened.undo(), true);
  assert.ok(reopened.revision > reopenedRevision);
  assert.deepEqual(reopened.state, E.createState(levels[0]));
});

test('300 legal cyclic moves survive save/restore, a merge, and complete undo', async () => {
  const {session, store} = setup();
  session.start(levels[0]);
  for (let index = 0; index < 300; index++) {
    assert.equal(session.apply(move('s1', index % 2 ? 'left' : 'right')).ok, true);
  }
  assert.equal(session.historyLength, 300);
  const reopened = new GameSession({levels, store});
  await reopened.restore();
  assert.deepEqual(reopened.state, session.state);
  assert.equal(reopened.historyLength, 300);
  assert.equal(reopened.apply(move('s1', 'right')).ok, true);
  assert.equal(reopened.apply(move('s1', 'right')).ok, true);
  assert.equal(reopened.state.status, 'won');
  const won = await store.loadSession();
  assert.equal(won.transactions.length, 302);
  while (reopened.canUndo) reopened.undo();
  assert.deepEqual(reopened.state, E.createState(levels[0]));
  assert.ok(store.progress()['slide-01']);
});

test('failed moves never change history, revision, or the saved action log', async () => {
  const {session, store} = setup();
  session.start(levels[1]);
  const initial = session.snapshot(), revision = session.revision;
  assert.equal(session.apply(move('s1', 'right')).ok, false);
  assert.equal(session.apply(move('s1', 'up')).ok, false);
  assert.equal(session.historyLength, 0);
  assert.equal(session.revision, revision);
  assert.deepEqual((await store.loadSession()).state, initial);
});

test('all reference routes restore mixed goals, undo winning transactions, and restart cleanly', async () => {
  for (const level of levels) {
    const {session, store} = setup();
    session.start(level);
    for (const action of level.referenceSolution) assert.equal(session.apply(action).ok, true);
    assert.equal(session.state.status, 'won');
    const reopened = new GameSession({levels, store});
    await reopened.restore();
    assert.deepEqual(reopened.state, session.state);
    assert.equal(reopened.undo(), true);
    assert.equal(reopened.state.status, 'playing');
    const priorRevision = reopened.revision;
    reopened.restart();
    assert.equal(reopened.historyLength, 0);
    assert.deepEqual(reopened.state, E.createState(level));
    assert.ok(reopened.revision > priorRevision);
  }
});

test('unavailable storage keeps live state in memory and reports unsaved status', async () => {
  const broken = {getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }};
  const {session, store} = setup({storage: broken});
  session.start(levels[0]);
  session.apply(move('s1', 'right'));
  assert.equal(store.failed, true);
  assert.equal(store.failureReason, 'unavailable');
  assert.deepEqual((await store.loadSession()).state, session.state);
  const settings = {soundEnabled: false, reducedMotion: true};
  store.saveSettings(settings);
  assert.deepEqual(store.settings(), settings);
});

test('only valid v0.4 audio/motion settings migrate, without legacy progress or tutorial', () => {
  const values = new Map([
    ['tile-explorer.merge.v04.settings.v1', JSON.stringify({soundEnabled: false, reduceMotion: true, unexpected: 8})],
    ['tile-explorer.merge.v04.progress.v1', JSON.stringify({'slide-01': E.definitionHash(levels[0])})],
    ['tile-explorer.merge.v04.onboarding.v1', JSON.stringify({capabilities: {mergePair: true}})]
  ]);
  const before = new Map(values);
  const {store} = setup({values});
  assert.deepEqual(store.settings(), {soundEnabled: false, reducedMotion: true});
  assert.deepEqual(store.progress(), {});
  assert.equal(store.read('onboarding'), null);
  for (const [key, value] of before) assert.equal(values.get(key), value);
  const {store: invalid} = setup({values: new Map([
    ['tile-explorer.merge.v04.settings.v1', JSON.stringify({soundEnabled: 'false', reduceMotion: 1})]
  ])});
  assert.deepEqual(invalid.settings(), {soundEnabled: true, reducedMotion: false});
});

test('production and preview saves/settings are isolated and valid current preferences win migration', () => {
  const values = new Map([
    ['tile-explorer.merge.v04.settings.v1', JSON.stringify({soundEnabled: false, reduceMotion: true})],
    ['tile-explorer.slide.v05.settings.v1', JSON.stringify({soundEnabled: true})]
  ]);
  const production = setup({values}), preview = setup({values, scope: 'preview'});
  production.session.start(levels[0]);
  assert.deepEqual(production.store.settings(), {soundEnabled: true, reducedMotion: true});
  assert.deepEqual(preview.store.settings(), {soundEnabled: true, reducedMotion: false});
  assert.equal(preview.store.read('session'), null);
});

test('bad schemas, illegal action logs, mismatched hashes and corrupted JSON safely restart', async () => {
  const valid = {schemaVersion: 1, ruleset: E.RULESET, levelId: levels[0].id,
    definitionHash: E.definitionHash(levels[0]), actions: [move('s1', 'right')]};
  for (const value of [
    {...valid, schemaVersion: 3}, {...valid, ruleset: 'wrong'}, {...valid, definitionHash: 'wrong'},
    {...valid, actions: [move('s1', 'up')]}, {...valid, actions: [null]}, {...valid, levelId: 'unknown'}
  ]) {
    const {store} = setup({values: new Map([['tile-explorer.slide.v05.session.v1', JSON.stringify(value)]])});
    const restored = await store.loadSession();
    assert.equal(restored.reset, true);
    assert.deepEqual(restored.state, E.createState(levels[0]));
    assert.equal(restored.transactions.length, 0);
  }
  for (const raw of ['{bad', 'null', '[]', '17', '"bad"']) {
    const {store} = setup({values: new Map([['tile-explorer.slide.v05.session.v1', raw]])});
    assert.equal((await store.loadSession()).reset, true);
  }
});

test('technical storage limits report memory fallback without truncating the action log', () => {
  const {store} = setup();
  const actions = Array.from({length: SaveStore.LIMITS.MAX_ACTIONS + 1}, () => move('s1', 'right'));
  assert.equal(store.write('session', {actions}), false);
  assert.equal(store.failed, true);
  assert.equal(store.failureReason, 'limit');
  assert.equal(store.read('session').actions.length, actions.length);
});

test('invalid completion hashes are ignored and inspection snapshots cannot change live state', async () => {
  const {session, store} = setup();
  await session.restore();
  const copy = session.snapshot();
  copy.tiles.length = 0;
  assert.equal(session.state.tiles.length, 2);
  store.write('progress', {'slide-01': 'old', 'slide-02': E.definitionHash(levels[1])});
  assert.deepEqual(store.progress(), {'slide-02': E.definitionHash(levels[1])});
  assert.throws(() => session.start({...levels[0]}), /Unknown level/);
});

test('a late async restore cannot overwrite a newly started level', async () => {
  const {session, store} = setup();
  let finish;
  store.loadSession = () => new Promise(resolve => { finish = resolve; });
  const pending = session.restore();
  session.start(levels[2]);
  finish(null);
  assert.deepEqual(await pending, {cancelled: true});
  assert.equal(session.level.id, 'slide-03');
});
