import type { ReactNode } from 'react';
import { classes } from '@/lib/utils';

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={classes('pill', className)}>{children}</span>;
}
