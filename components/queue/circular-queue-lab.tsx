'use client';

import { useState } from 'react';

import type { Lang } from '@/components/complexity/shared';
import { ControlButton, LabFrame } from '@/components/study/lab';

/**
 * A six-cell circular queue the reader drives with enqueue and dequeue.
 *
 * The section's claim is that the modulus is what lets the freed cells on the
 * left be used again, and a still picture of a ring cannot show that: the thing
 * to see is the single move where rear goes from [5] to [0] while front is still
 * somewhere in the middle. So the figure is driven rather than drawn, and it
 * shows the ring and the logical order side by side — the ring is where the
 * wrap happens, the row is what the queue actually *is* at that moment.
 *
 * Both controls stay enabled at the limits. Reaching the boundary and being told
 * OVERFLOW is the lesson of the section; a disabled button would hide the very
 * check the pseudocode opens with.
 */

const SIZE = 6;

type State = {
  cells: (string | null)[];
  front: number;
  rear: number;
  count: number;
  /** How many values have been enqueued in total — the next letter comes from it. */
  issued: number;
  /** Cell the last operation touched, marked in the ring. */
  touched: number | null;
  note: string;
  noteLabel: string;
};

const COPY = {
  tr: {
    label: 'Dairesel kuyruğun canlı gösterimi: halka ve mantıksal sıra',
    enqueue: 'Enqueue ›',
    dequeue: '‹ Dequeue',
    reset: 'Sıfırla',
    operation: 'SON İŞLEM',
    overflow: 'OVERFLOW',
    underflow: 'UNDERFLOW',
    ring: 'dairesel dizi · maxSize 6',
    logical: "mantıksal sıra — front'tan rear'a",
    empty: 'kuyruk boş',
    frontOut: '↑ front — çıkış',
    rearIn: 'rear — giriş ↑',
    enqueueRule: 'enqueue: rear  = (rear  + 1) % 6',
    dequeueRule: 'dequeue: front = (front + 1) % 6',
    status: (count: number) => `count ${count} / ${SIZE}`,
    reading: (count: number, front: string, rear: string) =>
      `count = ${count}   ·   front = [${front}]   ·   rear = [${rear}]`,
    start: 'Kuyruk boş. Enqueue ile başla.',
    overflowNote: 'Kuyruk dolu (count = 6). enqueue eklemeden önce bunu kontrol eder ve false döner.',
    underflowNote: 'Kuyruk boş (count = 0). dequeue silmeden önce bunu kontrol eder ve false döner.',
    enqueued: (value: string, old: number, next: number, count: number) =>
      `enqueue(${value}) → rear = (${old} + 1) % 6 = ${next}. ${value} [${next}] hücresine yazıldı, count = ${count}.`,
    dequeued: (value: string, old: number, next: number, count: number) =>
      `dequeue() → ${value} döndürüldü. front = (${old} + 1) % 6 = ${next}, count = ${count}.`,
    wrapped: ' ⟲ Halkada başa sarıldı.',
    emptied: ' Kuyruk boşaldı.',
  },
  en: {
    label: 'A live circular queue: the ring and the logical order side by side',
    enqueue: 'Enqueue ›',
    dequeue: '‹ Dequeue',
    reset: 'Reset',
    operation: 'LAST OPERATION',
    overflow: 'OVERFLOW',
    underflow: 'UNDERFLOW',
    ring: 'the circular array · maxSize 6',
    logical: 'the logical order — front to rear',
    empty: 'the queue is empty',
    frontOut: '↑ front — out',
    rearIn: 'rear — in ↑',
    enqueueRule: 'enqueue: rear  = (rear  + 1) % 6',
    dequeueRule: 'dequeue: front = (front + 1) % 6',
    status: (count: number) => `count ${count} / ${SIZE}`,
    reading: (count: number, front: string, rear: string) =>
      `count = ${count}   ·   front = [${front}]   ·   rear = [${rear}]`,
    start: 'The queue is empty. Start with Enqueue.',
    overflowNote:
      'The queue is full (count = 6). enqueue checks this before adding anything and returns false.',
    underflowNote:
      'The queue is empty (count = 0). dequeue checks this before removing anything and returns false.',
    enqueued: (value: string, old: number, next: number, count: number) =>
      `enqueue(${value}) → rear = (${old} + 1) % 6 = ${next}. ${value} was written into cell [${next}], count = ${count}.`,
    dequeued: (value: string, old: number, next: number, count: number) =>
      `dequeue() → ${value} was returned. front = (${old} + 1) % 6 = ${next}, count = ${count}.`,
    wrapped: ' ⟲ It wrapped around the ring.',
    emptied: ' The queue is empty again.',
  },
} as const;

