import { Heart, Leaf } from 'lucide-react';

export function CompanyLogos() {
  return <div className="hero-company-trust" aria-label="Company logos">
    <p>Trusted by growing teams</p>
    <div className="hero-company-logos">
      <span className="company-logo company-logo--human"><span className="company-human-mark" aria-hidden="true">◈</span>Human</span>
      <span className="company-logo company-logo--advisor"><span className="company-advisor-mark" aria-hidden="true">●●●<br />●●●<br />●●●</span>ADVISOR</span>
      <span className="company-logo company-logo--green"><Heart size={28} aria-hidden="true" /><span>GREEN HEART<small>SLOGAN HERE</small></span></span>
      <span className="company-logo company-logo--company"><span className="company-n-mark" aria-hidden="true">N</span><span>COMPANY<small>SLOGAN HERE</small></span></span>
      <span className="company-logo company-logo--organic">Organic <span>ECO</span><Leaf size={18} aria-hidden="true" /></span>
    </div>
  </div>;
}
