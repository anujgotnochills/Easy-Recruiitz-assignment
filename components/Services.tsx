import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import hiringPortrait from '@/assets/entry-gate/hiring-white-shirt.png';
import { content } from '@/data/content';
import { services } from '@/data/services';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function Services() {
  return <section id="services" className="panel services-panel" aria-labelledby="services-title">
    <Reveal className="heading-row">
      <Heading id="services-title" {...content.services} />
      <Button href="/services" variant="outline">{content.services.link}</Button>
    </Reveal>
    <div className="service-grid">
      {services.map((service, index) => <Reveal key={service.id} className={'service-wrap service-wrap-' + index} delay={index % 3 * 65}>
        <a className={index === 0 ? 'service-card card service-feature' : 'service-card card'} href={'/services#' + service.id}>
          <span className="icon-box"><Icon name={service.icon} /></span>
          {index === 0 && <span className="service-portrait" aria-hidden="true"><Image src={hiringPortrait} alt="" sizes="(max-width: 700px) 170px, 220px" /></span>}
          <div className="service-copy"><h3>{service.title}</h3><p>{service.short}</p></div>
          <span className="service-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
        </a>
      </Reveal>)}
    </div>
  </section>;
}
