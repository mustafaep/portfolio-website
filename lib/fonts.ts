import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';

/**
 * All three families are self-hosted by next/font at build time — the browser
 * never contacts fonts.googleapis.com, so there is no third-party connection
 * on the critical path.
 */

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
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
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const fontVariables = `${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`;
