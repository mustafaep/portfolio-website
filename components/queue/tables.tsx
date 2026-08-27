import type { Lang } from '@/components/complexity/shared';

/**
 * The step-by-step trace behind the closing exercise. It is a table rather than
 * a fenced block because the point is read *across* a row — this x, that y, the
 * test, what Q3 holds afterwards — and down one column: Q3 changes on two of the
 * six turns and stands still on the rest.
 *
 * The test column takes a glyph plus the word, never colour alone; the answer is
 * a yes/no reading, not a magnitude, so it gets no ramp.
 */

const ROWS: { turn: string; x: string; y: string; match: boolean | null; q3: string }[] = [
  { turn: '1', x: '42', y: '1', match: true, q3: '42' },
  { turn: '2', x: '30', y: '4', match: false, q3: '42' },
  { turn: '3', x: '41', y: '5', match: false, q3: '42' },
  { turn: '4', x: '31', y: '4', match: true, q3: '42 31' },
  { turn: '5', x: '19', y: '10', match: false, q3: '42 31' },
  { turn: '6', x: '20', y: '13', match: false, q3: '42 31' },
  { turn: '—', x: '—', y: '—', match: null, q3: '42 31' },
];

const COPY = {
  tr: {
    caption: 'Q1 ve Q2 tükenene kadar dönen döngünün adım adım izi',
    turn: 'tur = count',
    x: "x (Q1'den)",
    y: "y (Q2'den)",
    test: 'y = count?',
    q3: 'Q3',
    yes: 'evet',
    no: 'hayır',
    stopped: 'Q2 boş — döngü biter',
    note: 'Döngü iki kuyruk da doluyken döner. Q2’de 6 eleman olduğu için en fazla 6 tur olur — Q1’in geri kalan 6 elemanı hiç okunmaz.',
  },
  en: {
    caption: 'The trace of the loop, turn by turn, until one of the queues runs out',
    turn: 'turn = count',
    x: 'x (from Q1)',
    y: 'y (from Q2)',
    test: 'y = count?',
    q3: 'Q3',
    yes: 'yes',
    no: 'no',
    stopped: 'Q2 is empty — the loop ends',
    note: 'The loop only turns while both queues have something in them. Q2 holds 6 values, so there are at most 6 turns — the remaining 6 values in Q1 are never read.',
  },
} as const;

export function QueueTraceTable({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.turn}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.x}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.y}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.test}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.q3}
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={`${row.turn}-${i}`} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="px-4 py-2.5 font-mono text-xs font-normal tabular-nums text-ink"
                >
                  {row.turn}
                </th>
                <td className="px-4 py-2.5 font-mono text-xs tabular-nums text-muted">{row.x}</td>
                <td className="px-4 py-2.5 font-mono text-xs tabular-nums text-muted">{row.y}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  {row.match === null ? (
                    <span className="text-sm text-muted">{t.stopped}</span>
                  ) : (
                    <span className="flex items-baseline gap-2">
                      <span
                        aria-hidden="true"
                        className={`font-mono text-xs ${
                          row.match ? 'text-accent-ink' : 'text-muted'
                        }`}
                      >
                        {row.match ? '●' : '○'}
                      </span>
                      <span className="font-mono text-xs text-ink">
                        {row.match ? t.yes : t.no}
                      </span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs tabular-nums text-ink">{row.q3}</td>
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
