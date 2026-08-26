import type { ReactNode } from 'react';

/**
 * A bordered diagram with its caption underneath. Shared by every study-note
 * post so the figures on one page and the next sit in the same frame.
 */
export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-10">
      <div className="border border-line px-4 py-5 sm:px-5">{children}</div>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
