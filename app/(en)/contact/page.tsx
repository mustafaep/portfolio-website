import type { Metadata } from 'next';

import { ContactView } from '@/components/views/contact-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'en',
  path: 'contact',
  title: 'Contact',
  description:
    'Contact Mustafa Erhan Portakal — email, phone, LinkedIn and GitHub. Open to full-stack developer roles and freelance projects, in Bursa, on relocation or remote.',
});

export default function ContactPage() {
  return <ContactView locale="en" />;
}
