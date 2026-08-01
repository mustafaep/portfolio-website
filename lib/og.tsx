import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

import { SITE_URL, person } from './site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const fontDir = path.join(process.cwd(), 'assets', 'fonts');
const serif = fs.readFileSync(path.join(fontDir, 'InstrumentSerif-Regular.ttf'));
const mono = fs.readFileSync(path.join(fontDir, 'JetBrainsMono-Regular.ttf'));

/** Light theme values, kept in sync with :root in app/globals.css. */
const ink = '#1a1a2e';
const muted = '#6b6b80';
const paper = '#f5f3f0';
const accent = '#0d9f5f';

/**
 * Shared Open Graph card. Uses the same serif and mono the site uses, so a
 * shared link looks like it came from this site rather than from a template.
 */
export function renderOgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: paper,
          padding: '68px 72px',
          borderTop: `10px solid ${accent}`,
          fontFamily: 'JetBrains Mono',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'JetBrains Mono',
            fontSize: 22,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: muted,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Instrument Serif',
            fontSize: title.length > 48 ? 76 : 96,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: ink,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'JetBrains Mono',
            fontSize: 22,
            color: muted,
          }}
        >
          <div style={{ display: 'flex' }}>{footer ?? person.jobTitle}</div>
          <div style={{ display: 'flex' }}>{SITE_URL.replace('https://', '')}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 },
        { name: 'JetBrains Mono', data: mono, style: 'normal', weight: 400 },
      ],
    },
  );
}
