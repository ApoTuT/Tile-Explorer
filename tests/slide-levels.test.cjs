'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/slide-v05/engine.js');
const S = require('../web/slide-v05/solver.js');
const levels = require('../web/slide-v05/levels.js');
const slide = (tileId, direction) => ({type: 'slide', tileId, direction});

test('actual kernel exhaustively proves every reachable state of all three levels can finish', () => {
  const states = [7, 117, 9841], edges = [24, 620, 78192], shortest = [1, 3, 5];
  for (const [index, level] of levels.entries()) {
    const report = S.validateLevel(level);
    assert.equal(report.proof, 'actual-kernel-state-graph');
    assert.equal(report.ok, true);
    assert.equal(report.complete, true);
    assert.equal(report.reachableStates, states[index]);
    assert.equal(report.actionEdges, edges[index]);
    assert.equal(report.shortestMoves, shortest[index]);
    assert.equal(report.unwinnableStates, 0);
    assert.equal(report.allReachableSolvable, true);
    assert.equal(E.replay(level, level.referenceSolution).state.status, 'won');
  }
});

test('a legal movement cycle is retained, not prematurely called a dead end', () => {
  const initial = E.createState(levels[0]);
  const cycle = E.replay(levels[0], [slide('s1', 'down'), slide('s1', 'up')]).state;
  assert.equal(E.canonicalKey(initial), E.canonicalKey(cycle));
  const result = S.findSolution(cycle);
  assert.equal(result.status, 'solved');
  assert.equal(result.solution.length, 1);
});

test('complete search identifies an unfinishable cyclic region even though actions remain legal', () => {
  const level = {id: 'loop-no-win', ruleset: E.RULESET, rows: 1, cols: 5,
    goals: {'strawberry-large': 1, 'sports-car': 1}, goalOrder: ['strawberry-large', 'sports-car'],
    tiles: [{id: 's1', itemId: 'strawberry-small', row: 0, col: 0},
      {id: 'c1', itemId: 'car-small', row: 0, col: 1},
      {id: 's2', itemId: 'strawberry-small', row: 0, col: 3},
      {id: 'c2', itemId: 'car-small', row: 0, col: 4}]};
  const initial = E.createState(level);
  assert.ok(E.listLegalActions(initial).length > 0);
  const proof = S.validateLevel(level);
  assert.equal(proof.complete, true);
  assert.equal(proof.ok, false);
  assert.equal(proof.initialSolvable, false);
  assert.equal(proof.reachableStates, 5);
  assert.equal(proof.unwinnableStates, 5);
  assert.equal(S.findSolution(initial).status, 'unsolvable');
});

test('search budgets produce unverified rather than passed or unsolvable', () => {
  const report = S.validateLevel(levels[2], {maxStates: 1});
  assert.equal(report.status, 'unverified');
  assert.equal(report.complete, false);
  assert.equal(report.ok, false);
  assert.equal(report.unwinnableStates, null);
  assert.equal(report.initialSolvable, null);
  assert.equal(S.findSolution(E.createState(levels[0]), {maxMs: 0}).status, 'unverified');
});

test('third-level direction choice remains solvable with the documented difference in route length', () => {
  const initial = E.createState(levels[2]);
  const down = S.findSolution(E.applyAction(initial, slide('t1', 'down')).state);
  const right = S.findSolution(E.applyAction(initial, slide('t1', 'right')).state);
  assert.equal(down.status, 'solved');
  assert.equal(down.solution.length + 1, 5);
  assert.equal(right.status, 'solved');
  assert.equal(right.solution.length + 1, 6);
});

test('runtime hints are sliced, read only, cancelable and explicit about budget exhaustion', async () => {
  S.clearHintCache();
  const state = E.createState(levels[2]), before = E.clone(state);
  const controller = new AbortController();
  controller.abort();
  assert.equal((await S.findHint(state, {signal: controller.signal})).status, 'cancelled');
  let checks = 0;
  assert.equal((await S.findHint(state, {isCancelled: () => ++checks > 2})).status, 'cancelled');
  assert.equal((await S.findHint(state, {maxStates: 1})).status, 'unverified');
  let yielded = false;
  setTimeout(() => { yielded = true; }, 0);
  const hint = await S.findHint(state, {sliceMs: 1, maxMs: 3000});
  assert.equal(hint.status, 'solved');
  assert.equal(hint.solution.length, 5);
  assert.equal(E.inspectAction(state, hint.action).ok, true);
  assert.equal(yielded, true);
  assert.deepEqual(state, before);
});

test('hint cache resolves source coordinates to current equivalent entity IDs', async () => {
  S.clearHintCache();
  const state = E.createState(levels[0]);
  const first = await S.findHint(state);
  const renamed = E.clone(state);
  for (const tile of renamed.tiles) tile.id += '-different';
  const hint = await S.findHint(renamed);
  assert.equal(hint.cached, true);
  assert.equal(hint.action.tileId, first.action.tileId + '-different');
  let current = renamed;
  for (const action of hint.solution) current = E.applyAction(current, action).state;
  assert.equal(current.status, 'won');
});
