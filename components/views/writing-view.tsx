import Link from 'next/link';

import { JsonLd } from '@/components/json-ld';
import { Row, Shell } from '@/components/primitives';
import { getAllPosts } from '@/lib/content';
import { getMessages } from '@/lib/i18n';
import { collectionGraph } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/site';

export function WritingView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const posts = getAllPosts(locale);

  return (
    <>
      <JsonLd
        data={collectionGraph(locale, {
          path: 'blog',
          name: t.writing.title,
          description: t.writing.lead,
          items: posts.map((p) => ({ name: p.title, path: `blog/${p.slug}` })),
        })}
      />

      <Shell>
        <section className="pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="text-h2">{t.writing.title}</h1>
          <p className="mt-6 max-w-[56ch] text-lead text-muted">{t.writing.lead}</p>
          <p className="mt-6">
            <a href="/rss.xml" className="link-rule font-mono text-xs text-accent-ink">
              {t.writing.rss} →
            </a>
          </p>
        </section>
      </Shell>

      <Shell>
        <Row label={t.writing.title} as="section">
          {posts.length === 0 ? (
            <p className="max-w-[48ch] text-muted">{t.writing.empty}</p>
          ) : (
            <ol className="flex flex-col">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-line last:border-b-0">
                  <article className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-[auto_1fr] md:items-baseline">
                    <time
                      dateTime={post.date}
                      className="font-mono text-xs whitespace-nowrap text-muted"
                    >
                      {post.date}
                    </time>
                    <div className="min-w-0">
                      <h3 className="font-display text-h3">
                        <Link
                          href={localePath(locale, `blog/${post.slug}`)}
                          className="link-rule"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-[60ch] text-sm text-muted">{post.summary}</p>
                      {post.tags.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <li
                              key={tag}
                              className="border border-line px-2 py-0.5 font-mono text-xs text-muted"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </Row>
      </Shell>
    </>
  );
}
