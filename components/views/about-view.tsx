import { JsonLd } from '@/components/json-ld';
import { OutLink, Row, Shell } from '@/components/primitives';
import { getMessages } from '@/lib/i18n';
import { aboutGraph } from '@/lib/jsonld';
import {
  atAGlance,
  award,
  certificate,
  education,
  experience,
  person,
  skills,
  type Locale,
} from '@/lib/site';

export function AboutView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <>
      <JsonLd data={aboutGraph(locale)} />

      <Shell>
        <section className="pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="text-h2">{t.about.title}</h1>
        </section>
      </Shell>

      <Shell>
        {/*
          Third-person summary that stays accurate when lifted out of context.
          This is the block a generative engine is most likely to quote.
        */}
        <Row label={t.about.atAGlance} as="section">
          <h2 className="sr-only">{t.about.atAGlance}</h2>
          <p className="max-w-[62ch] text-lead">{atAGlance[locale]}</p>
          <dl className="mt-8 grid max-w-2xl gap-x-10 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">{t.about.location}</dt>
              <dd className="mt-1 text-sm text-muted">
                {person.location[locale]} — {person.relocation[locale]}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{t.about.languages}</dt>
              <dd className="mt-1 text-sm text-muted">
                {person.languages.map((l) => l[locale]).join(' · ')}
              </dd>
            </div>
          </dl>
        </Row>

        <Row label={t.about.experience} as="section">
          <h2 className="sr-only">{t.about.experience}</h2>
          <div className="flex flex-col gap-12">
            {experience.map((job) => (
              <article key={`${job.company}-${job.startISO}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-h3">{job.company}</h3>
                  <p className="font-mono text-xs text-muted">
                    <time dateTime={job.startISO}>{job.start}</time>
                    {' – '}
                    {job.endISO ? (
                      <time dateTime={job.endISO}>{job.end}</time>
                    ) : (
                      <span>{locale === 'tr' ? 'devam ediyor' : 'present'}</span>
                    )}
                  </p>
                </div>
                <p className="mt-1.5 text-sm text-muted">
                  {job.role} · {job.location[locale]}
                </p>
                {job.summary ? (
                  <p className="mt-4 max-w-[62ch] text-sm">{job.summary[locale]}</p>
                ) : null}
                <ul className="mt-4 flex max-w-[64ch] flex-col gap-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet.en} className="relative pl-4 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.7em] left-0 h-px w-[5px] bg-accent"
                      />
                      {bullet[locale]}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Row>

        <Row label={t.about.education} as="section">
          <h2 className="sr-only">{t.about.education}</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-h3">{education.degree[locale]}</h3>
            <p className="font-mono text-xs text-muted">
              <time dateTime={education.start}>{education.start}</time>
              {' – '}
              <time dateTime={education.end}>{education.end}</time>
            </p>
          </div>
          <p className="mt-1.5 text-sm text-muted">
            {education.institution[locale]} · {education.location[locale]}
          </p>
          <p className="mt-4 max-w-[60ch] text-sm">{education.note[locale]}</p>
        </Row>

        <Row label={t.about.award} as="section">
          <h2 className="sr-only">{t.about.award}</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-h3">
              {locale === 'tr' ? award.nameTr : award.name}
            </h3>
            <p className="font-mono text-xs text-muted">{award.period[locale]}</p>
          </div>
          <p className="mt-1.5 text-sm text-muted">{award.project[locale]}</p>
          <p className="mt-4 max-w-[64ch] text-sm">{award.description[locale]}</p>
          <p className="mt-4 font-mono text-xs">
            <OutLink href={award.url}>{t.about.viewProject}</OutLink>
          </p>
        </Row>

        <Row label={t.about.certificate} as="section">
          <h2 className="sr-only">{t.about.certificate}</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-h3">{certificate.name}</h3>
            <p className="font-mono text-xs text-muted">
              <time dateTime={certificate.dateISO}>{certificate.date[locale]}</time>
            </p>
          </div>
          <p className="mt-1.5 text-sm text-muted">
            {certificate.issuer} · {certificate.type[locale]}
          </p>
          <p className="mt-4 max-w-[64ch] text-sm">{certificate.description[locale]}</p>
          <p className="mt-4 font-mono text-xs">
            <OutLink href={certificate.url}>{t.about.verify}</OutLink>
          </p>
        </Row>

        <Row label={t.about.skills} as="section">
          <h2 className="sr-only">{t.about.skills}</h2>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
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
      </Shell>
    </>
  );
}
