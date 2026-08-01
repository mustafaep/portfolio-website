import type { ReactNode } from 'react';

/** Page gutter + max width. Every top-level block sits inside one of these. */
export function Shell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-gutter ${className}`}>{children}</div>
  );
}

/**
 * The site's core layout unit: a mono label in a narrow left column, content in
 * a wide right column, separated by a hairline rule. This is what makes the
 * grid visible instead of stacking everything centred.
 */
export function Row({
  label,
  children,
  className = '',
  as: Tag = 'div',
}: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  return (
    <Tag
      className={`grid gap-x-10 gap-y-4 border-t border-line py-10 md:grid-cols-[minmax(0,9rem)_1fr] md:py-14 ${className}`}
    >
      {label ? <div className="eyebrow pt-1.5">{label}</div> : <div aria-hidden="true" />}
      <div className="min-w-0">{children}</div>
    </Tag>
  );
}

/** Definition list used for Facts blocks — quotable and machine-readable. */
export function FactList({
  items,
}: {
  items: { term: string; value: ReactNode }[];
}) {
  return (
    <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.term} className="bg-bg px-4 py-3.5">
          <dt className="eyebrow">{item.term}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechStack({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <h2 className="eyebrow !font-mono">{label}</h2>
      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="border border-line px-2.5 py-1 font-mono text-xs text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** External link with the site's single underline flourish and an arrow. */
export function OutLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`link-rule inline-flex items-baseline gap-1.5 text-accent-ink ${className}`}
    >
      {children}
      <span aria-hidden="true" className="font-mono text-[0.8em]">
        ↗
      </span>
    </a>
  );
}
