// TODO(client): Calibrate these indicative working-day ranges using actual searches.
export const estimator = {
  title: 'Shortlist time estimator',
  roleLabel: 'Role type', industryLabel: 'Industry',
  resultLabel: 'Indicative time to first shortlist', units: 'working days',
  note: 'Illustrative range. We confirm the timeline after reviewing the role and screening requirements.',
  roles: [
    { id: 'specialist', text: 'Specialist / mid-level', days: [4, 7] },
    { id: 'volume', text: 'Volume / entry-level', days: [3, 5] },
    { id: 'executive', text: 'Executive / leadership', days: [10, 16] },
    { id: 'contract', text: 'Contract-to-hire', days: [5, 8] },
  ],
  industryOffsets: {
    'it-software': 1, bfsi: 2, 'healthcare-pharma': 3, manufacturing: 2,
    'retail-ecommerce': 0, telecom: 1, logistics: 0, 'real-estate': 1, education: 1, startups: 0,
  },
} as const;
