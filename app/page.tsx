import type { Metadata } from 'next';
import { About } from '@/components/About';
import { Audiences } from '@/components/Audiences';
import { AudienceSections } from '@/components/AudienceSections';
import { CandidateTestimonials } from '@/components/CandidateTestimonials';
import { Contact } from '@/components/Contact';
import { Estimator } from '@/components/Estimator';
import { FAQ } from '@/components/FAQ';
import { Hero } from '@/components/Hero';
import { Industries } from '@/components/Industries';
import { Insights } from '@/components/Insights';
import { Jobs } from '@/components/Jobs';
import { Process } from '@/components/Process';
import { RecruitmentStats } from '@/components/RecruitmentStats';
import { Services } from '@/components/Services';
import { Container } from '@/components/ui/Container';
import { audienceCopy } from '@/data/audience';
import { BRAND, site } from '@/data/site';
import { homeSchema, serializeSchema } from '@/lib/schema';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: BRAND, locale: 'en_IN', title: site.title, description: site.description },
};

export default function HomePage() {
  return <main id="main-content" tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(homeSchema) }} />
    <Container className="home-sections">
      <AudienceSections sections={{
        hero: <Hero />, services: <Services />, process: <Process />, stats: <RecruitmentStats />, industries: <Industries />,
        estimator: <Estimator />, benefits: <Audiences />, about: <About />, jobs: <Jobs />,
        testimonials: audienceCopy.candidate.testimonials.items.length ? <CandidateTestimonials /> : null,
        guides: <Insights />, faq: <FAQ />, contact: <Contact />,
      }} />
    </Container>
  </main>;
}
