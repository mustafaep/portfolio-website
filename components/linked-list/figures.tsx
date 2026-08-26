import type { Lang } from '@/components/complexity/shared';

/**
 * Diagrams for the linked-list post. Like the ADT figures these are schematics,
 * not plots: the accent marks the one thing each figure is about and everything
 * else stays in line and muted tokens.
 */

const MONO = { fontSize: '10.5px' } as const;
const MONO_SM = { fontSize: '9.5px' } as const;
const MONO_LG = { fontSize: '12.5px' } as const;

function Arrowheads({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-plain`}
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
        id={`${id}-accent`}
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
  );
}

function NullMark({ x, y, w = 20, h = 20 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g stroke="var(--c-muted)" strokeWidth="1">
      <line x1={x} y1={y} x2={x + w} y2={y + h} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} />
    </g>
  );
}

const HEAD_COPY = {
  tr: {
    label: 'Baş yapısı ve veri düğümü yapısı',
    headTitle: '(a) head structure — liste hakkındaki bilgiler',
    nodeTitle: '(b) data node structure',
    meta: 'count ve pos → metadata:',
    meta2: 'listedeki veriler hakkındaki veriler',
    decl: 'Sözde kod bildirimi',
  },
  en: {
    label: 'The head structure and the data node structure',
    headTitle: '(a) head structure — what is known about the list',
    nodeTitle: '(b) data node structure',
    meta: 'count and pos → metadata:',
    meta2: 'data about the data in the list',
    decl: 'Pseudocode declaration',
  },
} as const;

export function HeadNodeFigure({ lang }: { lang: Lang }) {
  const t = HEAD_COPY[lang];

  return (
    <svg viewBox="0 0 640 216" className="w-full" role="img" aria-label={t.label}>
      <text x="16" y="14" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.headTitle}
      </text>

      <rect x="20" y="30" width="216" height="42" fill="var(--c-surface)" stroke="var(--c-accent)" />
      <line x1="92" y1="30" x2="92" y2="72" stroke="var(--c-line)" strokeWidth="1" />
      <line x1="164" y1="30" x2="164" y2="72" stroke="var(--c-line)" strokeWidth="1" />
      <text
        x="56"
        y="57"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        3
      </text>
      <circle cx="128" cy="51" r="4" fill="var(--c-muted)" />
      <circle cx="200" cy="51" r="4" fill="var(--c-muted)" />
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="56" y="88">
          count
        </text>
        <text x="128" y="88">
          pos
        </text>
        <text x="200" y="88">
          head
        </text>
      </g>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="20" y="114">
          {t.meta}
        </text>
        <text x="20" y="128">
          {t.meta2}
        </text>
      </g>

      <text x="16" y="164" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.nodeTitle}
      </text>
      <rect x="20" y="176" width="144" height="34" fill="none" stroke="var(--c-line)" />
      <line x1="122" y1="176" x2="122" y2="210" stroke="var(--c-line)" strokeWidth="1" />
      <text
        x="71"
        y="198"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        data
      </text>
      <circle cx="143" cy="193" r="4" fill="var(--c-muted)" />

      <line x1="300" y1="8" x2="300" y2="206" stroke="var(--c-line)" strokeWidth="1" />

      <text x="330" y="14" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.decl}
      </text>
      <rect x="330" y="26" width="290" height="88" fill="var(--c-surface)" stroke="var(--c-line)" />
      <g fill="var(--c-ink)" className="font-mono" style={MONO}>
        <text x="346" y="46">
          list
        </text>
        <text x="366" y="64">
          count &lt;integer&gt;
        </text>
        <text x="366" y="82">
          pos &lt;pointer&gt;
        </text>
        <text x="366" y="100">
          head &lt;pointer&gt;
        </text>
      </g>
      <rect x="330" y="130" width="290" height="70" fill="var(--c-surface)" stroke="var(--c-line)" />
      <g fill="var(--c-ink)" className="font-mono" style={MONO}>
        <text x="346" y="150">
          node
        </text>
        <text x="366" y="168">
          data &lt;dataType&gt;
        </text>
        <text x="366" y="186">
          link &lt;pointer&gt;
        </text>
      </g>
    </svg>
  );
}

const SEARCH_COPY = {
  tr: {
    label: 'Sıralı listede başarılı ve başarısız arama; pPre ve pLoc işaretçilerinin konumu',
    hit: '(a) Başarılı arama — target = 20 ⇒ true',
    miss: '(b) Başarısız arama — target = 17 ⇒ false',
    note: 'pLoc iki durumda da aynı yerde:',
    note2: 'hedeften küçük olmayan ilk düğüm',
  },
  en: {
    label: 'A successful and a failed search in a sorted list, with pPre and pLoc',
    hit: '(a) Successful search — target = 20 ⇒ true',
    miss: '(b) Failed search — target = 17 ⇒ false',
    note: 'pLoc lands in the same place both times:',
    note2: 'the first node not smaller than the target',
  },
} as const;

const SEARCH_VALUES = ['5', '15', '20', '95', '100'];

function SearchRow({ y, highlight }: { y: number; highlight: number | null }) {
  return (
    <g>
      {SEARCH_VALUES.map((value, i) => {
        const x = 56 + i * 100;
        const isTarget = highlight === i;
        return (
          <g key={value}>
            <rect
              x={x}
              y={y}
              width="76"
              height="32"
              fill={isTarget ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={isTarget ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={isTarget ? 2 : 1}
            />
            <line
              x1={x + 52}
              y1={y}
              x2={x + 52}
              y2={y + 32}
              stroke="var(--c-line)"
              strokeWidth="1"
            />
            <text
              x={x + 26}
              y={y + 21}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO}
            >
              {value}
            </text>
            {i < SEARCH_VALUES.length - 1 ? (
              <>
                <circle cx={x + 64} cy={y + 16} r="3" fill="var(--c-muted)" />
                <line
                  x1={x + 70}
                  y1={y + 16}
                  x2={x + 92}
                  y2={y + 16}
                  stroke="var(--c-muted)"
                  strokeWidth="1.4"
                  markerEnd="url(#ll-fig-plain)"
                />
              </>
            ) : (
              <NullMark x={x + 56} y={y + 6} w={16} h={20} />
            )}
          </g>
        );
      })}
    </g>
  );
}

function PointerLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <>
      <line
        x1={x}
        y1={y + 22}
        x2={x}
        y2={y + 4}
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#ll-fig-accent)"
      />
      <text
        x={x}
        y={y + 36}
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {text}
      </text>
    </>
  );
}

export function SearchFigure({ lang }: { lang: Lang }) {
  const t = SEARCH_COPY[lang];

  return (
    <svg viewBox="0 0 640 250" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="ll-fig" />

      <text x="16" y="14" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.hit}
      </text>
      <SearchRow y={28} highlight={2} />
      <PointerLabel x={182} y={60} text="pPre" />
      <PointerLabel x={282} y={60} text="pLoc" />

      <line x1="16" y1="126" x2="624" y2="126" stroke="var(--c-line)" strokeWidth="1" />

      <text x="16" y="150" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.miss}
      </text>
      <SearchRow y={164} highlight={null} />
      <PointerLabel x={182} y={196} text="pPre" />
      <PointerLabel x={282} y={196} text="pLoc" />

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="356" y="222">
          {t.note}
        </text>
        <text x="356" y="236">
          {t.note2}
        </text>
      </g>
    </svg>
  );
}

const CIRCULAR_COPY = {
  tr: {
    label: 'Dairesel bağlı liste ve aramanın nerede duracağı',
    start: 'startAddress',
    note: 'son düğüm ilk düğüme döner ⇒ her düğümden her düğüme ulaşılır',
    cond: 'loop (target <> pLoc->data.key  AND  pLoc->link <> startAddress)',
    cond2: 'başlangıç adresi saklanır; ona geri dönülünce durulur',
  },
  en: {
    label: 'A circular linked list and where its search stops',
    start: 'startAddress',
    note: 'the last node points back at the first ⇒ every node reaches every node',
    cond: 'loop (target <> pLoc->data.key  AND  pLoc->link <> startAddress)',
    cond2: 'the starting address is kept; the loop stops when it comes back around',
  },
} as const;

export function CircularListFigure({ lang }: { lang: Lang }) {
  const t = CIRCULAR_COPY[lang];

  return (
    <svg viewBox="0 0 640 168" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="ll-circ" />

      <text x="80" y="18" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.start}
      </text>

      {['A', 'B', 'C', 'D'].map((value, i) => {
        const x = 80 + i * 130;
        const isStart = i === 0;
        return (
          <g key={value}>
            <rect
              x={x}
              y="28"
              width="90"
              height="34"
              fill={isStart ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={isStart ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={isStart ? 2 : 1}
            />
            <line x1={x + 62} y1="28" x2={x + 62} y2="62" stroke="var(--c-line)" strokeWidth="1" />
            <text
              x={x + 31}
              y="50"
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO}
            >
              {value}
            </text>
            <circle cx={x + 76} cy="45" r="3" fill="var(--c-muted)" />
            {i < 3 ? (
              <line
                x1={x + 82}
                y1="45"
                x2={x + 124}
                y2="45"
                stroke="var(--c-muted)"
                strokeWidth="1.4"
                markerEnd="url(#ll-circ-plain)"
              />
            ) : null}
          </g>
        );
      })}

      {/* The wrap-around link is the whole point, so it is the accented one. */}
      <path
        d="M546,62 C546,100 554,108 470,108 L172,108 C104,108 100,86 100,68"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.8"
        markerEnd="url(#ll-circ-accent)"
      />

      <text x="200" y="128" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.note}
      </text>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="16" y="150">
          {t.cond}
        </text>
        <text x="16" y="164">
          {t.cond2}
        </text>
      </g>
    </svg>
  );
}

const DOUBLY_COPY = {
  tr: {
    label: 'Çift bağlı listeye düğüm ekleme: dört bağın güncellenme sırası',
    broken: 'eski bağlar kopar',
    one: '① fore',
    two: '② back',
    three: '③ pSucc->back',
    four: '④ pPre->fore',
  },
  en: {
    label: 'Inserting into a doubly linked list: the order the four links change',
    broken: 'the old links break',
    one: '① fore',
    two: '② back',
    three: '③ pSucc->back',
    four: '④ pPre->fore',
  },
} as const;

function DoubleNode({
  x,
  y,
  value,
  label,
  accent,
}: {
  x: number;
  y: number;
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="150"
        height="42"
        fill={accent ? 'var(--c-surface)' : 'var(--c-bg)'}
        stroke={accent ? 'var(--c-accent)' : 'var(--c-line)'}
        strokeWidth={accent ? 2 : 1}
      />
      <line x1={x + 38} y1={y} x2={x + 38} y2={y + 42} stroke="var(--c-line)" strokeWidth="1" />
      <line x1={x + 112} y1={y} x2={x + 112} y2={y + 42} stroke="var(--c-line)" strokeWidth="1" />
      <text
        x={x + 75}
        y={y + 27}
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        {value}
      </text>
      <circle cx={x + 19} cy={y + 21} r="3.5" fill="var(--c-muted)" />
      <circle cx={x + 131} cy={y + 21} r="3.5" fill="var(--c-muted)" />
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x={x + 19} y={y + 58}>
          back
        </text>
        <text x={x + 131} y={y + 58}>
          fore
        </text>
      </g>
      <text
        x={x + 75}
        y={y - 10}
        textAnchor="middle"
        fill={accent ? 'var(--c-accent-ink)' : 'var(--c-muted)'}
        className="font-mono"
        style={MONO_SM}
      >
        {label}
      </text>
    </g>
  );
}

export function DoublyLinkedFigure({ lang }: { lang: Lang }) {
  const t = DOUBLY_COPY[lang];

  return (
    <svg viewBox="0 0 640 244" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="ll-dbl" />

      <DoubleNode x={80} y={42} value="12" label="pPre" />
      <DoubleNode x={410} y={42} value="45" label="pSucc" />
      <DoubleNode x={245} y={150} value="27" label="pNew" accent />

      {/* The old links, drawn dashed because they are about to be replaced. */}
      <g stroke="var(--c-muted)" strokeWidth="1" strokeDasharray="4 3" fill="none">
        <path d="M215,56 L406,56" />
        <path d="M425,74 L234,74" />
      </g>
      <text
        x="320"
        y="46"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.broken}
      </text>

      <g fill="none" stroke="var(--c-accent)" strokeWidth="1.6" markerEnd="url(#ll-dbl-accent)">
        <path d="M376,171 C420,171 452,120 472,90" />
        <path d="M264,171 C220,171 178,120 158,90" />
        <path d="M429,86 C412,114 400,144 398,164" />
        <path d="M211,86 C220,114 232,148 242,164" />
      </g>
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        <text x="396" y="138">
          {t.one}
        </text>
        <text x="234" y="138" textAnchor="end">
          {t.two}
        </text>
        <text x="440" y="168">
          {t.three}
        </text>
        <text x="200" y="168" textAnchor="end">
          {t.four}
        </text>
      </g>
    </svg>
  );
}

const LIST_ADT_COPY = {
  tr: {
    label: 'List ADT katmanları: uygulama, public fonksiyonlar, dahili fonksiyonlar ve veri yapısı',
    app: 'Uygulama',
    allocates: 'veri için belleği',
    allocates2: 'o ayırır',
    onlyKnows: 'türü bilen',
    onlyKnows2: 'tek yer',
    adt: 'List ADT',
    publicRow: 'public — kullanıcı arayüzü',
    publicFns: 'createList · addNode · removeNode · searchList · traverse · destroyList',
    internalRow: 'internal — yalnızca ADT içinden çağrılır',
    internalFns: '_insert · _delete · _search',
    structure: 'head structure (count · pos · head · compare) + düğümler',
    address: 'adresi',
  },
  en: {
    label:
      'The layers of the List ADT: application, public functions, internal functions and data structure',
    app: 'Application',
    allocates: 'allocates the memory',
    allocates2: 'for the data',
    onlyKnows: 'the only place',
    onlyKnows2: 'that knows the type',
    adt: 'List ADT',
    publicRow: 'public — the user interface',
    publicFns: 'createList · addNode · removeNode · searchList · traverse · destroyList',
    internalRow: 'internal — called only from inside the ADT',
    internalFns: '_insert · _delete · _search',
    structure: 'head structure (count · pos · head · compare) + nodes',
    address: 'its address',
  },
} as const;

export function ListAdtFigure({ lang }: { lang: Lang }) {
  const t = LIST_ADT_COPY[lang];

  return (
    <svg viewBox="0 0 640 244" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="ll-adt" />

      <rect x="16" y="26" width="150" height="188" fill="none" stroke="var(--c-line)" />
      <text
        x="91"
        y="46"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        {t.app}
      </text>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="91" y="72">
          {t.allocates}
        </text>
        <text x="91" y="86">
          {t.allocates2}
        </text>
      </g>
      <rect x="34" y="106" width="114" height="32" fill="var(--c-surface)" stroke="var(--c-accent)" />
      <text
        x="91"
        y="127"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        compare()
      </text>
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="91" y="162">
          {t.onlyKnows}
        </text>
        <text x="91" y="176">
          {t.onlyKnows2}
        </text>
      </g>

      <rect x="206" y="26" width="418" height="188" fill="none" stroke="var(--c-accent)" />
      <text
        x="415"
        y="46"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO}
      >
        {t.adt}
      </text>

      <rect x="226" y="58" width="378" height="44" fill="var(--c-surface)" stroke="var(--c-line)" />
      <text
        x="415"
        y="76"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.publicRow}
      </text>
      <text
        x="415"
        y="94"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.publicFns}
      </text>

      <rect x="226" y="116" width="378" height="40" fill="none" stroke="var(--c-line)" />
      <text
        x="415"
        y="134"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.internalRow}
      </text>
      <text
        x="415"
        y="150"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.internalFns}
      </text>

      <rect x="226" y="170" width="378" height="34" fill="var(--c-surface)" stroke="var(--c-line)" />
      <text
        x="415"
        y="191"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.structure}
      </text>

      <line
        x1="170"
        y1="80"
        x2="222"
        y2="80"
        stroke="var(--c-muted)"
        strokeWidth="1"
        markerEnd="url(#ll-adt-plain)"
      />
      <path
        d="M152,122 C182,122 190,116 222,116"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#ll-adt-accent)"
      />
      <text x="160" y="108" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.address}
      </text>
      <line x1="415" y1="102" x2="415" y2="112" stroke="var(--c-line)" strokeWidth="1" />
      <line x1="415" y1="156" x2="415" y2="166" stroke="var(--c-line)" strokeWidth="1" />
    </svg>
  );
}
