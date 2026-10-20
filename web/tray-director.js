/* Presentation only: authoritative tray state is never changed here. */
(() => {
  'use strict';
  const theater = globalThis.TileTheater = globalThis.TileTheater || {};
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const integer = value => Number.isSafeInteger(value) && value >= 0;
  const codeFor = (kind, symbols) => integer(kind) && typeof symbols?.[kind]?.code === 'string'
    && symbols[kind].code.length > 0 && symbols[kind].code.length <= 64 ? symbols[kind].code : null;
  const profileFor = code => own(theater.profiles || {}, code)
    ? theater.profiles[code] : theater.fallbackProfile;
  const validTiles = (tiles, symbols, maximum = 7) => Array.isArray(tiles) && tiles.length <= maximum
    && tiles.every(tile => tile && integer(tile.id) && codeFor(tile.kind, symbols))
    && new Set(tiles.map(tile => tile.id)).size === tiles.length;
  const sameTray = (left, right) => left.length === right.length
    && left.every((tile, index) => tile.id === right[index].id && tile.kind === right[index].kind);

  /** Pure matching. The entrant must participate; distance binds one ID per role. */
  function selectInteraction({tray, enteredTileId, symbols, scripts = theater.scripts || [],
    now = 0, lastStartedAt = -Infinity, ruleStartedAt = new Map(), globalCooldown = 1000} = {}) {
    if (!Array.isArray(symbols) || !validTiles(tray, symbols) || !integer(enteredTileId)
      || !Number.isFinite(now) || now - lastStartedAt < globalCooldown) return null;
    const entrantIndex = tray.findIndex(tile => tile.id === enteredTileId);
    if (entrantIndex < 0) return null;
    const entrantCode = codeFor(tray[entrantIndex].kind, symbols);
    const lastRule = id => ruleStartedAt instanceof Map ? ruleStartedAt.get(id) : ruleStartedAt?.[id];
    const candidates = [];
    for (const script of scripts) {
      if (!script || typeof script.id !== 'string' || !Array.isArray(script.codes)
        || ![2,3].includes(script.codes.length) || new Set(script.codes).size !== script.codes.length
        || !script.codes.includes(entrantCode) || !script.initiators?.includes(entrantCode)) continue;
      const last = lastRule(script.id);
      if (Number.isFinite(last) && now - last < (script.cooldown_ms ?? 6000)) continue;
      const actors = Object.create(null);
      for (const code of script.codes) {
        if (code === entrantCode) { actors[code] = enteredTileId; continue; }
        const options = tray.map((tile,index) => ({tile,index}))
          .filter(({tile}) => codeFor(tile.kind,symbols) === code)
          .sort((a,b) => Math.abs(a.index-entrantIndex)-Math.abs(b.index-entrantIndex) || a.index-b.index);
        if (!options.length) break;
        actors[code] = options[0].tile.id;
      }
      if (Object.keys(actors).length === script.codes.length) candidates.push({script,actors});
    }
    candidates.sort((a,b) => b.script.codes.length-a.script.codes.length
      || (b.script.priority || 0)-(a.script.priority || 0)
      || (a.script.id < b.script.id ? -1 : a.script.id > b.script.id ? 1 : 0));
    return candidates[0] || null;
  }

  // A valid response has exactly one insertion and optionally its one triple.
  function validatePresentation(presentation, state) {
    if (!presentation || presentation.schema_version !== 1 || !Array.isArray(presentation.events)
      || ![1,2].includes(presentation.events.length) || !Array.isArray(state?.symbols)) return null;
    const capacity = integer(state.capacity) && state.capacity > 0 ? Math.min(state.capacity,7) : 7;
    if (!validTiles(state.tray,state.symbols,capacity)) return null;
    const [enter, clear] = presentation.events;
    if (!enter || enter.type !== 'tray_enter' || !enter.tile || !integer(enter.tile.id)
      || !codeFor(enter.tile.kind,state.symbols) || !integer(enter.insert_index)
      || !validTiles(enter.tray_after_insert,state.symbols,capacity)) return null;
    const inserted = enter.tray_after_insert[enter.insert_index];
    if (!inserted || inserted.id !== enter.tile.id || inserted.kind !== enter.tile.kind) return null;
    if (Array.isArray(state.tiles) && state.tiles.some(tile => tile.id === enter.tile.id)) return null;
    const sameKind = enter.tray_after_insert.filter(tile => tile.kind === enter.tile.kind);
    if (!clear) {
      if (sameKind.length >= 3 || !sameTray(enter.tray_after_insert,state.tray)) return null;
    } else {
      if (clear.type !== 'triple_clear' || clear.kind !== enter.tile.kind || sameKind.length !== 3
        || !Array.isArray(clear.tile_ids) || clear.tile_ids.length !== 3
        || !clear.tile_ids.every(integer) || new Set(clear.tile_ids).size !== 3
        || !sameKind.every(tile => clear.tile_ids.includes(tile.id))
        || !sameTray(enter.tray_after_insert.filter(tile => !clear.tile_ids.includes(tile.id)),state.tray)
        || (Array.isArray(state.tiles) && state.tiles.some(tile => clear.tile_ids.includes(tile.id)))) return null;
    }
    return {enter,clear:clear || null,code:codeFor(enter.tile.kind,state.symbols)};
  }

  class Director {
    constructor({audio = {}, view = {}, now, visible, reducedMotion, setTimeout: schedule,
      clearTimeout: unschedule} = {}) {
      this.audio = audio; this.view = view;
      this.now = now || (() => globalThis.performance?.now?.() ?? Date.now());
      this.visible = visible || (() => globalThis.document?.visibilityState !== 'hidden');
      this.reducedMotion = reducedMotion || (() => !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
      this.schedule = schedule || globalThis.setTimeout.bind(globalThis);
      this.unschedule = unschedule || globalThis.clearTimeout.bind(globalThis);
      this._timers = new Set(); this._cleanups = new Set(); this._token = 0;
      this._epoch = null; this._lastSeq = -1; this._state = null;
      this._lastStartedAt = -Infinity; this._ruleStartedAt = new Map();
    }

    _call(target, method, ...args) {
      try {
        const result = target?.[method]?.(...args);
        if (typeof result === 'function') this._cleanups.add(result);
        if (result && typeof result.catch === 'function') result.catch(() => {});
      } catch (_) { /* A failed resource must not affect the real game. */ }
    }

    _visible() { try { return !!this.visible(); } catch (_) { return false; } }
    _reduced() { try { return !!this.reducedMotion(); } catch (_) { return true; } }

    cancel({reset = false} = {}) {
      this._token += 1;
      for (const timer of this._timers) this.unschedule(timer);
      this._timers.clear();
      for (const cleanup of this._cleanups) { try { cleanup(); } catch (_) {} }
      this._cleanups.clear();
      this._call(this.audio,'stopAll'); this._call(this.view,'cancel');
      if (reset) {
        this._lastStartedAt = -Infinity; this._ruleStartedAt.clear();
        this._epoch = null; this._lastSeq = -1; this._state = null;
      }
    }

    _current(batch) {
      if (batch.token !== this._token || batch.epoch !== this._epoch || batch.seq !== this._lastSeq) return false;
      if (!this._visible() || this.now() > batch.expiresAt
        || batch.actors.some(actor => !this._state?.tray?.some(tile => tile.id === actor.id && tile.kind === actor.kind))) {
        this.cancel(); return false;
      }
      return true;
    }

    _later(batch, delay, callback) {
      const due = batch.startedAt + delay;
      const run = () => {
        if (!this._current(batch)) return;
        if (this.now() - due > 120) { this.cancel(); return; }
        callback();
      };
      if (delay <= 0) { run(); return; }
      const timer = this.schedule(() => {this._timers.delete(timer);run();},delay);
      this._timers.add(timer);
    }

    consume(presentation, state, {epoch,seq} = {}) {
      if (!integer(epoch) || !integer(seq) || (this._epoch !== null && epoch < this._epoch)
        || (epoch === this._epoch && seq <= this._lastSeq)) return {kind:'skipped',reason:'stale'};
      if (epoch !== this._epoch) { this.cancel({reset:true}); this._epoch = epoch; }
      else this.cancel();
      // Mark invalid and hidden deliveries as consumed too; they never replay.
      this._lastSeq = seq; this._state = state;
      const validated = validatePresentation(presentation,state);
      if (!validated) return {kind:'skipped',reason:'invalid'};
      if (!this._visible()) return {kind:'skipped',reason:'hidden'};
      const {enter,clear,code} = validated;
      const profile = profileFor(code);
      if (!profile) return {kind:'skipped',reason:'configuration'};
      const reduced = this._reduced();
      this._call(this.view,'enter',enter.tile.id,reduced ? {...profile,enter_motion:'still',clear_motion:'fade'} : profile);
      this._call(this.audio,'play',profile.enter_sound,{priority:clear ? 3 : 2,
        duration:Math.min(profile.sound_duration_seconds || .25,.18)});
      if (clear) {
        this._call(this.view,'clear',reduced ? {...clear,reduced_motion:true} : clear,enter);
        return {kind:'clear',tileId:enter.tile.id};
      }
      const startedAt = this.now();
      const selection = selectInteraction({tray:state.tray,enteredTileId:enter.tile.id,symbols:state.symbols,
        now:startedAt,lastStartedAt:this._lastStartedAt,ruleStartedAt:this._ruleStartedAt});
      if (!selection) return {kind:'enter',tileId:enter.tile.id};
      const {script,actors} = selection;
      this._lastStartedAt = startedAt; this._ruleStartedAt.set(script.id,startedAt);
      const batch = {token:this._token,epoch,seq,startedAt,expiresAt:startedAt+Math.min(script.duration_ms,600),
        actors:Object.values(actors).map(id => ({...state.tray.find(tile => tile.id === id)}))};
      const enterDuration = theater.motions?.[profile.enter_motion]?.duration || 160;
      for (const cue of script.cues || []) {
        const id = actors[cue.actor];
        if (!integer(id) || !Number.isFinite(cue.at) || cue.at < 0 || cue.at > 600) continue;
        const duration = Math.min(cue.duration || theater.motions?.[cue.motion]?.duration || 180,250);
        const delay = cue.motion && id === enter.tile.id ? Math.max(cue.at,enterDuration) : cue.at;
        if (delay+duration > Math.min(script.duration_ms,600)) continue;
        this._later(batch,delay,() => {
          if (cue.motion && own(theater.motions || {},cue.motion)) this._call(this.view,'motion',id,this._reduced()?'still':cue.motion,duration);
          if (cue.reaction && ['exclamation','sweat','heart','note','sleep','sparkle'].includes(cue.reaction)) this._call(this.view,'reaction',id,cue.reaction,duration);
          if (cue.sound && id !== enter.tile.id) {
            const peer = profileFor(cue.actor);
            const remaining = (Math.min(script.duration_ms,600)-(this.now()-startedAt))/1000;
            if (remaining > 0) this._call(this.audio,'play',peer?.enter_sound || 'apple',{
              priority:3,duration:Math.min(peer?.sound_duration_seconds || .25,remaining)});
          }
        });
      }
      return {kind:'interaction',scriptId:script.id,actors:{...actors},tileId:enter.tile.id};
    }
  }
  Object.assign(theater,{selectInteraction,Director});
})();
