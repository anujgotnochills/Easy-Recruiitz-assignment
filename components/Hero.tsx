import { ArrowUpRight, MapPin } from 'lucide-react';
import { audienceCopy, audienceModes } from '@/data/audience';
import { site } from '@/data/site';
import { Button } from './ui/Button';

export function Hero() {
  return <section id="hero" className="hero dark-panel" aria-labelledby="hero-title">
    <div className="hero-content">
      <h1 id="hero-title" data-hero-reveal="heading">
        {audienceModes.map(mode => {
          const { title } = audienceCopy[mode].hero;
          return <span key={mode} data-audience-copy={mode}>{title[0]}{' '}<span>{title[1]}</span></span>;
        })}
      </h1>
      <div className="hero-description" data-hero-reveal="description">
        {audienceModes.map(mode => <p key={mode} data-audience-copy={mode}>{audienceCopy[mode].hero.description}</p>)}
      </div>
      <div className="hero-button-slot" data-hero-reveal="actions">
        {audienceModes.map(mode => {
          const { primary, secondary } = audienceCopy[mode].hero;
          return <div key={mode} className="hero-buttons" data-audience-copy={mode}>
            <Button href={primary.href}>{primary.text}</Button>
            <Button href={secondary.href} variant="ghost">{secondary.text}</Button>
          </div>;
        })}
      </div>
    </div>
    <div className="hero-directory" data-hero-reveal="directory">
      <p className="hero-office"><MapPin size={17} aria-hidden="true" />{site.neighbourhood}, {site.office.addressLocality}</p>
      {audienceModes.map(mode => <nav key={mode} data-audience-copy={mode} aria-label={audienceCopy[mode].hero.directoryLabel}>
        <ul>
          {audienceCopy[mode].hero.links.map(service => <li key={service.href}>
            <a href={service.href}>{service.text}<ArrowUpRight size={19} aria-hidden="true" /></a>
          </li>)}
        </ul>
      </nav>)}
    </div>
  </section>;
}
