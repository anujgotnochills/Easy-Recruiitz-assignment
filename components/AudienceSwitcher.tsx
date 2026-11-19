'use client';

import { m } from 'framer-motion';
import { Briefcase, User } from 'lucide-react';
import { useAudience } from '@/context/AudienceProvider';
import { audienceCopy, audienceModes, entryCopy } from '@/data/audience';
import type { Audience } from '@/data/site';

const icons: Record<Audience, typeof Briefcase> = {
  employer: Briefcase,
  candidate: User,
};

export function AudienceSwitcher() {
  const { mode, setMode } = useAudience();

  return (
    <div
      className={`audience-switcher audience-switcher--${mode}`}
      role="radiogroup"
      aria-label={entryCopy.modeControl}
    >
      {audienceModes.map(option => {
        const Icon = icons[option];
        const active = mode === option;
        return (
          <button
            type="button"
            key={option}
            role="radio"
            data-mode={option}
            aria-checked={active}
            className={`audience-switcher-btn ${active ? 'is-active' : ''}`}
            onClick={() => setMode(option)}
          >
            {active && (
              <m.span
                layoutId="audience-switcher-indicator"
                className="audience-switcher-indicator"
                transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              />
            )}
            <Icon size={14} className="switcher-icon" aria-hidden="true" />
            <span className="switcher-label">{audienceCopy[option].switchLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
