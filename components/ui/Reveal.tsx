'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

let observer: IntersectionObserver | undefined;

export function Reveal({ children, delay = 0, className }:
  { children: ReactNode; delay?: number; className?: string }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = element.current;
    if (!node || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    observer ??= new IntersectionObserver((entries, targetObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = 'visible';
        targetObserver.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px' });
    node.dataset.reveal = 'pending';
    observer.observe(node);
    return () => observer?.unobserve(node);
  }, []);

  return <div ref={element} className={className} style={{ '--reveal-delay': delay + 'ms' } as CSSProperties}>{children}</div>;
}
