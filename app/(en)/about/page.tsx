import type { Metadata } from 'next';

import { AboutView } from '@/components/views/about-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: 'about',
  title: 'About',
  description:
    'Mustafa Erhan Portakal is a full-stack developer based in Bursa, Türkiye. Experience, education, the TÜBİTAK 2209-A research award and the IBM Full Stack Software Developer certificate.',
});

export default function AboutPage() {
  return <AboutView locale="en" />;
}
