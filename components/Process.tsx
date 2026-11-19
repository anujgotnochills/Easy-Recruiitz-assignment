import { audienceCopy, audienceModes } from '@/data/audience';
import { Heading } from './ui/Heading';
import { Icon } from './ui/Icon';
import { ProgressTrack } from './ProgressTrack';
import { Reveal } from './ui/Reveal';

export function Process() {
  return <section id="process" className="panel process-panel" aria-labelledby="process-title">
    <Reveal><Heading id="process-title" title={audienceModes.map(mode =>
      <span key={mode} data-audience-copy={mode}>{audienceCopy[mode].process.title}</span>)} /></Reveal>
    <ProgressTrack>
      <ol className="process-list">
        {audienceCopy.employer.process.steps.map((step, index) => <li key={step.title}>
          <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <Reveal className="step-wrap" delay={index * 65}>
            <div className="step-card card">
              {audienceModes.map(mode => {
                const copy = audienceCopy[mode].process.steps[index];
                return <div key={mode} className="step-copy" data-audience-copy={mode}>
                  <Icon name={copy.icon} size={22} /><h3>{copy.title}</h3><p>{copy.text}</p>
                </div>;
              })}
            </div>
          </Reveal>
        </li>)}
      </ol>
    </ProgressTrack>
  </section>;
}
