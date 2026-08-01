import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectView } from '@/components/views/project-view';
import { getProject, getProjectSlugs } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

/** Fully static: every project page is generated at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs('tr').map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug, 'tr');
  if (!project) return {};

  return buildMetadata({
    locale: 'tr',
    path: `projects/${slug}`,
    title: project.title,
    description: project.summary,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug, 'tr');
  if (!project) notFound();

  return <ProjectView project={project} locale="tr" />;
}
