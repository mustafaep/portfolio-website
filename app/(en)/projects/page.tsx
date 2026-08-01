import type { Metadata } from 'next';

import { WorkView } from '@/components/views/work-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: 'projects',
  title: 'Work',
  description:
    'Production systems and case studies by Mustafa Erhan Portakal — Auraly-AI, the maisonmeda.com e-commerce platform and an on-premise union management platform.',
});

export default function WorkPage() {
  return <WorkView locale="en" />;
}
