import type { Lang } from '@/components/complexity/shared';

/**
 * The two reference tables from the linked-list study file.
 *
 * The cost table's O() column is a *status* reading — cheap, middling, expensive
 * — not a magnitude, so it takes an icon-and-label treatment rather than the
 * ordinal ramp used by the Big-O post: a glyph plus the notation, never colour
 * alone. Colour here would also be the wrong channel, since the third column
 * already explains each cell in words.
 */

type Cost = 'good' | 'fair' | 'bad';

const COST_MARK: Record<Cost, string> = { good: '●', fair: '◐', bad: '○' };

const COST_TITLE: Record<Lang, Record<Cost, string>> = {
  tr: { good: 'ucuz', fair: 'orta', bad: 'pahalı' },
  en: { good: 'cheap', fair: 'middling', bad: 'expensive' },
};

function CostCell({ cost, value, lang }: { cost: Cost; value: string; lang: Lang }) {
  return (
    <td className="px-4 py-2.5 whitespace-nowrap">
      <span className="flex items-baseline gap-2">
        <span
          aria-hidden="true"
          className={`font-mono text-xs ${cost === 'bad' ? 'text-muted' : 'text-accent-ink'}`}
        >
          {COST_MARK[cost]}
        </span>
        <span className="font-mono text-xs text-ink">{value}</span>
        <span className="sr-only">— {COST_TITLE[lang][cost]}</span>
      </span>
    </td>
  );
}

const COST_ROWS: {
  operation: Record<Lang, string>;
  array: { cost: Cost; value: string };
  list: { cost: Cost; value: string };
  why: Record<Lang, string>;
}[] = [
  {
    operation: { tr: 'başa ekle / sil', en: 'insert / delete at the head' },
    array: { cost: 'bad', value: 'O(N)' },
    list: { cost: 'good', value: 'O(1)' },
    why: {
      tr: 'dizide her eleman bir kayar; listede iki bağ değişir',
      en: 'every element shifts in an array; two links change in a list',
    },
  },
  {
    operation: { tr: 'sona ekle / sil', en: 'insert / delete at the end' },
    array: { cost: 'good', value: 'O(1)' },
    list: { cost: 'good', value: 'O(1)' },
    why: { tr: 'iki tarafta da kaydırma yok', en: 'neither one has to shift anything' },
  },
  {
    operation: { tr: 'tümünü yazdır', en: 'print all' },
    array: { cost: 'fair', value: 'O(N)' },
    list: { cost: 'fair', value: 'O(N)' },
    why: { tr: 'her elemana bir kez uğranır', en: 'every element is visited once' },
  },
  {
    operation: { tr: "i. elemana eriş", en: 'access the i-th element' },
    array: { cost: 'good', value: 'O(1)' },
    list: { cost: 'bad', value: 'O(i)' },
    why: {
      tr: 'dizide indeksle; listede baştan yürüyerek',
      en: 'by index in an array; by walking from the head in a list',
    },
  },
];

const COST_COPY = {
  tr: {
    caption: 'N elemanlı bir liste için dört işlemin maliyeti',
    operation: 'işlem',
    array: 'dizi',
    list: 'bağlı liste',
    why: 'neden',
    note: 'Tabloyu ezberlemek yerine nedenini aklında tut: dizide sıra konumdan, bağlı listede işaretçiden gelir.',
  },
  en: {
    caption: 'The cost of four operations on a list of N elements',
    operation: 'operation',
    array: 'array',
    list: 'linked list',
    why: 'why',
    note: 'Rather than memorising the table, hold on to the reason: order comes from position in an array and from pointers in a linked list.',
  },
} as const;

