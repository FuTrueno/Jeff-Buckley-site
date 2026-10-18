/** Join class names, dropping falsy values. */
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(" ");
}

/** 185 -> "3:05" */
export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** 3 -> "03" */
export function pad2(value) {
  return String(value).padStart(2, "0");
}

/** Small deterministic hash, used for stable decorative waveform bars. */
export function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Deterministic pseudo-random bar heights in [0.15, 1]. */
export function waveformBars(seed, count = 56) {
  let state = hashString(seed) || 1;
  return Array.from({ length: count }, () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return 0.15 + (state / 4294967296) * 0.85;
  });
}
