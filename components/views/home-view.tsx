import Link from 'next/link';

import { JsonLd } from '@/components/json-ld';
import { OutLink, Row, Shell } from '@/components/primitives';
import { Reveal } from '@/components/reveal';
import { getAllProjects } from '@/lib/content';
import { getMessages } from '@/lib/i18n';
import { homeGraph } from '@/lib/jsonld';
import { experience, localePath, person, skills, tagline, type Locale } from '@/lib/site';

const headline = {
  en: 'I build and ship production web systems, end to end.',
  tr: 'Üretim ortamına çıkan web sistemlerini uçtan uca geliştiriyorum.',
};

const currently = {
  en: 'Freelance full-stack developer since November 2025, and co-founder of Vimof Studios since July 2025.',
  tr: 'Kasım 2025’ten bu yana freelance full-stack developer, Temmuz 2025’ten bu yana Vimof Studios kurucu ortağı.',
};

export function HomeView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const projects = getAllProjects(locale);
  const live = projects.filter((p) => p.live);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={homeGraph(locale)} />

      {/* Hero: one sentence about the work, then straight to the evidence. */}
      <Shell>
        <section className="pt-16 pb-14 md:pt-28 md:pb-20">
          <p className="eyebrow">
            {t.home.heroLead} · {person.location[locale]}
          </p>
          <h1 className="mt-6 max-w-[16ch] text-hero">{headline[locale]}</h1>
          <p className="mt-8 max-w-[52ch] text-lead text-muted">{tagline[locale]}</p>
        </section>
      </Shell>

      <Shell>
        {/* Proof first: things a reader can open right now. */}
        <Row label={t.home.liveWork} as="section">
          <p className="max-w-[46ch] text-sm text-muted">{t.home.liveWorkNote}</p>
          <ul className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-3">
            {live.map((project) => (
              <li key={project.slug} className="flex flex-col gap-2 bg-bg p-5">
                <h3 className="font-display text-h3">{project.title}</h3>
                <p className="grow text-sm text-muted">{project.tagline}</p>
                <p className="pt-1">
                  <OutLink href={project.live!} className="font-mono text-xs">
                    {project.live!.replace(/^https?:\/\//, '')}
                  </OutLink>
                </p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label={t.home.currently} as="section">
          <p className="max-w-[54ch] text-lead">{currently[locale]}</p>
        </Row>

        {/* Case studies. */}
        <Row label={t.home.selectedWork} as="section">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="sr-only">{t.home.selectedWork}</h2>
            <p className="max-w-[46ch] text-sm text-muted">{t.home.selectedWorkNote}</p>
            <Link
              href={localePath(locale, 'projects')}
              className="link-rule font-mono text-xs text-accent-ink"
            >
              {t.home.viewAllWork} →
            </Link>
          </div>

          <ol className="mt-8">
            {featured.map((project, index) => (
              <li key={project.slug} className="border-t border-line first:border-t-0">
                <Reveal>
                  <Link
                    href={localePath(locale, `projects/${project.slug}`)}
                    className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-h3 group-hover:text-accent-ink">
                        {project.title}
                      </span>
                      <span className="mt-2 block max-w-[54ch] text-sm text-muted">
                        {project.tagline}
                      </span>
                      <span className="mt-3 block font-mono text-xs text-muted">
                        {project.stack.slice(0, 4).join(' · ')}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-ink"
                    >
                      {t.work.readCase} →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </Row>

        {/* Experience, compressed. The full detail lives on /about. */}
        <Row label={t.home.experienceTitle} as="section">
          <h2 className="sr-only">{t.home.experienceTitle}</h2>
          <ul className="flex flex-col">
            {experience.map((job) => (
              <li
                key={`${job.company}-${job.startISO}`}
                className="grid gap-x-8 gap-y-1 border-b border-line py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <div>
                  <h3 className="font-display text-h3">{job.company}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {job.role} · {job.location[locale]}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">
                  <time dateTime={job.startISO}>{job.start}</time>
                  {' – '}
                  {job.endISO ? (
                    <time dateTime={job.endISO}>{job.end}</time>
                  ) : (
                    <span>{locale === 'tr' ? 'devam ediyor' : 'present'}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href={localePath(locale, 'about')}
              className="link-rule font-mono text-xs text-accent-ink"
            >
              {t.home.viewExperience} →
            </Link>
          </p>
        </Row>

        {/* Capabilities as plain grouped lists. No levels, no bars, no scores. */}
        <Row label={t.home.capabilitiesTitle} as="section">
          <h2 className="sr-only">{t.home.capabilitiesTitle}</h2>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.key}>
                <dt className="eyebrow">{group.label[locale]}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {group.items.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label={t.nav.contact} as="section">
          <p className="max-w-[36ch] font-display text-h2">{t.home.contactPrompt}</p>
          <p className="mt-6">
            <Link
              href={localePath(locale, 'contact')}
              className="link-rule font-mono text-sm text-accent-ink"
            >
              {t.home.contactCta} →
            </Link>
          </p>
        </Row>
      </Shell>
    </>
  );
}
