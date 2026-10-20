'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, '../web/audio-manager.js'), 'utf8');

function setup({saved, storageError = false, resume, fetcher, decoder} = {}) {
  const stored = new Map(saved ? [['tile-explorer.settings.v02', saved]] : []);
  const sources = [];
  let context;
  class FakeContext {
    constructor() {
      context = this;
      this.state = 'suspended';
      this.currentTime = 12;
      this.destination = {};
      this.suspendCount = 0;
    }
    createGain() { return {gain: {value: 1}, connect() {}}; }
    async resume() {
      if (resume) await resume();
      this.state = 'running';
    }
    async suspend() { this.suspendCount++; this.state = 'suspended'; }
    async decodeAudioData(data) { return decoder ? decoder(data) : {duration: .2}; }
    advance(seconds) {
      this.currentTime += seconds;
      for (const source of sources) {
        if (!source.stopped && source.stopAt !== undefined && source.stopAt <= this.currentTime) source.end();
      }
    }
    createBufferSource() {
      const source = {
        stopped: false,
        disconnected: false,
        connect() {},
        disconnect() { this.disconnected = true; },
        start(at) { this.at = at; },
        stop(at) {
          this.stopAt = at;
          if (at === undefined || at <= context.currentTime) this.end();
        },
        end() { this.stopped = true; if (this.onended) this.onended(); },
      };
      sources.push(source);
      return source;
    }
  }
  const sandbox = {
    AudioContext: FakeContext,
    document: {hidden: false},
    localStorage: {
      getItem(key) { if (storageError) throw Error('Blocked'); return stored.get(key); },
      setItem(key, value) { if (storageError) throw Error('Blocked'); stored.set(key, value); },
    },
    fetch: fetcher || (async () => ({ok: true, arrayBuffer: async () => new ArrayBuffer(4)})),
  };
  vm.createContext(sandbox);
  vm.runInContext(script, sandbox);
  return {AudioManager: sandbox.TileTheater.AudioManager, sandbox, stored, sources, get context() { return context; }};
}

async function ready(fixture, codes = ['apple', 'cat', 'dog']) {
  const manager = new fixture.AudioManager();
  await manager.unlock();
  await manager.preload(codes);
  return manager;
}

test('sound preference persists independently and preserves other settings', async () => {
  const fixture = setup({saved: JSON.stringify({soundEnabled: false, visual: 'low'})});
  const manager = new fixture.AudioManager();
  assert.equal(manager.enabled, false);
  assert.equal(await manager.unlock(), false);
  assert.equal(fixture.context, undefined);
  manager.setEnabled(true);
  assert.equal(await manager.unlock(), true);
  await manager.preload(['apple']);
  assert.equal(manager.play('apple'), true);
  manager.setEnabled(false);
  assert.equal(fixture.sources[0].stopped, true);
  assert.equal(manager.play('apple'), false);
  assert.deepEqual(JSON.parse(fixture.stored.get('tile-explorer.settings.v02')), {soundEnabled: false, visual: 'low'});
});

test('blocked or malformed storage uses a working in-memory setting', () => {
  for (const fixture of [setup({storageError: true}), setup({saved: 'null'}), setup({saved: '{bad json'})]) {
    const manager = new fixture.AudioManager();
    assert.equal(manager.enabled, true);
    assert.doesNotThrow(() => manager.setEnabled(false));
    assert.equal(manager.enabled, false);
  }
});

test('preload may fetch before a gesture but play never queues an unready sound', async () => {
  const fixture = setup();
  const manager = new fixture.AudioManager();
  assert.equal(manager.play('apple'), false);
  await manager.preload(['apple']);
  assert.equal(fixture.context, undefined);
  assert.equal(manager.play('apple'), false);
  await manager.unlock();
  await manager.preload(['apple']);
  assert.equal(fixture.sources.length, 0, 'discarded calls are never replayed');
  assert.equal(manager.play('apple'), true);
  assert.equal(manager.play('unknown'), false);
});

test('limits to two voices; only strictly greater priority can replace a voice', async () => {
  const fixture = setup();
  const manager = await ready(fixture);
  assert.equal(manager.play('apple', {priority: 0}), true);
  assert.equal(manager.play('cat', {priority: 1}), true);
  assert.equal(manager.play('dog', {priority: 0}), false);
  assert.equal(fixture.sources.length, 2);
  assert.equal(manager.play('dog', {priority: 2, delay: .12}), true);
  assert.equal(fixture.sources[0].stopped, true);
  assert.equal(fixture.sources[1].stopped, false);
  assert.equal(fixture.sources[2].at, 12.12);
  assert.equal(manager.voices.size, 2);
  fixture.sources[1].end();
  assert.equal(manager.voices.size, 1);
  manager.stopAll();
  assert.equal(manager.voices.size, 0);
  assert.equal(fixture.sources[2].stopped, true);
});

test('optional duration schedules an audio-clock stop after the delayed start', async () => {
  const fixture = setup();
  const manager = await ready(fixture);
  assert.equal(manager.play('apple', {delay: .12, duration: .08}), true);
  assert.equal(fixture.sources[0].at, 12.12);
  assert.equal(fixture.sources[0].stopAt, 12.20);
  assert.equal(fixture.sources[0].stopped, false, 'scheduled stopping does not stop immediately');
  assert.equal(manager.voices.size, 1);
  fixture.context.advance(.19);
  assert.equal(manager.voices.size, 1);
  fixture.context.advance(.02);
  assert.equal(fixture.sources[0].stopped, true);
  assert.equal(fixture.sources[0].disconnected, true);
  assert.equal(manager.voices.size, 0);
});

