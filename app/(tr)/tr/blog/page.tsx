import type { Metadata } from 'next';

import { WritingView } from '@/components/views/writing-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'tr',
  path: 'blog',
  title: 'Yazılar',
  description:
    'Mustafa Erhan Portakal’ın backend mimarisi, dağıtım ve geliştirdiği üretim sistemlerinin arkasındaki kararlar üzerine notları.',
});

export default function WritingPage() {
  return <WritingView locale="tr" />;
}
