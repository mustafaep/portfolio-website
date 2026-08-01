import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostView } from '@/components/views/post-view';
import { getAllPosts, getPost } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts('tr').map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, 'tr');
  if (!post) return {};

  return buildMetadata({
    locale: 'tr',
    path: `blog/${slug}`,
    title: post.title,
    description: post.summary,
    type: 'article',
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, 'tr');
  if (!post || post.draft) notFound();

  return <PostView post={post} locale="tr" />;
}
