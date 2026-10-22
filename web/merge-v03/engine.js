/* Pure, deterministic rules: presentation never commits or changes these facts. */
(function (root) {
  'use strict';
  const G = typeof module !== 'undefined' ? require('./geometry.js') : root.TileMergeV03.geometry;
  const C = typeof module !== 'undefined' ? require('./content.js') : root.TileMergeV03.content;
  const RULESET = 'merge-v04-1';
  const clone = value => JSON.parse(JSON.stringify(value));
  const getItem = value => typeof value === 'string' ? (C.items[value] ? {id: value, ...C.items[value]} : null) : C.getItemForTile(value);
  const recipeFor = tile => C.recipeFor(tile);
  const totalGoals = value => Object.values(value?.goals || value || {}).reduce((sum, n) => sum + n, 0);
  const canonical = value => Array.isArray(value) ? value.map(canonical) :
    value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
  function definitionHash(level) {
    const families = [...new Set(level.tiles.map(tile => tile.family))].sort();
    const recipes = Object.entries(C.recipes).filter(([, recipe]) => families.includes(recipe.family))
      .sort(([a], [b]) => a.localeCompare(b)).map(([id, recipe]) =>
        [id, recipe.family, recipe.inputStage, recipe.inputCount, recipe.resultId]);
    const text = JSON.stringify(canonical({ruleset: level.ruleset, id: level.id, tileSize: level.tileSize,
      goals: level.goals, parkingSlot: level.parkingSlot, recipes,
      tiles: [...level.tiles].sort((a, b) => a.id.localeCompare(b.id))
        .map(tile => [tile.id, tile.family, tile.stage, tile.x, tile.y, tile.z])}));
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function basicErrors(level) {
    const errors = [], content = C.validate();
    if (!content.ok) return content.errors.map(error => 'content:' + error);
    const goals = level?.goals;
    if (!level || typeof level.id !== 'string' || !level.id || level.ruleset !== RULESET || level.tileSize !== 100 ||
        !goals || Array.isArray(goals) || !Object.keys(goals).length ||
        !Array.isArray(level.tiles) || !level.tiles.length ||
        !Number.isInteger(level.parkingSlot?.x) || !Number.isInteger(level.parkingSlot?.y) ||
        level.parkingSlot.capacity !== 1) return ['invalid-definition'];
    for (const [id, count] of Object.entries(goals)) {
      if (getItem(id)?.stage !== 'final' || !Number.isInteger(count) || count < 1 ||
          !Object.values(C.recipes).some(recipe => recipe.resultId === id)) errors.push('invalid-goal:' + id);
    }
    if (!Array.isArray(level.goalOrder) || level.goalOrder.length !== Object.keys(goals).length ||
        new Set(level.goalOrder).size !== level.goalOrder.length || level.goalOrder.some(id => !Object.hasOwn(goals, id)))
      errors.push('invalid-goal-order');
    const ids = new Set();
    for (const tile of level.tiles) {
      if (!tile || typeof tile.id !== 'string' || !tile.id || ids.has(tile.id) || ![0, 1].includes(tile.z) ||
          !Number.isInteger(tile.x) || !Number.isInteger(tile.y) || tile.stage !== 'base' || !getItem(tile) || !recipeFor(tile))
        errors.push('invalid-tile');
      if (tile) ids.add(tile.id);
    }
    if (errors.length) return errors;
    const used = new Set();
    for (const recipe of Object.values(C.recipes)) {
      const tiles = level.tiles.filter(tile => tile.family === recipe.family && tile.stage === recipe.inputStage);
      if (!tiles.length && !Object.hasOwn(goals, recipe.resultId)) continue;
      used.add(recipe.resultId);
      const expected = goals[recipe.resultId];
      if (!expected || tiles.filter(tile => tile.z === 0).length !== expected ||
          tiles.filter(tile => tile.z === 1).length !== expected) errors.push('materials:' + recipe.family);
    }
    if (Object.keys(goals).some(id => !used.has(id))) errors.push('materials');
    return errors;
  }
  function createState(level) {
    const errors = basicErrors(level);
    if (errors.length) throw new Error(errors.join(', '));
    const state = {levelId: level.id, definitionHash: definitionHash(level), ruleset: RULESET,
      tiles: clone(level.tiles), goals: clone(level.goals), goalOrder: [...level.goalOrder],
      delivered: Object.fromEntries(Object.keys(level.goals).map(id => [id, 0])),
      parkingSlot: clone(level.parkingSlot), parkingId: null, successfulMoves: 0, revision: 0, status: 'playing'};
    const result = settle(state);
    result.state.status = evaluate(result.state);
    return result.state;
  }
  function getBlockers(state, id) {
    const tile = state.tiles.find(candidate => candidate.id === id);
    if (!tile || id === state.parkingId) return [];
    return state.tiles.filter(candidate => candidate.id !== state.parkingId && candidate.z > tile.z &&
      G.overlaps(G.rect(tile), G.rect(candidate))).map(candidate => candidate.id);
  }
  function canMerge(state, sourceId, targetId) {
    const source = state.tiles.find(tile => tile.id === sourceId), target = state.tiles.find(tile => tile.id === targetId);
    if (!source || !target || sourceId === targetId) return {ok: false, reason: 'missing'};
    if (source.z !== 1 || target.z !== 0) return {ok: false, reason: 'layers'};
    const recipe = recipeFor(source), item = getItem(source);
    if (!recipe || !item || source.family !== target.family || source.stage !== target.stage ||
        target.stage !== 'base') return {ok: false, reason: 'recipe'};
    if (!Object.hasOwn(state.goals, recipe.resultId) ||
        !Number.isInteger(state.delivered[recipe.resultId]) || state.delivered[recipe.resultId] >= state.goals[recipe.resultId])
      return {ok: false, reason: 'goal-full'};
    if (getBlockers(state, sourceId).length) return {ok: false, reason: 'source-blocked'};
    const blockers = getBlockers(state, targetId).filter(id => id !== sourceId);
    if (blockers.length) return {ok: false, reason: 'target-blocked', blockers};
    return {ok: true, recipeId: recipe.id, sourceItemId: item.id, resultId: recipe.resultId};
  }
  const listMergeMoves = state => state.tiles.filter(tile => tile.z === 1).flatMap(source =>
    state.tiles.filter(tile => tile.z === 0 && canMerge(state, source.id, tile.id).ok)
      .map(target => ({sourceId: source.id, targetId: target.id})));
  function canPark(state, sourceId) {
    const source = state.tiles.find(tile => tile.id === sourceId);
    if (!source || source.z !== 1 || source.stage !== 'base' || !getItem(source)) return {ok: false, reason: 'source'};
    if (!state.parkingSlot || state.parkingId) return {ok: false, reason: 'parking-full'};
    if (getBlockers(state, sourceId).length) return {ok: false, reason: 'source-blocked'};
    return {ok: true};
  }
  const listLegalMoves = state => [...listMergeMoves(state), ...state.tiles.filter(tile =>
    canPark(state, tile.id).ok).map(tile => ({type: 'park', sourceId: tile.id}))];
  function evaluate(state) {
    if (!state.tiles.length && !state.parkingId && Object.keys(state.goals).every(id =>
      state.delivered[id] === state.goals[id]) && Object.keys(state.delivered).every(id => Object.hasOwn(state.goals, id))) return 'won';
    return listLegalMoves(state).length ? 'playing' : 'stuck';
  }
  function consume(state, sourceId, targetId, events) {
    const source = state.tiles.find(tile => tile.id === sourceId), target = state.tiles.find(tile => tile.id === targetId);
    const recipe = recipeFor(source), item = getItem(source);
    state.tiles = state.tiles.filter(tile => tile.id !== sourceId && tile.id !== targetId);
    if (state.parkingId === sourceId) state.parkingId = null;
    state.delivered[recipe.resultId]++;
    events.push({type: 'merge-deliver', sourceId, targetId, recipeId: recipe.id, sourceItemId: item.id,
      resultId: recipe.resultId, ordinalWithinResult: state.delivered[recipe.resultId],
      x: target.x, y: target.y, revision: state.revision});
  }
  function settle(input) {
    const state = clone(input), events = [];
    let pair;
    while ((pair = listMergeMoves(state).find(move => {
      if (move.sourceId === state.parkingId) return false;
      const source = state.tiles.find(tile => tile.id === move.sourceId), target = state.tiles.find(tile => tile.id === move.targetId);
      return source.x === target.x && source.y === target.y;
    }))) consume(state, pair.sourceId, pair.targetId, events);
    return {state, events};
  }
  function applyMove(input, move) {
    if (!move || typeof move !== 'object') return {ok: false, reason: 'action', state: input};
    if (move.revision !== undefined && move.revision !== input.revision) return {ok: false, reason: 'stale', state: input};
    if (input.status !== 'playing') return {ok: false, reason: 'finished', state: input};
    if (move.type && !['park', 'merge'].includes(move.type)) return {ok: false, reason: 'action', state: input};
    const parking = move.type === 'park';
    const check = parking ? canPark(input, move.sourceId) : canMerge(input, move.sourceId, move.targetId);
    if (!check.ok) return {...check, state: input};
    const state = clone(input), events = [];
    state.successfulMoves++;
    state.revision++;
    if (parking) {
      state.parkingId = move.sourceId;
      events.push({type: 'park', sourceId: move.sourceId,
        sourceItemId: getItem(state.tiles.find(tile => tile.id === move.sourceId)).id,
        x: state.parkingSlot.x, y: state.parkingSlot.y});
    } else consume(state, move.sourceId, move.targetId, events);
    const settled = settle(state);
    settled.state.status = evaluate(settled.state);
    return {ok: true, state: settled.state, events: [...events, ...settled.events],
      transaction: {before: clone(input), after: clone(settled.state),
        move: parking ? {type: 'park', sourceId: move.sourceId} : {sourceId: move.sourceId, targetId: move.targetId}}};
  }
  function undo(state, transaction) {
    if (JSON.stringify(state) !== JSON.stringify(transaction.after)) throw new Error('Stale undo transaction');
    return clone(transaction.before);
  }
  function replay(level, moves) {
    if (!Array.isArray(moves) || moves.length > 2 * totalGoals(level)) throw new Error('Invalid replay: length');
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
  const stateKey = state => JSON.stringify([state.definitionHash, state.tiles.map(tile => tile.id).sort(),
    state.parkingId, Object.entries(state.delivered).sort(([a], [b]) => a.localeCompare(b))]);
  function solve(initial, {maxStates = 10000} = {}) {
    const memo = new Map();
    function visit(state) {
      const key = stateKey(state);
      if (memo.has(key)) return memo.get(key);
      if (memo.size >= maxStates) throw new Error('budget');
      const result = {wins: 0, dead: 0, route: null};
      memo.set(key, result);
      if (state.status === 'won') { result.wins = 1; result.route = []; return result; }
      const moves = listLegalMoves(state);
      if (!moves.length) result.dead = 1;
      for (const move of moves) {
        const child = visit(applyMove(state, move).state);
        result.wins += child.wins;
        result.dead += child.dead;
        if (child.route && (!result.route || child.route.length + 1 < result.route.length)) result.route = [move, ...child.route];
      }
      return result;
    }
    try {
      const result = visit(initial), deadStates = [...memo.values()].filter(node => !node.route).length;
      return {status: result.wins ? 'solved' : 'unsolvable', states: memo.size, deadStates,
        recoverableStates: memo.size - deadStates, allReachableSolvable: deadStates === 0,
        winningRoutes: result.wins, deadRoutes: result.dead, shortest: result.route?.length ?? null, route: result.route};
    } catch (error) {
      if (error.message !== 'budget') throw error;
      return {status: 'unverified', states: memo.size, shortest: null};
    }
  }
  function validateLevel(level) {
    const errors = basicErrors(level), visibility = [];
    if (errors.length) return {ok: false, errors};
    for (let i = 0; i < level.tiles.length; i++) for (let j = i + 1; j < level.tiles.length; j++) {
      const a = level.tiles[i], b = level.tiles[j];
      if (a.z === b.z && G.overlaps(G.rect(a), G.rect(b))) errors.push('same-layer-overlap');
    }
    if (level.tiles.some(tile => G.overlaps(G.rect(tile), G.rect(level.parkingSlot)))) errors.push('parking-overlap');
    const initial = createState(level);
    if (initial.tiles.length !== level.tiles.length) errors.push('unstable-initial-state');
    for (const tile of level.tiles.filter(candidate => candidate.z === 0)) {
      const area = G.visibleFraction(tile, level.tiles), identity = G.visibleFraction(tile, level.tiles, getItem(tile).identityRegion);
      visibility.push({id: tile.id, family: tile.family, area, identity});
      if (area < .5 || identity < .8) errors.push('hidden-identity:' + tile.id);
    }
    let search;
    try {
      const result = replay(level, level.solution);
      if (result.state.status !== 'won') errors.push('incomplete-solution');
    } catch (_) { errors.push('invalid-solution'); }
    search = solve(initial);
    if (search.status !== 'solved') errors.push(search.status);
    if (search.allReachableSolvable === false) errors.push('unrecoverable-state');
    return {ok: errors.length === 0, errors, definitionHash: definitionHash(level), visibility, search};
  }
  const api = {RULESET, clone, definitionHash, getItem, recipeFor, totalGoals, stateKey, createState, getBlockers,
    canMerge, canPark, listMergeMoves, listLegalMoves, evaluate, settle, applyMove, undo, replay, solve, validateLevel};
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {engine: api});
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
