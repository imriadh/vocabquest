// Pronunciation via the browser's built-in SpeechSynthesis API.
// No API key required, works offline, supports en-US. Gracefully no-ops
// if the API is unavailable (e.g. SSR or unsupported browser).

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer a natural en-US voice; fall back to any English voice.
  cachedVoice =
    voices.find((v) => /en[-_]US/i.test(v.lang) && /natural|samantha|google/i.test(v.name)) ??
    voices.find((v) => /en[-_]US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    null;
  return cachedVoice;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, opts?: { rate?: number }): void {
  if (!speechSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = opts?.rate ?? 0.9;
  const voice = pickVoice();
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}

// Warm up the voice list (Chrome loads voices asynchronously).
export function primeVoices(): void {
  if (!speechSupported()) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}
