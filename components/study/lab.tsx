'use client';

import type { ReactNode } from 'react';

/**
 * The frame every driven figure in these study notes shares: an optional tab
 * strip, a row of controls, the figure itself, and a note saying what just
 * happened.
 *
 * The note is an aria-live region rather than a caption, so a screen-reader user
 * pressing a control hears the change instead of having to hunt for it. Its
 * label is a slot rather than a constant, which is what lets a figure report an
 * abnormal state — a queue that has just overflowed says OVERFLOW there. That
 * label is the only channel such a state gets: the palette is one neutral family
 * plus one accent, so an error cannot become a second colour.
 *
 * Every state these figures reach is reachable by keyboard, because the controls
 * are real buttons rather than a canvas that only answers a pointer.
 */

export function ControlButton({
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

export function LabFrame({
  tabs,
  controls,
  status,
  noteLabel,
  note,
  children,
}: {
  /** Scenario or mode switcher, rendered above the controls. */
  tabs?: ReactNode;
  controls: ReactNode;
  /** Right-aligned reading of where the figure stands: "step 3 / 8". */
  status?: string;
  noteLabel: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-10 border border-line">
      {tabs ? <div className="border-b border-line px-4 py-3 sm:px-5">{tabs}</div> : null}

      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
        {controls}
        {status ? <span className="eyebrow ml-auto tabular-nums">{status}</span> : null}
      </div>

      {children}

      <div className="border-t border-line px-4 py-3.5 sm:px-5" aria-live="polite">
        <p className="eyebrow">{noteLabel}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{note}</p>
      </div>
    </div>
  );
}
