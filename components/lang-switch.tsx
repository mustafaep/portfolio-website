'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/lib/site';

/**
 * Turkish routes mirror the English ones under /tr, so the alternate URL is a
 * pure prefix swap. That keeps the switch on the same page instead of dumping
 * the visitor back on the home page.
 */
export function LangSwitch({
  locale,
  label,
  ariaLabel,
}: {
  locale: Locale;
  label: string;
  ariaLabel: string;
}) {
  const pathname = usePathname() ?? '/';

  const href =
    locale === 'tr'
      ? pathname.replace(/^\/tr(?=\/|$)/, '') || '/'
      : `/tr${pathname === '/' ? '' : pathname}`;

  return (
    <Link
      href={href}
      hrefLang={locale === 'tr' ? 'en' : 'tr'}
      aria-label={ariaLabel}
      className="link-rule font-mono text-xs text-muted transition-colors hover:text-ink"
    >
      {label}
    </Link>
  );
}
