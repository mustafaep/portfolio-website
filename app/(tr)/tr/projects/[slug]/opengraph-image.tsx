import { notFound } from 'next/navigation';

import { getProject, getProjectSlugs } from '@/lib/content';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';
import { person } from '@/lib/site';

export const alt = 'Proje';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getProjectSlugs('tr').map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug, 'tr');
  if (!project) notFound();

  return renderOgImage({
    eyebrow: person.name,
    title: project.title,
    footer: project.role,
  });
}
