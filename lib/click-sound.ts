/**
 * Audio system disabled per user preference.
 * Zero latency, zero resource consumption, safe no-ops.
 */

export function getSoundMuted(): boolean {
  return true;
}

export function setSoundMuted(_muted: boolean): void {}

export function toggleSoundMuted(): boolean {
  return true;
}

export function subscribeSoundMuted(_listener: (muted: boolean) => void): () => void {
  return () => {};
}

export function playClickSound(_targetTheme?: "dark" | "light"): void {}

export function playPopSound(_pitch: number = 1): void {}

export function playChimeSound(): void {}

export function playRetroVictorySound(): void {}
