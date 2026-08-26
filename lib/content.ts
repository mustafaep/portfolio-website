import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import { CONTENT_UPDATED, projects as projectRegistry, type Locale } from './site';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/** Frontmatter every project MDX file must declare. */
export type ProjectFrontmatter = {
  title: string;
  summary: string;
  role: string;
  /** Omitted for projects CONTENT.md gives no dates for — never guessed. */
  period?: string;
  status: string;
  stack: string[];
  /** Short "what it is" line used in listings and OG images. */
  tagline: string;
};

export type ProjectDoc = ProjectFrontmatter & {
  slug: string;
  locale: Locale;
  body: string;
  live: string | null;
  github: string | null;
  featured: boolean;
  rank: number;
  updated: string;
};

export type BlogFrontmatter = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  /**
   * Optional heading the post is filed under on the blog index. Written in the
   * language of the file, so the same post can be "Veri Yapilari" in Turkish and
   * "Data Structures" in English. Posts without one are listed on their own.
   */
  series?: string;
  draft?: boolean;
};

export type BlogDoc = BlogFrontmatter & {
  slug: string;
  locale: Locale;
  body: string;
};

function readDir(kind: 'projects' | 'blog', locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, kind, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

function requireString(
  value: unknown,
  field: string,
  file: string,
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing or invalid frontmatter field "${field}" in ${file}`);
  }
  return value;
}

function requireStringArray(
  value: unknown,
  field: string,
  file: string,
): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== 'string')) {
    throw new Error(`Frontmatter field "${field}" must be a string array in ${file}`);
  }
  return value as string[];
}

export function getProject(slug: string, locale: Locale): ProjectDoc | null {
  const file = path.join(CONTENT_DIR, 'projects', locale, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const registry = projectRegistry.find((p) => p.slug === slug);
  if (!registry) {
    throw new Error(
      `Project "${slug}" has an MDX file but no entry in the registry in lib/site.ts`,
    );
  }

  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const label = `content/projects/${locale}/${slug}.mdx`;

  return {
    slug,
    locale,
    title: requireString(data.title, 'title', label),
    summary: requireString(data.summary, 'summary', label),
    tagline: requireString(data.tagline, 'tagline', label),
    role: requireString(data.role, 'role', label),
    period: typeof data.period === 'string' ? data.period : undefined,
    status: requireString(data.status, 'status', label),
    stack: requireStringArray(data.stack, 'stack', label),
    body: content,
    live: registry.live,
    github: registry.github,
    featured: registry.featured,
    rank: registry.rank,
    updated: CONTENT_UPDATED,
  };
}

export function getAllProjects(locale: Locale): ProjectDoc[] {
  return readDir('projects', locale)
    .map((slug) => getProject(slug, locale))
    .filter((p): p is ProjectDoc => p !== null)
    .sort((a, b) => a.rank - b.rank);
}

export function getProjectSlugs(locale: Locale): string[] {
  return readDir('projects', locale);
}

export function getPost(slug: string, locale: Locale): BlogDoc | null {
  const file = path.join(CONTENT_DIR, 'blog', locale, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const label = `content/blog/${locale}/${slug}.mdx`;

  return {
    slug,
    locale,
    title: requireString(data.title, 'title', label),
    summary: requireString(data.summary, 'summary', label),
    date: requireString(data.date, 'date', label),
    tags: Array.isArray(data.tags) ? requireStringArray(data.tags, 'tags', label) : [],
    series:
      typeof data.series === 'string' && data.series.trim() !== ''
        ? data.series
        : undefined,
    draft: data.draft === true,
    body: content,
  };
}

/** Published posts only, newest first. Drafts never reach the build output. */
export function getAllPosts(locale: Locale): BlogDoc[] {
  return readDir('blog', locale)
    .map((slug) => getPost(slug, locale))
    .filter((p): p is BlogDoc => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(locale: Locale): string[] {
  return readDir('blog', locale).filter((slug) => {
    const post = getPost(slug, 'en') ?? getPost(slug, 'tr');
    return post !== null && !post.draft;
  });
}

export type PostSeries = {
  /** null is the catch-all group for posts that declare no series. */
  name: string | null;
  posts: BlogDoc[];
};

/**
 * Published posts grouped under their `series` heading, newest first within each
 * group. Groups appear in the order their newest post does, and posts with no
 * series are collected into a single trailing group. Returns one unnamed group
 * when nothing on the site uses a series, so the index stays a flat list until
 * the first series exists.
 */
export function getPostsBySeries(locale: Locale): PostSeries[] {
  const posts = getAllPosts(locale);
  if (!posts.some((post) => post.series)) {
    return posts.length > 0 ? [{ name: null, posts }] : [];
  }

  const groups: PostSeries[] = [];
  const loose: BlogDoc[] = [];

  for (const post of posts) {
    if (!post.series) {
      loose.push(post);
      continue;
    }
    const group = groups.find((g) => g.name === post.series);
    if (group) group.posts.push(post);
    else groups.push({ name: post.series, posts: [post] });
  }

  if (loose.length > 0) groups.push({ name: null, posts: loose });
  return groups;
}

/** All tags in use, for the blog index. */
export function getAllTags(locale: Locale): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}