test('duration clamps to a short safe interval and expired voices free their slots', async () => {
  const fixture = setup();
  const manager = await ready(fixture);
  assert.equal(manager.play('apple', {duration: 0}), true);
  assert.equal(manager.play('cat', {duration: 2}), true);
  assert.equal(fixture.sources[0].stopAt, 12.04);
  assert.equal(fixture.sources[1].stopAt, 12.6);
  assert.equal(manager.play('dog'), false);
  fixture.context.advance(.05);
  assert.equal(manager.voices.size, 1);
  assert.equal(manager.play('dog'), true, 'expired source no longer consumes a voice');
  assert.equal(fixture.sources[2].stopAt, undefined, 'omitting duration preserves the full sound');
  fixture.context.advance(.6);
  assert.equal(manager.voices.size, 1);
  fixture.sources[2].end();
  assert.equal(manager.voices.size, 0);
});

test('hidden pages stop all voices and require a new gesture after returning', async () => {
  const fixture = setup();
  const manager = await ready(fixture);
  manager.play('apple', {delay: .3});
  fixture.sandbox.document.hidden = true;
  assert.equal(manager.play('cat'), false);
  await manager.suspend();
  assert.equal(fixture.sources[0].stopped, true);
  assert.equal(fixture.context.state, 'suspended');
  assert.equal(await manager.unlock(), false);
  fixture.sandbox.document.hidden = false;
  assert.equal(manager.play('cat'), false);
  assert.equal(await manager.unlock(), true);
  assert.equal(fixture.sources.length, 1);
  assert.equal(manager.play('cat'), true);
});

test('a pending resume cannot unlock sounds after moving to background', async () => {
  let resume;
  const fixture = setup({resume: () => new Promise(resolve => { resume = resolve; })});
  const manager = new fixture.AudioManager();
  const unlocking = manager.unlock();
  await manager.preload(['apple']);
  fixture.sandbox.document.hidden = true;
  await manager.suspend();
  resume();
  assert.equal(await unlocking, false);
  assert.equal(fixture.context.state, 'suspended');
  fixture.sandbox.document.hidden = false;
  assert.equal(manager.play('apple'), false);
  assert.equal(fixture.sources.length, 0);
});

test('muting while resume is pending discards its eventual result', async () => {
  let resume;
  const fixture = setup({resume: () => new Promise(resolve => { resume = resolve; })});
  const manager = new fixture.AudioManager();
  const unlocking = manager.unlock();
  manager.setEnabled(false);
  manager.setEnabled(true);
  resume();
  assert.equal(await unlocking, false);
  await manager.preload(['apple']);
  assert.equal(manager.play('apple'), false);
});

test('returning to foreground before an old resume finishes does not resume audio implicitly', async () => {
  let resume;
  const fixture = setup({resume: () => new Promise(resolve => { resume = resolve; })});
  const manager = new fixture.AudioManager();
  const unlocking = manager.unlock();
  fixture.sandbox.document.hidden = true;
  await manager.suspend();
  fixture.sandbox.document.hidden = false;
  resume();
  assert.equal(await unlocking, false);
  assert.equal(fixture.context.state, 'suspended');
  assert.equal(manager.play('apple'), false);
});

test('fetch/decode failures and unavailable audio gracefully stay silent', async () => {
  for (const fixture of [
    setup({fetcher: async () => ({ok: false})}),
    setup({fetcher: async () => { throw Error('Offline'); }}),
    setup({decoder: async () => { throw Error('Unsupported audio'); }}),
  ]) {
    const manager = await ready(fixture, ['apple']);
    assert.equal(manager.play('apple'), false);
    assert.equal(fixture.sources.length, 0);
  }
  const fixture = setup();
  fixture.sandbox.AudioContext = undefined;
  const manager = new fixture.AudioManager();
  assert.equal(await manager.unlock(), false);
  assert.equal(manager.play('apple'), false);
});

test('preloading deduplicates repeated codes and concurrent requests', async () => {
  let requests = 0;
  const fixture = setup({fetcher: async () => {
    requests++;
    return {ok: true, arrayBuffer: async () => new ArrayBuffer(4)};
  }});
  const manager = new fixture.AudioManager();
  await Promise.all([manager.preload(['cat', 'cat']), manager.preload(['cat'])]);
  assert.equal(requests, 1);
});

test('all generated assets are distinct bounded mono PCM and match their manifest', () => {
  const crypto = require('node:crypto');
  const base = path.join(__dirname, '../web/assets/audio/v02');
  const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));
  assert.equal(manifest.assets.length, 18);
  let total = 0;
  const hashes = new Set();
  for (const asset of manifest.assets) {
    const data = fs.readFileSync(path.join(base, `${asset.id}.wav`));
    assert.equal(data.subarray(0, 4).toString(), 'RIFF');
    assert.equal(data.subarray(8, 12).toString(), 'WAVE');
    assert.equal(data.readUInt16LE(20), 1, 'PCM');
    assert.equal(data.readUInt16LE(22), 1, 'mono');
    assert.equal(data.readUInt32LE(24), 22050);
    assert.equal(data.readUInt16LE(34), 16);
    assert.equal(data.length, asset.bytes);
    assert.ok(asset.duration_seconds >= .1 && asset.duration_seconds <= .35);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    assert.equal(hash, asset.sha256);
    hashes.add(hash);
    total += data.length;
  }
  assert.equal(hashes.size, 18);
  assert.equal(total, manifest.total_audio_bytes);
  assert.ok(total < 2_000_000);
});
