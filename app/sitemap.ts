import type { MetadataRoute } from 'next';

import { getAllPosts, getProjectSlugs } from '@/lib/content';
import { CONTENT_UPDATED, absoluteUrl, type Locale } from '@/lib/site';

/**
 * Every route in both languages, each carrying its hreflang alternates so the
 * English and Turkish versions are declared as one cluster rather than as
 * competing duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'about', 'projects', 'blog', 'contact'];

  const projectPaths = getProjectSlugs('en').map((slug) => `projects/${slug}`);
  const postEntries = getAllPosts('en').map((post) => ({
    path: `blog/${post.slug}`,
    lastModified: post.date,
  }));

  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, lastModified: string, priority: number) => {
    for (const locale of ['en', 'tr'] as Locale[]) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(lastModified),
        changeFrequency: path === '' ? 'monthly' : 'yearly',
        priority,
        alternates: {
          languages: {
            en: absoluteUrl('en', path),
            tr: absoluteUrl('tr', path),
            'x-default': absoluteUrl('en', path),
          },
        },
      });
    }
  };

  push('', CONTENT_UPDATED, 1);
  for (const path of staticPaths.slice(1)) push(path, CONTENT_UPDATED, 0.8);
  for (const path of projectPaths) push(path, CONTENT_UPDATED, 0.7);
  for (const entry of postEntries) push(entry.path, entry.lastModified, 0.6);

  return entries;
}
