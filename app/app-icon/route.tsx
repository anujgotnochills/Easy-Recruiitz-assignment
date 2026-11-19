import { ImageResponse } from 'next/og';
import { AppMark } from '@/components/AppMark';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(<AppMark />, { width: 512, height: 512 });
}
