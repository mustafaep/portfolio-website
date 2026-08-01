import type { ReactNode } from 'react';

import { Footer } from './footer';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';
import { fontVariables } from '@/lib/fonts';
import { getMessages } from '@/lib/i18n';
import type { Locale } from '@/lib/site';

import '@/app/globals.css';

/**
 * The single `<html>`/`<body>` shell. Both root layouts — English at `/` and
 * Turkish at `/tr` — render this with their own locale so that the `lang`
 * attribute is genuinely correct per language rather than being patched on the
 * client after hydration.
 */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getMessages(locale);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <a href="#main" className="skip-link font-mono text-xs">
            {t.nav.skipToContent}
          </a>

          <Header
            locale={locale}
            labels={{
              work: t.nav.work,
              about: t.nav.about,
              writing: t.nav.writing,
              contact: t.nav.contact,
              toggleTheme: t.controls.toggleTheme,
              otherLangLabel:
                locale === 'en' ? t.controls.switchToTurkish : t.controls.switchToEnglish,
              otherLangAria: t.controls.languageLabel,
            }}
          />

          <main id="main">{children}</main>

          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
