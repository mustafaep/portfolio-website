'use client';

import type { ReactNode } from 'react';

/**
 * The control strip and frame shared by the step-through figures: a previous /
 * next / reset row, a step counter, and a note that says what just happened.
 *
 * The note is an aria-live region rather than a caption, so a screen-reader user
 * pressing Next hears the change instead of having to hunt for it. Every state
 * these figures show is reachable by keyboard, because the controls are real
 * buttons rather than a canvas that only responds to a pointer.
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

function ControlButton({
  onClick,
  disabled,
  primary,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`border px-3.5 py-1.5 font-mono text-xs transition-colors disabled:cursor-default disabled:opacity-40 ${
        primary
          ? 'border-accent-ink bg-accent-ink text-bg'
          : 'border-line text-muted enabled:hover:border-accent-ink enabled:hover:text-accent-ink'
      }`}
    >
      {children}
    </button>
  );
}

export function Stepper({
  labels,
  index,
  count,
  onIndexChange,
  note,
  tabs,
  children,
}: {
  labels: StepperLabels;
  index: number;
  count: number;
  onIndexChange: (next: number) => void;
  note: string;
  /** Optional scenario switcher rendered above the controls. */
  tabs?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-10 border border-line">
      {tabs ? <div className="border-b border-line px-4 py-3 sm:px-5">{tabs}</div> : null}

      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
        <ControlButton onClick={() => onIndexChange(index - 1)} disabled={index === 0}>
          {labels.previous}
        </ControlButton>
        <ControlButton
          onClick={() => onIndexChange(index + 1)}
          disabled={index === count - 1}
          primary
        >
          {labels.next}
        </ControlButton>
        <ControlButton onClick={() => onIndexChange(0)} disabled={index === 0}>
          {labels.reset}
        </ControlButton>
        <span className="eyebrow ml-auto tabular-nums">
          {labels.step.replace('{i}', String(index)).replace('{n}', String(count - 1))}
        </span>
      </div>

      {children}

      <div className="border-t border-line px-4 py-3.5 sm:px-5" aria-live="polite">
        <p className="eyebrow">{labels.note}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{note}</p>
      </div>
    </div>
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
