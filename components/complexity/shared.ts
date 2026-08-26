/**
 * Shared data for the complexity figures in the Big-O post.
 *
 * The efficiency classes are an *ordered* variable — swapping two of them
 * changes the meaning — so every figure paints them from one ordinal ramp
 * (`--c-s1` … `--c-s7`, defined in globals.css) rather than seven identities.
 * Slot order here is the order of the ramp: cheapest first.
 *
 * Text in these figures is bilingual by prop rather than by the site's message
 * files: the strings exist only inside this one post, and threading them
 * through `messages/*.json` would put a dozen keys in the global dictionary
 * that no other page can use.
 */

export type Lang = 'tr' | 'en';

export const NUMBER_LOCALE: Record<Lang, string> = { tr: 'tr-TR', en: 'en-US' };

/** log10 of T(n) for each class — logs, because n! at n = 10⁶ has no float. */
export type ComplexityClass = {
  /** Ramp slot, 1-based, matching --c-s1 … --c-s7. */
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  label: string;
  log10: (n: number) => number;
};

const LOG10_2 = Math.log10(2);

export const CLASSES: ComplexityClass[] = [
  { step: 1, label: 'log₂ n', log10: (n) => Math.log10(Math.max(Math.log2(n), 1)) },
  { step: 2, label: 'n', log10: (n) => Math.log10(n) },
  {
    step: 3,
    label: 'n log₂ n',
    log10: (n) => Math.log10(n) + Math.log10(Math.max(Math.log2(n), 1)),
  },
  { step: 4, label: 'n²', log10: (n) => 2 * Math.log10(n) },
  { step: 5, label: 'n³', log10: (n) => 3 * Math.log10(n) },
  { step: 6, label: '2ⁿ', log10: (n) => n * LOG10_2 },
  { step: 7, label: 'n!', log10: factorialLog10 },
];

/**
 * log10(n!) — summed exactly up to n = 1000, Stirling above it.
 *
 * Stirling alone is off by about 1% at small n, which shows: it reports 39,902
 * steps for 8! where the answer is 40,320, and a reader checking the row against
 * their own arithmetic finds the figure wrong. Summing is exact where that
 * matters and the approximation only takes over where the value is already being
 * rendered as a power of ten.
 */
function factorialLog10(n: number): number {
  if (n <= 1000) {
    let total = 0;
    for (let k = 2; k <= n; k += 1) total += Math.log10(k);
    return total;
  }
  return n * Math.log10(n / Math.E) + 0.5 * Math.log10(2 * Math.PI * n);
}

export function rampColor(step: number): string {
  return `var(--c-s${step})`;
}

/** Input sizes the calculator's slider steps through. */
export const SIZES = [8, 16, 32, 64, 128, 256, 1000, 4096, 10000, 100000, 1000000] as const;

export function formatSteps(log10Value: number, lang: Lang): string {
  if (log10Value < 0) return '1';
  if (log10Value < 15) {
    return Math.round(10 ** log10Value).toLocaleString(NUMBER_LOCALE[lang]);
  }
  return `≈ 10^${Math.round(log10Value)}`;
}

type TimeWords = {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  years: string;
  beyond: string;
};

const TIME_WORDS: Record<Lang, TimeWords> = {
  tr: {
    seconds: 'saniye',
    minutes: 'dakika',
    hours: 'saat',
    days: 'gün',
    years: 'yıl',
    beyond: 'evrenin yaşından uzun',
  },
  en: {
    seconds: 'seconds',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    years: 'years',
    beyond: 'longer than the universe has existed',
  },
};

function sig(value: number, lang: Lang): string {
  return Number(value.toPrecision(3)).toLocaleString(NUMBER_LOCALE[lang]);
}

/** Wall-clock time for a step count, assuming one step per nanosecond. */
export function formatTime(log10Steps: number, lang: Lang): string {
  const w = TIME_WORDS[lang];
  const s = log10Steps - 9; // log10 of the duration in seconds
  if (s < -6) return `${sig(10 ** (s + 9), lang)} ns`;
  if (s < -3) return `${sig(10 ** (s + 6), lang)} µs`;
  if (s < 0) return `${sig(10 ** (s + 3), lang)} ms`;
  if (s < 1.78) return `${sig(10 ** s, lang)} ${w.seconds}`;
  if (s < 3.56) return `${sig(10 ** s / 60, lang)} ${w.minutes}`;
  if (s < 4.94) return `${sig(10 ** s / 3600, lang)} ${w.hours}`;
  if (s < 7.5) return `${sig(10 ** s / 86400, lang)} ${w.days}`;
  if (s < 17.64) {
    const y = s - Math.log10(3.156e7);
    return y < 9 ? `${sig(10 ** y, lang)} ${w.years}` : `≈ 10^${Math.round(y)} ${w.years}`;
  }
  return w.beyond;
}
