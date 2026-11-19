import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import logoWhiteImg from '@/assets/logo-white.png';
import { BRAND, common } from '@/data/site';

export function LogoWordmark({ light = false, className, alt = BRAND }: { light?: boolean; className?: string; alt?: string }) {
  return (
    <Image
      src={light ? logoWhiteImg : logoImg}
      alt={alt}
      width={130}
      height={101}
      priority
      className={`logo-img ${className ?? ''}`}
      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
    />
  );
}

export function Logo({ light = false, showName = false, name = BRAND }: { light?: boolean; showName?: boolean; name?: string }) {
  return (
    <Link href="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={name + ' · ' + common.home}>
      <LogoWordmark light={light} alt={showName ? '' : BRAND} />
      {showName && <span className="logo-name">{name}</span>}
    </Link>
  );
}
