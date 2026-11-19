import { ArrowUpRight, MapPin } from 'lucide-react';
import { content } from '@/data/content';
import { cities, industries } from '@/data/industries';
import { contactHref } from '@/data/site';
import { Heading } from './ui/Heading';
import { Icon } from './ui/Icon';
import { Pill } from './ui/Pill';
import { Reveal } from './ui/Reveal';

export function Industries() {
  const { industries: copy } = content;
  return <section id="industries" className="panel industries-panel" aria-labelledby="industries-title">
    <Reveal className="industry-layout">
      <Heading id="industries-title" {...copy} />
      <div className="industry-content">
        <h3>{copy.sectorLabel}</h3>
        <ul className="chip-list">{industries.map(item => <li key={item.id}>
          <a className="industry-chip" href={'#' + item.id}><Icon name={item.icon} size={17} />{item.name}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </li>)}</ul>
        <div className="industry-notes">
          {industries.map(item => <article className="industry-note" key={item.id} id={item.id} tabIndex={-1}>
            <h4>{item.name}</h4><p>{item.detail}</p>
            <a href={contactHref('employer', item.name)}>{copy.link}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </article>)}
        </div>
        <h3 className="city-heading">{copy.cityLabel}</h3>
        <ul className="chip-list cities">{cities.map(city => <li key={city}><Pill><MapPin size={14} aria-hidden="true" />{city}</Pill></li>)}</ul>
      </div>
    </Reveal>
  </section>;
}
