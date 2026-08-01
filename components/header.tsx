'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LangSwitch } from './lang-switch';
import { ThemeToggle } from './theme-toggle';
import { Shell } from './primitives';
import { localePath, person, type Locale } from '@/lib/site';

export type HeaderLabels = {
  work: string;
  about: string;
  writing: string;
  contact: string;
  toggleTheme: string;
  otherLangLabel: string;
  otherLangAria: string;
};

export function Header({ locale, labels }: { locale: Locale; labels: HeaderLabels }) {
  const pathname = usePathname() ?? '/';

  const items = [
    { href: localePath(locale, 'projects'), label: labels.work },
    { href: localePath(locale, 'about'), label: labels.about },
    { href: localePath(locale, 'blog'), label: labels.writing },
    { href: localePath(locale, 'contact'), label: labels.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <Shell>
        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4">
          <Link
            href={localePath(locale)}
            className="font-mono text-xs tracking-tight text-ink"
          >
            {person.name}
            <span className="text-accent" aria-hidden="true">
              .
            </span>
          </Link>

          <div className="flex items-center justify-between gap-5 sm:justify-end sm:gap-6">
            <nav aria-label={labels.work}>
              <ul className="flex items-center gap-4 sm:gap-6">
                {items.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`link-rule font-mono text-xs transition-colors hover:text-ink ${
                          active ? 'text-ink' : 'text-muted'
                        }`}
                        style={active ? { backgroundSize: '100% 1px' } : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3 border-l border-line pl-4 sm:pl-5">
              <LangSwitch
                locale={locale}
                label={labels.otherLangLabel}
                ariaLabel={labels.otherLangAria}
              />
              <ThemeToggle label={labels.toggleTheme} />
            </div>
          </div>
        </div>
      </Shell>
    </header>
  );
}
