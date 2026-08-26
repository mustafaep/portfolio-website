'use client';

import { useMemo, useState } from 'react';

import { type Lang, NUMBER_LOCALE, rampColor } from './shared';

/**
 * The six efficiency classes plotted over n = 1…20, with T(n) clipped at 100.
 *
 * Clipping is the point of the figure: n³ hits the ceiling at n = 8 and 2ⁿ at
 * n = 7, so the reader sees *where* each curve leaves the frame rather than a
 * flat pile at the bottom of a linear axis stretched to fit 2²⁰. Exact values —
 * including the ones above the ceiling — are in the crosshair readout and in
 * the table below the figure, so nothing is gated behind the hover.
 */

const N_MIN = 1;
const N_MAX = 20;
const T_MAX = 100;

// The top margin holds two label rows: the axis title, and below it the labels
// of the curves that exit through the ceiling. One row would collide them.
const PLOT = { left: 58, right: 566, top: 46, bottom: 232 };
const VIEW = { w: 640, h: 292 };

type Series = {
  step: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  value: (n: number) => number;
  /** Where the direct label hangs: at the curve's right end, or at the ceiling. */
  anchor: 'end' | 'ceiling';
};

const SERIES: Series[] = [
  { step: 1, label: 'log₂ n', value: (n) => Math.log2(n), anchor: 'end' },
  { step: 2, label: 'n', value: (n) => n, anchor: 'end' },
  { step: 3, label: 'n log₂ n', value: (n) => n * Math.log2(n), anchor: 'end' },
  { step: 4, label: 'n²', value: (n) => n * n, anchor: 'ceiling' },
  { step: 5, label: 'n³', value: (n) => n ** 3, anchor: 'ceiling' },
  { step: 6, label: '2ⁿ', value: (n) => 2 ** n, anchor: 'ceiling' },
];

const COPY = {
  tr: {
    title: 'Altı verimlilik sınıfının büyüme eğrileri',
    desc: 'n arttıkça her sınıfın adım sayısı; eğriler 100 adımda kırpılmıştır.',
    yAxis: 'adım sayısı T(n)',
    xAxis: 'n — giriş boyutu',
    hint: 'Eğrilerin üzerinde gezin ya da odaklanıp ok tuşlarıyla n değerini değiştir.',
    readout: 'n =',
    above: 'kırpma sınırının üstünde',
  },
  en: {
    title: 'Growth curves for the six efficiency classes',
    desc: 'Steps taken by each class as n grows; the curves are clipped at 100 steps.',
    yAxis: 'steps T(n)',
    xAxis: 'n — input size',
    hint: 'Hover the curves, or focus the figure and change n with the arrow keys.',
    readout: 'n =',
    above: 'above the clipping ceiling',
  },
} as const;

function x(n: number): number {
  return PLOT.left + ((n - N_MIN) / (N_MAX - N_MIN)) * (PLOT.right - PLOT.left);
}

function y(t: number): number {
  return PLOT.bottom - (t / T_MAX) * (PLOT.bottom - PLOT.top);
}

/**
 * Path for one curve, stopped where it crosses the ceiling. The crossing point
 * is interpolated so the curve meets the top edge exactly instead of jumping.
 */
function curve(series: Series): { d: string; exit: { x: number; y: number } | null } {
  const points: string[] = [];
  let exit: { x: number; y: number } | null = null;

  for (let n = N_MIN; n <= N_MAX + 1e-9; n += 0.1) {
    const t = series.value(n);
    if (t > T_MAX) {
      const prev = n - 0.1;
      const prevT = series.value(prev);
      const ratio = (T_MAX - prevT) / (t - prevT);
      const cross = prev + ratio * 0.1;
      points.push(`${x(cross).toFixed(2)},${y(T_MAX).toFixed(2)}`);
      exit = { x: x(cross), y: y(T_MAX) };
      break;
    }
    points.push(`${x(n).toFixed(2)},${y(t).toFixed(2)}`);
  }

  return { d: `M${points.join(' L')}`, exit };
}

