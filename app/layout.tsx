import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { GlobalExtras } from '@/components/GlobalExtras';
import { Header } from '@/components/Header';
import { MotionProvider } from '@/components/MotionProvider';
import { AudienceProvider } from '@/context/AudienceProvider';
import { AUDIENCE_STORAGE_KEY, audienceModes } from '@/data/audience';
import { BRAND, common, SHOW_ENTRY_GATE, site } from '@/data/site';
import './globals.css';
import './entry-gate.css';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const audienceBootstrap = '(()=>{const root=document.documentElement;let mode;try{mode=localStorage.getItem(' +
  JSON.stringify(AUDIENCE_STORAGE_KEY) + ')}catch{}if(' + JSON.stringify(audienceModes) +
  '.includes(mode)){root.dataset.audience=mode}if(' + SHOW_ENTRY_GATE +
  '&&location.pathname==="/"){root.dataset.entryGate="open"}})()';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F6F5F1' };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s | ' + BRAND },
  description: site.description,
  openGraph: { type: 'website', siteName: BRAND, locale: 'en_IN', title: site.title, description: site.description },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/opengraph-image'] },
  appleWebApp: { title: BRAND, capable: true },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-IN" className={sora.variable + ' ' + inter.variable} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: audienceBootstrap }} /></head>
    <body id="top">
      <MotionProvider>
        <AudienceProvider>
          <a href="#main-content" className="skip-link">{common.skip}</a>
          <Header />
          {children}
          <Footer />
          <GlobalExtras />
        </AudienceProvider>
      </MotionProvider>
    </body>
  </html>;
}
