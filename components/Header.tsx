'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useAudience } from '@/context/AudienceProvider';
import { content } from '@/data/content';
import { common, contactHref, nav } from '@/data/site';
import { AudienceSwitcher } from './AudienceSwitcher';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Logo } from './ui/Logo';

export function Header() {
  const { mode } = useAudience();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const desktop = window.matchMedia('(min-width: 960px)');
    const switchLayout = () => { if (desktop.matches) menu.current?.close(); };
    desktop.addEventListener('change', switchLayout);
    return () => {
      window.removeEventListener('scroll', update);
      desktop.removeEventListener('change', switchLayout);
    };
  }, []);

  return <header className="header-wrap">
      <Container>
        <div className="navbar" data-compact={compact || undefined}>
          <Logo showName name="Easy Recruitz" />
          <nav className="nav-links" aria-label={content.header.navigation}>
            {nav.map(item => <a key={item.href} href={item.href}>{item.text}</a>)}
          </nav>
          <div className="nav-end">
            <AudienceSwitcher />
            <div className="nav-actions">
              {mode === 'candidate' ? (
                <Button href={contactHref('candidate', undefined, true)} variant="brand" arrow={false}>Upload CV</Button>
              ) : (
                <Button href={contactHref('employer')} arrow={false}>Get a quote</Button>
              )}
            </div>
            <button type="button" className="icon-button menu-trigger" aria-expanded={menuOpen} aria-controls="mobile-menu"
              aria-label={content.header.open} onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}>
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
      <dialog id="mobile-menu" ref={menu} className="menu-sheet" aria-label={content.header.navigation} onClose={() => setMenuOpen(false)}>
        <div className="menu-inner">
          <div className="menu-head"><Logo showName name="Easy Recruitz" /><button type="button" className="icon-button" aria-label={content.header.close} onClick={close}><X size={24} aria-hidden="true" /></button></div>
          <nav aria-label={content.header.navigation} data-lenis-prevent>
            {nav.map(item => <a key={item.href} href={item.href} onClick={close}>{item.text}<ArrowUpRight size={22} aria-hidden="true" /></a>)}
          </nav>
          <div className="menu-actions" onClick={close}>
            {mode === 'candidate' ? (
              <>
                <Button href="/#jobs">{common.find}</Button>
                <Button href={contactHref()} variant="outline">{common.hire}</Button>
              </>
            ) : (
              <>
                <Button href={contactHref()}>{common.hire}</Button>
                <Button href="/#jobs" variant="outline">{common.find}</Button>
              </>
            )}
          </div>
        </div>
      </dialog>
  </header>;
}
