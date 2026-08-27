'use client';

import type { ReactNode } from 'react';

import { ControlButton, LabFrame } from '@/components/study/lab';

/**
 * The controls for a figure that is walked one step at a time: previous, next,
 * reset, and a step counter. Everything else — the frame, the aria-live note —
 * comes from LabFrame, which the figures driven by their own operations rather
 * than by an index share with this.
 */

export type StepperLabels = {
  previous: string;
  next: string;
  reset: string;
  /** "step {i} / {n}" with both placeholders. */
  step: string;
  note: string;
};

export const STEPPER_LABELS: Record<'tr' | 'en', StepperLabels> = {
  tr: {
    previous: '‹ Geri',
    next: 'İleri ›',
    reset: 'Sıfırla',
    step: 'adım {i} / {n}',
    note: 'ADIM',
  },
  en: {
    previous: '‹ Back',
    next: 'Next ›',
    reset: 'Reset',
    step: 'step {i} / {n}',
    note: 'STEP',
  },
};

export function Stepper({
  labels,
  index,
  count,
  onIndexChange,
  note,
  noteLabel,
  tabs,
  children,
}: {
  labels: StepperLabels;
  index: number;
  count: number;
  onIndexChange: (next: number) => void;
  note: string;
  /** Overrides the STEP eyebrow when a frame is reporting something else. */
  noteLabel?: string;
  /** Optional scenario switcher rendered above the controls. */
  tabs?: ReactNode;
  children: ReactNode;
}) {
  return (
    <LabFrame
      tabs={tabs}
      noteLabel={noteLabel ?? labels.note}
      note={note}
      status={labels.step
        .replace('{i}', String(index))
        .replace('{n}', String(Math.max(count - 1, 0)))}
      controls={
        <>
          <ControlButton onClick={() => onIndexChange(index - 1)} disabled={index === 0}>
            {labels.previous}
          </ControlButton>
          <ControlButton
            onClick={() => onIndexChange(index + 1)}
            disabled={index >= count - 1}
            primary
          >
            {labels.next}
          </ControlButton>
          <ControlButton onClick={() => onIndexChange(0)} disabled={index === 0}>
            {labels.reset}
          </ControlButton>
        </>
      }
    >
      {children}
    </LabFrame>
  );
}

/**
 * The code panel next to a step figure. The active line is marked with an accent
 * rule and a bolder ink, never colour alone.
 */
export function CodePanel({
  lines,
  active,
  label,
}: {
  lines: string[];
  active: number;
  label: string;
}) {
  return (
    <ol className="py-3 font-mono text-xs leading-[1.9]" aria-label={label}>
      {lines.map((line, i) => (
        <li
          key={`${i}-${line}`}
          aria-current={i === active ? 'step' : undefined}
          className={`border-l-2 px-3 whitespace-pre ${
            i === active
              ? 'border-accent bg-surface font-medium text-ink'
              : 'border-transparent text-muted'
          }`}
        >
          {line === '' ? ' ' : line}
        </li>
      ))}
    </ol>
  );
}
