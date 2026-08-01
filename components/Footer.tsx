import Link from 'next/link';

import { Shell } from './primitives';
import { getMessages } from '@/lib/i18n';
import { localePath, person, type Locale } from '@/lib/site';

export function Footer({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const year = new Date().getFullYear();

  const machineReadable = [
    { href: '/llms.txt', label: 'llms.txt' },
    { href: '/llms-full.txt', label: 'llms-full.txt' },
    { href: '/api/resume.json', label: 'resume.json' },
    { href: '/rss.xml', label: 'rss.xml' },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <Shell>
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-md">
            <p className="font-display text-h3">{person.name}</p>
            <p className="mt-2 text-sm text-muted">
              {person.jobTitle} · {person.location[locale]}
            </p>
            <p className="mt-6 text-sm text-muted">{t.footer.builtWith}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:gap-14">
            <nav aria-label={t.nav.menu}>
              <h2 className="eyebrow">{t.nav.menu}</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <Link href={localePath(locale)} className="link-rule text-muted hover:text-ink">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, 'projects')}
                    className="link-rule text-muted hover:text-ink"
                  >
                    {t.nav.work}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, 'about')}
                    className="link-rule text-muted hover:text-ink"
                  >
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, 'blog')}
                    className="link-rule text-muted hover:text-ink"
                  >
                    {t.nav.writing}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath(locale, 'contact')}
                    className="link-rule text-muted hover:text-ink"
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow">{t.footer.sourceNote}</h2>
              <ul className="mt-3 flex flex-col gap-2 font-mono text-xs">
                {machineReadable.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="link-rule text-muted hover:text-ink">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {person.name}. {t.footer.rights}
          </p>
          <p>
            <a href={`mailto:${person.email}`} className="link-rule hover:text-ink">
              {person.email}
            </a>
          </p>
        </div>
      </Shell>
    </footer>
  );
}
