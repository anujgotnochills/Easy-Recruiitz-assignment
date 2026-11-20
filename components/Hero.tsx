import { ArrowUpRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { audienceCopy, audienceModes } from '@/data/audience';
import { site } from '@/data/site';
import { Button } from './ui/Button';
import { CompanyLogos } from './CompanyLogos';
import { EmployerCallbackForm } from './EmployerCallbackForm';

const exampleRoles = [
  { title: 'Sales Lead', location: 'Pan-India', field: 'Retail' },
  { title: 'Senior Developer', location: 'Gurugram', field: 'IT' },
  { title: 'Relationship Manager', location: 'Delhi NCR', field: 'BFSI' },
  { title: 'HR Executive', location: 'Noida', field: 'Corporate' },
];
const moreExampleRoles = [
  { title: 'Staff Nurse', location: 'Delhi NCR', field: 'Healthcare' },
  { title: 'Operations Manager', location: 'Gurugram', field: 'Logistics' },
  { title: 'Customer Support', location: 'Noida', field: 'Telecom' },
  { title: 'Data Analyst', location: 'Bengaluru', field: 'IT' },
];

function RoleTrack({ roles, reverse = false }: { roles: typeof exampleRoles; reverse?: boolean }) {
  return <div className={'hero-role-track' + (reverse ? ' hero-role-track--reverse' : '')}>
    {[...roles, ...roles].map((role, index) => <div className="hero-role-card" key={role.title + index} aria-hidden={index >= roles.length}>
      <span className="hero-role-icon"><BriefcaseBusiness size={19} aria-hidden="true" /></span>
      <span><strong>{role.title}</strong><small>{role.location} · {role.field}</small></span>
    </div>)}
  </div>;
}

export function Hero() {
  return <section id="hero" className="hero dark-panel" aria-labelledby="hero-title">
    <div className="hero-content">
      <span className="hero-employer-eyebrow" data-audience-copy="employer">For employers</span>
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
      <div data-audience-copy="employer"><CompanyLogos /></div>
      <p className="hero-example-note" data-audience-copy="candidate">Example roles shown</p>
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
    <div className="hero-employer-form" data-audience-copy="employer" data-hero-reveal="directory"><EmployerCallbackForm /></div>
    <div className="hero-roles" data-hero-reveal="directory" aria-label="Example roles we recruit for">
      <div className="hero-role-column"><RoleTrack roles={exampleRoles} /></div>
      <div className="hero-role-column"><RoleTrack roles={moreExampleRoles} reverse /></div>
    </div>
  </section>;
}
