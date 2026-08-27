import type { Lang } from '@/components/complexity/shared';

/**
 * Diagrams for the stacks post. Like the ADT and linked-list figures these are
 * schematics rather than plots: the accent marks the one thing each figure is
 * about — the top of the stack, the remainder being pushed, the branch that
 * reaches the goal — and everything else stays in line and muted tokens.
 *
 * Geometry is language-independent; only the labels are translated.
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

/** One box of a stack column or a value row. */
function Box({
  x,
  y,
  w,
  h,
  value,
  accent,
  dashed,
  size = MONO,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  value: string;
  accent?: boolean;
  dashed?: boolean;
  size?: { fontSize: string };
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={accent ? 'var(--c-surface)' : 'var(--c-bg)'}
        stroke={accent ? 'var(--c-accent)' : 'var(--c-line)'}
        strokeWidth={accent ? 2 : 1}
        strokeDasharray={dashed ? '4 3' : undefined}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fill={value === '·' ? 'var(--c-muted)' : 'var(--c-ink)'}
        className="font-mono"
        style={size}
      >
        {value}
      </text>
    </g>
  );
}

const MODEL_COPY = {
  tr: {
    label: 'Yığın: tek uçtan push, pop ve stackTop; LIFO ile sıranın tersine dönmesi',
    anatomy: 'Tek bir uç: tepe',
    push: 'push',
    pushSub: 'üste ekle',
    pop: 'pop',
    popSub: 'üstten al, sil',
    top: 'tepe (top)',
    base: 'taban — ilk giren',
    copy: 'stackTop tepedekini kopyalar, silmez',
    lifo: 'LIFO ⇒ sıra tersine döner',
    inOrder: 'giriş sırası',
    outOrder: 'çıkış sırası',
    pushAll: 'push ×5',
    popAll: 'pop ×5',
    lastIn: 'son giren',
    firstOut: 'ilk çıkar',
  },
  en: {
    label: 'A stack: push, pop and stackTop at one end, and the reversal LIFO produces',
    anatomy: 'A single end: the top',
    push: 'push',
    pushSub: 'add on top',
    pop: 'pop',
    popSub: 'take off the top',
    top: 'top',
    base: 'base — first in',
    copy: 'stackTop copies the top element, it does not remove it',
    lifo: 'LIFO ⇒ the order is reversed',
    inOrder: 'order in',
    outOrder: 'order out',
    pushAll: 'push ×5',
    popAll: 'pop ×5',
    lastIn: 'last in',
    firstOut: 'first out',
  },
} as const;

const COLUMN = ['5', '4', '3', '2', '1'];

export function StackModelFigure({ lang }: { lang: Lang }) {
  const t = MODEL_COPY[lang];

  return (
    <svg viewBox="0 0 640 306" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="st-model" />

      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.anatomy}
      </text>

      <g textAnchor="middle" className="font-mono">
        <text x="132" y="34" fill="var(--c-accent-ink)" style={MONO}>
          {t.push}
        </text>
        <text x="132" y="48" fill="var(--c-muted)" style={MONO_SM}>
          {t.pushSub}
        </text>
        <text x="212" y="34" fill="var(--c-accent-ink)" style={MONO}>
          {t.pop}
        </text>
        <text x="212" y="48" fill="var(--c-muted)" style={MONO_SM}>
          {t.popSub}
        </text>
      </g>
      <g stroke="var(--c-accent)" strokeWidth="1.6">
        <line x1="132" y1="56" x2="132" y2="84" markerEnd="url(#st-model-accent)" />
        <line x1="212" y1="84" x2="212" y2="56" markerEnd="url(#st-model-accent)" />
      </g>

      {COLUMN.map((value, i) => (
        <Box
          key={`anatomy-${value}`}
          x={110}
          y={88 + i * 32}
          w={124}
          h={32}
          value={value}
          accent={i === 0}
          size={MONO_LG}
        />
      ))}

      <line
        x1="272"
        y1="104"
        x2="240"
        y2="104"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#st-model-accent)"
      />
      <text x="276" y="108" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.top}
      </text>
      <text
        x="172"
        y="268"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.base}
      </text>
      <text x="16" y="294" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.copy}
      </text>

      <line x1="340" y1="8" x2="340" y2="298" stroke="var(--c-line)" strokeWidth="1" />

      <text x="348" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.lifo}
      </text>
      <text x="356" y="34" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.inOrder}
      </text>
      {['1', '2', '3', '4', '5'].map((value, i) => (
        <Box key={`in-${value}`} x={356 + i * 50} y={40} w={44} h={26} value={value} />
      ))}

      <line
        x1="478"
        y1="70"
        x2="478"
        y2="92"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-model-accent)"
      />
      <text x="490" y="86" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.pushAll}
      </text>

      {COLUMN.map((value, i) => (
        <Box
          key={`mid-${value}`}
          x={440}
          y={98 + i * 26}
          w={76}
          h={26}
          value={value}
          accent={i === 0}
        />
      ))}
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        <text x="526" y="116">
          {t.lastIn}
        </text>
        <text x="526" y="130">
          {t.firstOut}
        </text>
      </g>

      <line
        x1="478"
        y1="232"
        x2="478"
        y2="254"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-model-accent)"
      />
      <text x="490" y="248" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.popAll}
      </text>

      {COLUMN.map((value, i) => (
        <Box key={`out-${value}`} x={356 + i * 50} y={258} w={44} h={26} value={value} />
      ))}
      <text x="356" y="300" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.outOrder}
      </text>
    </svg>
  );
}

