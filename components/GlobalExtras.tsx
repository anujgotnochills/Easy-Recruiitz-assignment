'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { common, contactHref, site } from '@/data/site';
import { Button } from './ui/Button';

export function GlobalExtras() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: import('lenis').default | undefined;
    let version = 0;
    const sync = async () => {
      const current = ++version;
      lenis?.destroy();
      lenis = undefined;
      if (reduce.matches) return;
      const { default: Lenis } = await import('lenis');
      if (version === current) {
        // Native fragment navigation updates the hash before resolving industry targets.
        lenis = new Lenis({ autoRaf: true, lerp: 0.13, stopInertiaOnNavigate: true });
      }
    };
    void sync();
    reduce.addEventListener('change', sync);

    const update = () => setScrolled(window.scrollY > 620);
    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      version++;
      lenis?.destroy();
      reduce.removeEventListener('change', sync);
      window.removeEventListener('scroll', update);
    };
  }, []);

  return <>
    <div className="floating-actions">
      {scrolled && <a className="icon-button to-top" href="#top" aria-label={common.top}><ArrowUp size={21} aria-hidden="true" /></a>}
      <a href={site.whatsapp} className="icon-button whatsapp" aria-label={common.whatsapp}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.8 11.8a8.7 8.7 0 0 1-8.8 8.7 9 9 0 0 1-3.9-.9L3 21l1.4-5a8.6 8.6 0 0 1-1.1-4.2 8.8 8.8 0 1 1 17.5 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M8.2 7.6c.2-.5.5-.5.9-.5.2 0 .4.1.5.4l.8 1.9c.1.2.1.4 0 .6l-.6.8c-.1.2-.1.3 0 .5.7 1.2 1.6 2.1 2.9 2.7.2.1.4.1.5-.1l.9-1.1c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.4.4 0 1.2-1.2 2-2.3 2-2.8 0-6.9-3.5-6.9-6.2 0-.9.2-1.6.4-2.2Z" fill="currentColor" /></svg>
      </a>
    </div>
    <div className="mobile-actions">
      <Button href={contactHref()}>{common.hire}</Button>
      <Button href="/#jobs" variant="outline">{common.find}</Button>
    </div>
  </>;
}
