import { faqs } from '@/data/faqs';
import { BRAND, site } from '@/data/site';

const organizationId = site.url + '/#organization';

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': organizationId,
      name: BRAND, url: site.url, telephone: site.phone, email: site.email,
      sameAs: site.social.map(profile => profile.href),
      logo: site.url + '/icon.svg',
    },
    {
      '@type': ['LocalBusiness', 'EmploymentAgency'],
      '@id': site.url + '/#office', name: BRAND, url: site.url, parentOrganization: { '@id': organizationId },
      telephone: site.phone, email: site.email, areaServed: { '@type': 'Country', name: 'India' },
      address: { '@type': 'PostalAddress', ...site.office },
      geo: { '@type': 'GeoCoordinates', ...site.geo },
    },
    {
      '@type': 'WebSite', '@id': site.url + '/#website',
      name: BRAND, url: site.url, inLanguage: 'en-IN', publisher: { '@id': organizationId },
    },
    {
      '@type': 'FAQPage', '@id': site.url + '/#faq', inLanguage: 'en-IN',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question', name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export const serializeSchema = (schema: object) => JSON.stringify(schema).replace(/</g, '\\u003c');
