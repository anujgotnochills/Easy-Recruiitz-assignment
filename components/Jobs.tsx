import { content } from '@/data/content';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';
import { JobBoard } from './JobBoard';

export function Jobs() {
  const { jobs } = content;
  return <section id="jobs" className="panel jobs-panel" aria-labelledby="jobs-title">
    <Reveal className="heading-row">
      <Heading id="jobs-title" {...jobs} />
      <Button href="/jobs" variant="outline">{jobs.link}</Button>
    </Reveal>
    <JobBoard />
  </section>;
}
