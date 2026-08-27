import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

import { AdtModelFigure, AtomicCompositeFigure, CallFlowFigure, VoidPointerFigure } from '@/components/adt/figures';
import { PointerTrace } from '@/components/adt/pointer-trace';
import { BigOLadder, HalfSquareFigure } from '@/components/complexity/figures';
import { GrowthCalculator } from '@/components/complexity/growth-calculator';
import { GrowthChart } from '@/components/complexity/growth-chart';
import { CategoryTable, GrowthNumbersTable } from '@/components/complexity/tables';
import {
  CircularListFigure,
  DoublyLinkedFigure,
  HeadNodeFigure,
  ListAdtFigure,
  SearchFigure,
} from '@/components/linked-list/figures';
import { LinkedListLab } from '@/components/linked-list/list-lab';
import { FactList } from '@/components/primitives';
import { ArrayVsListTable, SearchOutcomesTable } from '@/components/linked-list/tables';
import { CircularQueueLab } from '@/components/queue/circular-queue-lab';
import {
  ArrayCreepFigure,
  CategorizeFigure,
  QueueLinkedFigure,
  QueueModelFigure,
} from '@/components/queue/figures';
import { QueueTraceTable } from '@/components/queue/tables';
import { ExpressionLab } from '@/components/stack/expression-lab';
import {
  BacktrackFigure,
  BinaryConversionFigure,
  ParenMatchFigure,
  StackFrameFigure,
  StackImplementationsFigure,
  StackModelFigure,
} from '@/components/stack/figures';
import { Exercise, Exercises } from '@/components/study/exercise';
import { Figure } from '@/components/study/figure';

/**
 * Rendered on the server, so the full prose is present in the HTML source. The
 * only client-side pieces are the figures a reader drives themselves — every
 * table and diagram below ships as static markup.
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
  AdtModelFigure,
  ArrayCreepFigure,
  ArrayVsListTable,
  AtomicCompositeFigure,
  BacktrackFigure,
  BigOLadder,
  BinaryConversionFigure,
  CallFlowFigure,
  CategorizeFigure,
  CategoryTable,
  CircularListFigure,
  CircularQueueLab,
  DoublyLinkedFigure,
  Exercise,
  Exercises,
  ExpressionLab,
  FactList,
  Figure,
  GrowthCalculator,
  GrowthChart,
  GrowthNumbersTable,
  HalfSquareFigure,
  HeadNodeFigure,
  LinkedListLab,
  ListAdtFigure,
  ParenMatchFigure,
  PointerTrace,
  QueueLinkedFigure,
  QueueModelFigure,
  QueueTraceTable,
  SearchFigure,
  SearchOutcomesTable,
  StackFrameFigure,
  StackImplementationsFigure,
  StackModelFigure,
  VoidPointerFigure,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-editorial">
      <MDXRemote source={source} components={components as unknown as MdxComponentMap} />
    </div>
  );
}
