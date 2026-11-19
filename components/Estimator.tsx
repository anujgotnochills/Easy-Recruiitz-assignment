'use client';

import { useId, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ChevronDown, Clock3 } from 'lucide-react';
import { industries } from '@/data/industries';
import { estimator } from '@/data/estimator';
import { enter } from '@/lib/motion';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';

export function Estimator() {
  const id = useId();
  const [roleId, setRoleId] = useState<string>(estimator.roles[0].id);
  const [industryId, setIndustryId] = useState<keyof typeof estimator.industryOffsets>(industries[0].id);
  const reduced = useReducedMotion();
  const role = estimator.roles.find(option => option.id === roleId) ?? estimator.roles[0];
  const offset = estimator.industryOffsets[industryId];
  const range = role.days.map(days => days + offset).join('–');

  return <section className="panel estimator-panel" aria-labelledby="estimator-title">
    <Reveal className="estimator-layout">
      <div>
        <Heading id="estimator-title" {...estimator} />
        <div className="estimator-fields">
          <div className="estimator-field"><label htmlFor={id + '-role'}>{estimator.roleLabel}</label><span className="select-wrap">
            <select id={id + '-role'} value={roleId} onChange={event => setRoleId(event.currentTarget.value)}>
              {estimator.roles.map(option => <option key={option.id} value={option.id}>{option.text}</option>)}
            </select><ChevronDown size={18} aria-hidden="true" />
          </span></div>
          <div className="estimator-field"><label htmlFor={id + '-industry'}>{estimator.industryLabel}</label><span className="select-wrap">
            <select id={id + '-industry'} value={industryId} onChange={event => setIndustryId(event.currentTarget.value as typeof industryId)}>
              {industries.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select><ChevronDown size={18} aria-hidden="true" />
          </span></div>
        </div>
      </div>
      <div className="estimator-result card">
        <span className="icon-box"><Clock3 size={23} aria-hidden="true" /></span>
        <p>{estimator.resultLabel}</p>
        <output aria-live="polite">
          <AnimatePresence initial={false} mode="wait">
            <m.span key={range} className="estimate-range" {...(!reduced ? enter : {})}>
              <strong>{range}</strong> {estimator.units}
            </m.span>
          </AnimatePresence>
        </output>
        <small>{estimator.note}</small>
      </div>
    </Reveal>
  </section>;
}