const IMPL_COPY = {
  tr: {
    label: 'Yığının bağlı liste ve dizi ile gerçekleştirilmesi',
    linked: 'Bağlı liste ile — iki yapı',
    array: 'Dizi ile — kavramsal ve fiziksel',
    headTitle: 'head structure:',
    headSub: 'metadata + tepe işaretçisi',
    nodeTitle: 'data node:',
    nodeSub: 'veri + bağ',
    indexNote: 'top artık işaretçi değil, indeks',
    nextNote: 'next alanına gerek yok:',
    nextNote2: 'komşuluk zaten fiziksel',
  },
  en: {
    label: 'A stack implemented with a linked list and with an array',
    linked: 'With a linked list — two structures',
    array: 'With an array — logical and physical',
    headTitle: 'head structure:',
    headSub: 'metadata + the top pointer',
    nodeTitle: 'data node:',
    nodeSub: 'data + link',
    indexNote: 'top is an index now, not a pointer',
    nextNote: 'no next field is needed:',
    nextNote2: 'adjacency is already physical',
  },
} as const;

export function StackImplementationsFigure({ lang }: { lang: Lang }) {
  const t = IMPL_COPY[lang];

  return (
    <svg viewBox="0 0 640 268" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="st-impl" />

      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.linked}
      </text>

      <rect x="20" y="32" width="132" height="38" fill="var(--c-surface)" stroke="var(--c-accent)" />
      <line x1="86" y1="32" x2="86" y2="70" stroke="var(--c-line)" strokeWidth="1" />
      <text
        x="53"
        y="56"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        3
      </text>
      <circle cx="119" cy="51" r="4" fill="var(--c-accent)" />
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="53" y="84">
          count
        </text>
        <text x="119" y="84">
          top
        </text>
      </g>
      <line
        x1="152"
        y1="50"
        x2="166"
        y2="48"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#st-impl-accent)"
      />

      {['C', 'B', 'A'].map((value, i) => {
        const y = 32 + i * 52;
        return (
          <g key={value}>
            <rect
              x="170"
              y={y}
              width="110"
              height="32"
              fill={i === 0 ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={i === 0 ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={i === 0 ? 2 : 1}
            />
            <line x1="246" y1={y} x2="246" y2={y + 32} stroke="var(--c-line)" strokeWidth="1" />
            <text
              x="208"
              y={y + 21}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO}
            >
              {value}
            </text>
            {i < 2 ? (
              <>
                <circle cx="263" cy={y + 16} r="3.5" fill="var(--c-muted)" />
                <line
                  x1="263"
                  y1={y + 32}
                  x2="263"
                  y2={y + 50}
                  stroke="var(--c-muted)"
                  strokeWidth="1.4"
                  markerEnd="url(#st-impl-plain)"
                />
              </>
            ) : (
              <NullMark x={252} y={y + 8} w={22} h={16} />
            )}
          </g>
        );
      })}

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="20" y="118">
          {t.headTitle}
        </text>
        <text x="20" y="132">
          {t.headSub}
        </text>
        <text x="20" y="166">
          {t.nodeTitle}
        </text>
        <text x="20" y="180">
          {t.nodeSub}
        </text>
      </g>

      <line x1="316" y1="8" x2="316" y2="258" stroke="var(--c-line)" strokeWidth="1" />

      <text x="332" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.array}
      </text>

      <rect
        x="336"
        y="32"
        width="180"
        height="38"
        fill="var(--c-surface)"
        stroke="var(--c-accent)"
      />
      <line x1="396" y1="32" x2="396" y2="70" stroke="var(--c-line)" strokeWidth="1" />
      <line x1="456" y1="32" x2="456" y2="70" stroke="var(--c-line)" strokeWidth="1" />
      <g fill="var(--c-ink)" className="font-mono" style={MONO_LG} textAnchor="middle">
        <text x="366" y="56">
          3
        </text>
        <text x="426" y="56">
          5
        </text>
        <text x="486" y="56">
          2
        </text>
      </g>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="366" y="84">
          count
        </text>
        <text x="426" y="84">
          size
        </text>
        <text x="486" y="84">
          top
        </text>
      </g>

      <text
        x="474"
        y="106"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        top = 2
      </text>
      <line
        x1="474"
        y1="114"
        x2="474"
        y2="132"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-impl-accent)"
      />

      {['A', 'B', 'C', '·', '·'].map((value, i) => (
        <Box
          key={`cell-${i}`}
          x={336 + i * 56}
          y={136}
          w={52}
          h={34}
          value={value}
          accent={i === 2}
          dashed={i > 2}
        />
      ))}
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        {[0, 1, 2, 3, 4].map((i) => (
          <text key={`idx-${i}`} x={362 + i * 56} y="186">
            [{i}]
          </text>
        ))}
      </g>

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="336" y="214">
          {t.indexNote}
        </text>
        <text x="336" y="234">
          {t.nextNote}
        </text>
        <text x="336" y="248">
          {t.nextNote2}
        </text>
      </g>
    </svg>
  );
}

