import type { Lang } from '@/components/complexity/shared';

/**
 * Diagrams for the ADT post. All of them are schematics of a mechanism, not
 * plots, so they carry no ordinal ramp: the accent marks the one thing each
 * figure is about, and everything else stays in line and muted tokens.
 */

const MONO = { fontSize: '10.5px' } as const;
const MONO_SM = { fontSize: '9.5px' } as const;
const MONO_LG = { fontSize: '12.5px' } as const;

function Arrowheads() {
  return (
    <defs>
      <marker
        id="adt-arrow"
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
        id="adt-arrow-accent"
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

/** A small ✕ standing in for a null pointer. */
function NullMark({ x, y, size = 20 }: { x: number; y: number; size?: number }) {
  return (
    <g stroke="var(--c-muted)" strokeWidth="1">
      <line x1={x} y1={y} x2={x + size} y2={y + size} />
      <line x1={x + size} y1={y} x2={x} y2={y + size} />
    </g>
  );
}

const ATOMIC_COPY = {
  tr: {
    label: 'Atomik veri ile bileşik verinin karşılaştırması',
    atomic: 'Atomik — 4562 tamsayısı',
    composite: 'Bileşik — telefon numarası',
    atomicNote: 'basamaklara ayrılabilir, ama',
    atomicNote2: 'parçalar orijinalle aynı şey değil',
    compositeNote: 'her alt alan kendi başına anlamlı',
    country: 'ülke',
    city: 'şehir',
    number: 'numara',
  },
  en: {
    label: 'Atomic data compared with composite data',
    atomic: 'Atomic — the integer 4562',
    composite: 'Composite — a phone number',
    atomicNote: 'it splits into digits, but the',
    atomicNote2: 'parts are not the same thing',
    compositeNote: 'every subfield means something on its own',
    country: 'country',
    city: 'city',
    number: 'number',
  },
} as const;

export function AtomicCompositeFigure({ lang }: { lang: Lang }) {
  const t = ATOMIC_COPY[lang];

  return (
    <svg viewBox="0 0 640 196" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads />
      <g fill="var(--c-muted)" className="font-mono" style={MONO}>
        <text x="16" y="14">
          {t.atomic}
        </text>
        <text x="330" y="14">
          {t.composite}
        </text>
      </g>

      <rect x="40" y="30" width="150" height="38" fill="var(--c-surface)" stroke="var(--c-line)" />
      <text
        x="115"
        y="55"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        4562
      </text>
      <line x1="115" y1="72" x2="115" y2="100" stroke="var(--c-line)" strokeWidth="1" />
      {['4', '5', '6', '2'].map((digit, i) => (
        <g key={digit}>
          <rect x={40 + i * 39} y="104" width="34" height="32" fill="none" stroke="var(--c-line)" />
          <text
            x={57 + i * 39}
            y="126"
            textAnchor="middle"
            fill="var(--c-muted)"
            className="font-mono"
            style={MONO}
          >
            {digit}
          </text>
        </g>
      ))}
      <NullMark x={202} y={110} />
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="40" y="158">
          {t.atomicNote}
        </text>
        <text x="40" y="172">
          {t.atomicNote2}
        </text>
      </g>

      <line x1="300" y1="8" x2="300" y2="188" stroke="var(--c-line)" strokeWidth="1" />

      <rect
        x="330"
        y="30"
        width="280"
        height="38"
        fill="var(--c-surface)"
        stroke="var(--c-accent)"
      />
      <text
        x="470"
        y="55"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        +90 232 7506243
      </text>
      <line x1="470" y1="72" x2="470" y2="100" stroke="var(--c-line)" strokeWidth="1" />
      {[
        { text: '+90', x: 330, w: 62, label: t.country },
        { text: '232', x: 398, w: 62, label: t.city },
        { text: '7506243', x: 466, w: 144, label: t.number },
      ].map((field) => (
        <g key={field.text}>
          <rect
            x={field.x}
            y="104"
            width={field.w}
            height="32"
            fill="none"
            stroke="var(--c-accent)"
          />
          <text
            x={field.x + field.w / 2}
            y="126"
            textAnchor="middle"
            fill="var(--c-ink)"
            className="font-mono"
            style={MONO}
          >
            {field.text}
          </text>
          <text
            x={field.x + field.w / 2}
            y="152"
            textAnchor="middle"
            fill="var(--c-muted)"
            className="font-mono"
            style={MONO_SM}
          >
            {field.label}
          </text>
        </g>
      ))}
      <text x="330" y="176" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.compositeNote}
      </text>
    </svg>
  );
}

const MODEL_COPY = {
  tr: {
    label:
      'ADT modeli: uygulama programı, arayüz, public ve private fonksiyonlar, dinamik bellekteki veri yapıları',
    app: 'Uygulama',
    app2: 'programı',
    adt: 'ADT',
    publicFns: 'Public',
    publicFns2: 'fonksiyonlar',
    privateFns: 'Private',
    privateFns2: 'fonksiyonlar',
    interface: 'arayüz',
    memory: 'Dinamik bellek — veri yapıları',
    noAccess: 'doğrudan erişim yok',
  },
  en: {
    label:
      'The ADT model: application program, interface, public and private functions, data structures in dynamic memory',
    app: 'Application',
    app2: 'program',
    adt: 'ADT',
    publicFns: 'Public',
    publicFns2: 'functions',
    privateFns: 'Private',
    privateFns2: 'functions',
    interface: 'interface',
    memory: 'Dynamic memory — data structures',
    noAccess: 'no direct access',
  },
} as const;

export function AdtModelFigure({ lang }: { lang: Lang }) {
  const t = MODEL_COPY[lang];

  return (
    <svg viewBox="0 0 640 300" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads />

      <rect x="16" y="40" width="126" height="216" fill="none" stroke="var(--c-line)" />
      <g fill="var(--c-ink)" className="font-mono" style={MONO} textAnchor="middle">
        <text x="79" y="142">
          {t.app}
        </text>
        <text x="79" y="160">
          {t.app2}
        </text>
      </g>

      <rect x="180" y="24" width="444" height="232" fill="none" stroke="var(--c-accent)" />
      <text
        x="402"
        y="44"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO}
      >
        {t.adt}
      </text>

      <rect x="212" y="60" width="150" height="50" fill="var(--c-surface)" stroke="var(--c-line)" />
      <g fill="var(--c-ink)" className="font-mono" style={MONO} textAnchor="middle">
        <text x="287" y="82">
          {t.publicFns}
        </text>
        <text x="287" y="99">
          {t.publicFns2}
        </text>
      </g>
      <rect x="416" y="60" width="160" height="50" fill="none" stroke="var(--c-line)" />
      <g fill="var(--c-muted)" className="font-mono" style={MONO} textAnchor="middle">
        <text x="496" y="82">
          {t.privateFns}
        </text>
        <text x="496" y="99">
          {t.privateFns2}
        </text>
      </g>

      <line
        x1="142"
        y1="85"
        x2="206"
        y2="85"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#adt-arrow-accent)"
      />
      <text
        x="174"
        y="76"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.interface}
      </text>
      <line
        x1="362"
        y1="85"
        x2="412"
        y2="85"
        stroke="var(--c-muted)"
        strokeWidth="1"
        markerEnd="url(#adt-arrow)"
      />

      <rect x="212" y="144" width="364" height="112" fill="var(--c-surface)" stroke="var(--c-line)" />
      <text x="224" y="164" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.memory}
      </text>

      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={232 + i * 26}
          y="182"
          width="24"
          height="22"
          fill="none"
          stroke="var(--c-line)"
        />
      ))}
      <text
        x="284"
        y="224"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        array
      </text>

      <rect x="366" y="182" width="34" height="22" fill="none" stroke="var(--c-line)" />
      <rect x="400" y="182" width="52" height="22" fill="none" stroke="var(--c-line)" />
      <text
        x="409"
        y="224"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        record
      </text>

      <rect x="480" y="176" width="38" height="20" fill="none" stroke="var(--c-line)" />
      <rect x="518" y="176" width="16" height="20" fill="none" stroke="var(--c-line)" />
      <rect x="502" y="204" width="38" height="20" fill="none" stroke="var(--c-line)" />
      <rect x="540" y="204" width="16" height="20" fill="none" stroke="var(--c-line)" />
      <line x1="526" y1="196" x2="526" y2="204" stroke="var(--c-line)" strokeWidth="1" />
      <text
        x="518"
        y="240"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        linked list
      </text>

      <line x1="287" y1="110" x2="287" y2="140" stroke="var(--c-line)" strokeWidth="1" />
      <line x1="496" y1="110" x2="496" y2="140" stroke="var(--c-line)" strokeWidth="1" />

      {/* The one thing the figure forbids gets the only dashed line on it. */}
      <path
        d="M79,256 C79,282 200,286 300,282"
        fill="none"
        stroke="var(--c-muted)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <NullMark x={192} y={268} size={16} />
      <text x="222" y="282" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.noAccess}
      </text>
    </svg>
  );
}

