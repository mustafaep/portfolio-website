import { getAllPosts } from '@/lib/content';
import { SITE_URL, absoluteUrl, person, tagline } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** English feed. Empty until the first post drops its `draft` flag. */
export function GET() {
  const posts = getAllPosts('en');
  const updated = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl('en', `blog/${post.slug}`);
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${person.name} — Writing`)}</title>`,
    `    <link>${absoluteUrl('en', 'blog')}</link>`,
    `    <description>${escapeXml(tagline.en)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ]
    .filter((line) => line !== '')
    .join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
