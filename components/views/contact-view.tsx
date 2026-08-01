import { JsonLd } from '@/components/json-ld';
import { OutLink, Row, Shell } from '@/components/primitives';
import { getMessages } from '@/lib/i18n';
import { collectionGraph } from '@/lib/jsonld';
import { person, type Locale } from '@/lib/site';

export function ContactView({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  const channels = [
    {
      label: t.contact.email,
      value: person.email,
      href: `mailto:${person.email}`,
      external: false,
    },
    {
      label: t.contact.phone,
      value: person.phone,
      href: `tel:${person.phoneE164}`,
      external: false,
    },
    { label: t.contact.linkedin, value: 'LinkedIn', href: person.linkedin, external: true },
    { label: t.contact.github, value: 'github.com/mustafaep', href: person.github, external: true },
  ];

  return (
    <>
      <JsonLd
        data={collectionGraph(locale, {
          path: 'contact',
          name: t.contact.title,
          description: t.contact.lead,
          items: [],
        })}
      />

      <Shell>
        <section className="pt-16 pb-12 md:pt-24 md:pb-16">
          <h1 className="text-h2">{t.contact.title}</h1>
          <p className="mt-6 max-w-[54ch] text-lead text-muted">{t.contact.lead}</p>
        </section>
      </Shell>

      <Shell>
        <Row label={t.contact.title} as="section">
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {channels.map((channel) => (
              <div key={channel.label} className="bg-bg px-5 py-4">
                <dt className="eyebrow">{channel.label}</dt>
                <dd className="mt-1.5">
                  {channel.external ? (
                    <OutLink href={channel.href} className="text-sm">
                      {channel.value}
                    </OutLink>
                  ) : (
                    <a href={channel.href} className="link-rule text-sm text-accent-ink">
                      {channel.value}
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label={t.contact.availability} as="section">
          <p className="max-w-[58ch] text-lead">{t.contact.availabilityBody}</p>
        </Row>
      </Shell>
    </>
  );
}
