'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, '../web/audio-manager.js'), 'utf8');

function setup({saved, storageError = false, resume, fetcher, decoder} = {}) {
  const stored = new Map(saved ? [['tile-explorer.settings.v02', saved]] : []);
  const sources = [], gains = [];
  let context;
  class FakeContext {
    constructor() {
      context = this;
      this.state = 'suspended';
      this.currentTime = 12;
      this.destination = {};
      this.suspendCount = 0;
    }
    createGain() {
      const events = [];
      const node = {disconnected: false,
        gain: {value: 1, events,
          setValueAtTime(value, at) { events.push({type: 'set', value, at}); },
          linearRampToValueAtTime(value, at) { events.push({type: 'ramp', value, at}); },
          cancelScheduledValues(at) { events.push({type: 'cancel', at}); },
        },
        connect(target) { this.target = target; },
        disconnect() { this.disconnected = true; },
      };
      gains.push(node); return node;
    }
    async resume() {
      if (resume) await resume();
      this.state = 'running';
    }
    async suspend() { this.suspendCount++; this.state = 'suspended'; }
    async decodeAudioData(data) { return decoder ? decoder(data) : {duration: .2}; }
    advance(seconds) {
      const endAt = this.currentTime + seconds;
      for (;;) {
        const next = sources.filter(source => !source.stopped)
          .map(source => ({source, at: Math.min(source.stopAt ?? Infinity, source.naturalEndAt ?? Infinity)}))
          .filter(item => item.at <= endAt).sort((a, b) => a.at - b.at)[0];
        if (!next) break;
        this.currentTime = Math.max(this.currentTime, next.at); next.source.end();
      }
      this.currentTime = endAt;
    }
    createBufferSource() {
      const source = {
        stopped: false,
        disconnected: false,
        connect(target) { this.target = target; },
        disconnect() { this.disconnected = true; },
        start(at) { this.at = at; this.naturalEndAt = at + this.buffer.duration; },
        stop(at) {
          this.stopAt = at;
          if (at === undefined || at <= context.currentTime) this.end();
        },
        end() {
          if (this.stopped) return;
          this.stopped = true; this.endedAt = context.currentTime;
          if (this.onended) this.onended();
        },
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
  return {AudioManager: sandbox.TileTheater.AudioManager, sandbox, stored, sources, gains,
    get context() { return context; }};
}

function maximumVoices(sources) {
  const edges = sources.flatMap(source => {
    const endAt = Math.min(source.endedAt ?? Infinity, source.stopAt ?? Infinity, source.naturalEndAt ?? Infinity);
    return endAt > source.at ? [[source.at, 1], [endAt, -1]] : [];
  }).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let active = 0, maximum = 0;
  for (const [, change] of edges) { active += change; maximum = Math.max(maximum, active); }
  return maximum;
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
  fixture.context.advance(.02);
  manager.setEnabled(false);
  assert.equal(fixture.sources[0].stopped, false, 'muting finishes a short release');
  fixture.context.advance(.006);
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
  fixture.context.advance(.02);
  assert.equal(manager.play('dog', {priority: 0}), false);
  assert.equal(fixture.sources.length, 2);
  assert.equal(manager.play('dog', {priority: 2, delay: .12}), true);
  assert.equal(fixture.sources[0].stopped, false, 'replacement releases the outgoing voice');
  assert.equal(fixture.sources[1].stopped, false);
  assert.equal(fixture.sources[2].at, fixture.context.currentTime + .12);
  assert.equal(manager.voices.size, 2);
  fixture.sources[1].end();
  assert.equal(manager.voices.size, 1);
  manager.stopAll();
  assert.equal(manager.voices.size, 0);
  assert.equal(fixture.sources[2].stopped, true);
  fixture.context.advance(.006);
  assert.equal(fixture.sources[0].stopped, true);
  assert.equal(manager._retiring.size, 0);
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
  assert.equal(fixture.sources[1].stopAt, 12.2, 'duration cannot exceed the actual buffer');
  assert.equal(manager.play('dog'), false);
  fixture.context.advance(.05);
  assert.equal(manager.voices.size, 1);
  assert.equal(manager.play('dog'), true, 'expired source no longer consumes a voice');
  assert.equal(fixture.sources[2].stopAt, 12.25, 'omitting duration preserves the full buffer');
  fixture.context.advance(.6);
  assert.equal(manager.voices.size, 0);
});

test('each voice has a quiet master and short attack and release for natural and clipped playback', async () => {
  const fixture = setup(), manager = await ready(fixture);
  assert.equal(fixture.gains[0].gain.value, .30);
  manager.play('apple');
  const natural = fixture.gains[1];
  assert.equal(fixture.sources[0].target, natural);
  assert.equal(natural.target, manager.master);
  assert.deepEqual(natural.gain.events, [
    {type: 'set', value: 0, at: 12}, {type: 'ramp', value: 1, at: 12.004},
    {type: 'set', value: 1, at: 12.19}, {type: 'ramp', value: 0, at: 12.2},
  ]);
  manager.play('cat', {duration: .08});
  const clipped = fixture.gains[2].gain.events;
  assert.ok(Math.abs(clipped[2].at - 12.07) < 1e-9);
  assert.equal(clipped[3].value, 0);
  assert.equal(clipped[3].at, 12.08);
  fixture.context.advance(.2);
  assert.ok(fixture.gains.slice(1).every(node => node.disconnected));
  assert.equal(manager.voices.size, 0);
});

test('early cancellation holds the current attack or release level before its short fade', async () => {
  for (const age of [.002, .196]) {
    const fixture = setup(), manager = await ready(fixture);
    manager.play('apple'); fixture.context.advance(age); manager.stopAll();
    const source = fixture.sources[0], automation = fixture.gains[1].gain.events;
    const held = automation.at(-2);
    assert.equal(automation.at(-3).type, 'cancel');
    assert.ok(Math.abs(held.value - (age < .004 ? .5 : .4)) < 1e-9);
    assert.equal(source.disconnected, false, 'the gain remains connected throughout the release');
    assert.ok(source.stopAt <= fixture.context.currentTime + .006 + 1e-9);
    fixture.context.advance(.006);
    assert.equal(source.disconnected, true);
    assert.equal(manager._retiring.size, 0);
  }
});

test('rapid interruption and priority replacement never overlap more than two sounding sources', async () => {
  const fixture = setup(), manager = await ready(fixture);
  manager.play('apple', {priority: 0}); manager.play('cat', {priority: 1});
  fixture.context.advance(.02);
  manager.play('dog', {priority: 2});
  assert.equal(fixture.sources[2].at, fixture.sources[0].stopAt);
  assert.equal(manager.voices.size, 2);
  assert.equal(manager._retiring.size, 1);
  manager.stopAll();
  for (let index = 0; index < 20; index++) {
    manager.play('apple'); manager.stopAll();
    assert.ok(manager._retiring.size <= 2);
  }
  manager.play('dog');
  assert.ok(maximumVoices(fixture.sources) <= 2);
  fixture.context.advance(.3);
  assert.equal(manager.voices.size, 0);
  assert.equal(manager._retiring.size, 0);
  assert.ok(fixture.sources.every(source => source.disconnected));
});

test('suspending during a fade retires voices despite the frozen audio clock', async () => {
  const fixture = setup(), manager = await ready(fixture);
  manager.play('apple'); fixture.context.advance(.02);
  await manager.suspend();
  assert.equal(manager.voices.size, 0);
  assert.equal(manager._retiring.size, 0);
  assert.equal(fixture.sources[0].disconnected, true);
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
  assert.equal(manifest.revision, 'v02-gentle-pentatonic-1');
  assert.match(manifest.sound_palette, /C-major pentatonic/);
  assert.ok(manifest.notes.length >= 4);
  const palette = new Set(['C5', 'D5', 'E5', 'G5', 'A5', 'C6']);
  let total = 0;
  const hashes = new Set();
  const levels = [];
  for (const asset of manifest.assets) {
    const data = fs.readFileSync(path.join(base, `${asset.id}.wav`));
    assert.equal(data.subarray(0, 4).toString(), 'RIFF');
    assert.equal(data.subarray(8, 12).toString(), 'WAVE');
    assert.equal(data.readUInt16LE(20), 1, 'PCM');
    assert.equal(data.readUInt16LE(22), 1, 'mono');
    assert.equal(data.readUInt32LE(24), 22050);
    assert.equal(data.readUInt16LE(34), 16);
    assert.equal(data.length, asset.bytes);
    assert.equal(asset.path, `/assets/audio/v02/${asset.id}.wav`);
    assert.ok(asset.duration_seconds >= .08 && asset.duration_seconds <= .16);
    const sampleCount = data.readUInt32LE(40) / 2;
    assert.equal(data.length, 44 + sampleCount * 2);
    assert.ok(Math.abs(sampleCount / 22050 - asset.duration_seconds) < .000001);
    assert.ok(asset.notes.length >= 1 && asset.notes.every(note => palette.has(note)));
    assert.match(asset.source, /Original offline musical synthesis/);
    const samples = Array.from({length: sampleCount}, (_, index) => data.readInt16LE(44 + index * 2) / 32767);
    const peak = Math.max(...samples.map(Math.abs));
    const rms = Math.sqrt(samples.reduce((sum, sample) => sum + sample * sample, 0) / sampleCount);
    const mean = samples.reduce((sum, sample) => sum + sample, 0) / sampleCount;
    const maxStep = Math.max(...samples.slice(1).map((sample, index) => Math.abs(sample - samples[index])));
    assert.ok(peak >= .3 && peak <= .42, `${asset.id}: gentle peak with ample headroom`);
    assert.ok(Math.abs(peak - asset.peak_amplitude) < .000001);
    assert.ok(Math.abs(rms - asset.rms_amplitude) < .000001);
    assert.ok(Math.abs(mean) < 1 / 32767, `${asset.id}: no DC bias`);
    assert.equal(samples[0], 0, `${asset.id}: starts silently`);
    assert.equal(samples.at(-1), 0, `${asset.id}: ends silently`);
    assert.ok(maxStep < .13, `${asset.id}: no abrupt PCM discontinuities`);
    assert.ok(samples.slice(0, 22).every(sample => Math.abs(sample) < .03), `${asset.id}: smooth attack`);
    assert.ok(samples.slice(-22).every(sample => Math.abs(sample) < .005), `${asset.id}: smooth release`);
    levels.push(rms);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    assert.equal(hash, asset.sha256);
    hashes.add(hash);
    total += data.length;
  }
  assert.equal(hashes.size, 18);
  assert.ok(Math.max(...levels) / Math.min(...levels) < 1.5, 'consistent perceived cue levels');
  assert.equal(total, manifest.total_audio_bytes);
  assert.ok(total < 2_000_000);
});
