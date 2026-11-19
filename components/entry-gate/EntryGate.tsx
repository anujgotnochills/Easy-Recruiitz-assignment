'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BriefcaseBusiness, UserRoundSearch } from 'lucide-react';
import Image from 'next/image';
import hiringImage from '@/assets/entry-gate/hiring-white-shirt.png';
import jobSeekerImage from '@/assets/entry-gate/job-seeker.png';
import { audienceCopy, audienceModes, DEFAULT_AUDIENCE, entryCopy } from '@/data/audience';
import type { Audience } from '@/data/site';
import { useHoverCapable } from '@/hooks/useHoverCapable';
import { LogoWordmark } from '../ui/Logo';

const illustrations = { employer: hiringImage, candidate: jobSeekerImage };
const slideEase = [0.22, 1, 0.36, 1] as const;
// Each illustration slides in/out from its own side
const directions: Record<Audience, string> = { employer: '-100%', candidate: '100%' };

export function EntryGate({ active, rising, onChoose }:
  { active: boolean; rising: boolean; onChoose: (mode: Audience) => void }) {
  const title = useId();
  const dialog = useRef<HTMLDivElement>(null);
  const canHover = useHoverCapable();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<Audience | null>(null);
  const [focused, setFocused] = useState<Audience | null>(null);
  const [input, setInput] = useState<'pointer' | 'keyboard'>('keyboard');

  useEffect(() => {
    if (active) dialog.current?.focus({ preventScroll: true });
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onChoose(DEFAULT_AUDIENCE);
      return;
    }
    if (event.key !== 'Tab') return;
    setInput('keyboard');
    const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? []).filter(control => control.getClientRects().length);
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const mode = canHover ? (input === 'pointer' ? hovered : focused) : null;

  return <div ref={dialog} className="entry-gate" role="dialog" aria-modal="true" aria-label="Choose your path" tabIndex={-1}
    data-rising={rising || undefined} data-lenis-prevent onKeyDown={onKeyDown}>
    <div className="entry-illustrations" aria-hidden="true">
      <AnimatePresence>
        {mode && (
          <m.div key={'aura-' + mode} className={'entry-aura entry-aura--' + mode}
            initial={reduced ? { opacity: 0 } : { x: directions[mode], opacity: 0, scale: 0.8 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { x: directions[mode], opacity: 0, scale: 0.85 }}
            transition={{ duration: reduced ? 0.15 : 0.7, ease: slideEase }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mode && (
          <m.div key={mode} className={'entry-illustration entry-illustration--' + mode}
            initial={reduced ? { opacity: 0 } : { x: directions[mode], opacity: 0, scale: 0.94 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { x: directions[mode], opacity: 0, scale: 0.94 }}
            transition={{ duration: reduced ? 0.15 : 0.62, ease: slideEase }}>
            <Image src={illustrations[mode]} alt="" priority loading="eager"
              sizes="(min-width: 1440px) 720px, (min-width: 768px) 45vw, 300px" />
          </m.div>
        )}
      </AnimatePresence>
    </div>
    <div className="entry-gate-content">
      <span className="logo entry-logo"><LogoWordmark sizes="(max-width: 767px) 64px, 110px" priority /></span>
      <h2 id={title}>
        <span className="entry-greeting">{entryCopy.title[0]}</span>
        <span className="entry-question">{entryCopy.title[1]}</span>
      </h2>
      <div className="entry-choices">
        {audienceModes.map(choice =>
          <button key={choice} type="button" className="entry-choice" data-mode={choice}
            data-preview={mode === choice || undefined} aria-disabled={rising || undefined}
            onPointerEnter={event => {
              if (event.pointerType !== 'touch') { setInput('pointer'); setHovered(choice); }
            }}
            onPointerLeave={() => setHovered(null)}
            onFocus={event => {
              setFocused(choice);
              if (event.currentTarget.matches(':focus-visible')) setInput('keyboard');
            }}
            onBlur={() => setFocused(null)}
            onClick={() => onChoose(choice)}>
            <span className="entry-choice-art" aria-hidden="true">
              <Image src={illustrations[choice]} alt="" sizes="54px" />
            </span>
            {audienceCopy[choice].choice}
            <ArrowUpRight className="entry-choice-arrow" size={21} aria-hidden="true" />
          </button>
        )}
      </div>
        <section className="entry-mobile-flow" aria-label="Choose your path">
          {audienceModes.map(choice => <button key={choice} type="button" className={'entry-mobile-card entry-mobile-card--' + choice} onClick={() => onChoose(choice)}>
            <span className="entry-mobile-card-icon" aria-hidden="true">{choice === 'employer' ? <BriefcaseBusiness size={22} /> : <UserRoundSearch size={22} />}</span>
            <span className="entry-mobile-card-art" aria-hidden="true"><Image src={illustrations[choice]} alt="" sizes="(max-width: 400px) 300px, 380px" /></span>
            <span className="entry-mobile-card-bottom"><span><strong>{choice === 'employer' ? 'I’m hiring' : 'I’m looking for a job'}</strong><small>{choice === 'employer' ? 'Find vetted talent, faster' : 'Discover roles that fit you'}</small></span><span className="entry-mobile-card-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span></span>
          </button>)}
        </section>
      <a href="#main-content" className="entry-skip" onClick={event => { event.preventDefault(); onChoose(DEFAULT_AUDIENCE); }}>
          <span className="entry-skip-desktop">{entryCopy.skip}</span>
          <span className="entry-skip-mobile">Skip</span>
      </a>
    </div>
  </div>;
}
