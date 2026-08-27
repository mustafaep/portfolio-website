'use client';

import { useId, useMemo, useState } from 'react';

import type { Lang } from '@/components/complexity/shared';
import { ControlButton } from '@/components/study/lab';
import { Stepper, STEPPER_LABELS } from '@/components/study/stepper';

/**
 * The infix → postfix converter from the source study file, and the postfix
 * evaluator that runs the same stack in the other direction.
 *
 * This is the one figure in the post that takes an expression of the reader's
 * own, because the section's claim is about *when* a thing is used rather than
 * what it looks like: an operator is held back until something of no higher
 * precedence arrives. A finished trace of one expression shows the result of
 * that rule; typing your own is what tests whether you have it. The two modes
 * sit in one component deliberately — the second is the first read backwards,
 * and postponing the operands instead of the operators is the whole point.
 *
 * Both traces are pure functions of the input string, so the first frame renders
 * identically on the server and on the client.
 */

type Frame = {
  /** Token being consumed: −1 before the first, tokens.length after the last. */
  token: number;
  stack: string[];
  out: string;
  done?: boolean;
  note: string;
};

type Trace = { tokens: string[]; frames: Frame[] };
type Result = Trace | { error: string };

type Messages = {
  outputLabel: string;
  resultLabel: string;
  lastOpLabel: string;
  start: string;
  startPostfix: string;
  operand: (c: string) => string;
  openPushed: string;
  closeEmptied: (moved: string[]) => string;
  closeEmpty: string;
  operatorPushed: (c: string) => string;
  operatorPopped: (c: string, popped: string[]) => string;
  finished: (rest: string[]) => string;
  operandPushed: (c: string) => string;
  applied: (op: string, a: number, b: number, r: number) => string;
  finishedPostfix: string;
  errEmpty: string;
  errTooLong: (max: number) => string;
  errChars: string;
  errUnmatchedClose: string;
  errUnclosedOpen: string;
  errOperands: (op: string) => string;
  errToken: (token: string) => string;
  errDivZero: string;
  errLeftover: (n: number) => string;
};

