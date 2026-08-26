'use client';

import { useState } from 'react';

import { CodePanel, Stepper, STEPPER_LABELS } from '@/components/study/stepper';

/**
 * The pointer walkthrough from the source study file: three memory cells, the
 * arrows between them, and the program output building up line by line.
 *
 * The point it exists to make is the last step — `**q` dereferencing twice — and
 * that is a claim about *which cell you land on*, not about a number. A static
 * diagram has to draw all three hops at once and the reader has to unpick which
 * belongs to which line; stepping shows one hop at a time.
 *
 * Colour here is state, not identity: the accent marks whatever the current line
 * touches, and everything else stays in ink and line tokens. No second hue is
 * introduced for it.
 */

const CODE = [
  'int   a = 100;',
  'int  *p = &a;',
  'int **q = &p;',
  '',
  'printf("%d", a);',
  'printf("%p", &a);',
  'printf("%d", *p);',
  'printf("%d", **q);',
];

type Cell = 'a' | 'p' | 'q';
type Arrow = 'pa' | 'qp';

type Frame = {
  /** Index into CODE, or -1 before the program starts. */
  line: number;
  visible: Cell[];
  lit: (Cell | Arrow)[];
  out: string | null;
  note: string;
};

const FRAMES: Record<'tr' | 'en', Frame[]> = {
  tr: [
    { line: -1, visible: [], lit: [], out: null, note: 'Program henüz başlamadı.' },
    { line: 0, visible: ['a'], lit: ['a'], out: null, note: '1024 adresine 100 yazıldı.' },
    {
      line: 1,
      visible: ['a', 'p'],
      lit: ['p', 'pa'],
      out: null,
      note: "p, a'nın adresini (1024) tutuyor.",
    },
    {
      line: 2,
      visible: ['a', 'p', 'q'],
      lit: ['q', 'qp'],
      out: null,
      note: "q, p'nin adresini (1032) tutuyor.",
    },
    {
      line: 4,
      visible: ['a', 'p', 'q'],
      lit: ['a'],
      out: '100',
      note: 'a doğrudan okundu.',
    },
    {
      line: 5,
      visible: ['a', 'p', 'q'],
      lit: ['a'],
      out: '1024',
      note: "&a → a'nın durduğu adres. Değer değil, konum.",
    },
    {
      line: 6,
      visible: ['a', 'p', 'q'],
      lit: ['p', 'pa', 'a'],
      out: '100',
      note: "*p → bir atlama: p'den a'ya.",
    },
    {
      line: 7,
      visible: ['a', 'p', 'q'],
      lit: ['q', 'qp', 'p', 'pa', 'a'],
      out: '100',
      note: "**q → iki atlama: q'dan p'ye, p'den a'ya. Üç ifade de 100 verdi, üç ayrı yoldan.",
    },
  ],
  en: [
    { line: -1, visible: [], lit: [], out: null, note: 'The program has not started.' },
    { line: 0, visible: ['a'], lit: ['a'], out: null, note: '100 was written to address 1024.' },
    {
      line: 1,
      visible: ['a', 'p'],
      lit: ['p', 'pa'],
      out: null,
      note: "p holds a's address (1024).",
    },
    {
      line: 2,
      visible: ['a', 'p', 'q'],
      lit: ['q', 'qp'],
      out: null,
      note: "q holds p's address (1032).",
    },
    { line: 4, visible: ['a', 'p', 'q'], lit: ['a'], out: '100', note: 'a was read directly.' },
    {
      line: 5,
      visible: ['a', 'p', 'q'],
      lit: ['a'],
      out: '1024',
      note: '&a → the address a sits at. A location, not a value.',
    },
    {
      line: 6,
      visible: ['a', 'p', 'q'],
      lit: ['p', 'pa', 'a'],
      out: '100',
      note: '*p → one hop: from p to a.',
    },
    {
      line: 7,
      visible: ['a', 'p', 'q'],
      lit: ['q', 'qp', 'p', 'pa', 'a'],
      out: '100',
      note: '**q → two hops: q to p, p to a. All three expressions gave 100, by three different routes.',
    },
  ],
};

const COPY = {
  tr: {
    label: 'Bellek hücreleri ve aralarındaki işaretçi okları',
    codeLabel: 'Program satırları',
    address: 'adres:',
    output: 'ÇIKTI',
    empty: '—',
  },
  en: {
    label: 'Memory cells and the pointer arrows between them',
    codeLabel: 'Program lines',
    address: 'address:',
    output: 'OUTPUT',
    empty: '—',
  },
} as const;

const CELLS: { key: Cell; name: string; value: string; x: number; address: string }[] = [
  { key: 'a', name: 'a', value: '100', x: 24, address: '1024' },
  { key: 'p', name: 'p', value: '1024', x: 168, address: '1032' },
  { key: 'q', name: 'q', value: '1032', x: 312, address: '1040' },
];

