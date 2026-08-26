import type { ReactNode } from 'react';

/**
 * One self-check question. The answer is behind a `<details>` because seeing it
 * is not the same as solving it — the source study file makes the same choice.
 * `<details>` is used rather than a JS toggle so the answer is in the HTML,
 * printable, findable with the browser's own search, and open to a crawler.
 */
export function Exercise({
  n,
  question,
  children,
}: {
  n: string;
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="not-prose group border-b border-line last:border-b-0">
      <summary className="flex cursor-pointer list-none items-baseline gap-3.5 py-4 marker:content-none">
        <span className="eyebrow shrink-0 pt-0.5 tabular-nums">{n}</span>
        <span className="flex-1 text-sm leading-relaxed text-ink">{question}</span>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-xs text-muted transition-transform group-open:rotate-90"
        >
          →
        </span>
      </summary>
      <div className="pb-6 pl-[calc(1.6rem+0.875rem)] text-sm leading-relaxed text-muted [&>*+*]:mt-3.5">
        {children}
      </div>
    </details>
  );
}

/** Wraps the exercise list so the rules between items meet the body measure. */
export function Exercises({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 border-t border-line">{children}</div>;
}
