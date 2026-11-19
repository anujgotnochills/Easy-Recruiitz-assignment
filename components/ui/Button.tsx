import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { classes } from '@/lib/utils';

type Variant = 'primary' | 'light' | 'outline' | 'dark' | 'brand' | 'ghost';

export function buttonClass(variant: Variant = 'primary', className?: string) {
  return classes('button', 'button--' + variant, className);
}

export function Button({ href, children, variant = 'primary', arrow = true, className, label }:
  { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string; label?: string }) {
  return <a href={href} className={buttonClass(variant, className)} aria-label={label}>
    {children}{arrow && <ArrowUpRight size={17} aria-hidden="true" className="button-arrow" />}
  </a>;
}
