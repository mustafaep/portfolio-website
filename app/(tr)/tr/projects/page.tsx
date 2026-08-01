import type { Metadata } from 'next';

import { WorkView } from '@/components/views/work-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'tr',
  path: 'projects',
  title: 'İşler',
  description:
    'Mustafa Erhan Portakal’ın üretimdeki sistemleri ve vaka çalışmaları — Auraly-AI, maisonmeda.com e-ticaret platformu ve on-premise kurulan sendika yönetim platformu.',
});

export default function WorkPage() {
  return <WorkView locale="tr" />;
}
