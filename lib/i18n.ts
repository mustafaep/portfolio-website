import en from '@/messages/en.json';
import tr from '@/messages/tr.json';

import { DEFAULT_LOCALE, LOCALES, type Locale } from './site';

/** English is the reference shape; tr.json is checked against it at compile time. */
export type Messages = typeof en;

const dictionaries: Record<Locale, Messages> = {
  en,
  tr: tr satisfies Messages,
};

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'tr' : 'en';
}

export { DEFAULT_LOCALE, LOCALES, type Locale };