const MESSAGES: Record<Lang, Messages> = {
  tr: {
    outputLabel: 'çıktı (postfix)',
    resultLabel: 'sonuç',
    lastOpLabel: 'son işlem',
    start: 'Başlangıç: yığın boş, çıktı boş.',
    startPostfix:
      'Başlangıç: yığın boş. Postfix’te operandlar önce gelir, bu yüzden bu sefer onları erteliyoruz.',
    operand: (c) => `"${c}" bir operand → doğrudan çıktıya yazıldı.`,
    openPushed:
      '"(" yığına itildi. Önceliği 0 olduğu için hiçbir şeyi çıkarmaz; kendisi ancak ")" görülünce atılır.',
    closeEmptied: (moved) =>
      `")" görüldü → "(" görene kadar yığın boşaltıldı: ${moved.join(' ')} çıktıya yazıldı. "(" atıldı.`,
    closeEmpty: '")" görüldü → araya operatör girmemiş; "(" atıldı.',
    operatorPushed: (c) =>
      `"${c}" yığına itildi — yığın boş ya da tepedeki operatörden yüksek öncelikli.`,
    operatorPopped: (c, popped) =>
      `"${c}" geldi. Tepedeki ${popped.join(', ')} önceliği düşük olmadığı için çekilip çıktıya yazıldı; sonra "${c}" itildi.`,
    finished: (rest) =>
      `İfade bitti → yığında kalan ${rest.length ? rest.join(' ') : 'operatör yok'} çekilip çıktıya yazıldı.`,
    operandPushed: (c) => `"${c}" bir operand → yığına itildi.`,
    applied: (op, a, b, r) =>
      `"${op}" görüldü → tepeden iki operand çekildi (${a} ve ${b}), ${a} ${op} ${b} = ${r} hesaplanıp yığına itildi.`,
    finishedPostfix: 'İfade bitti. Yığında kalan tek değer sonuçtur.',
    errEmpty: 'Boş ifade.',
    errTooLong: (max) => `İfade en fazla ${max} simge olabilir.`,
    errChars: 'Yalnızca harf/rakam, + − * / ve parantez kullanılabilir.',
    errUnmatchedClose: 'Eşleşmeyen ")" — karşılığı olan "(" yok.',
    errUnclosedOpen: 'Kapanmamış "(" var.',
    errOperands: (op) => `"${op}" için yığında yeterli operand yok.`,
    errToken: (token) =>
      `Tanınmayan simge: "${token}". Sayılar ve + − * / bekleniyor, aralarında boşlukla.`,
    errDivZero: 'Sıfıra bölme.',
    errLeftover: (n) => `İfade geçersiz: sonunda yığında ${n} değer kaldı, 1 olmalıydı.`,
  },
  en: {
    outputLabel: 'output (postfix)',
    resultLabel: 'result',
    lastOpLabel: 'last operation',
    start: 'The start: the stack is empty and so is the output.',
    startPostfix:
      'The start: the stack is empty. In postfix the operands come first, so this time it is the operands that get postponed.',
    operand: (c) => `"${c}" is an operand → copied straight to the output.`,
    openPushed:
      '"(" was pushed. Its precedence is 0, so it removes nothing; it is only discarded when a ")" arrives.',
    closeEmptied: (moved) =>
      `")" arrived → the stack was emptied down to the "(": ${moved.join(' ')} went to the output. The "(" was discarded.`,
    closeEmpty: '")" arrived → no operator came in between; the "(" was discarded.',
    operatorPushed: (c) =>
      `"${c}" was pushed — the stack was empty or the operator on top has lower precedence.`,
    operatorPopped: (c, popped) =>
      `"${c}" arrived. ${popped.join(', ')} on top is not of lower precedence, so it was popped to the output; then "${c}" was pushed.`,
    finished: (rest) =>
      `The expression is finished → ${rest.length ? rest.join(' ') : 'nothing'} was left on the stack and popped to the output.`,
    operandPushed: (c) => `"${c}" is an operand → pushed.`,
    applied: (op, a, b, r) =>
      `"${op}" arrived → two operands were popped (${a} and ${b}), ${a} ${op} ${b} = ${r} was computed and pushed back.`,
    finishedPostfix: 'The expression is finished. The one value left on the stack is the result.',
    errEmpty: 'The expression is empty.',
    errTooLong: (max) => `At most ${max} tokens.`,
    errChars: 'Only letters and digits, + − * / and brackets are allowed.',
    errUnmatchedClose: 'An unmatched ")" — there is no "(" for it.',
    errUnclosedOpen: 'There is an unclosed "(".',
    errOperands: (op) => `There are not enough operands on the stack for "${op}".`,
    errToken: (token) =>
      `Unrecognised token: "${token}". Numbers and + − * / are expected, separated by spaces.`,
    errDivZero: 'Division by zero.',
    errLeftover: (n) => `Invalid expression: ${n} values were left on the stack, there should be 1.`,
  },
};

const COPY = {
  tr: {
    label: 'İfadenin, yığının ve çıktının adım adım değişimi',
    infixTab: 'Infix → Postfix',
    postfixTab: 'Postfix hesapla',
    inputLabel: 'İfade',
    run: 'Çalıştır',
    modes: 'Mod',
    errorLabel: 'HATA',
    expression: 'ifade',
    stack: 'yığın',
    top: 'tepe',
    empty: 'boş',
    done: '✓ tamamlandı',
    hintInfix: 'tek karakterli operandlar · operatörler + − * / · parantez serbest',
    hintPostfix: 'simgeleri boşlukla ayır · sayılar ve + − * / · örn. 2 4 6 + *',
    noExpression: 'İfade çizilemedi — yukarıdaki nota bak.',
  },
  en: {
    label: 'The expression, the stack and the output changing one token at a time',
    infixTab: 'Infix → postfix',
    postfixTab: 'Evaluate postfix',
    inputLabel: 'Expression',
    run: 'Run',
    modes: 'Mode',
    errorLabel: 'ERROR',
    expression: 'expression',
    stack: 'stack',
    top: 'top',
    empty: 'empty',
    done: '✓ finished',
    hintInfix: 'single-character operands · the operators + − * / · brackets allowed',
    hintPostfix: 'separate the tokens with spaces · numbers and + − * / · e.g. 2 4 6 + *',
    noExpression: 'Nothing could be drawn — see the note above.',
  },
} as const;