const VOID_COPY = {
  tr: {
    label: 'Farklı veri türlerinin void işaretçi üzerinden tek bir generic düğüme akışı',
    noCast: 'cast gerekmez',
    oneNode: 'tek bir düğüm tipi',
    reading: 'geri okurken',
    castRequired: 'cast şart',
    foot: 'İçeri girerken serbest, dışarı çıkarken cast — türü yalnızca uygulama bilir.',
  },
  en: {
    label: 'Different data types flowing through a void pointer into one generic node',
    noCast: 'no cast needed',
    oneNode: 'one node type',
    reading: 'reading back',
    castRequired: 'cast required',
    foot: 'Free on the way in, cast on the way out — only the application knows the type.',
  },
} as const;

export function VoidPointerFigure({ lang }: { lang: Lang }) {
  const t = VOID_COPY[lang];

  return (
    <svg viewBox="0 0 640 196" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads />

      {['int', 'float', 'struct'].map((type, i) => (
        <g key={type}>
          <rect
            x="16"
            y={26 + i * 46}
            width="104"
            height="30"
            fill="var(--c-surface)"
            stroke="var(--c-line)"
          />
          <text
            x="68"
            y={46 + i * 46}
            textAnchor="middle"
            fill="var(--c-ink)"
            className="font-mono"
            style={MONO}
          >
            {type}
          </text>
        </g>
      ))}

      <g fill="none" stroke="var(--c-muted)" strokeWidth="1" markerEnd="url(#adt-arrow)">
        <path d="M124,41 C160,41 164,80 192,84" />
        <path d="M124,87 L192,87" />
        <path d="M124,133 C160,133 164,94 192,90" />
      </g>

      <rect x="196" y="64" width="112" height="44" fill="none" stroke="var(--c-accent)" />
      <text
        x="252"
        y="92"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO_LG}
      >
        void*
      </text>
      <text
        x="252"
        y="56"
        textAnchor="middle"
        fill="var(--c-accent-ink)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.noCast}
      </text>

      <line
        x1="312"
        y1="86"
        x2="364"
        y2="86"
        stroke="var(--c-muted)"
        strokeWidth="1"
        markerEnd="url(#adt-arrow)"
      />

      <rect x="368" y="58" width="150" height="56" fill="none" stroke="var(--c-line)" />
      <text
        x="443"
        y="78"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        createNode()
      </text>
      <rect x="388" y="86" width="72" height="20" fill="var(--c-surface)" stroke="var(--c-line)" />
      <text
        x="424"
        y="100"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        dataPtr
      </text>
      <rect x="460" y="86" width="38" height="20" fill="none" stroke="var(--c-line)" />
      <NullMark x={469} y={88} size={18} />
      <text
        x="443"
        y="130"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.oneNode}
      </text>

      <line
        x1="522"
        y1="86"
        x2="580"
        y2="86"
        stroke="var(--c-accent)"
        strokeWidth="1.5"
        markerEnd="url(#adt-arrow-accent)"
      />
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="574" y="72">
          {t.reading}
        </text>
        <text x="574" y="122">
          {t.castRequired}
        </text>
      </g>
      <text
        x="574"
        y="106"
        textAnchor="middle"
        fill="var(--c-ink)"
        className="font-mono"
        style={MONO}
      >
        *(int*)
      </text>

      <line x1="16" y1="158" x2="624" y2="158" stroke="var(--c-line)" strokeWidth="1" />
      <text x="16" y="180" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.foot}
      </text>
    </svg>
  );
}

