import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

import { Exercise, Exercises } from '@/components/complexity/exercise';
import { BigOLadder, Figure, HalfSquareFigure } from '@/components/complexity/figures';
import { GrowthCalculator } from '@/components/complexity/growth-calculator';
import { GrowthChart } from '@/components/complexity/growth-chart';
import { CategoryTable, GrowthNumbersTable } from '@/components/complexity/tables';

/**
 * Rendered on the server, so the full prose is present in the HTML source. The
 * only client-side pieces are the two figures a reader drives themselves —
 * every table and diagram below ships as static markup.
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
  BigOLadder,
  CategoryTable,
  Exercise,
  Exercises,
  Figure,
  GrowthCalculator,
  GrowthChart,
  GrowthNumbersTable,
  HalfSquareFigure,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components as unknown as MdxComponentMap} />
    </div>
  );
}
