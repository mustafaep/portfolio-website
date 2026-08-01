import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';

/**
 * All three families are self-hosted by next/font at build time — the browser
 * never contacts fonts.googleapis.com, so there is no third-party connection
 * on the critical path.
 */

/**
 * latin-ext is required, not optional: ı, ş and ğ live outside the `latin`
 * subset, so without it the Turkish pages render those three letters in a
 * substituted font and the headline comes out visibly mixed. The browser only
 * fetches the latin-ext file when a page actually uses those characters.
 */
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const fontVariables = `${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`;
