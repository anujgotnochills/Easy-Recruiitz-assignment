'use client';

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
      <span className="audience-switcher-indicator" aria-hidden="true" />
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
            aria-label={audienceCopy[option].switchLabel}
            className={`audience-switcher-btn ${active ? 'is-active' : ''}`}
            onClick={() => setMode(option)}
          >
            <Icon size={14} className="switcher-icon" aria-hidden="true" />
            <span className="switcher-label">{audienceCopy[option].switchLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
