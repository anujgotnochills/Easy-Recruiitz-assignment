import type { ReactNode } from 'react';
import { classes } from '@/lib/utils';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <article className={classes('card', className)}>{children}</article>;
}
