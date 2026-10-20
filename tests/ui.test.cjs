'use strict';
// Run the actual UI and director against a small DOM/clock adapter. This checks
// interaction lifecycles, not browser layout, rendering quality or autoplay.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'web/index.html'), 'utf8');
const codes = 'apple banana cherry grape orange strawberry car taxi bus train bicycle scooter cat dog rabbit panda fox bear'.split(' ');
const symbols = codes.map(code => ({code, name: code, color: '#abcdef'}));
const clone = value => JSON.parse(JSON.stringify(value));
const settle = () => new Promise(resolve => setImmediate(resolve));
const held = (id, kind = 0) => ({id, kind});
const tile = (id, kind = 0) => ({id, kind, x: id * 2, y: 0, z: 0, blocked: false});

function state(tray = [], tiles = [tile(0), tile(1, 6), tile(2, 12)]) {
  return {level: 1, level_count: 9, status: 'playing', tray, tiles, symbols, capacity: 7,
    total: 9, remaining: tray.length + tiles.length, moves: 0, matches: 0, score: 0,
    can_undo: tray.length > 0, progress: {completed: {}}, level_info: {},
    theme: {id: 'paris', city: '巴黎', country: '法国', facts: []}};
}

function entry(next, incoming, inserted = next.tray, clearIds) {
  const events = [{type: 'tray_enter', tile: incoming,
    insert_index: inserted.findIndex(item => item.id === incoming.id), tray_after_insert: inserted}];
  if (clearIds) events.push({type: 'triple_clear', kind: incoming.kind, tile_ids: clearIds});
  return {...next, presentation: {schema_version: 1, events}};
}

