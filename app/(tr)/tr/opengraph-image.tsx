import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';
import { person } from '@/lib/site';

export const alt = `${person.name} — ${person.jobTitle}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Default card, inherited by every Turkish route without its own image. */
export default function Image() {
  return renderOgImage({
    eyebrow: person.name,
    title: 'Üretim ortamına çıkan web sistemlerini uçtan uca geliştiriyorum.',
  });
}
