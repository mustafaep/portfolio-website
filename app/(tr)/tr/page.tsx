import type { Metadata } from 'next';

import { HomeView } from '@/components/views/home-view';
import { buildMetadata } from '@/lib/metadata';
import { person, tagline } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  locale: 'tr',
  title: `${person.name} — ${person.jobTitle}`,
  description: tagline.tr,
  applyTemplate: false,
});

export default function HomePage() {
  return <HomeView locale="tr" />;
}