function initialState(startNote: string, label: string): State {
  return {
    cells: Array.from({ length: SIZE }, () => null),
    front: 0,
    rear: SIZE - 1,
    count: 0,
    issued: 0,
    touched: null,
    note: startNote,
    noteLabel: label,
  };
}

const CENTER_X = 150;
const CENTER_Y = 132;
const RADIUS = 72;

/** Cell 0 sits at the top and they run clockwise from there. */
function ringPoint(index: number, radius: number) {
  const angle = ((-90 + index * 60) * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(angle),
    y: CENTER_Y + radius * Math.sin(angle),
  };
}

const MONO = { fontSize: '10.5px' } as const;
const MONO_SM = { fontSize: '9.5px' } as const;

export function CircularQueueLab({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [state, setState] = useState<State>(() => initialState(t.start, t.operation));

  function enqueue() {
    setState((prev) => {
      if (prev.count === SIZE) {
        return { ...prev, touched: null, note: t.overflowNote, noteLabel: t.overflow };
      }
      const rear = (prev.rear + 1) % SIZE;
      const value = String.fromCharCode(65 + (prev.issued % 26));
      const cells = [...prev.cells];
      cells[rear] = value;
      const count = prev.count + 1;
      const wrapped = rear === 0 && prev.rear === SIZE - 1;
      return {
        cells,
        front: prev.front,
        rear,
        count,
        issued: prev.issued + 1,
        touched: rear,
        note: t.enqueued(value, prev.rear, rear, count) + (wrapped ? t.wrapped : ''),
        noteLabel: t.operation,
      };
    });
  }

  function dequeue() {
    setState((prev) => {
      if (prev.count === 0) {
        return { ...prev, touched: null, note: t.underflowNote, noteLabel: t.underflow };
      }
      const value = prev.cells[prev.front] ?? '';
      const cells = [...prev.cells];
      cells[prev.front] = null;
      const front = (prev.front + 1) % SIZE;
      const count = prev.count - 1;
      const wrapped = front === 0 && prev.front === SIZE - 1;
      return {
        cells,
        front,
        rear: prev.rear,
        count,
        issued: prev.issued,
        touched: prev.front,
        note:
          t.dequeued(value, prev.front, front, count) +
          (wrapped ? t.wrapped : '') +
          (count === 0 ? t.emptied : ''),
        noteLabel: t.operation,
      };
    });
  }

  const { cells, front, rear, count, touched } = state;

  return (
    <LabFrame
      noteLabel={state.noteLabel}
      note={state.note}
      status={t.status(count)}
      controls={
        <>
          <ControlButton onClick={enqueue} primary>
            {t.enqueue}
          </ControlButton>
          <ControlButton onClick={dequeue}>{t.dequeue}</ControlButton>
          <ControlButton onClick={() => setState(initialState(t.start, t.operation))}>
            {t.reset}
          </ControlButton>
        </>
      }
    >
      <div className="overflow-x-auto p-4 sm:p-5">
        <svg
          viewBox="0 0 640 268"
          className="w-full min-w-[32rem]"
          role="img"
          aria-label={t.label}
        >
          <defs>
            <marker
              id="q-lab-accent"
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
              id="q-lab-plain"
              viewBox="0 0 10 8"
              refX="9"
              refY="4"
              markerWidth="6"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,4 L0,8 z" fill="var(--c-muted)" />
            </marker>
          </defs>

          <text x="12" y="18" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
            {t.ring}
          </text>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            fill="none"
            stroke="var(--c-line)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {cells.map((value, i) => {
            const p = ringPoint(i, RADIUS);
            const isTouched = touched === i;
            return (
              <g key={`ring-${i}`}>
                <rect
                  x={p.x - 24}
                  y={p.y - 19}
                  width="48"
                  height="38"
                  fill={value ? 'var(--c-surface)' : 'var(--c-bg)'}
                  stroke={isTouched || value ? 'var(--c-accent)' : 'var(--c-line)'}
                  strokeWidth={isTouched ? 2 : 1}
                  strokeDasharray={value ? undefined : '4 3'}
                />
                <text
                  x={p.x}
                  y={p.y - 5}
                  textAnchor="middle"
                  fill="var(--c-muted)"
                  className="font-mono"
                  style={{ fontSize: '9px' }}
                >
                  [{i}]
                </text>
                <text
                  x={p.x}
                  y={p.y + 13}
                  textAnchor="middle"
                  fill={value ? 'var(--c-ink)' : 'var(--c-muted)'}
                  className="font-mono"
                  style={MONO}
                >
                  {value ?? '·'}
                </text>
              </g>
            );
          })}

          {count > 0
            ? (['front', 'rear'] as const).map((which) => {
                const index = which === 'front' ? front : rear;
                const tail = ringPoint(index, RADIUS + 34);
                const head = ringPoint(index, RADIUS + 22);
                const label = ringPoint(index, RADIUS + 50);
                return (
                  <g key={which}>
                    <line
                      x1={tail.x}
                      y1={tail.y}
                      x2={head.x}
                      y2={head.y}
                      stroke={which === 'front' ? 'var(--c-accent)' : 'var(--c-muted)'}
                      strokeWidth="1.6"
                      markerEnd={`url(#q-lab-${which === 'front' ? 'accent' : 'plain'})`}
                    />
                    <text
                      x={label.x}
                      y={label.y + 4}
                      textAnchor="middle"
                      fill={which === 'front' ? 'var(--c-accent-ink)' : 'var(--c-muted)'}
                      className="font-mono"
                      style={MONO_SM}
                    >
                      {which}
                    </text>
                  </g>
                );
              })
            : null}

          <text x="304" y="60" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
            {t.logical}
          </text>
          <text x="304" y="80" fill="var(--c-ink)" className="font-mono" style={MONO_SM}>
            {t.reading(
              count,
              count > 0 ? String(front) : '-',
              count > 0 ? String(rear) : '-',
            )}
          </text>

          {count === 0 ? (
            <>
              <rect
                x="304"
                y="102"
                width="320"
                height="42"
                fill="var(--c-bg)"
                stroke="var(--c-line)"
                strokeDasharray="4 3"
              />
              <text
                x="464"
                y="128"
                textAnchor="middle"
                fill="var(--c-muted)"
                className="font-mono"
                style={MONO}
              >
                {t.empty}
              </text>
            </>
          ) : (
            <>
              {Array.from({ length: count }, (_, k) => {
                const index = (front + k) % SIZE;
                const x = 304 + k * 53;
                const isEnd = k === 0 || k === count - 1;
                return (
                  <g key={`row-${k}`}>
                    <rect
                      x={x}
                      y="102"
                      width="47"
                      height="42"
                      fill={isEnd ? 'var(--c-surface)' : 'var(--c-bg)'}
                      stroke={isEnd ? 'var(--c-accent)' : 'var(--c-line)'}
                      strokeWidth={isEnd ? 2 : 1}
                    />
                    <text
                      x={x + 23}
                      y="128"
                      textAnchor="middle"
                      fill="var(--c-ink)"
                      className="font-mono"
                      style={MONO}
                    >
                      {cells[index]}
                    </text>
                    <text
                      x={x + 23}
                      y="160"
                      textAnchor="middle"
                      fill="var(--c-muted)"
                      className="font-mono"
                      style={{ fontSize: '9px' }}
                    >
                      [{index}]
                    </text>
                  </g>
                );
              })}
              <text
                x="304"
                y="180"
                fill="var(--c-accent-ink)"
                className="font-mono"
                style={MONO_SM}
              >
                {t.frontOut}
              </text>
              <text
                x={304 + count * 53 - 6}
                y="180"
                textAnchor="end"
                fill="var(--c-accent-ink)"
                className="font-mono"
                style={MONO_SM}
              >
                {t.rearIn}
              </text>
            </>
          )}

          <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
            <text x="304" y="216">
              {t.enqueueRule}
            </text>
            <text x="304" y="234">
              {t.dequeueRule}
            </text>
          </g>
        </svg>
      </div>
    </LabFrame>
  );
}