const BINARY_COPY = {
  tr: {
    label: '19 sayısının ikiliye çevrilmesi: kalanların yığına itilip ters sırada çekilmesi',
    step1: '① Böl, kalanı al',
    step2: '② Yığına it',
    step3: '③ Çek ve bas',
    remainder: 'kalan',
    order: 'üretim sırası: 1 1 0 0 1',
    wrong: 'doğrudan bassak → 11001 ✗',
    push: 'push',
    pop: 'pop',
    top: 'tepe',
    base: 'taban',
    right: '10011 — doğru',
    check: '19 = 16 + 2 + 1',
  },
  en: {
    label: 'Converting 19 to binary: the remainders pushed and popped back in reverse',
    step1: '① Divide, take the remainder',
    step2: '② Push',
    step3: '③ Pop and print',
    remainder: 'rem.',
    order: 'produced as 1 1 0 0 1',
    wrong: 'printed directly → 11001 ✗',
    push: 'push',
    pop: 'pop',
    top: 'top',
    base: 'base',
    right: '10011 — correct',
    check: '19 = 16 + 2 + 1',
  },
} as const;

const DIVISIONS: [string, string][] = [
  ['19 / 2 = 9', '1'],
  ['9 / 2 = 4', '1'],
  ['4 / 2 = 2', '0'],
  ['2 / 2 = 1', '0'],
  ['1 / 2 = 0', '1'],
];

