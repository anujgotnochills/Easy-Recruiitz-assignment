import { contactHref, type Audience } from './site';

export const AUDIENCE_STORAGE_KEY = 'er-audience';
export const DEFAULT_AUDIENCE: Audience = 'employer';
export const audienceModes = ['employer', 'candidate'] as const;

export function isAudience(value: unknown): value is Audience {
  return value === 'employer' || value === 'candidate';
}

export const entryCopy = {
  title: ['Welcome.', 'Are you looking to hire talent or find your next job?'],
  skip: 'Skip to explore recruitment services',
  modeControl: 'Choose your audience',
} as const;

type CandidateTestimonial = {
  name: string;
  placement: string;
  quote: string;
};

export const audienceCopy = {
  employer: {
    choice: 'I’m Hiring Talent',
    switchLabel: 'Hiring',
    announcement: 'Employer view selected.',
    hero: {
      title: ['Optimized hiring.', 'Maximum impact.'],
      description: 'We recruit permanent staff, contractors and senior leaders for employers across India.',
      primary: { text: 'Get a Quote', href: contactHref('employer') },
      secondary: { text: 'See Services', href: '#services' },
      directoryLabel: 'Recruitment services',
      links: [
        { text: 'Permanent and contract hiring', href: '/services#expert-placements' },
        { text: 'Executive search', href: '/services#executive-search' },
        { text: 'Campus and bulk hiring', href: '/services#campus-hiring' },
      ],
    },
    benefits: {
      title: 'For employers',
      link: { text: 'Hire with us', href: contactHref('employer') },
      items: [
        { icon: 'Timer', text: 'Agree on a shortlist timeline at the start of the search' },
        { icon: 'ListChecks', text: 'Get screening notes with each shortlisted candidate' },
        { icon: 'UsersRound', text: 'Assess the ways of working that matter for the role' },
        // TODO(client): Confirm replacement policy, eligibility, and terms.
        { icon: 'ShieldCheck', text: 'Ask about replacement support for eligible searches' },
        { icon: 'LaptopMinimal', text: 'Hybrid, remote and onsite hiring support' },
      ],
    },
    process: {
      title: 'How we recruit',
      steps: [
        { title: 'Brief', text: 'Agree on outcomes, must-have skills and how we’ll assess them.', icon: 'ClipboardList' },
        { title: 'Source', text: 'Contact candidates in relevant roles and professional networks.', icon: 'Search' },
        { title: 'Screen', text: 'Check skills, motivation, availability and work preferences.', icon: 'ScanLine' },
        { title: 'Shortlist', text: 'Review candidate profiles and screening notes before interviewing.', icon: 'ListChecks' },
        { title: 'Onboard', text: 'Coordinate the offer, notice period and joining handoff.', icon: 'Handshake' },
      ],
    },
    stats: {
      title: 'Reported recruitment activity',
      // Counter targets from the existing Easy Recruitz homepage.
      items: [
        { label: 'Joinings', value: '200+' },
        { label: 'Mass recruitments', value: '500+' },
        { label: 'Verifications', value: '80+' },
        { label: 'Assessments done', value: '400+' },
      ],
    },
  },
  candidate: {
    choice: 'I’m Looking for a Job',
    switchLabel: 'Job Seeker',
    announcement: 'Job seeker view selected.',
    hero: {
      title: ['Your next role', 'starts here.'],
      description: 'Roles across IT, BFSI, healthcare, sales and more, hired for by teams across India.',
      primary: { text: 'Browse jobs', href: '#jobs' },
      secondary: { text: 'Upload your CV', href: contactHref('candidate', undefined, true) },
      directoryLabel: 'Job seeker resources',
      links: [
        { text: 'Roles we recruit for', href: '#jobs' },
        { text: 'What to expect as a candidate', href: '#process' },
        { text: 'Contact the recruitment team', href: contactHref('candidate') },
      ],
    },
    benefits: {
      title: 'For candidates',
      link: { text: 'Explore roles', href: '#jobs' },
      items: [
        { icon: 'BriefcaseBusiness', text: 'Discuss salary, location and work setup before interviewing' },
        { icon: 'FileText', text: 'Get CV and interview preparation guidance' },
        { icon: 'MessageCircle', text: 'Ask about the role and interview stages' },
        { icon: 'Zap', text: 'Hear back when the hiring team shares feedback' },
      ],
    },
    process: {
      title: 'How it works for candidates',
      steps: [
        { title: 'Share your CV', text: 'Tell us your experience, target role and preferred work locations.', icon: 'FileText' },
        { title: 'Discuss the role', text: 'Talk through the responsibilities, salary range and working arrangement.', icon: 'MessageCircle' },
        { title: 'Prepare', text: 'Review the interview format and what the hiring team will assess.', icon: 'ClipboardList' },
        { title: 'Interview', text: 'Meet the hiring team and get an update when feedback is available.', icon: 'UsersRound' },
        { title: 'Review the offer', text: 'Confirm the terms, notice period and start date before deciding.', icon: 'Handshake' },
      ],
    },
    testimonials: {
      title: 'From placed candidates',
      // TODO(client): Add placement testimonials with the candidates' approval.
      items: [] as readonly CandidateTestimonial[],
    },
  },
} as const;

export const sectionOrder = {
  employer: ['hero', 'services', 'process', 'stats', 'industries', 'estimator', 'benefits', 'about', 'jobs', 'testimonials', 'guides', 'faq', 'contact'],
  candidate: ['hero', 'jobs', 'benefits', 'process', 'testimonials', 'industries', 'services', 'guides', 'about', 'stats', 'estimator', 'faq', 'contact'],
} as const;

export type HomeSection = (typeof sectionOrder.employer)[number];
