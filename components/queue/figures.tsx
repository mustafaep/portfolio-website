import type { Lang } from '@/components/complexity/shared';

/**
 * Diagrams for the queues post. Schematics, like the rest of the series: the
 * accent marks the one thing each figure is about — the two ends, the cell the
 * queue has crept away from, the group whose internal order survived — and
 * everything else stays in line and muted tokens.
 */

const MONO = { fontSize: '10.5px' } as const;
const MONO_SM = { fontSize: '9.5px' } as const;
const MONO_LG = { fontSize: '12.5px' } as const;

function Arrowheads({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-plain`}
        viewBox="0 0 10 8"
        refX="9"
        refY="4"
        markerWidth="6"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,4 L0,8 z" fill="var(--c-muted)" />
      </marker>
      <marker
        id={`${id}-accent`}
        viewBox="0 0 10 8"
        refX="9"
        refY="4"
        markerWidth="6"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,4 L0,8 z" fill="var(--c-accent)" />
      </marker>
    </defs>
  );
}

function NullMark({ x, y, w = 20, h = 20 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g stroke="var(--c-muted)" strokeWidth="1">
      <line x1={x} y1={y} x2={x + w} y2={y + h} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} />
    </g>
  );
}

const MODEL_COPY = {
  tr: {
    label: "Kuyruk: rear'dan giriş, front'tan çıkış — FIFO",
    intro: 'Yığında tek uç vardı; kuyrukta iki ucu birden takip etmek gerekir.',
    dequeue: 'dequeue',
    exit: 'çıkış',
    enqueue: 'enqueue',
    entry: 'giriş',
    front: 'front',
    firstIn: 'ilk giren',
    rear: 'rear',
    lastIn: 'son giren',
    note: 'A önce girdi, A önce çıkar — FIFO',
  },
  en: {
    label: 'A queue: in at the rear, out at the front — FIFO',
    intro: 'A stack had one end; a queue means keeping track of two at once.',
    dequeue: 'dequeue',
    exit: 'out',
    enqueue: 'enqueue',
    entry: 'in',
    front: 'front',
    firstIn: 'first in',
    rear: 'rear',
    lastIn: 'last in',
    note: 'A went in first, A comes out first — FIFO',
  },
} as const;

export function QueueModelFigure({ lang }: { lang: Lang }) {
  const t = MODEL_COPY[lang];

  return (
    <svg viewBox="0 0 640 214" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="q-model" />

      <text x="16" y="24" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.intro}
      </text>

      {['A', 'B', 'C', 'D'].map((value, i) => {
        const x = 180 + i * 70;
        const isEnd = i === 0 || i === 3;
        return (
          <g key={value}>
            <rect
              x={x}
              y={76}
              width="64"
              height="40"
              fill={isEnd ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={isEnd ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={isEnd ? 2 : 1}
            />
            <text
              x={x + 32}
              y={101}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO_LG}
            >
              {value}
            </text>
          </g>
        );
      })}

      <line
        x1="172"
        y1="96"
        x2="116"
        y2="96"
        stroke="var(--c-muted)"
        strokeWidth="1.4"
        markerEnd="url(#q-model-plain)"
      />
      <g textAnchor="end" className="font-mono">
        <text x="110" y="92" fill="var(--c-ink)" style={MONO}>
          {t.dequeue}
        </text>
        <text x="110" y="108" fill="var(--c-muted)" style={MONO_SM}>
          {t.exit}
        </text>
      </g>

      <line
        x1="528"
        y1="96"
        x2="462"
        y2="96"
        stroke="var(--c-muted)"
        strokeWidth="1.4"
        markerEnd="url(#q-model-plain)"
      />
      <g className="font-mono">
        <text x="536" y="92" fill="var(--c-ink)" style={MONO}>
          {t.enqueue}
        </text>
        <text x="536" y="108" fill="var(--c-muted)" style={MONO_SM}>
          {t.entry}
        </text>
      </g>

      <g stroke="var(--c-accent)" strokeWidth="1.6">
        <line x1="212" y1="148" x2="212" y2="122" markerEnd="url(#q-model-accent)" />
        <line x1="422" y1="148" x2="422" y2="122" markerEnd="url(#q-model-accent)" />
      </g>
      <g textAnchor="middle" className="font-mono">
        <text x="212" y="164" fill="var(--c-accent-ink)" style={MONO}>
          {t.front}
        </text>
        <text x="212" y="178" fill="var(--c-muted)" style={MONO_SM}>
          {t.firstIn}
        </text>
        <text x="422" y="164" fill="var(--c-accent-ink)" style={MONO}>
          {t.rear}
        </text>
        <text x="422" y="178" fill="var(--c-muted)" style={MONO_SM}>
          {t.lastIn}
        </text>
      </g>

      <text x="16" y="204" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.note}
      </text>
    </svg>
  );
}

const LINKED_COPY = {
  tr: {
    label: 'Kuyruğun bağlı liste gerçekleştirmesi: baş yapısı ve düğüm zinciri',
    front: 'front — buradan çıkar',
    rear: 'rear — buraya girer',
    note: "zincir daima front → rear yönünde akar; rear'ın next'i her zaman null",
  },
  en: {
    label: 'The linked implementation of a queue: the head structure and the chain of nodes',
    front: 'front — where things leave',
    rear: 'rear — where things arrive',
    note: "the chain always runs front → rear, and rear's next is always null",
  },
} as const;

export function QueueLinkedFigure({ lang }: { lang: Lang }) {
  const t = LINKED_COPY[lang];

  return (
    <svg viewBox="0 0 640 236" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="q-linked" />

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="48" y="34">
          count
        </text>
        <text x="104" y="34">
          front
        </text>
        <text x="160" y="34">
          rear
        </text>
      </g>
      <rect x="20" y="40" width="170" height="42" fill="var(--c-surface)" stroke="var(--c-accent)" />
      <line x1="76" y1="40" x2="76" y2="82" stroke="var(--c-line)" strokeWidth="1" />
      <line x1="132" y1="40" x2="132" y2="82" stroke="var(--c-line)" strokeWidth="1" />
      <text
        x="48"
        y="67"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        3
      </text>
      <circle cx="104" cy="61" r="4" fill="var(--c-accent)" />
      <circle cx="160" cy="61" r="4" fill="var(--c-accent)" />

      {['A', 'B', 'C'].map((value, i) => {
        const x = 240 + i * 140;
        return (
          <g key={value}>
            <rect x={x} y={40} width="104" height="42" fill="var(--c-bg)" stroke="var(--c-line)" />
            <line x1={x + 72} y1={40} x2={x + 72} y2={82} stroke="var(--c-line)" strokeWidth="1" />
            <text
              x={x + 36}
              y={67}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO}
            >
              {value}
            </text>
            {i < 2 ? (
              <>
                <circle cx={x + 88} cy={61} r="3.5" fill="var(--c-muted)" />
                <line
                  x1={x + 94}
                  y1={61}
                  x2={x + 136}
                  y2={61}
                  stroke="var(--c-muted)"
                  strokeWidth="1.4"
                  markerEnd="url(#q-linked-plain)"
                />
              </>
            ) : (
              <NullMark x={x + 78} y={52} w={18} h={18} />
            )}
          </g>
        );
      })}

      <g fill="none" stroke="var(--c-accent)" strokeWidth="1.6" markerEnd="url(#q-linked-accent)">
        <path d="M104,84 C104,150 190,160 252,88" />
        <path d="M160,86 C160,190 420,210 568,88" />
      </g>
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        <text x="196" y="130">
          {t.front}
        </text>
        <text x="300" y="196">
          {t.rear}
        </text>
      </g>

      <text x="20" y="222" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.note}
      </text>
    </svg>
  );
}

const CREEP_COPY = {
  tr: {
    label: 'Düz dizide kuyruğun sağa sürünmesi ve yapay olarak dolması',
    first: 'Başlangıçta: front [5], rear [11] — sol taraf zaten boşaldı',
    second: 'Birkaç enqueue sonra: rear son indekse dayandı ⇒ "dolu"',
    front: 'front [5]',
    rear: 'rear [11]',
    rear2: 'rear [16]',
    note: 'beş hücre boş duruyor, ama kuyruk "dolu" — sürünme (creeping)',
  },
  en: {
    label: 'A queue creeping right in a flat array until it is artificially full',
    first: 'At the start: front [5], rear [11] — the left side is already free',
    second: 'A few enqueues later: rear has hit the last index ⇒ "full"',
    front: 'front [5]',
    rear: 'rear [11]',
    rear2: 'rear [16]',
    note: 'five cells stand empty, yet the queue is "full" — this is creeping',
  },
} as const;

const CELLS = 17;

function ArrayRow({ y, from, to }: { y: number; from: number; to: number }) {
  return (
    <g>
      {Array.from({ length: CELLS }, (_, i) => {
        const x = 30 + i * 34;
        const filled = i >= from && i <= to;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="32"
              height="30"
              fill={filled ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={filled ? 'var(--c-line)' : 'var(--c-line)'}
              strokeDasharray={filled ? undefined : '4 3'}
            />
            <text
              x={x + 16}
              y={y + 19}
              textAnchor="middle"
              fill={filled ? 'var(--c-ink)' : 'var(--c-muted)'}
              className="font-mono"
              style={MONO_SM}
            >
              {i}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ArrayCreepFigure({ lang }: { lang: Lang }) {
  const t = CREEP_COPY[lang];
  const center = (i: number) => 30 + i * 34 + 16;

  return (
    <svg viewBox="0 0 640 224" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="q-creep" />

      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.first}
      </text>
      <ArrayRow y={28} from={5} to={11} />
      <g stroke="var(--c-accent)" strokeWidth="1.6">
        <line x1={center(5)} y1="74" x2={center(5)} y2="62" markerEnd="url(#q-creep-accent)" />
        <line x1={center(11)} y1="74" x2={center(11)} y2="62" markerEnd="url(#q-creep-accent)" />
      </g>
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x={center(5)} y="90">
          {t.front}
        </text>
        <text x={center(11)} y="90">
          {t.rear}
        </text>
      </g>

      <text x="16" y="118" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.second}
      </text>
      <ArrayRow y={130} from={5} to={16} />
      <line
        x1={center(16)}
        y1="176"
        x2={center(16)}
        y2="164"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#q-creep-accent)"
      />
      <text
        x={center(16)}
        y="192"
        textAnchor="end"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.rear2}
      </text>

      <text x="16" y="214" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.note}
      </text>
    </svg>
  );
}

const CATEGORIZE_COPY = {
  tr: {
    label: 'Sayıların dört kuyruğa dağıtılarak kategorize edilmesi',
    input: 'Giriş listesi (sırayla okunur)',
    route: 'her sayı uygun kuyruğa',
    note: 'Her grubun içinde sayılar giriş sırasını korur — 3 hâlâ 6’dan önce, 22 hâlâ 29’dan önce.',
    q1: "Q1 · 10'dan küçük",
    q2: 'Q2 · 10 – 19',
    q3: 'Q3 · 20 – 29',
    q4: 'Q4 · 30 ve üzeri',
  },
  en: {
    label: 'Categorizing numbers by routing each one into one of four queues',
    input: 'The input list, read in order',
    route: 'each number to its own queue',
    note: 'Inside each group the numbers keep the order they arrived in — 3 is still before 6, 22 still before 29.',
    q1: 'Q1 · under 10',
    q2: 'Q2 · 10 – 19',
    q3: 'Q3 · 20 – 29',
    q4: 'Q4 · 30 and over',
  },
} as const;

const INPUT_LIST = '3 22 12 6 10 34 65 29 9 30 81 4 5 19 20 57 44 99';

export function CategorizeFigure({ lang }: { lang: Lang }) {
  const t = CATEGORIZE_COPY[lang];
  const rows: [string, string][] = [
    [t.q1, '3 6 9 4 5'],
    [t.q2, '12 10 19'],
    [t.q3, '22 29 20'],
    [t.q4, '34 65 30 81 57 44 99'],
  ];

  return (
    <svg viewBox="0 0 640 258" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="q-cat" />

      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.input}
      </text>
      <text x="16" y="38" fill="var(--c-ink)" className="font-mono" style={MONO}>
        {INPUT_LIST}
      </text>

      <line
        x1="60"
        y1="50"
        x2="60"
        y2="74"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#q-cat-accent)"
      />
      <text x="76" y="68" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.route}
      </text>

      {rows.map(([label, values], i) => {
        const y = 84 + i * 40;
        return (
          <g key={label}>
            <rect x="16" y={y} width="160" height="30" fill="none" stroke="var(--c-line)" />
            <text x="26" y={y + 20} fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
              {label}
            </text>
            <rect
              x="186"
              y={y}
              width="438"
              height="30"
              fill="var(--c-surface)"
              stroke="var(--c-accent)"
            />
            <text x="198" y={y + 20} fill="var(--c-ink)" className="font-mono" style={MONO}>
              {values}
            </text>
          </g>
        );
      })}

      <text x="16" y="250" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.note}
      </text>
    </svg>
  );
}
