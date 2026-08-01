'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fade-and-rise on scroll.
 *
 * Content renders visible by default and only becomes hidden once this
 * component has mounted and confirmed motion is wanted. Crawlers, no-JS
 * clients and reduced-motion users therefore always get the fully visible
 * markup — the animation can never hide content from them.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${armed ? 'reveal-armed' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
