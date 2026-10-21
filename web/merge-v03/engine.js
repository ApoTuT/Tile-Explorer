(function (root) {
  'use strict';
  const G = typeof module !== 'undefined' ? require('./geometry.js') : root.TileMergeV03.geometry;
  const RULESET = 'merge-v03-2';
  const clone = value => JSON.parse(JSON.stringify(value));
  function definitionHash(level) {
    const text = JSON.stringify([RULESET, level.id, level.tileSize, level.goals, level.nest,
      level.tiles.map(t => [t.id, t.family, t.stage, t.x, t.y, t.z]), level.solution]);
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function basicErrors(level) {
    const errors = [];
    if (!level || level.ruleset !== RULESET || level.tileSize !== 100 ||
        !Number.isInteger(level.goals?.golden) || level.goals.golden < 1 ||
        !Array.isArray(level.tiles) || !level.tiles.length ||
        !Number.isInteger(level.nest?.x) || !Number.isInteger(level.nest?.y)) return ['invalid-definition'];
    const ids = new Set();
    for (const t of level.tiles) {
      if (typeof t.id !== 'string' || ids.has(t.id) || ![0, 1].includes(t.z) ||
          !Number.isInteger(t.x) || !Number.isInteger(t.y) || t.family !== 'dog' || t.stage !== 'young')
        errors.push('invalid-tile');
      ids.add(t.id);
    }
    return errors;
  }
  function createState(level) {
    const errors = basicErrors(level);
    if (errors.length) throw new Error(errors.join(', '));
    const state = {levelId: level.id, definitionHash: definitionHash(level), ruleset: RULESET,
      tiles: clone(level.tiles), goals: clone(level.goals), delivered: {golden: 0},
      nestSlot: clone(level.nest), nestId: null, successfulMoves: 0, revision: 0, status: 'playing'};
    const result = settle(state);
    result.state.status = evaluate(result.state);
    return result.state;
  }
  const getBlockers = (state, id) => {
    const tile = state.tiles.find(t => t.id === id);
    return tile ? state.tiles.filter(t => t.id !== state.nestId && t.z > tile.z &&
      G.overlaps(G.rect(tile), G.rect(t))).map(t => t.id) : [];
  };
  function canMerge(state, sourceId, targetId) {
    const source = state.tiles.find(t => t.id === sourceId), target = state.tiles.find(t => t.id === targetId);
    if (!source || !target || sourceId === targetId) return {ok: false, reason: 'missing'};
    if (source.z !== 1 || target.z !== 0) return {ok: false, reason: 'layers'};
    if (source.family !== target.family || source.stage !== 'young' || target.stage !== 'young')
      return {ok: false, reason: 'recipe'};
    if (getBlockers(state, sourceId).length) return {ok: false, reason: 'source-blocked'};
    const blockers = getBlockers(state, targetId).filter(id => id !== sourceId);
    if (blockers.length) return {ok: false, reason: 'target-blocked', blockers};
    return {ok: true};
  }
  const listMergeMoves = state => state.tiles.filter(t => t.z === 1).flatMap(s =>
    state.tiles.filter(t => t.z === 0 && canMerge(state, s.id, t.id).ok)
      .map(t => ({sourceId: s.id, targetId: t.id})));
  function canPark(state, sourceId) {
    const source = state.tiles.find(t => t.id === sourceId);
    if (!source || source.z !== 1 || source.stage !== 'young') return {ok: false, reason: 'source'};
    if (!state.nestSlot || state.nestId) return {ok: false, reason: 'nest-full'};
    if (getBlockers(state, sourceId).length) return {ok: false, reason: 'source-blocked'};
    return {ok: true};
  }
  const listLegalMoves = state => [...listMergeMoves(state), ...state.tiles.filter(t =>
    canPark(state, t.id).ok).map(t => ({type: 'park', sourceId: t.id}))];
  function evaluate(state) {
    if (state.delivered.golden >= state.goals.golden && !state.tiles.length) return 'won';
    return listLegalMoves(state).length ? 'playing' : 'stuck';
  }
  function consume(state, sourceId, targetId, events) {
    const target = state.tiles.find(t => t.id === targetId);
    state.tiles = state.tiles.filter(t => t.id !== sourceId && t.id !== targetId);
    if (state.nestId === sourceId) state.nestId = null;
    state.delivered.golden++;
    events.push({type: 'merge-deliver', sourceId, targetId, x: target.x, y: target.y,
      ordinal: state.delivered.golden});
  }
  function settle(input) {
    const state = clone(input), events = [];
    let pair;
    while ((pair = listMergeMoves(state).find(m => {
      if (m.sourceId === state.nestId) return false;
      const a = state.tiles.find(t => t.id === m.sourceId), b = state.tiles.find(t => t.id === m.targetId);
      return a.x === b.x && a.y === b.y;
    }))) consume(state, pair.sourceId, pair.targetId, events);
    return {state, events};
  }
  function applyMove(input, move) {
    if (move.revision !== undefined && move.revision !== input.revision)
      return {ok: false, reason: 'stale', state: input};
    if (input.status !== 'playing') return {ok: false, reason: 'finished', state: input};
    if (move.type && !['park', 'merge'].includes(move.type))
      return {ok: false, reason: 'action', state: input};
    const parking = move.type === 'park';
    const check = parking ? canPark(input, move.sourceId) : canMerge(input, move.sourceId, move.targetId);
    if (!check.ok) return {...check, state: input};
    const state = clone(input), events = [];
    // A designated single nest is an explicit action, never arbitrary free placement.
    if (parking) {
      state.nestId = move.sourceId;
      events.push({type: 'park', sourceId: move.sourceId, x: state.nestSlot.x, y: state.nestSlot.y});
    } else consume(state, move.sourceId, move.targetId, events);
    const settled = settle(state);
    settled.state.successfulMoves++;
    settled.state.revision++;
    settled.state.status = evaluate(settled.state);
    return {ok: true, state: settled.state, events: [...events, ...settled.events],
      transaction: {before: clone(input), after: clone(settled.state),
        move: parking ? {type: 'park', sourceId: move.sourceId} :
          {sourceId: move.sourceId, targetId: move.targetId}}};
  }
  function undo(state, transaction) {
    if (JSON.stringify(state) !== JSON.stringify(transaction.after)) throw new Error('Stale undo transaction');
    return clone(transaction.before);
  }
  function replay(level, moves) {
    let state = createState(level);
    const transactions = [];
    for (const move of moves) {
      const result = applyMove(state, move);
      if (!result.ok) throw new Error('Invalid replay: ' + result.reason);
      state = result.state;
      transactions.push(result.transaction);
    }
    return {state, transactions};
  }
  function solve(initial, {maxStates = 10000} = {}) {
    const memo = new Map();
    let visited = 0, shortest = null;
    function visit(state) {
      const key = state.tiles.map(t => t.id).sort().join('|') + '@' + (state.nestId || '') + ':' + state.delivered.golden;
      if (memo.has(key)) return memo.get(key);
      if (++visited > maxStates) throw new Error('budget');
      const result = {wins: 0, dead: 0, route: null};
      memo.set(key, result);
      if (state.status === 'won') { result.wins = 1; result.route = []; return result; }
      const moves = listLegalMoves(state);
      if (!moves.length) result.dead = 1;
      for (const move of moves) {
        const child = visit(applyMove(state, move).state);
        result.wins += child.wins;
        result.dead += child.dead;
        if (child.route && (!result.route || child.route.length + 1 < result.route.length))
          result.route = [move, ...child.route];
      }
      return result;
    }
    try {
      const result = visit(initial);
      shortest = result.route?.length ?? null;
      const deadStates = [...memo.values()].filter(node => !node.route).length;
      return {status: result.wins ? 'solved' : 'unsolvable', states: visited, deadStates,
        recoverableStates: memo.size - deadStates, allReachableSolvable: deadStates === 0,
        winningRoutes: result.wins, deadRoutes: result.dead, shortest, route: result.route};
    } catch (error) {
      if (error.message !== 'budget') throw error;
      return {status: 'unverified', states: visited, shortest};
    }
  }
  function validateLevel(level) {
    const errors = basicErrors(level), visibility = [];
    if (errors.length) return {ok: false, errors};
    if (level.tiles.length !== level.goals.golden * 2 ||
        level.tiles.filter(t => t.z === 1).length !== level.goals.golden) errors.push('materials');
    for (let i = 0; i < level.tiles.length; i++) for (let j = i + 1; j < level.tiles.length; j++) {
      const a = level.tiles[i], b = level.tiles[j];
      if (a.z === b.z && G.overlaps(G.rect(a), G.rect(b))) errors.push('same-layer-overlap');
    }
    if (level.tiles.some(tile => G.overlaps(G.rect(tile), G.rect(level.nest)))) errors.push('nest-overlap');
    const raw = {tiles: clone(level.tiles), delivered: {golden: 0}};
    if (settle(raw).events.length) errors.push('unstable-initial-state');
    for (const tile of level.tiles.filter(t => t.z === 0)) {
      const area = G.visibleFraction(tile, level.tiles);
      const identity = G.visibleFraction(tile, level.tiles, {x: 35, y: 35, width: 30, height: 30});
      visibility.push({id: tile.id, area, identity});
      if (area < .5 || identity < .8) errors.push('hidden-identity:' + tile.id);
    }
    let search;
    try {
      const result = replay(level, level.solution);
      if (result.state.status !== 'won') errors.push('incomplete-solution');
      search = solve(createState(level));
      if (search.status !== 'solved') errors.push(search.status);
      if (search.allReachableSolvable === false) errors.push('unrecoverable-state');
    } catch (_) { errors.push('invalid-solution'); }
    return {ok: errors.length === 0, errors, definitionHash: definitionHash(level), visibility, search};
  }
  const api = {RULESET, clone, definitionHash, createState, getBlockers, canMerge, canPark,
    listMergeMoves, listLegalMoves, evaluate, settle, applyMove, undo, replay, solve, validateLevel};
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {engine: api});
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
