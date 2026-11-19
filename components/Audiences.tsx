'use client';

import Image from 'next/image';
import hiringPortrait from '@/assets/entry-gate/hiring-white-shirt.png';
import jobPortrait from '@/assets/entry-gate/job-seeker.png';
import { useAudience } from '@/context/AudienceProvider';
import { audienceCopy } from '@/data/audience';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function Audiences() {
  const { mode } = useAudience();
  const other = mode === 'employer' ? 'candidate' : 'employer';

  return <div className="audience-grid">
    {([mode, other] as const).map((audience, index) => {
      const item = audienceCopy[audience].benefits;
      const id = 'for-' + audience;
      return <div key={audience} className="audience-benefit" data-benefit-for={audience}><Reveal delay={index * 85}>
        <section className={'panel audience-panel audience-' + audience} aria-labelledby={id}>
          <div className="audience-panel-head"><Heading id={id} title={item.title} />
            <span className="audience-panel-art" aria-hidden="true"><Image src={audience === 'employer' ? hiringPortrait : jobPortrait} alt="" sizes="180px" /></span>
          </div>
          <ul>{item.items.map(benefit => <li key={benefit.text}><span className="benefit-icon"><Icon name={benefit.icon} size={17} /></span>{benefit.text}</li>)}</ul>
          <Button href={item.link.href} variant={audience === 'candidate' ? 'light' : 'primary'}>{item.link.text}</Button>
        </section>
      </Reveal></div>;
    })}
  </div>;
}
