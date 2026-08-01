import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteShell } from '@/components/site-shell';
import { rootMetadata } from '@/lib/metadata';

export const metadata: Metadata = rootMetadata('tr');

/** Root layout for the Turkish tree under /tr, with its own `lang` attribute. */
export default function TurkishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="tr">{children}</SiteShell>;
}
