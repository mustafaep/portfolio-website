import Link from 'next/link';

import { JsonLd } from '@/components/json-ld';
import { Mdx } from '@/components/mdx';
import { FactList, OutLink, Shell, TechStack } from '@/components/primitives';
import type { ProjectDoc } from '@/lib/content';
import { getMessages } from '@/lib/i18n';
import { projectGraph } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/site';

export function ProjectView({ project, locale }: { project: ProjectDoc; locale: Locale }) {
  const t = getMessages(locale);

  const facts = [
    { term: t.project.role, value: project.role },
    ...(project.period ? [{ term: t.project.period, value: project.period }] : []),
    { term: t.project.status, value: project.status },
    {
      term: t.project.links,
      value: project.live ? (
        <OutLink href={project.live}>{project.live.replace(/^https?:\/\//, '')}</OutLink>
      ) : project.github ? (
        <OutLink href={project.github}>{t.project.source}</OutLink>
      ) : (
        <span className="text-muted">{t.work.noLiveLink}</span>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={projectGraph(project, locale)} />

      <Shell>
        <article className="pt-14 pb-8 md:pt-20">
          <nav aria-label={t.work.title}>
            <Link
              href={localePath(locale, 'projects')}
              className="link-rule font-mono text-xs text-muted hover:text-ink"
            >
              ← {t.work.backToWork}
            </Link>
          </nav>

          <header className="mt-8">
            <h1 className="text-h2">{project.title}</h1>
            {/* First sentence is written to stand alone when quoted. */}
            <p className="mt-6 max-w-[58ch] text-lead text-muted">{project.summary}</p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-16">
            <div className="order-2 lg:order-1">
              <Mdx source={project.body} />
            </div>

            <aside className="order-1 flex flex-col gap-8 lg:order-2">
              <div>
                <h2 className="eyebrow">{t.project.facts}</h2>
                <div className="mt-3">
                  <FactList items={facts} />
                </div>
              </div>
              <TechStack items={project.stack} label={t.project.techStack} />
            </aside>
          </div>
        </article>
      </Shell>
    </>
  );
}