export function BinaryConversionFigure({ lang }: { lang: Lang }) {
  const t = BINARY_COPY[lang];

  return (
    <svg viewBox="0 0 640 204" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="st-bin" />

      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.step1}
      </text>
      {DIVISIONS.map(([division, remainder], i) => (
        <g key={division} className="font-mono">
          <text x="16" y={44 + i * 22} fill="var(--c-ink)" style={MONO}>
            {division}
          </text>
          <text x="132" y={44 + i * 22} fill="var(--c-accent-ink)" style={MONO}>
            {t.remainder} {remainder}
          </text>
        </g>
      ))}
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="16" y="166">
          {t.order}
        </text>
        <text x="16" y="184">
          {t.wrong}
        </text>
      </g>

      <line
        x1="238"
        y1="100"
        x2="284"
        y2="100"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-bin-accent)"
      />
      <text
        x="261"
        y="90"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.push}
      </text>

      <text x="296" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.step2}
      </text>
      {['1', '0', '0', '1', '1'].map((value, i) => (
        <Box key={`st-${i}`} x={300} y={40 + i * 26} w={96} h={26} value={value} accent={i === 0} />
      ))}
      <g className="font-mono" style={MONO_SM}>
        <text x="402" y="58" fill="var(--c-accent-ink)">
          {t.top}
        </text>
        <text x="402" y="162" fill="var(--c-muted)">
          {t.base}
        </text>
      </g>

      <line
        x1="438"
        y1="100"
        x2="462"
        y2="100"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-bin-accent)"
      />
      <text
        x="450"
        y="90"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.pop}
      </text>

      <text x="470" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.step3}
      </text>
      {['1', '0', '0', '1', '1'].map((value, i) => (
        <Box key={`out-${i}`} x={470 + i * 30} y={40} w={26} h={26} value={value} />
      ))}
      <text x="470" y="90" fill="var(--c-accent-ink)" className="font-mono" style={MONO}>
        {t.right}
      </text>
      <text x="470" y="110" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.check}
      </text>
    </svg>
  );
}

const PAREN_COPY = {
  tr: {
    label: 'Parantez eşleştirmede yığın yüksekliğinin değişimi ve üç bitiş durumu',
    title: '(a) ( a + ( b * c ) ) — yığın yüksekliği',
    push: 'it',
    pop: 'çek',
    height: 'yığın yüksekliği = o ana kadar kapanmamış parantez sayısı',
    balanced: 'sonda yığın boş ⇒ ifade dengeli',
    cases: '(b) Üç bitiş durumu',
    case1: '1 · kapanan geldi ama yığın boş → fazladan kapanan parantez',
    case2: '2 · ifade bitti ama yığın boş değil → kapanmamış açık parantez',
    case3: '3 · ikisi de olmadı → ifade dengeli',
  },
  en: {
    label: 'How the stack height moves while matching parentheses, and the three ways it ends',
    title: '(a) ( a + ( b * c ) ) — the stack height',
    push: 'push',
    pop: 'pop',
    height: 'stack height = how many brackets are open at that point',
    balanced: 'the stack is empty at the end ⇒ the expression is balanced',
    cases: '(b) Three ways it ends',
    case1: '1 · a closing bracket arrives and the stack is empty → one too many',
    case2: '2 · the expression ends and the stack is not empty → an unclosed bracket',
    case3: '3 · neither happened → the expression is balanced',
  },
} as const;

const PAREN_TOKENS = ['(', 'a', '+', '(', 'b', '*', 'c', ')', ')'];
const PAREN_DEPTH = [1, 1, 1, 2, 2, 2, 2, 1, 0];
/** 0 = pushed here, 1 = popped here, −1 = the stack was not touched. */
const PAREN_ACTION = [0, -1, -1, 0, -1, -1, -1, 1, 1];

export function ParenMatchFigure({ lang }: { lang: Lang }) {
  const t = PAREN_COPY[lang];
  const baseline = 146;

  return (
    <svg viewBox="0 0 640 294" className="w-full" role="img" aria-label={t.label}>
      <text x="16" y="16" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.title}
      </text>

      {PAREN_TOKENS.map((token, i) => (
        <Box
          key={`tok-${i}`}
          x={16 + i * 50}
          y={26}
          w={44}
          h={28}
          value={token}
          accent={PAREN_ACTION[i] !== -1}
        />
      ))}
      <g className="font-mono" style={MONO_SM} textAnchor="middle" fill="var(--c-accent-ink)">
        {PAREN_ACTION.map((action, i) =>
          action === -1 ? null : (
            <text key={`act-${i}`} x={38 + i * 50} y="72">
              {action === 0 ? t.push : t.pop}
            </text>
          ),
        )}
      </g>

      {PAREN_DEPTH.map((depth, i) =>
        depth === 0 ? null : (
          <rect
            key={`bar-${i}`}
            x={24 + i * 50}
            y={baseline - depth * 18}
            width="28"
            height={depth * 18}
            fill="var(--c-surface)"
            stroke="var(--c-accent)"
            strokeWidth="1.2"
          />
        ),
      )}
      <line x1="16" y1={baseline} x2="466" y2={baseline} stroke="var(--c-muted)" strokeWidth="1" />

      <text x="16" y="166" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.height}
      </text>
      <text x="16" y="184" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.balanced}
      </text>

      <line x1="16" y1="204" x2="624" y2="204" stroke="var(--c-line)" strokeWidth="1" />

      <text x="16" y="226" fill="var(--c-muted)" className="font-mono" style={MONO}>
        {t.cases}
      </text>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="16" y="248">
          {t.case1}
        </text>
        <text x="16" y="266">
          {t.case2}
        </text>
        <text x="16" y="284" fill="var(--c-accent-ink)">
          {t.case3}
        </text>
      </g>
    </svg>
  );
}