export function ArrayVsListTable({ lang }: { lang: Lang }) {
  const t = COST_COPY[lang];

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.operation}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.array}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.list}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.why}
              </th>
            </tr>
          </thead>
          <tbody>
            {COST_ROWS.map((row) => (
              <tr key={row.operation.en} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="px-4 py-2.5 text-sm font-normal whitespace-nowrap text-ink"
                >
                  {row.operation[lang]}
                </th>
                <CostCell cost={row.array.cost} value={row.array.value} lang={lang} />
                <CostCell cost={row.list.cost} value={row.list.value} lang={lang} />
                <td className="px-4 py-2.5 text-sm leading-relaxed text-muted">
                  {row.why[lang]}
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

const SEARCH_ROWS: {
  condition: Record<Lang, string>;
  pPre: Record<Lang, string>;
  pLoc: Record<Lang, string>;
  found: boolean;
}[] = [
  {
    condition: { tr: 'target < ilk düğüm', en: 'target < first node' },
    pPre: { tr: 'null', en: 'null' },
    pLoc: { tr: 'ilk düğüm', en: 'first node' },
    found: false,
  },
  {
    condition: { tr: 'target = ilk düğüm', en: 'target = first node' },
    pPre: { tr: 'null', en: 'null' },
    pLoc: { tr: 'ilk düğüm', en: 'first node' },
    found: true,
  },
  {
    condition: { tr: 'ilk < target < son', en: 'first < target < last' },
    pPre: {
      tr: "target'tan küçük en büyük düğüm",
      en: 'the largest node smaller than target',
    },
    pLoc: { tr: "target'tan büyük ilk düğüm", en: 'the first node larger than target' },
    found: false,
  },
  {
    condition: { tr: 'target = ortadaki düğüm', en: 'target = a middle node' },
    pPre: { tr: 'düğümün selefi', en: 'the node’s predecessor' },
    pLoc: { tr: 'eşit düğüm', en: 'the equal node' },
    found: true,
  },
  {
    condition: { tr: 'target = son düğüm', en: 'target = last node' },
    pPre: { tr: 'sonun selefi', en: 'the last node’s predecessor' },
    pLoc: { tr: 'son düğüm', en: 'last node' },
    found: true,
  },
  {
    condition: { tr: 'target > son düğüm', en: 'target > last node' },
    pPre: { tr: 'son düğüm', en: 'last node' },
    pLoc: { tr: 'null', en: 'null' },
    found: false,
  },
];

const SEARCH_COPY = {
  tr: {
    caption: 'searchList fonksiyonunun altı durumda döndürdükleri',
    condition: 'koşul',
    returns: 'dönüş',
    note: 'Arama başarısız olduğunda bile pPre ve pLoc doğru yeri gösterir — yani ekleme noktası zaten elinizdedir.',
  },
  en: {
    caption: 'What searchList returns in six situations',
    condition: 'condition',
    returns: 'returns',
    note: 'Even when the search fails, pPre and pLoc point at the right place — so the insertion point is already in hand.',
  },
} as const;

export function SearchOutcomesTable({ lang }: { lang: Lang }) {
  const t = SEARCH_COPY[lang];

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.condition}
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                pPre
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                pLoc
              </th>
              <th scope="col" className="eyebrow px-4 py-2.5 font-normal">
                {t.returns}
              </th>
            </tr>
          </thead>
          <tbody>
            {SEARCH_ROWS.map((row) => (
              <tr key={row.condition.en} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="px-4 py-2.5 font-mono text-xs font-normal whitespace-nowrap text-ink"
                >
                  {row.condition[lang]}
                </th>
                <td className="px-4 py-2.5 text-sm text-muted">{row.pPre[lang]}</td>
                <td className="px-4 py-2.5 text-sm text-muted">{row.pLoc[lang]}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <span className="flex items-baseline gap-2">
                    <span
                      aria-hidden="true"
                      className={`font-mono text-xs ${row.found ? 'text-accent-ink' : 'text-muted'}`}
                    >
                      {row.found ? '●' : '○'}
                    </span>
                    <span className="font-mono text-xs text-ink">
                      {row.found ? 'true' : 'false'}
                    </span>
                  </span>
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
