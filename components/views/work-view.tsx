import Link from 'next/link';

import { JsonLd } from '@/components/json-ld';
import { OutLink, Row, Shell } from '@/components/primitives';
import { Reveal } from '@/components/reveal';
import { getAllProjects } from '@/lib/content';
import { getMessages } from '@/lib/i18n';
import { collectionGraph } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/site';

export function WorkView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const projects = getAllProjects(locale);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd
        data={collectionGraph(locale, {
          path: 'projects',
          name: t.work.title,
          description: t.work.lead,
          items: projects.map((p) => ({ name: p.title, path: `projects/${p.slug}` })),
        })}
      />

      <Shell>
        <section className="pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="text-h2">{t.work.title}</h1>
          <p className="mt-6 max-w-[56ch] text-lead text-muted">{t.work.lead}</p>
        </section>
      </Shell>

      <Shell>
        <Row label={t.work.featured} as="section">
          <ol className="flex flex-col">
            {featured.map((project, index) => (
              <li key={project.slug} className="border-b border-line last:border-b-0">
                <Reveal>
                  <article className="grid gap-x-8 gap-y-4 py-9 md:grid-cols-[auto_1fr]">
                    <p className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <div className="min-w-0">
                      <h3 className="font-display text-h3">
                        <Link
                          href={localePath(locale, `projects/${project.slug}`)}
                          className="link-rule"
                        >
                          {project.title}
                        </Link>
                      </h3>
                      <p className="mt-3 max-w-[62ch] text-muted">{project.summary}</p>
                      <p className="mt-4 font-mono text-xs text-muted">
                        {project.stack.slice(0, 6).join(' · ')}
                      </p>
                      <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
                        <Link
                          href={localePath(locale, `projects/${project.slug}`)}
                          className="link-rule text-accent-ink"
                        >
                          {t.work.readCase} →
                        </Link>
                        {project.live ? (
                          <OutLink href={project.live}>{t.work.visitLive}</OutLink>
                        ) : (
                          <span className="text-muted">{t.work.noLiveLink}</span>
                        )}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Row>

        <Row label={t.work.other} as="section">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {others.map((project) => (
              <li key={project.slug} className="flex flex-col gap-3 bg-bg p-6">
                <h3 className="font-display text-h3">
                  <Link
                    href={localePath(locale, `projects/${project.slug}`)}
                    className="link-rule"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="grow text-sm text-muted">{project.tagline}</p>
                <p className="font-mono text-xs text-muted">
                  {project.stack.slice(0, 4).join(' · ')}
                </p>
                <p className="flex flex-wrap gap-x-5 gap-y-1 pt-1 font-mono text-xs">
                  <Link
                    href={localePath(locale, `projects/${project.slug}`)}
                    className="link-rule text-accent-ink"
                  >
                    {t.writing.readPost} →
                  </Link>
                  {project.live ? (
                    <OutLink href={project.live}>{t.work.visitLive}</OutLink>
                  ) : null}
                  {project.github ? (
                    <OutLink href={project.github}>{t.work.viewSource}</OutLink>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </Row>
      </Shell>
    </>
  );
}
