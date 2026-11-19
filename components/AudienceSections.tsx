'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useAudience } from '@/context/AudienceProvider';
import { sectionOrder, type HomeSection } from '@/data/audience';

export function AudienceSections({ sections }: { sections: Record<HomeSection, ReactNode> }) {
  const { mode } = useAudience();

  return sectionOrder[mode].filter(section => sections[section] !== null).map(section => <div key={section} className="audience-section" data-section={section}
    style={{
      '--employer-order': sectionOrder.employer.indexOf(section),
      '--candidate-order': sectionOrder.candidate.indexOf(section),
    } as CSSProperties}>
    {sections[section]}
  </div>);
}
