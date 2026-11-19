'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

const features = () => import('framer-motion').then(module => module.domMax);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user"><LazyMotion features={features} strict>{children}</LazyMotion></MotionConfig>;
}
