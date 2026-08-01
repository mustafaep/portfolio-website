import type { Metadata } from 'next';

import { AboutView } from '@/components/views/about-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'tr',
  path: 'about',
  title: 'Hakkımda',
  description:
    'Mustafa Erhan Portakal, Bursa merkezli bir full-stack developer. Deneyim, eğitim, TÜBİTAK 2209-A araştırma desteği ve IBM Full Stack Software Developer sertifikası.',
});

export default function AboutPage() {
  return <AboutView locale="tr" />;
}
