import type { Metadata } from 'next';

import { SITE_URL, absoluteUrl, person, tagline, type Locale } from './site';

export const TITLE_TEMPLATE = `%s — ${person.name}`;

type BuildArgs = {
  locale: Locale;
  /** Path without locale prefix, e.g. 'projects/auraly-ai'. Empty for home. */
  path?: string;
  title: string;
  description: string;
  /** Set for blog posts so Open Graph reports an article. */
  type?: 'website' | 'article';
  publishedTime?: string;
  /** Pass false on the home page, where the title is already absolute. */
  applyTemplate?: boolean;
};

/**
 * Every page gets a unique title and description, a self-referencing canonical,
 * and the full set of hreflang alternates including x-default. Search engines
 * treat a missing x-default as an incomplete cluster, so it is never omitted.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  type = 'website',
  publishedTime,
  applyTemplate = true,
}: BuildArgs): Metadata {
  const canonical = absoluteUrl(locale, path);
  const resolvedTitle = applyTemplate ? `${title} — ${person.name}` : title;

  return {
    title: applyTemplate ? title : { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl('en', path),
        tr: absoluteUrl('tr', path),
        'x-default': absoluteUrl('en', path),
      },
      types: {
        'application/rss+xml': [
          { url: `${SITE_URL}/rss.xml`, title: `${person.name} — Writing` },
        ],
      },
    },
    openGraph: {
      type,
      url: canonical,
      siteName: person.name,
      title: resolvedTitle,
      description,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: locale === 'tr' ? 'en_US' : 'tr_TR',
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
    },
  };
}

/** Shared across both root layouts. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${person.name} — ${person.jobTitle}`,
      template: TITLE_TEMPLATE,
    },
    description: tagline[locale],
    authors: [{ name: person.name, url: SITE_URL }],
    creator: person.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}
