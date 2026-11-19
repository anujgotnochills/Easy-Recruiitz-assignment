import { classes } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Heading({ id, title, detail, className }:
  { id: string; title: ReactNode; detail?: string; className?: string }) {
  return <div className={classes('section-heading', className)}>
    <h2 id={id}>{title}</h2>
    {detail && <p className="section-detail">{detail}</p>}
  </div>;
}
