'use client';

import { useState } from 'react';

import type { Lang } from '@/components/complexity/shared';
import { CodePanel, Stepper, STEPPER_LABELS } from '@/components/study/stepper';

/**
 * The six insert/delete scenarios from the source study file, stepped one line
 * of pseudocode at a time.
 *
 * This exists because the lesson of the section is an *ordering* claim — set the
 * new node's link before the predecessor's, or the tail of the list is lost — and
 * an ordering claim is exactly what a finished diagram cannot show. Between two
 * frames you can see the moment the list is briefly held by two pointers, which
 * is the whole reason the order matters.
 *
 * Geometry is language-independent; only the notes are translated. Colour is
 * state, not identity: the accent marks whatever the current line touches.
 */

const INSERT_CODE = [
  '1 allocate (pNew)',
  '2 if (memory overflow) return false',
  '3 pNew->data = dataIn',
  '4 if (pPre null)',
  '   1  pNew->link  = pList->head',
  '   2  pList->head = pNew',
  '5 else',
  '   1  pNew->link  = pPre->link',
  '   2  pPre->link  = pNew',
  '6 pList->count = pList->count + 1',
  '7 return true',
];

const DELETE_CODE = [
  '1 dataOut = pLoc->data',
  '2 if (pPre null)',
  '   1  pList->head = pLoc->link',
  '3 else',
  '   1  pPre->link  = pLoc->link',
  '4 pList->count = pList->count - 1',
  '5 release (pLoc)',
  '6 return',
];

type NodeSpec = {
  key: string;
  value: string;
  slot: number;
  /** Omitted = link not set yet; null = null pointer; string = target node key. */
  link?: string | null;
};

type Frame = {
  /** Index into the scenario's code listing, or -1 before it starts. */
  line: number;
  count: number;
  row: NodeSpec[];
  fresh: NodeSpec | null;
  head: string | null;
  labels: Record<string, string>;
  lit: string[];
};

type Scenario = {
  code: string[];
  title: Record<Lang, string>;
  frames: Frame[];
  notes: Record<Lang, string[]>;
};

const n = (key: string, value: string, slot: number, link?: string | null): NodeSpec => ({
  key,
  value,
  slot,
  ...(link === undefined ? {} : { link }),
});

