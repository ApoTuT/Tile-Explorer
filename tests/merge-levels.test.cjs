'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const E = require('../web/merge-v03/engine.js');
const G = require('../web/merge-v03/geometry.js');
const levels = require('../web/merge-v03/levels.js');
const report = require('../docs/technical/v0.3-level-report.json');
function reachableStates(initial) {
  const pending = [initial], visited = new Map();
  while (pending.length) {
    const state = pending.pop();
    const key = JSON.stringify([state.tiles.map(tile => tile.id).sort(), state.nestId, state.delivered.golden]);
    if (visited.has(key)) continue;
    visited.set(key, state);
    assert.ok(visited.size < 2000, 'these small lessons must be exhaustively verifiable');
    for (const move of E.listLegalMoves(state)) {
      const result = E.applyMove(state, move);
      assert.equal(result.ok, true, JSON.stringify(move));
      pending.push(result.state);
    }
  }
  return [...visited.values()];
}
for (const [index, level] of levels.entries()) {
  test('level ' + (index + 1) + ' has verified visibility, stable geometry, actual replay and exhaustive proof', () => {
    const result = E.validateLevel(level);
    assert.equal(result.ok, true);
    assert.equal(result.search.status, 'solved');
    assert.equal(result.search.deadStates, 0);
    assert.equal(result.search.allReachableSolvable, true);
    assert.equal(E.replay(level, result.search.route).state.status, 'won');
    assert.deepEqual(result, Object.fromEntries(Object.entries(report.levels[index]).filter(([key]) => key !== 'id')));
  });
  test('every reachable state in lesson ' + (index + 1) + ' still has a real route to completion', () => {
    const states = reachableStates(E.createState(level));
    assert.ok(states.length > 1);
    const initialSearch = E.solve(E.createState(level));
    assert.equal(initialSearch.states, states.length);
    assert.equal(initialSearch.recoverableStates, states.length);
    for (const state of states) {
      const search = E.solve(state);
      assert.equal(search.status, 'solved', JSON.stringify({
        level: level.id, tiles: state.tiles.map(tile => tile.id), nestId: state.nestId
      }));
      assert.notEqual(state.status, 'stuck');
      if (state.status === 'won') {
        assert.equal(state.tiles.length, 0);
        assert.equal(state.nestId, null);
      } else assert.ok(E.listLegalMoves(state).length > 0);
    }
  });
}
test('every first move in lesson three remains recoverable, including the old dead-branch starts', () => {
  const state = E.createState(levels[2]);
  assert.equal(E.listMergeMoves(state).length, 4);
  assert.ok(E.listLegalMoves(state).some(move => move.type === 'park'));
  for (const move of E.listLegalMoves(state)) {
    const search = E.solve(E.applyMove(state, move).state);
    assert.equal(search.status, 'solved');
  }
});
test('neighboring lower cards keep a small visible seam rather than wide blank gutters', () => {
  for (const level of levels.slice(1)) {
    const rows = new Map();
    for (const tile of level.tiles.filter(tile => tile.z === 0)) {
      if (!rows.has(tile.y)) rows.set(tile.y, []);
      rows.get(tile.y).push(tile);
    }
    for (const row of rows.values()) {
      row.sort((a, b) => a.x - b.x);
      for (let i = 1; i < row.length; i++) {
        const gap = row[i].x - row[i - 1].x - G.SIZE;
        assert.ok(gap >= 0 && gap <= 8, level.id + ': lower-card gap ' + gap);
      }
    }
  }
});
test('occlusion uses rectangle union; touching edges do not block', () => {
  const lower = {x: 0, y: 0, z: 0}, a = {x: 0, y: 0, z: 1}, b = {x: 0, y: 0, z: 2};
  assert.equal(G.visibleFraction(lower, [lower, a, b]), 0);
  assert.equal(G.overlaps(G.rect(lower), G.rect({x: 100, y: 0})), false);
  assert.equal(G.visibleFraction(lower, [lower, {x: 50, y: 0, z: 1}, {x: 50, y: 0, z: 2}]), .5);
});
test('invalid materials, same-layer overlap, hidden faces and invalid IDs fail validation', () => {
  const overlap = E.clone(levels[1]); Object.assign(overlap.tiles[1], overlap.tiles[0], {id: 'other'});
  assert.ok(E.validateLevel(overlap).errors.includes('same-layer-overlap'));
  const material = E.clone(levels[0]); material.goals.golden = 2;
  assert.ok(E.validateLevel(material).errors.includes('materials'));
  const hidden = E.clone(levels[0]); hidden.tiles[0].x = 100; hidden.tiles[0].y = 80;
  assert.ok(E.validateLevel(hidden).errors.some(e => e.startsWith('hidden-identity')));
  const duplicate = E.clone(levels[0]); duplicate.tiles[1].id = 'u1';
  assert.equal(E.validateLevel(duplicate).ok, false);
});
test('shipped puppy identity region and local vector illustrations match validation assumptions', () => {
  const manifest = require('../web/assets/merge-v03/manifest.json');
  assert.deepEqual(manifest.puppy.identityRegion, {x: 35, y: 35, width: 30, height: 30});
  for (const name of ['puppy', 'golden']) {
    const svg = fs.readFileSync(require('node:path').join(__dirname, '../web/assets/merge-v03/', manifest[name].file), 'utf8');
    assert.ok(svg.includes('viewBox="0 0 100 100"'));
    assert.ok(!/https?:\/\/(?!www.w3.org)/.test(svg));
  }
});