function setup(initial = state(), {reduced = false} = {}) {
  const fixture = {width: 420, time: 0, timers: new Map(), frames: new Map(), responses: [],
    requests: [], animations: [], observers: [], errors: [], nextId: 1};

  class Element {
    constructor(tag = 'div') {
      this.tagName = tag.toUpperCase(); this.children = []; this.parentNode = null;
      this.dataset = {}; this.attributes = {}; this.listeners = new Map(); this._classes = new Set();
      this.style = {setProperty(name, value) { this[name] = value; }};
      this.hidden = false; this.disabled = false; this.open = false; this.textContent = '';
      this.classList = {
        add: (...names) => names.forEach(name => this._classes.add(name)),
        remove: (...names) => names.forEach(name => this._classes.delete(name)),
        contains: name => this._classes.has(name),
        toggle: (name, force) => { const add = force ?? !this._classes.has(name);
          if (add) this._classes.add(name); else this._classes.delete(name); return add; },
      };
    }
    set className(value) { this._classes = new Set(value.split(/\s+/).filter(Boolean)); }
    get className() { return [...this._classes].join(' '); }
    set innerHTML(value) { this._html = value; this.replaceChildren(); }
    get innerHTML() { return this._html || ''; }
    get firstElementChild() { return this.children[0] || null; }
    appendChild(child) { child.remove(); this.children.push(child); child.parentNode = this; return child; }
    append(...children) { children.forEach(child => this.appendChild(child)); }
    remove() { if (this.parentNode) { const parent = this.parentNode;
      parent.children.splice(parent.children.indexOf(this), 1); this.parentNode = null; } }
    replaceChildren(...children) { for (const child of [...this.children]) child.remove(); this.append(...children); }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(name, callback, options) {
      if (!this.listeners.has(name)) this.listeners.set(name, []);
      this.listeners.get(name).push({callback, capture: options?.capture || options === true});
    }
    fire(name, event = {}, capture) {
      for (const listener of this.listeners.get(name) || []) {
        if (capture === undefined || listener.capture === capture) listener.callback(event);
      }
    }
    querySelectorAll(selector) {
      const descendants = this.children.flatMap(child => [child, ...child.querySelectorAll('*')]);
      if (selector === '*') return descendants;
      if (selector.startsWith('.')) return descendants.filter(child => child.classList.contains(selector.slice(1)));
      return descendants.filter(child => child.tagName === selector.toUpperCase());
    }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    showModal() { this.open = true; }
    close() { this.open = false; }
    get clientWidth() { return this.id === 'board' ? fixture.width : 400; }
    get clientHeight() { return Number.parseFloat(this.style.height) || 620; }
    getBoundingClientRect() {
      if (this.id === 'board') return {left: 0, top: 120, width: fixture.width,
        height: this.clientHeight, right: fixture.width, bottom: 120 + this.clientHeight};
      if (this.classList.contains('tray-slot')) {
        const index = this.parentNode.children.filter(child => child.classList.contains('tray-slot')).indexOf(this);
        return {left: 10 + index * 54, top: 20, width: 50, height: 50};
      }
      if (this.classList.contains('tray-actor')) {
        const match = /translate3d\(([-\d.]+)px,([-\d.]+)px,0\)/.exec(this.style.transform || '');
        return {left: 10 + Number(match?.[1] || 0), top: 20 + Number(match?.[2] || 0),
          width: Number.parseFloat(this.style.width) || 50, height: Number.parseFloat(this.style.height) || 50};
      }
      return {left: 10, top: 20, width: 400, height: 50};
    }
    animate(keyframes, options) {
      const animation = {element: this, keyframes, options, playState: 'running',
        cancel() { if (this.playState !== 'running') return; this.playState = 'idle'; this.oncancel?.(); },
        finish() { if (this.playState !== 'running') return; this.playState = 'finished'; this.onfinish?.(); }};
      fixture.animations.push(animation); return animation;
    }
  }

  const nodes = new Map();
  for (const match of html.matchAll(/<([a-z][\w-]*)\b[^>]*\bid="([^"]+)"[^>]*>/gi)) {
    const node = new Element(match[1]); node.id = match[2]; nodes.set(node.id, node);
  }
  const document = new Element('document'); document.hidden = false;
  document.documentElement = new Element('html'); document.body = new Element('body');
  document.getElementById = id => { assert.ok(nodes.has(id), `HTML must contain #${id}`); return nodes.get(id); };
  document.createElement = tag => new Element(tag);
  document.querySelectorAll = selector => selector === 'dialog' ? [...nodes.values()].filter(node => node.tagName === 'DIALOG') : [];
  document.querySelector = selector => selector === 'dialog[open]' ? [...nodes.values()].find(node => node.open) : null;
  for (let i = 0; i < 3; i++) nodes.get('city-route').appendChild(new Element('li'));
  const preference = new Element(); preference.matches = reduced;

  class Audio {
    constructor() { fixture.audio = this; this.enabled = true; this.plays = []; this.active = 0; this.unlocks = 0; this.suspends = 0; }
    unlock() { this.unlocks++; return Promise.resolve(true); }
    preload() { return Promise.resolve([]); }
    play(code) { if (!this.enabled || document.hidden) return false; this.plays.push(code); this.active++; return true; }
    stopAll() { this.active = 0; }
    setEnabled(value) { this.enabled = value; if (!value) this.stopAll(); }
    suspend() { this.suspends++; this.stopAll(); return Promise.resolve(); }
  }
  const response = data => ({ok: true, json: async () => clone(data)});
  const sandbox = {
    document, console: {error: (...args) => fixture.errors.push(args)}, performance: {now: () => fixture.time},
    TileTheater: {AudioManager: Audio},
    matchMedia: () => preference, Image: class {},
    ResizeObserver: class { constructor(callback) { fixture.observers.push(callback); } observe() {} },
    setTimeout(callback, duration) { const id = fixture.nextId++; fixture.timers.set(id, {callback, due: fixture.time + duration}); return id; },
    clearTimeout(id) { fixture.timers.delete(id); },
    requestAnimationFrame(callback) { const id = fixture.nextId++; fixture.frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { fixture.frames.delete(id); },
    fetch: async (url, options) => {
      if (url === '/api/state') return response(initial);
      assert.equal(url, '/api/action'); fixture.requests.push(JSON.parse(options.body));
      assert.ok(fixture.responses.length, 'Every action must have a prepared response');
      return await fixture.responses.shift();
    },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const filename of ['tray-content.js', 'tray-director.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'web', filename), 'utf8'), sandbox, {filename});
  }
  Object.assign(fixture, {
    document, nodes, preference,
    queue(data) { this.responses.push(response(data)); },
    defer() { let resolve; this.responses.push(new Promise(done => {resolve = data => done(response(data));})); return resolve; },
    click(node) {
      assert.ok(node, 'Clicked node must exist'); assert.equal(node.disabled, false);
      const event = {target: node, preventDefault() {}};
      document.fire('click', event, true); node.fire('click', event); document.fire('click', event, false);
    },
    tile(id) { return nodes.get('board-cards').children.find(node => node.dataset.id === String(id)); },
    actors() { return nodes.get('tray').querySelectorAll('.tray-actor').filter(node => !node.classList.contains('tray-ghost')); },
    ghosts() { return nodes.get('tray').querySelectorAll('.tray-ghost'); },
    running() { return this.animations.filter(animation => animation.playState === 'running'); },
    resize() { const contentRect = nodes.get('board').getBoundingClientRect(); this.observers.forEach(callback => callback([{contentRect}])); },
    frame() { const callbacks = [...this.frames.values()]; this.frames.clear(); callbacks.forEach(callback => callback(this.time)); },
    hide(value) { document.hidden = value; document.fire('visibilitychange'); },
    advance(duration) {
      const end = this.time + duration;
      while (true) {
        const next = [...this.timers].filter(([, timer]) => timer.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
        if (!next) break;
        this.time = next[1].due; this.timers.delete(next[0]); next[1].callback();
      }
      this.time = end;
    },
  });
  return fixture;
}

test('slots and existing actor nodes survive successive authoritative responses', async () => {
  const ui = setup(); await settle();
  const slots = ui.nodes.get('tray').querySelectorAll('.tray-slot');
  const first = state([held(0)], [tile(1, 6), tile(2, 12)]);
  ui.queue(entry(first, held(0))); ui.click(ui.tile(0)); await settle();
  const apple = ui.actors()[0];
  const second = state([held(0), held(1, 6)], [tile(2, 12)]);
  ui.queue(entry(second, held(1, 6))); ui.click(ui.tile(1)); await settle();
  assert.equal(ui.actors().find(node => node.dataset.id === '0'), apple);
  assert.equal(ui.actors().length, 2);
  assert.deepEqual(ui.nodes.get('tray').querySelectorAll('.tray-slot'), slots);
  assert.equal(ui.errors.length, 0);
});

test('three clear ghosts never become real actors and a new click clears them without waiting', async () => {
  const ui = setup(state([held(10), held(11), held(12, 6)], [tile(0), tile(1, 12)])); await settle();
  const survivor = ui.actors().find(node => node.dataset.id === '12');
  const cleared = state([held(12, 6)], [tile(1, 12)]);
  ui.queue(entry(cleared, held(0), [held(10), held(11), held(0), held(12, 6)], [10, 11, 0]));
  ui.click(ui.tile(0)); await settle();
  assert.equal(ui.actors().length, 1); assert.equal(ui.actors()[0], survivor);
  assert.equal(ui.ghosts().length, 3);
  assert.match(ui.nodes.get('tray-count').innerHTML, /^1 /);
  const next = state([held(12, 6), held(1, 12)], []);
  ui.queue(entry(next, held(1, 12))); ui.click(ui.tile(1)); await settle();
  assert.equal(ui.requests.length, 2, 'An active animation must not hold the request lock');
  assert.equal(ui.ghosts().length, 0); assert.equal(ui.actors().length, 2);
  assert.equal(ui.errors.length, 0);
});

test('ghosts are removed after completion, including the reduced motion fallback', async () => {
  for (const reduced of [false, true]) {
    const ui = setup(state([held(10), held(11)], [tile(0)]), {reduced}); await settle();
    const next = {...state([], []), status: 'won', stars: 3};
    ui.queue(entry(next, held(0), [held(10), held(11), held(0)], [10, 11, 0]));
    ui.click(ui.tile(0)); await settle();
    assert.equal(ui.actors().length, 0); assert.equal(ui.ghosts().length, 3);
    if (reduced) ui.advance(121); else ui.running().forEach(animation => animation.finish());
    assert.equal(ui.ghosts().length, 0); assert.equal(ui.running().length, 0);
  }
});

test('a response delivered in the background updates actors without replaying its effects', async () => {
  const ui = setup(); await settle();
  const resolve = ui.defer(); ui.click(ui.tile(0)); ui.hide(true);
  const next = state([held(0)], [tile(1, 6), tile(2, 12)]);
  resolve(entry(next, held(0))); await settle();
  assert.equal(ui.actors().length, 1); assert.equal(ui.running().length, 0);
  assert.equal(ui.audio.plays.length, 0); assert.equal(ui.audio.suspends, 1);
  const unlocks = ui.audio.unlocks;
  ui.hide(false); ui.advance(1000);
  assert.equal(ui.audio.unlocks, unlocks, 'Visibility alone must not resume audio');
  assert.equal(ui.audio.plays.length, 0); assert.equal(ui.running().length, 0);
});

test('leaving and returning while a request is pending discards its later presentation', async () => {
  const ui = setup(); await settle();
  const resolve = ui.defer(); ui.click(ui.tile(0));
  ui.hide(true); ui.hide(false);
  resolve(entry(state([held(0)], [tile(1, 6), tile(2, 12)]), held(0))); await settle();
  assert.equal(ui.actors().length, 1, 'The successful move still updates authoritative state');
  assert.equal(ui.audio.plays.length, 0); assert.equal(ui.running().length, 0);
  assert.equal(ui.ghosts().length, 0); ui.advance(1000);
  assert.equal(ui.audio.plays.length, 0); assert.equal(ui.running().length, 0);
});

test('muting stops sound while retaining real actors and permits silent interaction cues', async () => {
  const ui = setup(state([held(10)], [tile(0, 12)])); await settle();
  const next = state([held(10), held(0, 12)], []);
  ui.queue(entry(next, held(0, 12))); ui.click(ui.tile(0)); await settle();
  const actors = [...ui.actors()]; assert.ok(ui.audio.active > 0);
  ui.click(ui.nodes.get('sound-button'));
  assert.equal(ui.audio.enabled, false); assert.equal(ui.audio.active, 0);
  assert.equal(ui.nodes.get('sound-button').attributes['aria-pressed'], 'false');
  const plays = ui.audio.plays.length; ui.advance(500);
  assert.equal(ui.audio.plays.length, plays); assert.deepEqual(ui.actors(), actors);
});

test('initial and same-size resize notifications preserve new feedback; a real resize cancels it', async () => {
  const ui = setup(); await settle();
  const next = state([held(0)], [tile(1, 6), tile(2, 12)]);
  ui.queue(entry(next, held(0))); ui.click(ui.tile(0)); await settle();
  assert.ok(ui.running().length > 0);
  ui.resize(); ui.frame(); assert.ok(ui.running().length > 0, 'First observation has no changed size');
  ui.resize(); ui.frame(); assert.ok(ui.running().length > 0, 'Repeated geometry must not cancel an actor');
  ui.width = 375; ui.resize(); ui.frame();
  assert.equal(ui.running().length, 0); assert.equal(ui.actors().length, 1);
});

test('shuffle replaces the scene and cancels delayed cues from its predecessor', async () => {
  const ui = setup(state([held(10), held(11, 6)], [tile(0, 12)])); await settle();
  const next = state([held(10), held(11, 6), held(0, 12)], []);
  ui.queue(entry(next, held(0, 12))); ui.click(ui.tile(0)); await settle();
  assert.ok(ui.timers.size > 0, 'The three-role script has delayed cues');
  ui.queue(state([], [tile(0), tile(10, 6), tile(11, 12)]));
  ui.click(ui.nodes.get('shuffle-button')); await settle();
  const plays = ui.audio.plays.length; ui.advance(1000);
  assert.equal(ui.actors().length, 0); assert.equal(ui.ghosts().length, 0);
  assert.equal(ui.running().length, 0); assert.equal(ui.audio.plays.length, plays);
  assert.equal(ui.nodes.get('tray').querySelectorAll('.tray-slot').length, 7);
  assert.equal(ui.errors.length, 0);
});
