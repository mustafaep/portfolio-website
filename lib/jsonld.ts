/**
 * Structured data builders.
 *
 * Everything is produced from typed objects and serialised once at render time.
 * No hand-written JSON strings — a stray comma in a template literal is an
 * invisible failure that only shows up in Search Console weeks later.
 */

import {
  SITE_URL,
  absoluteUrl,
  atAGlance,
  award,
  certificate,
  education,
  knowsAbout,
  person,
  tagline,
  type Locale,
} from './site';
import type { BlogDoc, ProjectDoc } from './content';

type Thing = { '@type': string; [key: string]: unknown };
type Graph = { '@context': 'https://schema.org'; '@graph': Thing[] };

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personSchema(locale: Locale): Thing {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    jobTitle: person.jobTitle,
    description: tagline[locale],
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${person.email}`,
    telephone: person.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.location.city,
      addressCountry: person.location.countryCode,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.institution.en,
      sameAs: 'https://www.btu.edu.tr/',
    },
    knowsAbout,
    knowsLanguage: [
      { '@type': 'Language', name: 'Turkish', alternateName: 'tr' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    sameAs: [person.linkedin, person.github],
    award: `${award.name} — ${award.project.en} (${award.period.en})`,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: certificate.name,
      credentialCategory: 'Professional Certificate',
      dateCreated: certificate.dateISO,
      url: certificate.url,
      recognizedBy: { '@type': 'Organization', name: 'IBM' },
    },
  };
}

export function websiteSchema(locale: Locale): Thing {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: `${person.name} — ${person.jobTitle}`,
    description: tagline[locale],
    inLanguage: locale,
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };
}

/** Home page: Person + WebSite + ProfilePage, as one connected graph. */
export function homeGraph(locale: Locale): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(locale),
      websiteSchema(locale),
      {
        '@type': 'ProfilePage',
        '@id': `${absoluteUrl(locale)}#profilepage`,
        url: absoluteUrl(locale),
        name: `${person.name} — ${person.jobTitle}`,
        description: atAGlance[locale],
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
      },
    ],
  };
}

export function aboutGraph(locale: Locale): Graph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(locale),
      {
        '@type': 'AboutPage',
        '@id': `${absoluteUrl(locale, 'about')}#aboutpage`,
        url: absoluteUrl(locale, 'about'),
        name: `${person.name} — ${person.jobTitle}`,
        description: atAGlance[locale],
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      breadcrumb(locale, [{ name: 'About', path: 'about' }]),
    ],
  };
}

/**
 * Projects are software, so SoftwareApplication is the accurate type when the
 * thing is a running application. The union platform has no public URL, so it
 * is described as a CreativeWork instead.
 */
export function projectGraph(project: ProjectDoc, locale: Locale): Graph {
  const url = absoluteUrl(locale, `projects/${project.slug}`);
  const isApp = project.live !== null;

  const work: Thing = {
    '@type': isApp ? 'SoftwareApplication' : 'CreativeWork',
    '@id': `${url}#project`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    url,
    inLanguage: locale,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    keywords: project.stack.join(', '),
    dateModified: project.updated,
  };

  if (isApp) {
    work.applicationCategory = 'WebApplication';
    work.operatingSystem = 'Web';
    work.installUrl = project.live;
    work.sameAs = project.live;
  }
  if (project.github) {
    work.codeRepository = project.github;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      work,
      breadcrumb(locale, [
        { name: 'Work', path: 'projects' },
        { name: project.title, path: `projects/${project.slug}` },
      ]),
    ],
  };
}

export function blogPostGraph(post: BlogDoc, locale: Locale): Graph {
  const url = absoluteUrl(locale, `blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        headline: post.title,
        description: post.summary,
        url,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        keywords: post.tags.join(', '),
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        mainEntityOfPage: url,
        isPartOf: { '@id': WEBSITE_ID },
      },
      breadcrumb(locale, [
        { name: 'Writing', path: 'blog' },
        { name: post.title, path: `blog/${post.slug}` },
      ]),
    ],
  };
}

export function collectionGraph(
  locale: Locale,
  opts: { path: string; name: string; description: string; items: { name: string; path: string }[] },
): Graph {
  const url = absoluteUrl(locale, opts.path);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: opts.name,
        description: opts.description,
        inLanguage: locale,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: opts.items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            url: absoluteUrl(locale, item.path),
          })),
        },
      },
      breadcrumb(locale, [{ name: opts.name, path: opts.path }]),
    ],
  };
}

function breadcrumb(locale: Locale, trail: { name: string; path: string }[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: person.name,
        item: absoluteUrl(locale),
      },
      ...trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: absoluteUrl(locale, crumb.path),
      })),
    ],
  };
}
