import { type Lang, NUMBER_LOCALE, rampColor } from './shared';

/**
 * The two reference tables from the source study file.
 *
 * Both are rendered as real tables rather than fenced text: the numbers are
 * data, they need row headers for a screen reader, and the ordinal swatch in
 * the first column is what carries the "cost rises down the table" reading that
 * a monospaced block cannot.
 *
 * The growth table doubles as the table view for `GrowthChart` above it, which
 * is what lets that figure's hover layer be an enhancement rather than a gate.
 */

type Cell = number | string;

function formatCell(cell: Cell, lang: Lang): string {
  return typeof cell === 'number' ? cell.toLocaleString(NUMBER_LOCALE[lang]) : cell;
}

function Swatch({ step }: { step: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2.5 w-2.5 shrink-0"
      style={{ backgroundColor: rampColor(step) }}
    />
  );
}

const GROWTH_ROWS: { step: number; label: Record<Lang, string>; cells: Cell[]; magnitude: Record<Lang, string> }[] = [
  { step: 1, label: { tr: '5 (sabit)', en: '5 (constant)' }, cells: [5, 5, 5, 5], magnitude: { tr: 'atom', en: 'atom' } },
  { step: 1, label: { tr: 'log n', en: 'log n' }, cells: [3, 6, 9, 13], magnitude: { tr: 'amip', en: 'amoeba' } },
  { step: 2, label: { tr: '√n', en: '√n' }, cells: [3, 10, 31, 100], magnitude: { tr: 'kuş', en: 'bird' } },
  { step: 2, label: { tr: 'n', en: 'n' }, cells: [10, 100, 1000, 10000], magnitude: { tr: 'insan', en: 'human' } },
  { step: 3, label: { tr: 'n log n', en: 'n log n' }, cells: [30, 600, 9000, 130000], magnitude: { tr: 'ev', en: 'house' } },
  { step: 4, label: { tr: 'n²', en: 'n²' }, cells: [100, 10000, '10⁶', '10⁸'], magnitude: { tr: 'fil', en: 'elephant' } },
  { step: 5, label: { tr: 'n³', en: 'n³' }, cells: [1000, '10⁶', '10⁹', '10¹²'], magnitude: { tr: 'dinozor', en: 'dinosaur' } },
  { step: 6, label: { tr: '2ⁿ', en: '2ⁿ' }, cells: [1024, '10³⁰', '10³⁰⁰', '10³⁰⁰⁰'], magnitude: { tr: 'evren', en: 'universe' } },
];

const GROWTH_COPY = {
  tr: {
    caption: 'Giriş boyutu büyüdükçe adım sayısı',
    head: 'T(n)',
    magnitude: 'büyüklük',
    note: 'Sağdaki benzetme, sayının büyüklük mertebesini akılda tutmak için ders notlarından.',
  },
  en: {
    caption: 'Steps taken as the input size grows',
    head: 'T(n)',
    magnitude: 'magnitude',
    note: 'The analogy on the right is from the course notes, as a way to hold on to the order of magnitude.',
  },
} as const;

export function GrowthNumbersTable({ lang }: { lang: Lang }) {
  const t = GROWTH_COPY[lang];
  const columns = [10, 100, 1000, 10000];

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.head}
              </th>
              {columns.map((column, i) => (
                <th
                  key={column}
                  scope="col"
                  className="eyebrow px-4 py-2.5 font-normal whitespace-nowrap"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {i === 0 ? 'n = ' : ''}
                  {column.toLocaleString(NUMBER_LOCALE[lang])}
                </th>
              ))}
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.magnitude}
              </th>
            </tr>
          </thead>
          <tbody>
            {GROWTH_ROWS.map((row) => (
              <tr key={row.label[lang]} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-4 py-2.5 font-normal whitespace-nowrap">
                  <span className="flex items-center gap-2.5">
                    <Swatch step={row.step} />
                    <span className="font-mono text-xs text-ink">{row.label[lang]}</span>
                  </span>
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={columns[i]}
                    className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-ink"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatCell(cell, lang)}
                  </td>
                ))}
                <td className="px-4 py-2.5 font-mono text-xs text-muted">
                  {row.magnitude[lang]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
        {t.note}
      </figcaption>
    </figure>
  );
}

const CATEGORY_ROWS: { step: number; name: string; bigO: string; iterations: string; time: Record<Lang, string> }[] = [
  { step: 1, name: 'Logarithmic', bigO: 'O(log n)', iterations: '14', time: { tr: 'mikrosaniye', en: 'microseconds' } },
  { step: 2, name: 'Linear', bigO: 'O(n)', iterations: '10⁴', time: { tr: 'saniye', en: 'seconds' } },
  { step: 3, name: 'Linear logarithmic', bigO: 'O(n log n)', iterations: '1,4 × 10⁵', time: { tr: 'saniye', en: 'seconds' } },
  { step: 4, name: 'Quadratic', bigO: 'O(n²)', iterations: '10⁸', time: { tr: 'dakika', en: 'minutes' } },
  { step: 5, name: 'Polynomial', bigO: 'O(nᵏ)', iterations: '10⁴ᵏ', time: { tr: 'saat', en: 'hours' } },
  { step: 6, name: 'Exponential', bigO: 'O(cⁿ)', iterations: '2¹⁰⁰⁰⁰', time: { tr: 'çözülemez', en: 'intractable' } },
  { step: 7, name: 'Factorial', bigO: 'O(n!)', iterations: '10000!', time: { tr: 'çözülemez', en: 'intractable' } },
];

const CATEGORY_COPY = {
  tr: {
    caption: 'n = 10.000 için yedi verimlilik kategorisi',
    efficiency: 'verimlilik',
    bigO: 'big-O',
    iterations: 'tur sayısı',
    time: 'tahmini süre',
    note: 'Tablo yukarıdan aşağı azalan verimlilik sırasında; tur sayıları n = 10.000 için.',
  },
  en: {
    caption: 'The seven efficiency categories at n = 10,000',
    efficiency: 'efficiency',
    bigO: 'big-O',
    iterations: 'iterations',
    time: 'estimated time',
    note: 'The table runs from most to least efficient; iteration counts are for n = 10,000.',
  },
} as const;

export function CategoryTable({ lang }: { lang: Lang }) {
  const t = CATEGORY_COPY[lang];
  // The source writes 1,4 × 10⁵ with a Turkish decimal comma; English takes a point.
  const decimal = (value: string) => (lang === 'en' ? value.replace(',', '.') : value);

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.efficiency}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.bigO}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.iterations}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.time}
              </th>
            </tr>
          </thead>
          <tbody>
            {CATEGORY_ROWS.map((row) => (
              <tr key={row.name} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-4 py-2.5 font-normal whitespace-nowrap">
                  <span className="flex items-center gap-2.5">
                    <Swatch step={row.step} />
                    <span className="text-sm text-ink">{row.name}</span>
                  </span>
                </th>
                <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-ink">
                  {row.bigO}
                </td>
                <td
                  className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-ink"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {decimal(row.iterations)}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-muted">
                  {row.time[lang]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
        {t.note}
      </figcaption>
    </figure>
  );
}
