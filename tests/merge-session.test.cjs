'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/merge-v03/engine.js');
const levels = require('../web/merge-v03/levels.js');
const SaveStore = require('../web/merge-v03/storage.js');
const GameSession = require('../web/merge-v03/session.js');

function setup() {
  const values = new Map();
  const storage = {getItem: key => values.get(key), setItem: (key, value) => values.set(key, value)};
  const store = new SaveStore(storage, levels);
  return {store, session: new GameSession({levels, store})};
}

test('a committed move is saved before any renderer or animation is involved', () => {
  const {session, store} = setup();
  session.start(levels[1]);
  const result = session.apply({type: 'park', sourceId: 'u1', revision: 0});
  assert.equal(result.ok, true);
  assert.equal(session.canUndo, true);
  const reopened = new GameSession({levels, store});
  reopened.restore();
  assert.deepEqual(reopened.state, session.state);
  assert.equal(reopened.historyLength, 1);
  assert.equal(reopened.undo(), true);
  assert.deepEqual(reopened.state, E.createState(levels[1]));
});

test('invalid or duplicate inputs leave history and stored state unchanged', () => {
  const {session, store} = setup();
  session.start(levels[1]);
  const initial = session.snapshot();
  assert.equal(session.apply({sourceId: 'u1', targetId: 'l0'}).ok, false);
  assert.equal(session.historyLength, 0);
  assert.deepEqual(store.loadSession().state, initial);
  session.apply({type: 'park', sourceId: 'u1', revision: 0});
  const parked = session.snapshot();
  assert.equal(session.apply({type: 'park', sourceId: 'u1', revision: 0}).ok, false);
  assert.equal(session.historyLength, 1);
  assert.deepEqual(session.state, parked);
});

test('completion records, repeated undo and restart use one history owner', () => {
  const {session, store} = setup();
  session.start(levels[1]);
  for (const move of levels[1].solution) assert.equal(session.apply(move).ok, true);
  assert.equal(session.state.status, 'won');
  assert.ok(store.progress()[levels[1].id]);
  assert.equal(session.historyLength, 3);
  while (session.canUndo) assert.equal(session.undo(), true);
  assert.deepEqual(session.state, E.createState(levels[1]));
  assert.equal(session.undo(), false);
  session.apply(levels[1].solution[0]);
  session.restart();
  assert.equal(session.historyLength, 0);
  assert.deepEqual(session.state, E.createState(levels[1]));
});

test('snapshot inspection cannot mutate the live session and switching clears old history', () => {
  const {session} = setup();
  session.restore();
  const copy = session.snapshot();
  copy.tiles.length = 0;
  assert.equal(session.state.tiles.length, 2);
  session.apply(levels[0].solution[0]);
  session.start(levels[2]);
  assert.equal(session.historyLength, 0);
  assert.equal(session.state.tiles.length, 8);
  assert.throws(() => session.start({...levels[0]}), /Unknown level/);
});