export function GrowthChart({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [pinned, setPinned] = useState<number | null>(null);

  const curves = useMemo(() => SERIES.map((s) => ({ series: s, ...curve(s) })), []);

  const format = (value: number) =>
    value < 10
      ? value.toLocaleString(NUMBER_LOCALE[lang], { maximumFractionDigits: 1 })
      : Math.round(value).toLocaleString(NUMBER_LOCALE[lang]);

  function pointerN(event: React.PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * VIEW.w;
    const ratio = (svgX - PLOT.left) / (PLOT.right - PLOT.left);
    const n = Math.round(N_MIN + ratio * (N_MAX - N_MIN));
    return Math.min(N_MAX, Math.max(N_MIN, n));
  }

  function onKeyDown(event: React.KeyboardEvent<SVGSVGElement>) {
    const current = pinned ?? 10;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      setPinned(
        Math.min(N_MAX, Math.max(N_MIN, current + (event.key === 'ArrowRight' ? 1 : -1))),
      );
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPinned(N_MIN);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPinned(N_MAX);
    } else if (event.key === 'Escape') {
      setPinned(null);
    }
  }

  const gridTicks = [0, 25, 50, 75, 100];
  const xTicks = [5, 10, 15, 20];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="w-full touch-none focus-visible:outline-2"
        role="img"
        aria-label={`${t.title}. ${t.desc}`}
        tabIndex={0}
        onPointerMove={(e) => setPinned(pointerN(e))}
        onPointerLeave={() => setPinned(null)}
        onFocus={() => setPinned((p) => p ?? 10)}
        onBlur={() => setPinned(null)}
        onKeyDown={onKeyDown}
      >
        {/* Gridlines and axes: hairline, solid, one step off the surface. */}
        <g stroke="var(--c-line)" strokeWidth="1">
          {gridTicks.map((tick) => (
            <line key={tick} x1={PLOT.left} y1={y(tick)} x2={PLOT.right} y2={y(tick)} />
          ))}
          <line x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} />
        </g>

        <g
          fill="var(--c-muted)"
          className="font-mono"
          style={{ fontSize: '10px' }}
          aria-hidden="true"
        >
          {gridTicks.map((tick) => (
            <text
              key={tick}
              x={PLOT.left - 8}
              y={y(tick) + 3.5}
              textAnchor="end"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {tick}
            </text>
          ))}
          {xTicks.map((tick) => (
            <text
              key={tick}
              x={x(tick)}
              y={PLOT.bottom + 18}
              textAnchor="middle"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {tick}
            </text>
          ))}
          <text x={PLOT.left} y={14}>
            {t.yAxis}
          </text>
          <text x={PLOT.right} y={PLOT.bottom + 36} textAnchor="end">
            {t.xAxis}
          </text>
        </g>

        {/* Crosshair sits under the curves so it never cuts across a mark. */}
        {pinned !== null ? (
          <line
            x1={x(pinned)}
            y1={PLOT.top}
            x2={x(pinned)}
            y2={PLOT.bottom}
            stroke="var(--c-muted)"
            strokeWidth="1"
          />
        ) : null}

        {curves.map(({ series, d }) => (
          <path
            key={series.label}
            d={d}
            fill="none"
            stroke={rampColor(series.step)}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Direct labels supplement the legend; text takes an ink token, never
            the series colour, so it stays legible at every ramp step. */}
        <g
          fill="var(--c-muted)"
          className="font-mono"
          style={{ fontSize: '10.5px' }}
          aria-hidden="true"
        >
          {curves.map(({ series, exit }) => {
            if (series.anchor === 'ceiling' && exit) {
              return (
                <text key={series.label} x={exit.x} y={PLOT.top - 9} textAnchor="middle">
                  {series.label}
                </text>
              );
            }
            const endY = y(Math.min(series.value(N_MAX), T_MAX));
            return (
              <text key={series.label} x={PLOT.right + 8} y={endY + 3.5}>
                {series.label}
              </text>
            );
          })}
        </g>

        {/* Markers carry a 2px surface ring so they stay readable where curves
            cross each other. */}
        {pinned !== null
          ? curves.map(({ series }) => {
              const value = series.value(pinned);
              if (value > T_MAX) return null;
              return (
                <circle
                  key={series.label}
                  cx={x(pinned)}
                  cy={y(value)}
                  r="4"
                  fill={rampColor(series.step)}
                  stroke="var(--c-bg)"
                  strokeWidth="2"
                />
              );
            })
          : null}
      </svg>

      {/* Readout. Rendered below the plot rather than floating over it: at this
          width a positioned tooltip covers the curves it is describing. */}
      <div
        className="mt-3 border border-line bg-surface px-3 py-2.5"
        aria-live="polite"
        aria-atomic="true"
      >
        {pinned === null ? (
          <p className="font-mono text-xs text-muted">{t.hint}</p>
        ) : (
          <>
            <p className="font-mono text-xs text-muted">
              {t.readout}{' '}
              <span className="text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {pinned}
              </span>
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3">
              {SERIES.map((series) => {
                const value = series.value(pinned);
                return (
                  <li key={series.label} className="flex items-baseline gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block h-0.5 w-3 shrink-0 translate-y-[-3px]"
                      style={{ backgroundColor: rampColor(series.step) }}
                    />
                    <span
                      className="font-mono text-xs text-ink"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {format(value)}
                    </span>
                    <span className="font-mono text-[0.7rem] text-muted">
                      {series.label}
                      {value > T_MAX ? (
                        <>
                          {' ↑'}
                          <span className="sr-only"> — {t.above}</span>
                        </>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      {/* The legend is the dependable identity channel — always present, never
          replaced by the direct labels on the curves. */}
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {SERIES.map((series) => (
          <li key={series.label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-4"
              style={{ backgroundColor: rampColor(series.step) }}
            />
            <span className="font-mono text-xs text-muted">{series.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