const BACKTRACK_COPY = {
  tr: {
    label: 'Hedef arama grafiği: karar noktaları, çıkmaz sokaklar ve hedefe giden yol',
    start: 'başlangıç',
    goal: 'hedef',
    deadEnd: '▢ = çıkmaz sokak · burada en yakın karar noktasına dönülür',
    decision: '◎ = karar noktası (3 · 5 · 7) · kalın çizgi = hedefe giden yol',
  },
  en: {
    label: 'A goal-seeking graph: decision points, dead ends and the path that reaches the goal',
    start: 'start',
    goal: 'goal',
    deadEnd: '▢ = a dead end · this is where you go back to the nearest decision point',
    decision: '◎ = a decision point (3 · 5 · 7) · the heavy line is the path to the goal',
  },
} as const;

type GraphNode = { id: number; x: number; y: number; kind: 'plain' | 'decision' | 'dead' | 'goal' };

const GRAPH_NODES: GraphNode[] = [
  { id: 1, x: 46, y: 132, kind: 'plain' },
  { id: 2, x: 112, y: 132, kind: 'plain' },
  { id: 3, x: 178, y: 132, kind: 'decision' },
  { id: 4, x: 244, y: 58, kind: 'plain' },
  { id: 8, x: 310, y: 58, kind: 'dead' },
  { id: 5, x: 244, y: 206, kind: 'decision' },
  { id: 6, x: 310, y: 206, kind: 'plain' },
  { id: 9, x: 376, y: 206, kind: 'dead' },
  { id: 7, x: 310, y: 132, kind: 'decision' },
  { id: 10, x: 376, y: 58, kind: 'dead' },
  { id: 11, x: 376, y: 132, kind: 'plain' },
  { id: 12, x: 442, y: 132, kind: 'goal' },
];

const GRAPH_EDGES: [number, number][] = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 8],
  [3, 5],
  [5, 6],
  [6, 9],
  [5, 7],
  [7, 10],
  [7, 11],
  [11, 12],
];

const SOLUTION = new Set(['1-2', '2-3', '3-5', '5-7', '7-11', '11-12']);

export function BacktrackFigure({ lang }: { lang: Lang }) {
  const t = BACKTRACK_COPY[lang];
  const at = (id: number) => GRAPH_NODES.find((node) => node.id === id)!;

  return (
    <svg viewBox="0 0 640 264" className="w-full" role="img" aria-label={t.label}>
      {GRAPH_EDGES.map(([from, to]) => {
        const a = at(from);
        const b = at(to);
        const lit = SOLUTION.has(`${from}-${to}`);
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={lit ? 'var(--c-accent)' : 'var(--c-line)'}
            strokeWidth={lit ? 2.4 : 1.2}
          />
        );
      })}

      {GRAPH_NODES.map((node) => {
        const accented = node.kind === 'decision' || node.kind === 'goal';
        return (
          <g key={node.id}>
            {node.kind === 'dead' ? (
              <rect
                x={node.x - 13}
                y={node.y - 13}
                width="26"
                height="26"
                fill="var(--c-bg)"
                stroke="var(--c-muted)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ) : (
              <circle
                cx={node.x}
                cy={node.y}
                r="15"
                fill={accented ? 'var(--c-surface)' : 'var(--c-bg)'}
                stroke={accented ? 'var(--c-accent)' : 'var(--c-line)'}
                strokeWidth={accented ? 2 : 1.2}
              />
            )}
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill={node.kind === 'dead' ? 'var(--c-muted)' : 'var(--c-ink)'}
              className="font-mono"
              style={MONO}
            >
              {node.id}
            </text>
          </g>
        );
      })}

      <text
        x="46"
        y="166"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.start}
      </text>
      <text
        x="442"
        y="166"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.goal}
      </text>

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="16" y="240">
          {t.deadEnd}
        </text>
        <text x="16" y="256">
          {t.decision}
        </text>
      </g>
    </svg>
  );
}

