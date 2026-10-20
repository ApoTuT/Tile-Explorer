(() => {
  'use strict';
  const theater = globalThis.TileTheater = globalThis.TileTheater || {};
  const SETTINGS_KEY = 'tile-explorer.settings.v02';
  const CODES = 'apple banana cherry grape orange strawberry car taxi bus train bicycle scooter cat dog rabbit panda fox bear'.split(' ');

  /** Local short sounds only. Missing, late or unavailable sounds are discarded. */
  class AudioManager {
    constructor({profiles = {}} = {}) {
      this.profiles = profiles;
      this.context = null;
      this.master = null;
      this.buffers = new Map();
      this.raw = new Map();
      this.loading = new Map();
      this.decoding = new Map();
      this.failed = new Set();
      this.voices = new Set();
      this._enabled = true;
      this._unlocked = false;
      this._epoch = 0;
      try {
        const saved = JSON.parse(globalThis.localStorage.getItem(SETTINGS_KEY) || '{}');
        if (typeof saved.soundEnabled === 'boolean') this._enabled = saved.soundEnabled;
      } catch (_) { /* Storage is optional, including in private browsing. */ }
    }

    get enabled() { return this._enabled; }

    setEnabled(value) {
      this._enabled = Boolean(value);
      if (!this._enabled) {
        this._epoch += 1;
        this._unlocked = false;
        this.stopAll();
      }
      try {
        const saved = JSON.parse(globalThis.localStorage.getItem(SETTINGS_KEY) || '{}');
        const settings = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
        settings.soundEnabled = this._enabled;
        globalThis.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (_) { /* An in-memory setting still works when storage is blocked. */ }
    }

    _hidden() { return Boolean(globalThis.document && globalThis.document.hidden); }

    /** Call directly from a user gesture, before awaiting a game request. */
    async unlock() {
      if (!this.enabled || this._hidden()) return false;
      const epoch = this._epoch;
      try {
        if (!this.context) {
          const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
          if (!Context) return false;
          this.context = new Context();
          this.master = this.context.createGain();
          this.master.gain.value = 0.42;
          this.master.connect(this.context.destination);
        }
        if (this.context.state === 'closed') return false;
        if (this.context.state !== 'running') await this.context.resume();
        if (epoch !== this._epoch || !this.enabled || this._hidden()) {
          // A background transition or mute may win while resume() is pending.
          if (!this._unlocked && this.context.state === 'running') {
            await this.context.suspend();
          }
          return false;
        }
        this._unlocked = this.context.state === 'running';
        if (this._unlocked) {
          for (const code of this.raw.keys()) void this._decode(code);
        }
        return this._unlocked;
      } catch (_) {
        if (epoch === this._epoch) this._unlocked = false;
        return false;
      }
    }

    _url(code) {
      const profile = this.profiles[code];
      if (typeof profile === 'string') return profile;
      if (profile && typeof profile === 'object') {
        const path = profile.audio || profile.src || profile.url;
        if (typeof path === 'string') return path;
      }
      return CODES.includes(code) ? `/assets/audio/v02/${code}.wav` : null;
    }

    async _decode(code) {
      if (this.buffers.has(code)) return true;
      if (!this.context || !this.raw.has(code) || this.failed.has(code)) return false;
      if (this.decoding.has(code)) return this.decoding.get(code);
      const task = (async () => {
        try {
          const buffer = await this.context.decodeAudioData(this.raw.get(code).slice(0));
          this.buffers.set(code, buffer);
          this.raw.delete(code);
          return true;
        } catch (_) {
          this.failed.add(code);
          this.raw.delete(code);
          return false;
        } finally {
          this.decoding.delete(code);
        }
      })();
      this.decoding.set(code, task);
      return task;
    }

    async _load(code) {
      if (this.buffers.has(code)) return true;
      if (this.failed.has(code)) return false;
      if (this.loading.has(code)) return this.loading.get(code);
      const url = this._url(code);
      if (!url) return false;
      const task = (async () => {
        try {
          if (!this.raw.has(code)) {
            const response = await globalThis.fetch(url);
            if (!response.ok) throw new Error('Sound unavailable');
            this.raw.set(code, await response.arrayBuffer());
          }
          return this.context ? await this._decode(code) : true;
        } catch (_) {
          this.failed.add(code);
          return false;
        } finally {
          this.loading.delete(code);
        }
      })();
      this.loading.set(code, task);
      return task;
    }

    async preload(codes = CODES) {
      return Promise.all([...new Set(codes)].map(code => this._load(code)));
    }

    play(code, {priority = 0, delay = 0, duration} = {}) {
      if (!this.enabled || !this._unlocked || this._hidden() ||
          !this.context || this.context.state !== 'running' || !this.buffers.has(code)) return false;
      const rank = Number.isFinite(priority) ? priority : 0;
      if (this.voices.size >= 2) {
        const weakest = [...this.voices].sort((a, b) => a.priority - b.priority)[0];
        if (rank <= weakest.priority) return false;
        this._stop(weakest);
      }
      let voice;
      try {
        const source = this.context.createBufferSource();
        source.buffer = this.buffers.get(code);
        source.connect(this.master);
        voice = {source, priority: rank};
        source.onended = () => {
          this.voices.delete(voice);
          try { source.disconnect(); } catch (_) { /* Already disconnected. */ }
        };
        this.voices.add(voice);
        const seconds = Number.isFinite(delay) ? Math.max(0, Math.min(delay, 0.6)) : 0;
        const startAt = this.context.currentTime + seconds;
        source.start(startAt);
        if (Number.isFinite(duration)) {
          source.stop(startAt + Math.max(0.04, Math.min(duration, 0.6)));
        }
        return true;
      } catch (_) {
        if (voice) this._stop(voice);
        return false;
      }
    }

    _stop(voice) {
      this.voices.delete(voice);
      voice.source.onended = null;
      try { voice.source.stop(); } catch (_) { /* A finished source is harmless. */ }
      try { voice.source.disconnect(); } catch (_) { /* A failed source is harmless. */ }
    }

    stopAll() {
      for (const voice of [...this.voices]) this._stop(voice);
    }

    async suspend() {
      this._epoch += 1;
      this._unlocked = false;
      this.stopAll();
      try {
        if (this.context && this.context.state !== 'closed') await this.context.suspend();
      } catch (_) { /* Browser lifecycle policies may reject suspension. */ }
    }
  }

  theater.AudioManager = AudioManager;
})();
