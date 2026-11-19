'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { m, useReducedMotion, useScroll } from 'framer-motion';

export function ProgressTrack({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.95', 'end 0.55'] });

  return <div className="process-track" ref={track}>
    <div className="track-line" aria-hidden="true">
      <m.span className="track-horizontal" style={reduced ? {} : { scaleX: scrollYProgress }} />
      <m.span className="track-vertical" style={reduced ? {} : { scaleY: scrollYProgress }} />
    </div>
    {children}
  </div>;
}