const FRAME_COPY = {
  tr: {
    label: "Alt yordam çağrısında stack frame'in yığına itilip çekilmesi",
    caller: 'çağıran program',
    call: 'power(2, 8)',
    push: 'push',
    pop: 'pop',
    systemStack: 'sistem yığını',
    frame: 'stack frame',
    row1: '① parametreler',
    row2: '② register + PSW',
    row3: '③ dönüş adresi',
    row4: '④ dönüş değeri',
    fp: 'FP — frame pointer',
    fpSub: 'erişim buradan',
    note1: 'alt yordam bitince frame çekilir:',
    note2: '· dönüş değeri saklanır',
    note3: '· kaldığı yerden devam edilir',
    note4: 'her özyinelemeli çağrı = yeni bir frame',
  },
  en: {
    label: 'A stack frame pushed and popped around a subroutine call',
    caller: 'calling program',
    call: 'power(2, 8)',
    push: 'push',
    pop: 'pop',
    systemStack: 'system stack',
    frame: 'stack frame',
    row1: '① parameters',
    row2: '② registers + PSW',
    row3: '③ return address',
    row4: '④ return value',
    fp: 'FP — frame pointer',
    fpSub: 'reached from here',
    note1: 'when the subroutine ends the frame is popped:',
    note2: '· the return value is kept',
    note3: '· the caller carries on where it was',
    note4: 'every recursive call = one more frame',
  },
} as const;

export function StackFrameFigure({ lang }: { lang: Lang }) {
  const t = FRAME_COPY[lang];
  const rows = [t.row1, t.row2, t.row3, t.row4];

  return (
    <svg viewBox="0 0 640 244" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads id="st-frame" />

      <rect x="16" y="44" width="150" height="58" fill="none" stroke="var(--c-line)" />
      <text
        x="91"
        y="68"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        {t.caller}
      </text>
      <text
        x="91"
        y="88"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO}
      >
        {t.call}
      </text>

      <line
        x1="172"
        y1="62"
        x2="250"
        y2="62"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        markerEnd="url(#st-frame-accent)"
      />
      <text
        x="211"
        y="52"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.push}
      </text>
      <line
        x1="250"
        y1="96"
        x2="172"
        y2="96"
        stroke="var(--c-muted)"
        strokeWidth="1.4"
        markerEnd="url(#st-frame-plain)"
      />
      <text
        x="211"
        y="112"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.pop}
      </text>

      <text x="258" y="18" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.systemStack}
      </text>
      <rect x="258" y="24" width="190" height="206" fill="none" stroke="var(--c-line)" />
      <rect
        x="274"
        y="40"
        width="158"
        height="168"
        fill="var(--c-surface)"
        stroke="var(--c-accent)"
      />
      {rows.map((row, i) => (
        <g key={row}>
          {i > 0 ? (
            <line
              x1="274"
              y1={40 + i * 42}
              x2="432"
              y2={40 + i * 42}
              stroke="var(--c-line)"
              strokeWidth="1"
            />
          ) : null}
          <text
            x="353"
            y={40 + i * 42 + 26}
            textAnchor="middle"
            fill="var(--c-ink)"
            className="font-mono"
            style={MONO_SM}
          >
            {row}
          </text>
        </g>
      ))}
      <text x="466" y="46" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        {t.frame}
      </text>

      <line
        x1="466"
        y1="124"
        x2="438"
        y2="124"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#st-frame-accent)"
      />
      <g className="font-mono" style={MONO_SM}>
        <text x="470" y="120" fill="var(--c-accent-ink)">
          {t.fp}
        </text>
        <text x="470" y="136" fill="var(--c-muted)">
          {t.fpSub}
        </text>
      </g>

      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="16" y="150">
          {t.note1}
        </text>
        <text x="16" y="168">
          {t.note2}
        </text>
        <text x="16" y="186">
          {t.note3}
        </text>
        <text x="16" y="214" fill="var(--c-accent-ink)">
          {t.note4}
        </text>
      </g>
    </svg>
  );
}
