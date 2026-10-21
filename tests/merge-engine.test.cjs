'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/merge-v03/engine.js');
const levels = require('../web/merge-v03/levels.js');
test('partial overlap is stable; a real merge consumes two materials and delivers a final adult', () => {
  const initial = E.createState(levels[0]), frozen = JSON.stringify(initial);
  assert.equal(initial.tiles.length, 2); assert.equal(initial.delivered.golden, 0);
  const result = E.applyMove(initial, levels[0].solution[0]);
  assert.equal(result.ok, true); assert.equal(result.state.status, 'won');
  assert.deepEqual(result.state.tiles, []); assert.equal(result.state.delivered.golden, 1);
  assert.equal(result.state.successfulMoves, 1); assert.equal(result.events.length, 1);
  assert.equal(JSON.stringify(initial), frozen);
  assert.deepEqual(E.undo(result.state, result.transaction), initial);
});
test('full alignment immediately settles and is rejected as an official starting layout', () => {
  const level = E.clone(levels[0]);
  Object.assign(level.tiles[0], {x: level.tiles[1].x, y: level.tiles[1].y});
  assert.equal(E.createState(level).status, 'won');
  assert.ok(E.validateLevel(level).errors.includes('unstable-initial-state'));
});
test('a third blocker forbids pairing even when both animals are recognizable', () => {
  const state = E.createState(levels[1]);
  assert.deepEqual(E.getBlockers(state, 'l1'), ['u1', 'u2']);
  assert.deepEqual(E.canMerge(state, 'u1', 'l1'), {ok: false, reason: 'target-blocked', blockers: ['u2']});
  assert.equal(E.applyMove(state, {sourceId: 'u1', targetId: 'l1'}).state, state);
  const next = E.applyMove(state, {type: 'park', sourceId: 'u1'}).state;
  assert.equal(E.canMerge(next, 'u2', 'l1').ok, true);
});
test('same-layer, wrong family, missing and finished moves never consume materials', () => {
  const state = E.createState(levels[1]);
  for (const move of [{sourceId: 'u1', targetId: 'u2'}, {sourceId: 'l0', targetId: 'l1'},
    {sourceId: 'u1', targetId: 'blank'}, {sourceId: 'u1', targetId: 'u1'}])
    assert.equal(E.applyMove(state, move).state, state);
  const changed = E.clone(state); changed.tiles.find(t => t.id === 'l0').family = 'cat';
  assert.equal(E.canMerge(changed, 'u1', 'l0').reason, 'recipe');
  const won = E.replay(levels[0], levels[0].solution).state;
  assert.equal(E.applyMove(won, levels[0].solution[0]).reason, 'finished');
});
test('revision checks and removed IDs prevent duplicate delivery', () => {
  const state = E.createState(levels[1]), move = {...levels[1].solution[0], revision: 0};
  const next = E.applyMove(state, move).state;
  assert.equal(E.applyMove(next, move).reason, 'stale');
  assert.equal(E.applyMove(next, levels[1].solution[0]).ok, false);
  const merge = E.applyMove(next, {sourceId: 'u2', targetId: 'l0'}).state;
  assert.equal(E.applyMove(merge, {sourceId: 'u2', targetId: 'l0'}).ok, false);
  assert.equal(merge.delivered.golden, 1);
});
test('a nest parking action frees only its real blockers and preserves all material', () => {
  const initial = E.createState(levels[1]), before = E.clone(initial);
  const result = E.applyMove(initial, {type: 'park', sourceId: 'u1'});
  assert.equal(result.ok, true);
  assert.equal(result.state.nestId, 'u1');
  assert.deepEqual(result.state.tiles, initial.tiles);
  assert.equal(result.state.delivered.golden, 0);
  assert.equal(result.state.successfulMoves, 1);
  assert.equal(result.events.length, 1);
  assert.equal(result.events[0].type, 'park');
  assert.deepEqual(E.getBlockers(result.state, 'l1'), ['u2']);
  assert.equal(E.canMerge(result.state, 'u2', 'l1').ok, true);
  assert.deepEqual(initial, before);
  assert.deepEqual(E.undo(result.state, result.transaction), initial);
});
test('the single nest rejects a second occupant, lower material, repeat parking and invalid IDs', () => {
  const state = E.createState(levels[1]);
  for (const id of ['l0', 'l1', 'missing']) {
    assert.equal(E.canPark(state, id).ok, false);
    assert.equal(E.applyMove(state, {type: 'park', sourceId: id}).state, state);
  }
  const parked = E.applyMove(state, {type: 'park', sourceId: 'u1'}).state;
  for (const id of ['u1', 'u2']) {
    assert.equal(E.canPark(parked, id).ok, false);
    assert.equal(E.applyMove(parked, {type: 'park', sourceId: id}).state, parked);
  }
  assert.equal(E.listLegalMoves(parked).some(move => move.type === 'park'), false);
  assert.equal(E.applyMove(parked, {type: 'park', sourceId: 'u1', revision: 0}).reason, 'stale');
  assert.equal(parked.delivered.golden, 0);
});
test('a parked puppy must still pair legally, clears the nest on delivery and can be fully undone', () => {
  const initial = E.createState(levels[2]);
  const park = E.applyMove(initial, {type: 'park', sourceId: 'u1'});
  const merge = E.applyMove(park.state, {sourceId: 'u1', targetId: 'l0'});
  assert.equal(merge.ok, true);
  assert.equal(merge.state.nestId, null);
  assert.equal(merge.state.tiles.some(tile => tile.id === 'u1'), false);
  assert.equal(merge.state.delivered.golden, 1);
  assert.equal(merge.state.successfulMoves, 2);
  assert.equal(E.canPark(merge.state, 'u4').ok, true);
  const restored = E.undo(merge.state, merge.transaction);
  assert.deepEqual(restored, park.state);
  assert.equal(restored.nestId, 'u1');
  assert.deepEqual(E.undo(restored, park.transaction), initial);
});
test('the screenshot four-puppy loop is recoverable on the board without undo or restart', () => {
  const initial = E.createState(levels[2]);
  const first = E.applyMove(initial, {sourceId: 'u1', targetId: 'l0'});
  const second = E.applyMove(first.state, {sourceId: 'u4', targetId: 'l1'});
  assert.equal(second.state.status, 'playing');
  assert.deepEqual(E.listMergeMoves(second.state), []);
  assert.equal(E.solve(second.state).status, 'solved');
  assert.equal(second.state.delivered.golden, 2);
  assert.deepEqual(second.state.tiles.map(tile => tile.id).sort(), ['l2', 'l3', 'u2', 'u3']);
  const parked = E.applyMove(second.state, {type: 'park', sourceId: 'u2'});
  assert.equal(parked.ok, true);
  assert.equal(E.canMerge(parked.state, 'u2', 'l3').ok, false, 'the other puppy still blocks that target');
  const cleared = E.applyMove(parked.state, {sourceId: 'u3', targetId: 'l2'});
  assert.equal(cleared.ok, true);
  const finished = E.applyMove(cleared.state, {sourceId: 'u2', targetId: 'l3'});
  assert.equal(finished.ok, true);
  assert.equal(finished.state.status, 'won');
  assert.equal(finished.state.nestId, null);
  assert.equal(finished.state.delivered.golden, 4);
  assert.equal(finished.state.successfulMoves, 5);
  assert.deepEqual(finished.state.tiles, []);
  // Undo remains an independent option and restores entire transactions.
  const previous = E.undo(second.state, second.transaction);
  assert.deepEqual(E.undo(previous, first.transaction), initial);
  assert.equal(E.solve(initial).status, 'solved');
  assert.throws(() => E.undo(second.state, first.transaction), /Stale/);
});
test('a parking and pairing solution can be replayed with complete undo history', () => {
  const moves = [{sourceId: 'u1', targetId: 'l0'}, {sourceId: 'u4', targetId: 'l1'},
    {type: 'park', sourceId: 'u2'}, {sourceId: 'u3', targetId: 'l2'}, {sourceId: 'u2', targetId: 'l3'}];
  const result = E.replay(levels[2], moves);
  assert.equal(result.state.status, 'won');
  assert.equal(result.transactions.length, moves.length);
  let state = result.state;
  for (const transaction of [...result.transactions].reverse()) state = E.undo(state, transaction);
  assert.deepEqual(state, E.createState(levels[2]));
});
test('solver budget exhaustion is not presented as a solution or proof of impossibility', () => {
  assert.equal(E.solve(E.createState(levels[2]), {maxStates: 1}).status, 'unverified');
});
