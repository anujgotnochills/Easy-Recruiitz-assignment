import { BRAND } from './site';

export const content = {
  header: { navigation: 'Main navigation', open: 'Open menu', close: 'Close menu' },
  about: {
    title: 'About ' + BRAND,
    body: [
      'We agree on the role, salary range and screening criteria with hiring managers before contacting candidates.',
      'We handle specialist and leadership searches, as well as hiring drives that need shared screening criteria and coordinated start dates.',
    ],
    link: 'See how we recruit',
  },
  services: {
    title: 'Recruitment and staffing services',
    link: 'View all services',
  },
  industries: {
    title: 'Industries and hiring locations',
    sectorLabel: 'Explore industries', cityLabel: 'Hiring locations', link: 'Discuss hiring in this sector',
  },
  jobs: {
    title: 'Roles we recruit for',
    notice: 'Example roles. Contact us for current openings.',
    filters: 'Filter roles by category', apply: 'Ask about similar roles', link: 'Browse role examples',
    applyNotice: 'Tell us what interests you about this type of role.',
    count: (count: number) => count + (count === 1 ? ' role shown' : ' roles shown'),
  },
  insights: {
    title: 'Recruitment guides',
    link: 'Read guide',
  },
  faq: { title: 'Recruitment FAQs' },
  contact: {
    title: 'Contact ' + BRAND,
    mapTitle: 'Map of the ' + BRAND + ' office in Jasola, New Delhi',
    intro: 'Send an enquiry',
    audienceLabel: 'I’m contacting ' + BRAND + ' as',
    audiences: { employer: 'I’m an Employer', candidate: 'I’m a Candidate' },
    name: 'Full name', email: 'Email address', phone: 'Phone number', company: 'Company',
    message: 'Message', cv: 'CV (optional)', cvHint: 'PDF, DOC or DOCX, up to 4 MB. Preview files are discarded after validation.',
    employerHint: 'Role, location, headcount or hiring timeline',
    candidateHint: 'Target role, experience and preferred locations',
    consent: 'I agree to be contacted about this enquiry.',
    privacy: 'Read the privacy policy', submit: 'Send enquiry', sending: 'Sending…',
    success: 'Your details passed validation. Email or call us to reach the recruitment team.',
    failure: 'We couldn’t submit your enquiry. Please try again or contact us by email.',
    preview: 'This form is a preview. For a reply, email or call us.',
    honeypot: 'Leave this field blank', sampleSubject: 'Role of interest', employerSubject: 'Hiring enquiry',
    errors: {
      name: 'Enter your full name using 2 to 100 characters.',
      email: 'Enter a valid email address.',
      phone: 'Enter a phone number with 7 to 15 digits.',
      company: 'Enter your company name using 2 to 150 characters.',
      message: 'Tell us a little more using 10 to 2,000 characters.',
      consent: 'Please confirm that we can contact you about your enquiry.',
      cv: 'Choose a PDF, DOC or DOCX file up to 4 MB.',
    },
  },
  footer: {
    columns: [
      { title: 'Company', links: [{ text: 'About us', href: '/#about' }, { text: 'How it works', href: '/#process' }, { text: 'Insights', href: '/#insights' }] },
      { title: 'Services', links: [{ text: 'Permanent and contract hiring', href: '/services#expert-placements' }, { text: 'Executive search', href: '/services#executive-search' }, { text: 'Contract-to-hire staffing', href: '/services#contract-to-hire' }] },
      { title: 'Industries', links: [{ text: 'IT & software', href: '/#it-software' }, { text: 'BFSI', href: '/#bfsi' }, { text: 'Healthcare & pharma', href: '/#healthcare-pharma' }] },
      { title: 'For Candidates', links: [{ text: 'Browse role examples', href: '/jobs' }, { text: 'Upload your CV', href: '/?audience=candidate&cv=1#contact' }, { text: 'Contact us', href: '/#contact' }] },
    ],
    contact: 'Contact', navigation: 'Footer navigation',
    legal: 'All rights reserved.',
  },
  pages: {
    home: 'Back to homepage', services: 'Recruitment services', jobs: 'Example recruitment roles',
    servicesDetail: 'Permanent and contract placements, executive search, and campus and bulk hiring in India.',
    serviceCta: 'Discuss this service', otherJobs: 'Browse role examples',
    sampleJob: 'This is an example role. Contact us to ask about similar opportunities.',
    legalDraft: 'Preview copy for client review.',
  },
} as const;
