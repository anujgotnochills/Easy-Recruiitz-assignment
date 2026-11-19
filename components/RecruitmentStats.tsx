import { audienceCopy } from '@/data/audience';
import { Heading } from './ui/Heading';

export function RecruitmentStats() {
  const { stats } = audienceCopy.employer;
  return <section className="panel recruitment-stats" aria-labelledby="stats-title">
    <Heading id="stats-title" title={stats.title} />
    <dl>
      {stats.items.map(item => <div key={item.label}>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>)}
    </dl>
  </section>;
}
