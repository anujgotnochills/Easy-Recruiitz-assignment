import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import logoWhiteImg from '@/assets/logo-white.png';
import { BRAND, common } from '@/data/site';

export function LogoWordmark({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? logoWhiteImg : logoImg}
      alt={BRAND}
      width={130}
      height={101}
      priority
      className={`logo-img ${className ?? ''}`}
      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
    />
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={BRAND + ' · ' + common.home}>
      <LogoWordmark light={light} />
    </Link>
  );
}