const SCENARIOS: Scenario[] = [
  {
    code: INSERT_CODE,
    title: { tr: 'Boş listeye ekle', en: 'Insert into an empty list' },
    frames: [
      { line: -1, count: 0, row: [], fresh: null, head: null, labels: {}, lit: [] },
      { line: 0, count: 0, row: [], fresh: n('nw', '?', 0), head: null, labels: {}, lit: ['nw'] },
      { line: 2, count: 0, row: [], fresh: n('nw', '33', 0), head: null, labels: {}, lit: ['nw'] },
      { line: 3, count: 0, row: [], fresh: n('nw', '33', 0), head: null, labels: {}, lit: [] },
      {
        line: 4,
        count: 0,
        row: [],
        fresh: n('nw', '33', 0, null),
        head: null,
        labels: {},
        lit: ['nw'],
      },
      {
        line: 5,
        count: 0,
        row: [],
        fresh: n('nw', '33', 0, null),
        head: 'nw',
        labels: {},
        lit: ['head'],
      },
      {
        line: 9,
        count: 1,
        row: [],
        fresh: n('nw', '33', 0, null),
        head: 'nw',
        labels: {},
        lit: [],
      },
      {
        line: 10,
        count: 1,
        row: [n('a', '33', 0, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        'Boş liste: head null, count 0. Eklenecek verinin önünde düğüm yok, yani pPre = null.',
        'Dinamik bellekten yeni düğüm için yer alındı.',
        'Veri yeni düğüme yazıldı.',
        'pPre null mu? → EVET. Dördüncü dala giriliyor.',
        'pNew->link = pList->head. head zaten null olduğu için yeni düğümün bağı da null oldu.',
        'pList->head = pNew. Liste artık yeni düğümü gösteriyor.',
        'Sayaç 1 oldu.',
        'Bitti. Tek elemanlı liste.',
      ],
      en: [
        'An empty list: head is null, count is 0. Nothing precedes the new data, so pPre = null.',
        'Room for the new node was taken from dynamic memory.',
        'The data was written into the new node.',
        'Is pPre null? → YES. The fourth branch is taken.',
        'pNew->link = pList->head. head was already null, so the new node’s link is null too.',
        'pList->head = pNew. The list now points at the new node.',
        'The count is 1.',
        'Done. A one-element list.',
      ],
    },
  },
  {
    code: INSERT_CODE,
    title: { tr: 'Başa ekle', en: 'Insert at the head' },
    frames: [
      {
        line: -1,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
      {
        line: 0,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '?', 0),
        head: 'a',
        labels: {},
        lit: ['nw'],
      },
      {
        line: 2,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '12', 0),
        head: 'a',
        labels: {},
        lit: ['nw'],
      },
      {
        line: 3,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '12', 0),
        head: 'a',
        labels: {},
        lit: [],
      },
      {
        line: 4,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '12', 0, 'a'),
        head: 'a',
        labels: {},
        lit: ['nw'],
      },
      {
        line: 5,
        count: 2,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '12', 0, 'a'),
        head: 'nw',
        labels: {},
        lit: ['head'],
      },
      {
        line: 9,
        count: 3,
        row: [n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '12', 0, 'a'),
        head: 'nw',
        labels: {},
        lit: [],
      },
      {
        line: 10,
        count: 3,
        row: [n('x', '12', 0, 'a'), n('a', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: null,
        head: 'x',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        'Liste: 27 → 45. Eklenecek 12 en küçük olduğu için önünde düğüm yok, yani pPre = null.',
        'Yeni düğüm için yer alındı.',
        'Veri yazıldı.',
        'pPre null mu? → EVET.',
        'pNew->link = pList->head. Yeni düğüm 27’ye bağlandı; listenin geri kalanı güvende.',
        'pList->head = pNew. Baş işaretçi yeni düğüme çevrildi.',
        'Sayaç 3 oldu.',
        'Bitti: 12 → 27 → 45.',
      ],
      en: [
        'The list is 27 → 45. The new value 12 is the smallest, so nothing precedes it: pPre = null.',
        'Room for the new node was taken.',
        'The data was written.',
        'Is pPre null? → YES.',
        'pNew->link = pList->head. The new node now points at 27, so the rest of the list is safe.',
        'pList->head = pNew. The head pointer was moved to the new node.',
        'The count is 3.',
        'Done: 12 → 27 → 45.',
      ],
    },
  },
  {
    code: INSERT_CODE,
    title: { tr: 'Ortaya ekle', en: 'Insert in the middle' },
    frames: [
      {
        line: -1,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 0,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '?', 1),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['nw'],
      },
      {
        line: 2,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['nw'],
      },
      {
        line: 3,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 6,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 7,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1, 'b'),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['nw'],
      },
      {
        line: 8,
        count: 2,
        row: [n('a', '12', 0, 'nw'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1, 'b'),
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['a'],
      },
      {
        line: 9,
        count: 3,
        row: [n('a', '12', 0, 'nw'), n('b', '45', 2, null)],
        fresh: n('nw', '27', 1, 'b'),
        head: 'a',
        labels: {},
        lit: [],
      },
      {
        line: 10,
        count: 3,
        row: [n('a', '12', 0, 'x'), n('x', '27', 1, 'b'), n('b', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        '27 eklenecek. Arama pPre = 12, pLoc = 45 döndürdü.',
        'Yeni düğüm için yer alındı.',
        'Veri yazıldı.',
        'pPre null mu? → HAYIR.',
        'else dalı: ortaya ya da sona ekleme.',
        'pNew->link = pPre->link. Yeni düğüm 45’e bağlandı; kuyruk şu an iki yerden birden tutuluyor.',
        'pPre->link = pNew. 12 artık 27’yi gösteriyor, eski 12→45 bağı koptu.',
        'Sayaç 3 oldu.',
        'Bitti: 12 → 27 → 45.',
      ],
      en: [
        '27 is to be inserted. The search returned pPre = 12 and pLoc = 45.',
        'Room for the new node was taken.',
        'The data was written.',
        'Is pPre null? → NO.',
        'The else branch: inserting in the middle or at the end.',
        'pNew->link = pPre->link. The new node points at 45, so the tail is briefly held from two places at once.',
        'pPre->link = pNew. 12 now points at 27 and the old 12→45 link is gone.',
        'The count is 3.',
        'Done: 12 → 27 → 45.',
      ],
    },
  },
  {
    code: INSERT_CODE,
    title: { tr: 'Sona ekle', en: 'Insert at the end' },
    frames: [
      {
        line: -1,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: null,
        head: 'a',
        labels: { b: 'pPre' },
        lit: [],
      },
      {
        line: 0,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: n('nw', '?', 2),
        head: 'a',
        labels: { b: 'pPre' },
        lit: ['nw'],
      },
      {
        line: 2,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: n('nw', '45', 2),
        head: 'a',
        labels: { b: 'pPre' },
        lit: ['nw'],
      },
      {
        line: 3,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: n('nw', '45', 2),
        head: 'a',
        labels: { b: 'pPre' },
        lit: [],
      },
      {
        line: 6,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: n('nw', '45', 2),
        head: 'a',
        labels: { b: 'pPre' },
        lit: [],
      },
      {
        line: 7,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, null)],
        fresh: n('nw', '45', 2, null),
        head: 'a',
        labels: { b: 'pPre' },
        lit: ['nw'],
      },
      {
        line: 8,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'nw')],
        fresh: n('nw', '45', 2, null),
        head: 'a',
        labels: { b: 'pPre' },
        lit: ['b'],
      },
      {
        line: 9,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'nw')],
        fresh: n('nw', '45', 2, null),
        head: 'a',
        labels: {},
        lit: [],
      },
      {
        line: 10,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'x'), n('x', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        '45 eklenecek. En büyük olduğu için pLoc = null, pPre = son düğüm (27).',
        'Yeni düğüm için yer alındı.',
        'Veri yazıldı.',
        'pPre null mu? → HAYIR.',
        'else dalı.',
        'pNew->link = pPre->link. pPre son düğüm olduğu için bu null; yeni düğüm listenin yeni sonu olacak.',
        'pPre->link = pNew. 27 artık 45’i gösteriyor.',
        'Sayaç 3 oldu.',
        'Bitti: 12 → 27 → 45. Kodda sona ekleme için ayrı bir dal yok.',
      ],
      en: [
        '45 is to be inserted. It is the largest, so pLoc = null and pPre is the last node (27).',
        'Room for the new node was taken.',
        'The data was written.',
        'Is pPre null? → NO.',
        'The else branch.',
        'pNew->link = pPre->link. pPre is the last node so that is null, and the new node becomes the new end.',
        'pPre->link = pNew. 27 now points at 45.',
        'The count is 3.',
        'Done: 12 → 27 → 45. The code has no separate branch for appending.',
      ],
    },
  },
  {
    code: DELETE_CODE,
    title: { tr: 'İlk düğümü sil', en: 'Delete the first node' },
    frames: [
      {
        line: -1,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pLoc' },
        lit: [],
      },
      {
        line: 0,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pLoc' },
        lit: ['a'],
      },
      {
        line: 1,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pLoc' },
        lit: [],
      },
      {
        line: 2,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'b',
        labels: { a: 'pLoc' },
        lit: ['head'],
      },
      {
        line: 5,
        count: 2,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'b',
        labels: { a: 'pLoc' },
        lit: [],
      },
      {
        line: 6,
        count: 2,
        row: [n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'b',
        labels: {},
        lit: [],
      },
      {
        line: 7,
        count: 2,
        row: [n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'b',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        '12 silinecek. İlk düğüm olduğu için pPre = null, pLoc = 12.',
        'Silinecek düğümün verisi çağırana kopyalandı.',
        'pPre null mu? → EVET.',
        'pList->head = pLoc->link. head artık 27’yi gösteriyor; 12 zincirin dışında kaldı.',
        'Sayaç 2 oldu.',
        'release(pLoc) — 12’nin belleği sisteme geri verildi.',
        'Bitti: 27 → 45.',
      ],
      en: [
        '12 is to be deleted. It is the first node, so pPre = null and pLoc = 12.',
        'The data of the node being deleted was copied out to the caller.',
        'Is pPre null? → YES.',
        'pList->head = pLoc->link. head now points at 27 and 12 is outside the chain.',
        'The count is 2.',
        'release(pLoc) — 12’s memory went back to the system.',
        'Done: 27 → 45.',
      ],
    },
  },
  {
    code: DELETE_CODE,
    title: { tr: 'Ortadan sil', en: 'Delete from the middle' },
    frames: [
      {
        line: -1,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 0,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['b'],
      },
      {
        line: 1,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 3,
        count: 3,
        row: [n('a', '12', 0, 'b'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: [],
      },
      {
        line: 4,
        count: 3,
        row: [n('a', '12', 0, 'c'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { a: 'pPre', b: 'pLoc' },
        lit: ['a'],
      },
      {
        line: 5,
        count: 2,
        row: [n('a', '12', 0, 'c'), n('b', '27', 1, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: { b: 'pLoc' },
        lit: [],
      },
      {
        line: 6,
        count: 2,
        row: [n('a', '12', 0, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
      {
        line: 7,
        count: 2,
        row: [n('a', '12', 0, 'c'), n('c', '45', 2, null)],
        fresh: null,
        head: 'a',
        labels: {},
        lit: [],
      },
    ],
    notes: {
      tr: [
        '27 silinecek. Arama pPre = 12, pLoc = 27 döndürdü.',
        'Silinecek düğümün verisi çağırana kopyalandı.',
        'pPre null mu? → HAYIR.',
        'else dalı: ortadan ya da sondan silme.',
        'pPre->link = pLoc->link. 12 doğrudan 45’e bağlandı, 27 zincir dışı.',
        'Sayaç 2 oldu.',
        'release(pLoc) — 27’nin belleği geri verildi.',
        'Bitti: 12 → 45.',
      ],
      en: [
        '27 is to be deleted. The search returned pPre = 12 and pLoc = 27.',
        'The data of the node being deleted was copied out to the caller.',
        'Is pPre null? → NO.',
        'The else branch: deleting from the middle or the end.',
        'pPre->link = pLoc->link. 12 now points straight at 45 and 27 is outside the chain.',
        'The count is 2.',
        'release(pLoc) — 27’s memory went back.',
        'Done: 12 → 45.',
      ],
    },
  },
];

const COPY = {
  tr: {
    label: 'Bağlı listede ekleme ve silme adımlarının canlandırması',
    codeLabel: 'Sözde kod satırları',
    scenarios: 'Senaryolar',
    count: 'count',
    head: 'head',
  },
  en: {
    label: 'A walkthrough of insertion and deletion in a linked list',
    codeLabel: 'Pseudocode lines',
    scenarios: 'Scenarios',
    count: 'count',
    head: 'head',
  },
} as const;

const ROW_Y = 70;
const FRESH_Y = 176;
const NODE_W = 112;
const NODE_H = 42;

const slotX = (slot: number) => 132 + slot * 138;

/** ✕ standing in for a null pointer. */
function NullMark({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g stroke="var(--c-muted)" strokeWidth="1">
      <line x1={x} y1={y} x2={x + w} y2={y + h} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} />
    </g>
  );
}

function linkPath(sx: number, sy: number, tx: number, ty: number): string {
  if (sy === ty) return `M${sx},${sy} L${tx - 7},${ty}`;
  if (sy < ty) return `M${sx},${sy} C${sx + 34},${sy} ${tx - 58},${ty} ${tx - 7},${ty}`;
  return `M${sx},${sy} C${sx + 38},${sy} ${tx - 58},${ty + 74} ${tx - 7},${ty + 6}`;
}

export function LinkedListLab({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const scenario = SCENARIOS[scenarioIndex] ?? SCENARIOS[0]!;
  const frame = scenario.frames[index] ?? scenario.frames[0]!;
  const note = scenario.notes[lang][index] ?? '';

  const nodes = frame.fresh ? [...frame.row, frame.fresh] : frame.row;
  const position = new Map(
    nodes.map((node) => [
      node.key,
      { x: slotX(node.slot), y: node === frame.fresh ? FRESH_Y : ROW_Y },
    ]),
  );
  const headLit = frame.lit.includes('head');

  return (
    <Stepper
      labels={STEPPER_LABELS[lang]}
      index={index}
      count={scenario.frames.length}
      onIndexChange={setIndex}
      note={note}
      tabs={
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.scenarios}>
          {SCENARIOS.map((item, i) => (
            <button
              key={item.title.en}
              type="button"
              aria-pressed={i === scenarioIndex}
              onClick={() => {
                setScenarioIndex(i);
                setIndex(0);
              }}
              className={`border px-2.5 py-1 font-mono text-xs transition-colors ${
                i === scenarioIndex
                  ? 'border-accent-ink bg-accent-ink text-bg'
                  : 'border-line text-muted hover:border-accent-ink hover:text-accent-ink'
              }`}
            >
              {item.title[lang]}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        <div className="border-b border-line bg-surface md:border-r md:border-b-0">
          <CodePanel lines={scenario.code} active={frame.line} label={t.codeLabel} />
        </div>

        <div className="overflow-x-auto p-4 sm:p-5">
          <svg
            viewBox="0 0 600 240"
            className="w-full min-w-[32rem]"
            role="img"
            aria-label={t.label}
          >
            <defs>
              <marker
                id="ll-arrow"
                viewBox="0 0 10 8"
                refX="9"
                refY="4"
                markerWidth="6"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,4 L0,8 z" fill="var(--c-muted)" />
              </marker>
              <marker
                id="ll-arrow-accent"
                viewBox="0 0 10 8"
                refX="9"
                refY="4"
                markerWidth="6"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,4 L0,8 z" fill="var(--c-accent)" />
              </marker>
            </defs>

            {/* Head structure. */}
            <rect
              x="8"
              y={ROW_Y}
              width="100"
              height={NODE_H}
              fill="var(--c-surface)"
              stroke={headLit ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={headLit ? 2 : 1}
            />
            <line
              x1="60"
              y1={ROW_Y}
              x2="60"
              y2={ROW_Y + NODE_H}
              stroke="var(--c-line)"
              strokeWidth="1"
            />
            <text
              x="34"
              y={ROW_Y + 27}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums' }}
            >
              {frame.count}
            </text>
            {frame.head ? (
              <circle
                cx="84"
                cy={ROW_Y + 21}
                r="3.5"
                fill={headLit ? 'var(--c-accent)' : 'var(--c-muted)'}
              />
            ) : (
              <NullMark x={68} y={ROW_Y + 9} w={32} h={24} />
            )}
            <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '9px' }}>
              <text x="34" y={ROW_Y + 56} textAnchor="middle">
                {t.count}
              </text>
              <text x="84" y={ROW_Y + 56} textAnchor="middle">
                {t.head}
              </text>
            </g>

            {/* Links are drawn before the nodes so an arrow never sits on top of
                a box it points into. */}
            {frame.head && position.has(frame.head) ? (
              <path
                d={linkPath(90, ROW_Y + 21, position.get(frame.head)!.x, position.get(frame.head)!.y + 21)}
                fill="none"
                stroke={headLit ? 'var(--c-accent)' : 'var(--c-muted)'}
                strokeWidth={headLit ? 2 : 1.4}
                markerEnd={`url(#ll-arrow${headLit ? '-accent' : ''})`}
              />
            ) : null}
            {nodes.map((node) => {
              if (!node.link || !position.has(node.link)) return null;
              const from = position.get(node.key)!;
              const to = position.get(node.link)!;
              const isLit = frame.lit.includes(node.key);
              return (
                <path
                  key={`link-${node.key}`}
                  d={linkPath(from.x + 101, from.y + 21, to.x, to.y + 21)}
                  fill="none"
                  stroke={isLit ? 'var(--c-accent)' : 'var(--c-muted)'}
                  strokeWidth={isLit ? 2 : 1.4}
                  markerEnd={`url(#ll-arrow${isLit ? '-accent' : ''})`}
                />
              );
            })}

            {nodes.map((node) => {
              const { x, y } = position.get(node.key)!;
              const isLit = frame.lit.includes(node.key);
              const isFresh = node === frame.fresh;
              const stroke = isLit
                ? 'var(--c-accent)'
                : isFresh
                  ? 'var(--c-accent-ink)'
                  : 'var(--c-line)';
              return (
                <g key={node.key}>
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    fill={isLit || isFresh ? 'var(--c-surface)' : 'var(--c-bg)'}
                    stroke={stroke}
                    strokeWidth={isLit ? 2 : 1}
                    strokeDasharray={isFresh && !isLit ? '4 3' : undefined}
                  />
                  <line
                    x1={x + 78}
                    y1={y}
                    x2={x + 78}
                    y2={y + NODE_H}
                    stroke="var(--c-line)"
                    strokeWidth="1"
                  />
                  <text
                    x={x + 39}
                    y={y + 27}
                    textAnchor="middle"
                    fill="var(--c-ink)"
                    className="font-mono"
                    style={{ fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {node.value}
                  </text>
                  {node.link === null ? (
                    <NullMark x={x + 83} y={y + 9} w={22} h={24} />
                  ) : node.link !== undefined ? (
                    <circle
                      cx={x + 95}
                      cy={y + 21}
                      r="3.5"
                      fill={isLit ? 'var(--c-accent)' : 'var(--c-muted)'}
                    />
                  ) : null}
                  {frame.labels[node.key] ? (
                    <text
                      x={x + NODE_W / 2}
                      y={y - 10}
                      textAnchor="middle"
                      fill="var(--c-accent-ink)"
                      className="font-mono"
                      style={{ fontSize: '10px' }}
                    >
                      {frame.labels[node.key]}
                    </text>
                  ) : null}
                  {isFresh ? (
                    <text
                      x={x + NODE_W / 2}
                      y={y + NODE_H + 20}
                      textAnchor="middle"
                      fill="var(--c-accent-ink)"
                      className="font-mono"
                      style={{ fontSize: '10px' }}
                    >
                      pNew
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </Stepper>
  );
}
