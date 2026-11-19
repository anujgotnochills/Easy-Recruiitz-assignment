import { BRAND } from './site';

// TODO(client): Obtain approved privacy and terms copy before publishing.
export const legal = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'The enquiry form collects the name, email address, phone number, message and any company name you provide. Candidates may optionally select a CV. During this preview, the server validates these fields, records a submission event and discards the CV. The enquiry is not forwarded to a recruiter.',
      'The Google Maps embed can send technical information to Google when loaded. WhatsApp is governed by its own privacy terms.',
      'For questions about how ' + BRAND + ' handles information, use the contact email below.',
    ],
  },
  terms: {
    title: 'Terms',
    paragraphs: [
      'The role examples describe the types of work we recruit for. For current opportunities, contact the recruitment team.',
      'Shortlist estimates are for planning. The details of recruitment services, placement terms and any replacement support are agreed in writing for each engagement.',
    ],
  },
} as const;
