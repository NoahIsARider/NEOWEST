// Web Audio API Synthesizer for Retro-Futuristic Western Ambiance
class WesternSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public togglePlay(volume: number = 0.3): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(volume);
      return true;
    }
  }

  public start(volume: number = 0.3) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    this.isPlaying = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low Synth Filter (Sub-desert warmth)
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Oscillator 1 (Vintage Sawtooth - Frontier Drone)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 pitch

    // Oscillator 2 (Triangle detuned - Warm chorus)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3 fifth interval

    // Sub Oscillator (Sine - Deep Mesa Bass)
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 sub

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    this.osc1.connect(oscGain);
    this.osc2.connect(oscGain);
    this.subOsc.connect(oscGain);
    oscGain.connect(this.filter);

    // Desert Wind Noise Generator
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(2, this.ctx.currentTime);

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);

    // Start all sources
    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();
    this.noiseNode.start();

    // Subtle LFO modulation for filter sweep
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // Very slow 0.1Hz breath
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  public playLaserPing() {
    if (!this.ctx || !this.isPlaying) return;
    const ping = this.ctx.createOscillator();
    const pingGain = this.ctx.createGain();

    ping.type = 'sine';
    ping.frequency.setValueAtTime(880, this.ctx.currentTime);
    ping.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.3);

    pingGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    pingGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    ping.connect(pingGain);
    if (this.masterGain) {
      pingGain.connect(this.masterGain);
    } else {
      pingGain.connect(this.ctx.destination);
    }

    ping.start();
    ping.stop(this.ctx.currentTime + 0.31);
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.subOsc?.stop();
          this.noiseNode?.stop();
        } catch {
          // ignore already stopped
        }
        this.isPlaying = false;
      }, 150);
    } else {
      this.isPlaying = false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const westernSynth = new WesternSynthEngine();
