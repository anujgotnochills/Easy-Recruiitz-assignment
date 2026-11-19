import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { content } from '@/data/content';
import { common, site } from '@/data/site';
import { ContactFormEntry } from './ContactForm';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';

export function Contact() {
  const { contact: copy } = content;
  const address = encodeURIComponent(site.address);
  return <section id="contact" className="panel dark-panel contact-panel" aria-labelledby="contact-title">
    <div className="contact-layout">
      <Reveal className="contact-details">
        <Heading id="contact-title" {...copy} />
        <address>
          <a href={site.phoneHref}><span className="contact-icon"><Phone size={18} aria-hidden="true" /></span>{site.phone}</a>
          <a href={'mailto:' + site.email}><span className="contact-icon"><Mail size={18} aria-hidden="true" /></span>{site.email}</a>
          <div><span className="contact-icon"><MapPin size={18} aria-hidden="true" /></span>{site.address}</div>
        </address>
        <iframe title={copy.mapTitle} className="map" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
          src={'https://maps.google.com/maps?q=' + address + '&z=15&output=embed'} />
        <a className="map-link" href={'https://www.google.com/maps/search/?api=1&query=' + address}>{common.directions}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </Reveal>
      <ContactFormEntry />
    </div>
  </section>;
}
