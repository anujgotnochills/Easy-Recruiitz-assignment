export const BRAND = 'Easy Recruitz';
export const SHOW_ENTRY_GATE = true;

const neighbourhood = 'Jasola';
const office = {
  streetAddress: 'Unit No. 517, DLF Tower B, 5th Floor, District Centre, ' + neighbourhood,
  addressLocality: 'New Delhi',
  addressRegion: 'Delhi',
  postalCode: '110025',
  addressCountry: 'IN',
};
const phone = '+91 98998 88834';
const phoneDigits = phone.replace(/\D/g, '');

export const site = {
  // TODO(client): Confirm the canonical domain on launch.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://easyrecruiitz.com').replace(/\/+$/, ''),
  title: BRAND + ' | Recruitment & Staffing Agency in Delhi NCR',
  description: BRAND + ' is a recruitment agency in Delhi NCR offering executive search, IT recruitment, contract-to-hire staffing and bulk hiring across India.',
  phone,
  phoneHref: 'tel:+' + phoneDigits,
  email: 'staffing@easyrecruitz.com',
  address: office.streetAddress + ', ' + office.addressLocality + ' ' + office.postalCode,
  office,
  neighbourhood,
  whatsapp: 'https://wa.me/' + phoneDigits,
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/easyrecruiitz365/' },
    { name: 'X', href: 'https://x.com/EasyRecruitz' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/easy-recruitz' },
  ],
  // TODO(client): Replace approximate Jasola coordinates with the verified office pin.
  geo: { latitude: 28.543, longitude: 77.289 },
} as const;

export const nav = [
  { text: 'Services', href: '/#services' }, { text: 'Industries', href: '/#industries' },
  { text: 'Hiring process', href: '/#process' }, { text: 'Roles', href: '/#jobs' },
  { text: 'Insights', href: '/#insights' }, { text: 'About', href: '/#about' },
];

export type Audience = 'employer' | 'candidate';

export const common = {
  skip: 'Skip to content', hire: 'Hire talent', find: 'Explore roles',
  home: 'Home', directions: 'Open in Google Maps',
  whatsapp: 'Chat with ' + BRAND + ' on WhatsApp', top: 'Back to top',
  privacy: 'Privacy Policy', terms: 'Terms',
} as const;

export const contactHref = (audience: Audience = 'employer', subject?: string, cv = false) =>
  '/?audience=' + audience + (subject ? '&role=' + encodeURIComponent(subject) : '') +
  (cv ? '&cv=1' : '') + '#contact';
