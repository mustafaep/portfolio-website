import Link from 'next/link';

import { Shell } from '@/components/primitives';
import { getMessages } from '@/lib/i18n';
import { localePath } from '@/lib/site';

export default function NotFound() {
  const t = getMessages('en');

  const links = [
    { href: localePath('en', 'projects'), label: t.nav.work },
    { href: localePath('en', 'about'), label: t.nav.about },
    { href: localePath('en', 'blog'), label: t.nav.writing },
    { href: localePath('en', 'contact'), label: t.nav.contact },
  ];

  return (
    <Shell>
      <section className="py-24 md:py-32">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 max-w-[14ch] text-h2">{t.notFound.title}</h1>
        <p className="mt-6 max-w-[46ch] text-lead text-muted">{t.notFound.body}</p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          <li>
            <Link href={localePath('en')} className="link-rule text-accent-ink">
              {t.notFound.home} →
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-rule text-muted hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
