'use client';

import { usePathname } from 'next/navigation';
import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useState, useSyncExternalStore,
  type AnimationEvent, type ReactNode,
} from 'react';
import { EntryGate } from '@/components/entry-gate/EntryGate';
import { AUDIENCE_STORAGE_KEY, audienceCopy, DEFAULT_AUDIENCE, isAudience } from '@/data/audience';
import { SHOW_ENTRY_GATE, type Audience } from '@/data/site';

type Preference = Audience | null | undefined;
type GatePhase = 'idle' | 'rising' | 'entered';
type AudienceContextValue = { mode: Audience; setMode: (mode: Audience) => void };
const AudienceContext = createContext<AudienceContextValue | null>(null);
const preferenceEvent = 'er:audience-change';
let memoryPreference: Audience | null = null;

function readPreference(): Preference {
  try {
    const value = window.localStorage.getItem(AUDIENCE_STORAGE_KEY);
    return isAudience(value) ? value : memoryPreference;
  } catch {
    return memoryPreference;
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === AUDIENCE_STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(preferenceEvent, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(preferenceEvent, onChange);
  };
}

function savePreference(mode: Audience) {
  memoryPreference = mode;
  try { window.localStorage.setItem(AUDIENCE_STORAGE_KEY, mode); } catch {}
  window.dispatchEvent(new Event(preferenceEvent));
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const preference = useSyncExternalStore(subscribe, readPreference, () => undefined);
  const mode = preference ?? DEFAULT_AUDIENCE;
  const [phase, setPhase] = useState<GatePhase>('idle');
  const [switched, setSwitched] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const rising = phase === 'rising';
  const showGate = SHOW_ENTRY_GATE && path === '/' && phase !== 'entered';
  const locked = showGate && preference !== undefined;

  useLayoutEffect(() => {
    // Keep the head script's prepaint settings until the first client snapshot is ready.
    if (preference === undefined) return;
    const root = document.documentElement;
    root.dataset.audience = mode;
    if (locked) root.dataset.entryGate = 'open';
    else delete root.dataset.entryGate;
  }, [locked, mode, preference]);

  const setMode = (next: Audience) => {
    if (next === mode) return;
    setSwitched(true);
    setAnnouncement(audienceCopy[next].announcement);
    savePreference(next);
  };

  const enter = (next: Audience) => {
    if (phase !== 'idle') return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPhase('rising');
    savePreference(next);
  };

  const finish = useCallback(() => {
    setPhase(current => current === 'rising' ? 'entered' : current);
  }, []);

  const onSiteAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.animationName.startsWith('entry-site-')) finish();
  };

  useEffect(() => {
    if (!rising) return;
    const timer = window.setTimeout(finish, 1100);
    return () => window.clearTimeout(timer);
  }, [finish, rising]);

  useEffect(() => {
    if (phase !== 'entered') return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      const fragment = window.location.hash.slice(1);
      if (!fragment) return;
      const target = document.getElementById(fragment) ??
        [...document.querySelectorAll('[id]')].find(element => encodeURIComponent(element.id) === fragment);
      target?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  return <AudienceContext.Provider value={{ mode, setMode }}>
    {/* Entrance and switch are separate flags: folding them into one attribute made the
        navbar and hero entrance rules unmatch on the first switch, which restarted their
        animations and flashed the whole navbar away. */}
    <div className="site-content" inert={locked} data-entry-rising={rising || undefined}
      data-audience-animation={phase === 'entered' ? 'entrance' : undefined}
      data-audience-switch={switched ? 'on' : undefined}
      onAnimationEnd={onSiteAnimationEnd}>
      {children}
    </div>
    {showGate && <EntryGate active={locked} rising={rising} onChoose={enter} />}
    <span className="sr-only" role="status" aria-live="polite">
      {announcement || (phase === 'entered' ? audienceCopy[mode].announcement : '')}
    </span>
  </AudienceContext.Provider>;
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) throw new Error('useAudience must be used inside AudienceProvider');
  return context;
}
