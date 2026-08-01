import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

/**
 * Rendered on the server, so the full prose is present in the HTML source.
 * Nothing here is client-side.
 */
type MdxComponentMap = Record<string, ComponentType<Record<string, unknown>>>;

const components = {
  a: ({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  },
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components as unknown as MdxComponentMap} />
    </div>
  );
}
