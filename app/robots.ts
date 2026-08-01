import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * AI crawlers are allowed deliberately.
 *
 * The point of this site is to be found and cited — including by generative
 * search engines — so GPTBot, ClaudeBot, PerplexityBot and Google-Extended are
 * named explicitly rather than left to the wildcard. Naming them is what makes
 * the permission unambiguous when an operator checks for a specific token.
 *
 * No Crawl-delay: the previous static robots.txt set one, and crawlers that
 * honour it simply fetched the site more slowly for no benefit.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