const CALL_COPY = {
  tr: {
    label: 'main, larger ve compare fonksiyonları arasındaki çağrı akışı',
    generic: 'larger  (generic)',
    app: 'compare  (uygulama)',
    noType: 'türü bilmez —',
    noType2: 'karşılaştıramaz',
    knows: 'türü bilen',
    knows2: 'tek yer',
    flag: '③ +1 / −1',
    address: '④ büyüğün adresi',
  },
  en: {
    label: 'The call flow between main, larger and compare',
    generic: 'larger  (generic)',
    app: 'compare  (application)',
    noType: 'does not know the type —',
    noType2: 'cannot compare',
    knows: 'the only place',
    knows2: 'that knows the type',
    flag: '③ +1 / −1',
    address: '④ address of the larger',
  },
} as const;

export function CallFlowFigure({ lang }: { lang: Lang }) {
  const t = CALL_COPY[lang];

  return (
    <svg viewBox="0 0 640 218" className="w-full" role="img" aria-label={t.label}>
      <Arrowheads />

      <rect x="16" y="30" width="176" height="146" fill="none" stroke="var(--c-line)" />
      <text x="28" y="50" fill="var(--c-ink)" className="font-mono" style={MONO}>
        main
      </text>
      {[
        { value: '7', name: 'i', x: 34 },
        { value: '8', name: 'j', x: 90 },
        { value: '8', name: 'lrg', x: 146, accent: true },
      ].map((box) => (
        <g key={box.name}>
          <rect
            x={box.x}
            y="64"
            width="44"
            height="28"
            fill="var(--c-surface)"
            stroke={box.accent ? 'var(--c-accent)' : 'var(--c-line)'}
          />
          <text
            x={box.x + 22}
            y="83"
            textAnchor="middle"
            fill="var(--c-ink)"
            className="font-mono"
            style={MONO}
          >
            {box.value}
          </text>
          <text
            x={box.x + 22}
            y="106"
            textAnchor="middle"
            fill="var(--c-muted)"
            className="font-mono"
            style={MONO_SM}
          >
            {box.name}
          </text>
        </g>
      ))}
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="34" y="140">
          *(int*) larger(
        </text>
        <text x="34" y="156">
          &amp;i, &amp;j, compare)
        </text>
      </g>

      <rect x="238" y="30" width="164" height="146" fill="none" stroke="var(--c-line)" />
      <text x="250" y="50" fill="var(--c-ink)" className="font-mono" style={MONO}>
        {t.generic}
      </text>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="250" y="74">
          void* dataPtr1
        </text>
        <text x="250" y="90">
          void* dataPtr2
        </text>
        <text x="250" y="106">
          int (*ptrToCmpFun)
        </text>
        <text x="250" y="140">
          {t.noType}
        </text>
        <text x="250" y="156">
          {t.noType2}
        </text>
      </g>

      <rect x="448" y="30" width="176" height="146" fill="none" stroke="var(--c-accent)" />
      <text x="460" y="50" fill="var(--c-ink)" className="font-mono" style={MONO}>
        {t.app}
      </text>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        <text x="460" y="74">
          *(int*)ptr1 &gt;=
        </text>
        <text x="460" y="90">
          *(int*)ptr2
        </text>
      </g>
      <g fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
        <text x="460" y="126">
          {t.knows}
        </text>
        <text x="460" y="142">
          {t.knows2}
        </text>
      </g>

      <g stroke="var(--c-muted)" strokeWidth="1" markerEnd="url(#adt-arrow)">
        <line x1="196" y1="62" x2="234" y2="62" />
        <line x1="406" y1="62" x2="444" y2="62" />
        <line x1="444" y1="164" x2="406" y2="164" />
        <line x1="234" y1="164" x2="196" y2="164" />
      </g>
      <g fill="var(--c-muted)" className="font-mono" style={MONO_SM} textAnchor="middle">
        <text x="215" y="26">
          ①
        </text>
        <text x="425" y="26">
          ②
        </text>
        <text x="425" y="196">
          {t.flag}
        </text>
        <text x="215" y="196">
          {t.address}
        </text>
      </g>
    </svg>
  );
}