type Mode = 'infix' | 'postfix';

const DEFAULT_INPUT: Record<Mode, string> = { infix: 'a+b*c-d', postfix: '2 4 6 + *' };
const MAX_TOKENS: Record<Mode, number> = { infix: 22, postfix: 18 };

function precedence(token: string): number {
  if (token === '*' || token === '/') return 2;
  if (token === '+' || token === '-') return 1;
  return 0;
}

/** Infix → postfix, recording the stack and the output after every token. */
function traceInfix(input: string, m: Messages): Result {
  const raw = input.replace(/\s+/g, '');
  if (!raw) return { error: m.errEmpty };
  if (raw.length > MAX_TOKENS.infix) return { error: m.errTooLong(MAX_TOKENS.infix) };
  if (/[^A-Za-z0-9+\-*/()]/.test(raw)) return { error: m.errChars };

  const tokens = raw.split('');
  const stack: string[] = [];
  const frames: Frame[] = [{ token: -1, stack: [], out: '', note: m.start }];
  let out = '';

  for (let k = 0; k < tokens.length; k += 1) {
    const c = tokens[k]!;
    let note: string;

    if (/[A-Za-z0-9]/.test(c)) {
      out += c;
      note = m.operand(c);
    } else if (c === '(') {
      stack.push(c);
      note = m.openPushed;
    } else if (c === ')') {
      const moved: string[] = [];
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        const popped = stack.pop()!;
        moved.push(popped);
        out += popped;
      }
      if (stack.length === 0) return { error: m.errUnmatchedClose };
      stack.pop();
      note = moved.length > 0 ? m.closeEmptied(moved) : m.closeEmpty;
    } else {
      const popped: string[] = [];
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence(stack[stack.length - 1]!) >= precedence(c)
      ) {
        const top = stack.pop()!;
        popped.push(top);
        out += top;
      }
      stack.push(c);
      note = popped.length > 0 ? m.operatorPopped(c, popped) : m.operatorPushed(c);
    }

    frames.push({ token: k, stack: [...stack], out, note });
  }

  const rest: string[] = [];
  while (stack.length > 0) {
    const top = stack[stack.length - 1]!;
    if (top === '(') return { error: m.errUnclosedOpen };
    stack.pop();
    rest.push(top);
    out += top;
  }
  frames.push({ token: tokens.length, stack: [], out, done: true, note: m.finished(rest) });

  return { tokens, frames };
}

/** The same stack in the other direction: the operands are what gets postponed. */
function tracePostfix(input: string, m: Messages): Result {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { error: m.errEmpty };
  if (tokens.length > MAX_TOKENS.postfix) return { error: m.errTooLong(MAX_TOKENS.postfix) };

  const stack: number[] = [];
  const frames: Frame[] = [{ token: -1, stack: [], out: '', note: m.startPostfix }];
  let last = '';

  for (let k = 0; k < tokens.length; k += 1) {
    const token = tokens[k]!;

    if (/^-?\d+(\.\d+)?$/.test(token)) {
      stack.push(Number.parseFloat(token));
      frames.push({
        token: k,
        stack: stack.map(String),
        out: last,
        note: m.operandPushed(token),
      });
      continue;
    }

    if (token.length !== 1 || !'+-*/'.includes(token)) return { error: m.errToken(token) };
    if (stack.length < 2) return { error: m.errOperands(token) };

    const b = stack.pop()!;
    const a = stack.pop()!;
    let value: number;
    if (token === '+') value = a + b;
    else if (token === '-') value = a - b;
    else if (token === '*') value = a * b;
    else {
      if (b === 0) return { error: m.errDivZero };
      value = a / b;
    }
    // Six decimals is enough for the divisions the figure can produce and keeps
    // 0.1 + 0.2 from being reported as 0.30000000000000004.
    value = Math.round(value * 1e6) / 1e6;
    stack.push(value);
    last = `${a} ${token} ${b} = ${value}`;

    frames.push({
      token: k,
      stack: stack.map(String),
      out: last,
      note: m.applied(token, a, b, value),
    });
  }

  if (stack.length !== 1) return { error: m.errLeftover(stack.length) };
  frames.push({
    token: tokens.length,
    stack: stack.map(String),
    out: String(stack[0]),
    done: true,
    note: m.finishedPostfix,
  });

  return { tokens, frames };
}

