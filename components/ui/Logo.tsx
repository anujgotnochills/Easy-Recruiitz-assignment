import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/logo-optimized.webp';
import logoWhiteImg from '@/assets/logo-white-optimized.webp';
import { BRAND, common } from '@/data/site';

export function LogoWordmark({ light = false, className, alt = BRAND, sizes = '110px', priority = false }:
  { light?: boolean; className?: string; alt?: string; sizes?: string; priority?: boolean }) {
  return (
    <Image
      src={light ? logoWhiteImg : logoImg}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={`logo-img ${className ?? ''}`}
      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
    />
  );
}

export function Logo({ light = false, showName = false, name = BRAND }: { light?: boolean; showName?: boolean; name?: string }) {
  return (
    <Link href="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={name + ' · ' + common.home}>
      <LogoWordmark light={light} alt={showName ? '' : BRAND}
        sizes={light ? '64px' : '(max-width: 767px) 64px, 80px'} priority={!light} />
      {showName && <span className="logo-name">{name}</span>}
    </Link>
  );
}
