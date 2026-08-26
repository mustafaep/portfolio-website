import { type Lang, rampColor } from './shared';

/**
 * The two schematic figures from the source study file. Neither plots data —
 * they are diagrams of a mechanism — so they use the ordinal ramp only where it
 * carries the cost reading, and ink tokens everywhere text appears.
 */

const HALF_SQUARE_COPY = {
  tr: {
    label: 'Bağımlı karesel döngünün taradığı alan',
    full: 'tam karesel: 10 × 10 = 100 tur',
    half: 'bağımlı: 45 tur',
    fullFoot: 'n² tur',
    halfFoot: 'n(n+1)/2 tur — yaklaşık yarısı',
    first: 'j: 0 kez',
    middle: 'j: 4 kez',
    last: 'j: 9 kez',
  },
  en: {
    label: 'The area a dependent quadratic loop scans',
    full: 'full quadratic: 10 × 10 = 100 iterations',
    half: 'dependent: 45 iterations',
    fullFoot: 'n² iterations',
    halfFoot: 'n(n+1)/2 iterations — about half',
    first: 'j: 0 times',
    middle: 'j: 4 times',
    last: 'j: 9 times',
  },
} as const;

export function HalfSquareFigure({ lang }: { lang: Lang }) {
  const t = HALF_SQUARE_COPY[lang];
  const fill = rampColor(4);

  return (
    <svg viewBox="0 0 640 246" className="w-full" role="img" aria-label={t.label}>
      <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '10.5px' }}>
        <text x="16" y="14">
          {t.full}
        </text>
        <text x="352" y="14">
          {t.half}
        </text>
      </g>

      <rect
        x="16"
        y="30"
        width="176"
        height="176"
        fill={fill}
        fillOpacity="0.2"
        stroke={fill}
        strokeWidth="1.5"
      />
      <g stroke={fill} strokeOpacity="0.45" strokeWidth="1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
          <line key={row} x1="16" y1={30 + row * 17.6} x2="192" y2={30 + row * 17.6} />
        ))}
      </g>

      <text
        x="272"
        y="124"
        fill="var(--c-muted)"
        className="font-mono"
        style={{ fontSize: '14px' }}
        textAnchor="middle"
      >
        →
      </text>

      <rect x="352" y="30" width="176" height="176" fill="none" stroke="var(--c-line)" strokeWidth="1.5" />
      <path
        d="M352,30 L352,206 L528,206 Z"
        fill={fill}
        fillOpacity="0.2"
        stroke={fill}
        strokeWidth="1.5"
      />
      <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '10px' }}>
        <text x="538" y="38">
          {t.first}
        </text>
        <text x="538" y="124">
          {t.middle}
        </text>
        <text x="538" y="210">
          {t.last}
        </text>
      </g>

      <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '10.5px' }}>
        <text x="16" y="234">
          {t.fullFoot}
        </text>
        <text x="352" y="234">
          {t.halfFoot}
        </text>
      </g>
    </svg>
  );
}

const LADDER_COPY = {
  tr: {
    label: 'Big-O türetme adımları ve terim sıralaması',
    coefficient: 'katsayı',
    smallTerm: 'küçük terim',
    ordering: 'Terim sıralaması — sağa gidildikçe baskın olan kazanır',
    efficient: 'verimli',
    unusable: 'kullanılamaz',
  },
  en: {
    label: 'The Big-O derivation steps and the ordering of terms',
    coefficient: 'coefficient',
    smallTerm: 'smaller term',
    ordering: 'Term ordering — the dominant one wins as you move right',
    efficient: 'efficient',
    unusable: 'unusable',
  },
} as const;

const TERMS = ['log n', 'n', 'n log n', 'n²', 'n³ … nᵏ', '2ⁿ', 'n!'];

export function BigOLadder({ lang }: { lang: Lang }) {
  const t = LADDER_COPY[lang];
  const boxWidth = 82;
  const gap = 8;

  return (
    <svg viewBox="0 0 640 206" className="w-full" role="img" aria-label={t.label}>
      {/* Derivation row. */}
      <g fill="var(--c-ink)" className="font-mono" style={{ fontSize: '13px' }}>
        <text x="16" y="34">
          ½n² + ½n
        </text>
        <text x="212" y="34">
          n² + n
        </text>
        <text x="404" y="34" fill="var(--c-accent-ink)">
          O(n²)
        </text>
      </g>
      <g stroke="var(--c-muted)" strokeWidth="1">
        <line x1="120" y1="30" x2="196" y2="30" />
        <line x1="288" y1="30" x2="388" y2="30" />
      </g>
      <g fill="var(--c-muted)">
        <polygon points="196,26 206,30 196,34" />
        <polygon points="388,26 398,30 388,34" />
      </g>
      <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '10px' }}>
        <text x="158" y="20" textAnchor="middle">
          {t.coefficient}
        </text>
        <text x="338" y="20" textAnchor="middle">
          {t.smallTerm}
        </text>
      </g>

      <line x1="16" y1="60" x2="624" y2="60" stroke="var(--c-line)" strokeWidth="1" />

      {/* Ordering ladder. Each term keeps ink-coloured text and takes its ramp
          step as a bar underneath, so the order is in the colour without the
          label ever being set in a data colour. */}
      <text
        x="16"
        y="84"
        fill="var(--c-muted)"
        className="font-mono"
        style={{ fontSize: '10.5px' }}
      >
        {t.ordering}
      </text>
      {TERMS.map((term, i) => {
        const x = 16 + i * (boxWidth + gap);
        return (
          <g key={term}>
            <rect
              x={x}
              y={100}
              width={boxWidth}
              height={38}
              fill={rampColor(i + 1)}
              fillOpacity="0.16"
            />
            <rect x={x} y={134} width={boxWidth} height={4} fill={rampColor(i + 1)} />
            <text
              x={x + boxWidth / 2}
              y={124}
              fill="var(--c-ink)"
              className="font-mono"
              style={{ fontSize: '11.5px' }}
              textAnchor="middle"
            >
              {term}
            </text>
          </g>
        );
      })}

      <g fill="var(--c-muted)" className="font-mono" style={{ fontSize: '10px' }}>
        <text x="16" y="162">
          {t.efficient}
        </text>
        <text x="624" y="162" textAnchor="end">
          {t.unusable}
        </text>
      </g>
    </svg>
  );
}
