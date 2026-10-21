(() => {
  'use strict';
  const theater = globalThis.TileTheater = globalThis.TileTheater || {};
  const SETTINGS_KEY = 'tile-explorer.settings.v02';
  const CODES = 'apple banana cherry grape orange strawberry car taxi bus train bicycle scooter cat dog rabbit panda fox bear'.split(' ');
  const ATTACK = 0.004;
  const RELEASE = 0.010;
  const INTERRUPT_RELEASE = 0.006;

  /** Local short sounds only. Missing, late or unavailable sounds are discarded. */
  class AudioManager {
    constructor({profiles = {}, assetBase = '/assets/audio/v02', settingsKey = SETTINGS_KEY} = {}) {
      this.profiles = profiles;
      this.assetBase = assetBase.replace(/\/$/, '');
      this.settingsKey = settingsKey;
      this.context = null;
      this.master = null;
      this.buffers = new Map();
      this.raw = new Map();
      this.loading = new Map();
      this.decoding = new Map();
      this.failed = new Set();
      this.voices = new Set();
      this._retiring = new Set();
      this._silenceUntil = 0;
      this._enabled = true;
      this._unlocked = false;
      this._epoch = 0;
      try {
        const saved = JSON.parse(globalThis.localStorage.getItem(this.settingsKey) || '{}');
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
        const saved = JSON.parse(globalThis.localStorage.getItem(this.settingsKey) || '{}');
        const settings = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
        settings.soundEnabled = this._enabled;
        globalThis.localStorage.setItem(this.settingsKey, JSON.stringify(settings));
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
          this.master.gain.value = 0.30;
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
      return CODES.includes(code) ? this.assetBase + '/' + code + '.wav' : null;
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
      this._prune();
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
        const gain = this.context.createGain();
        const seconds = Number.isFinite(delay) ? Math.max(0, Math.min(delay, 0.6)) : 0;
        // A replacement waits for the outgoing fade, including during rapid input.
        const startAt = Math.max(this.context.currentTime + seconds, this._silenceUntil);
        const length = Math.min(source.buffer.duration,
          Number.isFinite(duration) ? Math.max(0.04, Math.min(duration, 0.6)) : Infinity);
        if (!Number.isFinite(length) || length <= 0) return false;
        const endAt = startAt + length;
        const attackEnd = startAt + Math.min(ATTACK, length / 2);
        const releaseStart = Math.max(attackEnd, endAt - RELEASE);
        voice = {source, gain, priority: rank, startAt, endAt, attackEnd, releaseStart, ended: false};
        gain.gain.value = 0;
        gain.gain.setValueAtTime(0, startAt);
        gain.gain.linearRampToValueAtTime(1, attackEnd);
        gain.gain.setValueAtTime(1, releaseStart);
        gain.gain.linearRampToValueAtTime(0, endAt);
        source.connect(gain);
        gain.connect(this.master);
        source.onended = () => this._finish(voice);
        this.voices.add(voice);
        source.start(startAt);
        source.stop(endAt);
        return true;
      } catch (_) {
        if (voice) this._finish(voice);
        return false;
      }
    }

    _finish(voice) {
      if (voice.ended) return;
      voice.ended = true;
      this.voices.delete(voice);
      this._retiring.delete(voice);
      voice.source.onended = null;
      try { voice.source.disconnect(); } catch (_) { /* Already disconnected. */ }
      try { voice.gain.disconnect(); } catch (_) { /* Already disconnected. */ }
    }

    _prune() {
      const now = this.context.currentTime;
      for (const voice of [...this.voices, ...this._retiring]) {
        // onended is delivered as a task and can lag behind the audio clock.
        if (now >= voice.endAt) this._finish(voice);
      }
    }

    _stop(voice) {
      if (voice.ended || this._retiring.has(voice)) return;
      this.voices.delete(voice);
      const now = this.context.currentTime;
      if (now >= voice.endAt) { this._finish(voice); return; }
      try {
        if (now <= voice.startAt) {
          // No audible samples exist yet, so cancellation needs no fade or slot.
          voice.source.stop(now);
          this._finish(voice);
          return;
        }
        const level = now < voice.attackEnd ? (now - voice.startAt) / (voice.attackEnd - voice.startAt)
          : now > voice.releaseStart ? (voice.endAt - now) / (voice.endAt - voice.releaseStart) : 1;
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setValueAtTime(Math.max(0, Math.min(level, 1)), now);
        voice.endAt = Math.min(now + INTERRUPT_RELEASE, voice.endAt);
        voice.gain.gain.linearRampToValueAtTime(0, voice.endAt);
        this._silenceUntil = Math.max(this._silenceUntil, voice.endAt);
        this._retiring.add(voice);
        voice.source.stop(voice.endAt);
      } catch (_) { this._finish(voice); }
    }

    stopAll() {
      if (!this.context) return;
      this._prune();
      for (const voice of [...this.voices]) this._stop(voice);
    }

    async suspend() {
      this._epoch += 1;
      this._unlocked = false;
      this.stopAll();
      try {
        if (this.context && this.context.state !== 'closed') await this.context.suspend();
      } catch (_) { /* Browser lifecycle policies may reject suspension. */ }
      if (this.context && this.context.state !== 'running') {
        // A suspended audio clock cannot finish a fade. It is already silent.
        for (const voice of [...this._retiring]) {
          try { voice.source.stop(this.context.currentTime); } catch (_) {}
          this._finish(voice);
        }
        this._silenceUntil = this.context.currentTime;
      }
    }
  }

  theater.AudioManager = AudioManager;
})();