export function PointerTrace({ lang }: { lang: 'tr' | 'en' }) {
  const t = COPY[lang];
  const frames = FRAMES[lang];
  const [index, setIndex] = useState(0);
  const frame = frames[index] ?? frames[0]!;

  const outputs = frames
    .slice(1, index + 1)
    .map((f) => f.out)
    .filter((value): value is string => value !== null);

  const shown = (key: Cell) => frame.visible.includes(key);
  const lit = (key: Cell | Arrow) => frame.lit.includes(key);
  const ink = (key: Cell | Arrow) => (lit(key) ? 'var(--c-accent-ink)' : 'var(--c-ink)');

  return (
    <Stepper
      labels={STEPPER_LABELS[lang]}
      index={index}
      count={frames.length}
      onIndexChange={setIndex}
      note={frame.note}
    >
      <div className="grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="border-b border-line bg-surface md:border-r md:border-b-0">
          <CodePanel lines={CODE} active={frame.line} label={t.codeLabel} />
        </div>

        <div className="overflow-x-auto p-4 sm:p-5">
          <svg
            viewBox="0 0 440 196"
            className="w-full min-w-[24rem]"
            role="img"
            aria-label={t.label}
          >
            <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '9.5px' }}>
              <text x="0" y="14">
                {t.address}
              </text>
              {CELLS.map((cell) => (
                <text
                  key={cell.key}
                  x={cell.x + 48}
                  y="14"
                  textAnchor="middle"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {cell.address}
                </text>
              ))}
            </g>

            {/* Empty slots stay drawn so the cells do not jump as they appear. */}
            {CELLS.map((cell) => (
              <rect
                key={`slot-${cell.key}`}
                x={cell.x}
                y="26"
                width="96"
                height="50"
                fill="none"
                stroke="var(--c-line)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

            {/* Arrows run underneath the cells they connect. */}
            <g fill="none" strokeWidth="1.5">
              <path
                d="M216,78 C216,116 72,116 72,78"
                stroke={lit('pa') ? 'var(--c-accent)' : 'var(--c-line)'}
                opacity={shown('p') ? 1 : 0}
                markerEnd={`url(#trace-arrow-${lit('pa') ? 'on' : 'off'})`}
              />
              <path
                d="M360,78 C360,150 232,150 232,78"
                stroke={lit('qp') ? 'var(--c-accent)' : 'var(--c-line)'}
                opacity={shown('q') ? 1 : 0}
                markerEnd={`url(#trace-arrow-${lit('qp') ? 'on' : 'off'})`}
              />
            </g>

            <defs>
              <marker
                id="trace-arrow-on"
                viewBox="0 0 10 8"
                refX="9"
                refY="4"
                markerWidth="6"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,4 L0,8 z" fill="var(--c-accent)" />
              </marker>
              <marker
                id="trace-arrow-off"
                viewBox="0 0 10 8"
                refX="9"
                refY="4"
                markerWidth="6"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,4 L0,8 z" fill="var(--c-line)" />
              </marker>
            </defs>

            {CELLS.map((cell) => (
              <g key={cell.key} opacity={shown(cell.key) ? 1 : 0}>
                <rect
                  x={cell.x}
                  y="26"
                  width="96"
                  height="50"
                  fill={lit(cell.key) ? 'var(--c-surface)' : 'var(--c-bg)'}
                  stroke={lit(cell.key) ? 'var(--c-accent)' : 'var(--c-line)'}
                  strokeWidth={lit(cell.key) ? 2 : 1}
                />
                <text
                  x={cell.x + 48}
                  y="44"
                  textAnchor="middle"
                  fill="var(--c-muted)"
                  className="font-mono"
                  style={{ fontSize: '10px' }}
                >
                  {cell.name}
                </text>
                <text
                  x={cell.x + 48}
                  y="65"
                  textAnchor="middle"
                  fill={ink(cell.key)}
                  className="font-mono"
                  style={{ fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}
                >
                  {cell.value}
                </text>
              </g>
            ))}

            <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '9.5px' }}>
              <text x="144" y="122" textAnchor="middle" opacity={shown('p') ? 1 : 0}>
                p → a
              </text>
              <text x="296" y="158" textAnchor="middle" opacity={shown('q') ? 1 : 0}>
                q → p
              </text>
            </g>

            <line x1="0" y1="170" x2="440" y2="170" stroke="var(--c-line)" strokeWidth="1" />
            <text
              x="0"
              y="188"
              fill="var(--c-muted)"
              className="font-mono"
              style={{ fontSize: '9.5px' }}
            >
              {t.output}
            </text>
            <text
              x="52"
              y="188"
              fill="var(--c-ink)"
              className="font-mono"
              style={{ fontSize: '11px', fontVariantNumeric: 'tabular-nums' }}
            >
              {outputs.length > 0 ? outputs.join('   ') : t.empty}
            </text>
          </svg>
        </div>
      </div>
    </Stepper>
  );
}
