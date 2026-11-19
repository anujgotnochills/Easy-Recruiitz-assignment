import { ImageResponse } from 'next/og';
import { BRAND } from '@/data/site';
import { audienceCopy } from '@/data/audience';

const title = audienceCopy.employer.hero.title;

export const alt = BRAND + ' — ' + title.join(' ');
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#F6F5F1', padding: 24 }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', borderRadius: 38, padding: 66, backgroundColor: '#0B1020', color: '#fff', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', fontSize: 28, marginBottom: 50, color: '#C6F432' }}>{BRAND}</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 81, fontWeight: 700, lineHeight: 1.03, letterSpacing: '-5px' }}>
          <span>{title[0]}</span><span style={{ color: '#BAA9FF' }}>{title[1]}</span>
        </div>
      </div>
    </div>,
    size,
  );
}
