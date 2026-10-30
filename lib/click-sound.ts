/**
 * Synthesizes crisp, satisfying tactile sound effects using Web Audio API.
 * Instant response (0ms latency), no asset loading delay, and zero clipping.
 * Includes global mute support with localStorage persistence.
 */

const STORAGE_KEY = "portfolio_sound_muted";
let sharedAudioCtx: AudioContext | null = null;
const listeners = new Set<(muted: boolean) => void>();

export function getSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setSoundMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? "true" : "false");
    listeners.forEach((fn) => fn(muted));
  } catch {}
}

export function toggleSoundMuted(): boolean {
  const next = !getSoundMuted();
  setSoundMuted(next);
  return next;
}

export function subscribeSoundMuted(listener: (muted: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return null;

    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioCtx();
    }

    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {});
    }

    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export function playClickSound(targetTheme?: "dark" | "light") {
  if (getSoundMuted()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const isDark = targetTheme === "dark";

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, now);
    masterGain.connect(ctx.destination);

    // 1. Transient click snap (fast pitch drop)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";

    const startFreq = isDark ? 950 : 1350;
    const endFreq = isDark ? 90 : 130;

    osc1.frequency.setValueAtTime(startFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(endFreq, now + 0.025);

    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc1.connect(gain1);
    gain1.connect(masterGain);

    // 2. High snap / mechanical click attack
    const oscSnap = ctx.createOscillator();
    const gainSnap = ctx.createGain();
    oscSnap.type = "triangle";

    const snapFreq = isDark ? 2400 : 3000;
    oscSnap.frequency.setValueAtTime(snapFreq, now);
    oscSnap.frequency.exponentialRampToValueAtTime(300, now + 0.012);

    gainSnap.gain.setValueAtTime(0.4, now);
    gainSnap.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

    oscSnap.connect(gainSnap);
    gainSnap.connect(masterGain);

    // 3. Tactile body thock
    const oscBody = ctx.createOscillator();
    const gainBody = ctx.createGain();
    oscBody.type = "sine";

    const bodyFreq = isDark ? 170 : 220;
    oscBody.frequency.setValueAtTime(bodyFreq, now);
    oscBody.frequency.exponentialRampToValueAtTime(isDark ? 65 : 85, now + 0.045);

    gainBody.gain.setValueAtTime(0.5, now);
    gainBody.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    oscBody.connect(gainBody);
    gainBody.connect(masterGain);

    // 4. Subtle mechanical texture noise
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(isDark ? 3200 : 4200, now);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // Trigger voices
    osc1.start(now);
    oscSnap.start(now);
    oscBody.start(now);
    whiteNoise.start(now);

    osc1.stop(now + 0.035);
    oscSnap.stop(now + 0.016);
    oscBody.stop(now + 0.05);
    whiteNoise.stop(now + 0.015);
  } catch {
    // Graceful fallback
  }
}

/**
 * Modern soft pop sound for micro-interactions (modal open, item select)
 */
export function playPopSound(pitch: number = 1) {
  if (getSoundMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(880 * pitch, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {}
}

/**
 * Airy harmonic chime for easter egg celebrations and achievements
 */
export function playChimeSound() {
  if (getSoundMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const now = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    });
  } catch {}
}
