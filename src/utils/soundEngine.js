// Web Audio API Procedural Sound Engine
// Zero external audio files, 0 KB network latency, instant tactile feedback

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.masterGain = null;
    this.isMuted = true; // start muted until user clicks unmute or interacts
    this.isAmbientRunning = false;
  }

  init() {
    try {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // Audio context might be restricted before explicit gesture
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0.0 : 0.7,
        this.ctx.currentTime,
        0.05
      );
    }
    if (!this.isMuted && !this.isAmbientRunning) {
      this.startAmbientHum();
    }
    return this.isMuted;
  }

  // Continuous subtle server room atmospheric drone
  startAmbientHum() {
    this.init();
    if (!this.ctx || this.isAmbientRunning || this.isMuted) return;

    try {
      const t = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, t);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.2, t + 2.0);
      this.ambientGain.connect(this.masterGain);

      // Low 55Hz base server fan drone
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, t);

      // Sub-harmonic detuned hum
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.4, t);

      // Warm low-pass resonant filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, t);
      filter.Q.setValueAtTime(3.0, t);

      // LFO for breathing movement
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.18, t);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(35, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);

      osc1.start(t);
      osc2.start(t);
      lfo.start(t);
      this.isAmbientRunning = true;
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Tactile micro-switch click
  playClick(pitchMultiplier = 1.0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200 * pitchMultiplier, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.015);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.016);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.017);
    } catch {
      // Ignore audio error
    }
  }

  // Sci-fi data terminal keystroke
  playTypingBlip() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const freqs = [880, 1020, 1180, 1340, 1560];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, t);
      filter.Q.setValueAtTime(6.0, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // Ignore audio error
    }
  }

  // Sci-fi hologram activation whoosh
  playHoloEngage() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.4);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, t);
      filter.frequency.exponentialRampToValueAtTime(2800, t + 0.4);
      filter.Q.setValueAtTime(3.5, t);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.46);
    } catch {
      // Ignore audio error
    }
  }
}

export const sound = new SoundEngine();
