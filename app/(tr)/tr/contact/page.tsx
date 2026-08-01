import type { Metadata } from 'next';

import { ContactView } from '@/components/views/contact-view';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  locale: 'tr',
  path: 'contact',
  title: 'İletişim',
  description:
    'Mustafa Erhan Portakal ile iletişim — e-posta, telefon, LinkedIn ve GitHub. Full-stack developer pozisyonlarına ve freelance projelere açık; Bursa, taşınma ve remote.',
});

export default function ContactPage() {
  return <ContactView locale="tr" />;
}
