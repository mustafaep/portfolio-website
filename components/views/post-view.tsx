import Link from 'next/link';

import { JsonLd } from '@/components/json-ld';
import { Mdx } from '@/components/mdx';
import { Shell } from '@/components/primitives';
import type { BlogDoc } from '@/lib/content';
import { getMessages } from '@/lib/i18n';
import { blogPostGraph } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/site';

export function PostView({ post, locale }: { post: BlogDoc; locale: Locale }) {
  const t = getMessages(locale);

  return (
    <>
      <JsonLd data={blogPostGraph(post, locale)} />

      <Shell>
        <article className="pt-14 pb-8 md:pt-20">
          <nav aria-label={t.writing.title}>
            <Link
              href={localePath(locale, 'blog')}
              className="link-rule font-mono text-xs text-muted hover:text-ink"
            >
              ← {t.writing.backToWriting}
            </Link>
          </nav>

          <header className="mt-8 border-b border-line pb-8">
            <h1 className="max-w-[20ch] text-h2">{post.title}</h1>
            <p className="mt-5 max-w-[58ch] text-lead text-muted">{post.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
              <p>
                {t.writing.publishedOn}{' '}
                <time dateTime={post.date}>{post.date}</time>
              </p>
              {post.tags.length > 0 ? <p>{post.tags.join(' · ')}</p> : null}
            </div>
          </header>

          <div className="mt-10">
            <Mdx source={post.body} />
          </div>
        </article>
      </Shell>
    </>
  );
}
