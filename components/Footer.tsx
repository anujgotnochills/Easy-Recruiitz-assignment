import { Instagram, Linkedin, MapPin } from 'lucide-react';
import Link from 'next/link';
import { content } from '@/data/content';
import { BRAND, common, site } from '@/data/site';
import { Container } from './ui/Container';
import { Logo } from './ui/Logo';

export function Footer() {
  const { footer } = content;
  const year = new Intl.DateTimeFormat('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date());
  return <Container className="footer-wrap"><footer className="panel footer dark-panel">
    <div className="footer-top">
      <Logo light />
      <nav className="footer-columns" aria-label={footer.navigation}>
        {footer.columns.map(col => <div key={col.title}><h2>{col.title}</h2><ul>
          {col.links.map(item => <li key={item.href}><a href={item.href}>{item.text}</a></li>)}
        </ul></div>)}
      </nav>
      <div className="footer-contact"><h2>{footer.contact}</h2><address>
        <a href={site.phoneHref}>{site.phone}</a><a href={'mailto:' + site.email}>{site.email}</a>
        <p><MapPin size={15} aria-hidden="true" />{site.address}</p>
      </address>
        <nav className="footer-social" aria-label="Social media">
          {site.social.map(profile => <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={'Easy Recruitz on ' + profile.name}>
            {profile.name === 'Instagram' ? <Instagram size={18} aria-hidden="true" /> : profile.name === 'LinkedIn' ? <Linkedin size={18} aria-hidden="true" /> : <span className="footer-social-x" aria-hidden="true">𝕏</span>}
            {profile.name !== 'X' && <span>{profile.name}</span>}
          </a>)}
        </nav>
      </div>
    </div>
    <div className="footer-bottom"><small>© {year} {BRAND}. {footer.legal}</small>
      <div><Link href="/privacy">{common.privacy}</Link><Link href="/terms">{common.terms}</Link></div>
    </div>
  </footer></Container>;
}
