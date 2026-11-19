import type { ReactNode } from 'react';
import { classes } from '@/lib/utils';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classes('shell', className)}>{children}</div>;
}
