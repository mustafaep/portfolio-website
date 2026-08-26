'use client';

import { useId, useState } from 'react';

import {
  CLASSES,
  formatSteps,
  formatTime,
  type Lang,
  NUMBER_LOCALE,
  rampColor,
  SIZES,
} from './shared';

/**
 * The n-slider from the source study file: pick an input size, read what each
 * efficiency class costs in steps and in wall-clock time at one step per
 * nanosecond.
 *
 * The meters are on a log scale — their length tracks the *digit count* of the
 * step count and saturates at 10²⁰. On a linear scale every row except 2ⁿ and n!
 * would be an invisible sliver, which is true but unreadable. The exact numbers
 * sit in the two columns to the left, so the meter only has to carry the shape.
 */

const COPY = {
  tr: {
    caption: 'Verimlilik sınıflarının n giriş boyutundaki maliyeti',
    inputLabel: 'Giriş boyutu n',
    hint: '1 adım = 1 nanosaniye',
    efficiency: 'verimlilik',
    steps: 'adım sayısı',
    time: 'süre',
    scale: 'ölçek (log)',
  },
  en: {
    caption: 'What each efficiency class costs at input size n',
    inputLabel: 'Input size n',
    hint: '1 step = 1 nanosecond',
    efficiency: 'efficiency',
    steps: 'steps',
    time: 'time',
    scale: 'scale (log)',
  },
} as const;

export function GrowthCalculator({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const sliderId = useId();
  const [index, setIndex] = useState(0);

  const n = SIZES[index] ?? SIZES[0];
  const logs = CLASSES.map((c) => c.log10(n));
  // Saturates at 10²⁰ so the ceiling stays fixed while the slider moves — a
  // meter that rescaled every step would make every row look the same.
  const reference = Math.max(6, Math.min(Math.max(...logs), 20));

  return (
    <figure className="not-prose my-10 border border-line">
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-line px-4 py-4 sm:px-5">
        <div>
          {/* Sans, not the display serif: a figure's headline number set in a
              display face reads as decoration rather than data. Proportional
              figures too — tabular digits look loose at this size. */}
          <p
            className="text-[2rem] leading-none font-semibold tracking-tight"
            style={{ fontVariantNumeric: 'proportional-nums' }}
          >
            {n.toLocaleString(NUMBER_LOCALE[lang])}
          </p>
          <p className="eyebrow mt-1.5">{t.hint}</p>
        </div>
        <div className="min-w-[14rem] flex-1">
          <label htmlFor={sliderId} className="eyebrow">
            {t.inputLabel}
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={SIZES.length - 1}
            step={1}
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            className="mt-2 w-full accent-[var(--c-accent-ink)]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal sm:px-5">
                {t.efficiency}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.steps}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.time}
              </th>
              <th
                scope="col"
                className="eyebrow hidden px-4 py-2.5 font-normal sm:table-cell sm:px-5"
              >
                {t.scale}
              </th>
            </tr>
          </thead>
          <tbody>
            {CLASSES.map((klass, i) => {
              const log = logs[i] ?? 0;
              const width = Math.max(2, Math.min(100, (log / reference) * 100));
              return (
                <tr key={klass.label} className="border-b border-line last:border-b-0">
                  <th
                    scope="row"
                    className="px-4 py-2.5 font-normal whitespace-nowrap sm:px-5"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="inline-block h-2.5 w-2.5 shrink-0"
                        style={{ backgroundColor: rampColor(klass.step) }}
                      />
                      <span className="font-mono text-xs text-ink">{klass.label}</span>
                    </span>
                  </th>
                  <td
                    className="px-4 py-2.5 font-mono text-xs text-ink"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatSteps(log, lang)}
                  </td>
                  <td
                    className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-muted"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatTime(log, lang)}
                  </td>
                  <td className="hidden px-4 py-2.5 sm:table-cell sm:px-5">
                    <span
                      aria-hidden="true"
                      className="block h-2 w-full min-w-24 bg-track"
                    >
                      <span
                        className="block h-full transition-[width] duration-200"
                        style={{
                          width: `${width}%`,
                          backgroundColor: rampColor(klass.step),
                        }}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
