'use client';

import { useId, useState } from 'react';
import { LayoutGroup, m, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  const prefix = useId();
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return <LayoutGroup id={prefix}><div className="accordion">
    {items.map((item, index) => {
      const active = open === index;
      const id = prefix + '-' + index;
      return <m.div layout={!reduced} className="accordion-item" key={item.question} data-open={active}
        style={{ borderRadius: 16 }} transition={{ layout: { duration: 0.24, ease: 'easeOut' } }}>
        <m.h3 layout={reduced ? false : 'position'}><button type="button" id={id + '-trigger'} aria-controls={id} aria-expanded={active} onClick={() => setOpen(active ? null : index)}>
          {item.question}<span><Plus size={19} aria-hidden="true" /></span>
        </button></m.h3>
        <m.div className="accordion-answer" id={id} role="region" aria-labelledby={id + '-trigger'} hidden={!active} layout={reduced ? false : 'position'}>
          <p>{item.answer}</p>
        </m.div>
      </m.div>;
    })}
  </div></LayoutGroup>;
}
