import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteShell } from '@/components/site-shell';
import { rootMetadata, viewport as sharedViewport } from '@/lib/metadata';

export const metadata: Metadata = rootMetadata('en');
export const viewport = sharedViewport;

/** Root layout for the English tree, served at the site root. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
