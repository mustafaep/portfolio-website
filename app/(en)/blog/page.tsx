import type { Metadata } from 'next';

import { WritingView } from '@/components/views/writing-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: 'blog',
  title: 'Writing',
  description:
    'Notes by Mustafa Erhan Portakal on backend architecture, deployment and the decisions behind the production systems he builds.',
});

export default function WritingPage() {
  return <WritingView locale="en" />;
}
