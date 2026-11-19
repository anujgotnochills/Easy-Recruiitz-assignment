import Image from 'next/image';
import jobPortrait from '@/assets/entry-gate/job-seeker.png';
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
      <div className="jobs-heading-side"><span className="jobs-heading-art" aria-hidden="true"><Image src={jobPortrait} alt="" sizes="180px" /></span><Button href="/jobs" variant="outline">{jobs.link}</Button></div>
    </Reveal>
    <JobBoard />
  </section>;
}