function trace(mode: Mode, input: string, m: Messages): Result {
  return mode === 'infix' ? traceInfix(input, m) : tracePostfix(input, m);
}

const MONO = { fontSize: '11px' } as const;
const MONO_SM = { fontSize: '9.5px' } as const;

/** The stack column, the token row and the output box for one frame. */
function TraceFigure({
  frame,
  tokens,
  mode,
  t,
  outputLabel,
}: {
  frame: Frame;
  tokens: string[];
  mode: Mode;
  t: (typeof COPY)[Lang];
  outputLabel: string;
}) {
  const count = Math.max(tokens.length, 1);
  const cell = Math.min(34, 552 / count);
  // The container is 156 tall; deep stacks compress rather than overflow it.
  const stackHeight = frame.stack.length > 0 ? Math.min(26, 156 / frame.stack.length) : 26;

  return (
    <svg viewBox="0 0 640 250" className="w-full min-w-[30rem]" role="img" aria-label={t.label}>
      <text x="16" y="36" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {t.expression}
      </text>
      {tokens.map((token, k) => {
        const x = 70 + k * cell;
        const isCurrent = k === frame.token;
        const isSpent = k < frame.token;
        return (
          <g key={`${k}-${token}`}>
            <rect
              x={x}
              y={14}
              width={cell - 3}
              height={30}
              fill={isCurrent ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={isCurrent ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={isCurrent ? 2 : 1}
            />
            <text
              x={x + (cell - 3) / 2}
              y={35}
              textAnchor="middle"
              fill={isSpent ? 'var(--c-muted)' : 'var(--c-ink)'}
              className="font-mono"
              style={MONO}
            >
              {token}
            </text>
          </g>
        );
      })}

      <g stroke="var(--c-line)" strokeWidth="1">
        <line x1="38" y1="76" x2="38" y2="232" />
        <line x1="152" y1="76" x2="152" y2="232" />
        <line x1="38" y1="232" x2="152" y2="232" />
      </g>
      <text
        x="95"
        y="248"
        textAnchor="middle"
        fill="var(--c-muted)"
        className="font-mono"
        style={MONO_SM}
      >
        {t.stack}
      </text>

      {frame.stack.map((value, i) => {
        const y = 232 - (i + 1) * stackHeight;
        const isTop = i === frame.stack.length - 1;
        return (
          <g key={`cell-${i}-${value}`}>
            <rect
              x={40}
              y={y}
              width={110}
              height={stackHeight}
              fill={isTop ? 'var(--c-surface)' : 'var(--c-bg)'}
              stroke={isTop ? 'var(--c-accent)' : 'var(--c-line)'}
              strokeWidth={isTop ? 2 : 1}
            />
            <text
              x={95}
              y={y + stackHeight / 2 + 4}
              textAnchor="middle"
              fill="var(--c-ink)"
              className="font-mono"
              style={MONO}
            >
              {value}
            </text>
          </g>
        );
      })}
      {frame.stack.length > 0 ? (
        <text
          x="95"
          y={Math.max(72, 232 - frame.stack.length * stackHeight - 8)}
          textAnchor="middle"
          fill="var(--c-accent-ink)"
          className="font-mono"
          style={MONO_SM}
        >
          {t.top}
        </text>
      ) : (
        <text
          x="95"
          y="224"
          textAnchor="middle"
          fill="var(--c-muted)"
          className="font-mono"
          style={MONO_SM}
        >
          {t.empty}
        </text>
      )}

      <text x="200" y="106" fill="var(--c-muted)" className="font-mono" style={MONO_SM}>
        {outputLabel}
      </text>
      <rect
        x="200"
        y="116"
        width="420"
        height="48"
        fill="var(--c-surface)"
        stroke={frame.done ? 'var(--c-accent)' : 'var(--c-line)'}
        strokeWidth={frame.done ? 2 : 1}
      />
      <text
        x="216"
        y="147"
        fill="var(--c-ink)"
        className="font-mono"
        style={{ fontSize: '13px', letterSpacing: mode === 'infix' ? '0.22em' : undefined }}
      >
        {frame.out || '—'}
      </text>
      {frame.done ? (
        <text x="200" y="192" fill="var(--c-accent-ink)" className="font-mono" style={MONO_SM}>
          {t.done}
        </text>
      ) : null}
    </svg>
  );
}

export function ExpressionLab({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const m = MESSAGES[lang];
  const inputId = useId();

  const [mode, setMode] = useState<Mode>('infix');
  const [draft, setDraft] = useState(DEFAULT_INPUT.infix);
  const [submitted, setSubmitted] = useState<{ mode: Mode; input: string }>({
    mode: 'infix',
    input: DEFAULT_INPUT.infix,
  });
  const [index, setIndex] = useState(0);

  const result = useMemo(() => trace(submitted.mode, submitted.input, m), [submitted, m]);
  const failed = 'error' in result;

  const frames = failed ? [] : result.frames;
  const safeIndex = Math.min(index, Math.max(frames.length - 1, 0));
  const frame = frames[safeIndex];

  const outputLabel = frame?.done
    ? submitted.mode === 'infix'
      ? m.outputLabel
      : m.resultLabel
    : submitted.mode === 'infix'
      ? m.outputLabel
      : m.lastOpLabel;

  function run(nextMode: Mode, nextInput: string) {
    setSubmitted({ mode: nextMode, input: nextInput });
    setIndex(0);
  }

  return (
    <Stepper
      labels={STEPPER_LABELS[lang]}
      index={failed ? 0 : safeIndex}
      count={failed ? 1 : frames.length}
      onIndexChange={setIndex}
      note={failed ? result.error : (frame?.note ?? '')}
      noteLabel={failed ? t.errorLabel : undefined}
      tabs={
        <div className="flex flex-wrap items-end gap-x-3 gap-y-3">
          <div className="flex gap-2" role="group" aria-label={t.modes}>
            {(['infix', 'postfix'] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={item === mode}
                onClick={() => {
                  setMode(item);
                  setDraft(DEFAULT_INPUT[item]);
                  run(item, DEFAULT_INPUT[item]);
                }}
                className={`border px-2.5 py-1 font-mono text-xs transition-colors ${
                  item === mode
                    ? 'border-accent-ink bg-accent-ink text-bg'
                    : 'border-line text-muted hover:border-accent-ink hover:text-accent-ink'
                }`}
              >
                {item === 'infix' ? t.infixTab : t.postfixTab}
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-wrap items-end gap-2">
            <div className="min-w-[10rem] flex-1">
              <label htmlFor={inputId} className="eyebrow">
                {t.inputLabel}
              </label>
              <input
                id={inputId}
                type="text"
                value={draft}
                spellCheck={false}
                autoComplete="off"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    run(mode, draft);
                  }
                }}
                className="mt-1.5 w-full border border-line bg-bg px-2.5 py-1.5 font-mono text-xs text-ink focus:border-accent-ink focus:outline-none"
              />
            </div>
            <ControlButton onClick={() => run(mode, draft)} primary>
              {t.run}
            </ControlButton>
          </div>
        </div>
      }
    >
      <div className="overflow-x-auto p-4 sm:p-5">
        {failed || !frame ? (
          <p className="py-10 text-center font-mono text-xs text-muted">{t.noExpression}</p>
        ) : (
          <TraceFigure
            frame={frame}
            tokens={result.tokens}
            mode={submitted.mode}
            t={t}
            outputLabel={outputLabel}
          />
        )}
      </div>
      <p className="border-t border-line px-4 py-2.5 font-mono text-[0.7rem] text-muted sm:px-5">
        {mode === 'infix' ? t.hintInfix : t.hintPostfix}
      </p>
    </Stepper>
  );
}
