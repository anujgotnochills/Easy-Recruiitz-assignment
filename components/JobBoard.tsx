'use client';

import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { content } from '@/data/content';
import { jobs, jobFilters, type JobFilter } from '@/data/jobs';
import { contactHref } from '@/data/site';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Reveal } from './ui/Reveal';

export function JobBoard() {
  const [filter, setFilter] = useState<JobFilter>('All');
  const reduced = useReducedMotion();
  const shown = jobs.filter(job => filter === 'All' || job.category === filter);
  const copy = content.jobs;

  return <>
    <div className="jobs-toolbar">
      <div className="job-filters" role="group" aria-label={copy.filters}>
        {jobFilters.map(category => <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
      </div>
      <p className="sample-note">{copy.notice}</p>
      <span className="sr-only" role="status">{copy.count(shown.length)}</span>
    </div>
    <div className="job-grid">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map((job, index) => <m.div key={job.id} layout={!reduced ? 'position' : false}
          initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          <Reveal delay={index % 3 * 55} className="job-wrap">
            <Card className="job-card">
              <p className="job-category">{job.category}</p>
              <h3><a href={'/jobs/' + job.id}>{job.title}</a></h3>
              <p className="job-summary">{job.summary}</p>
              <Button href={contactHref('candidate', job.title)} variant="outline" label={copy.apply + ' · ' + job.title}>{copy.apply}</Button>
            </Card>
          </Reveal>
        </m.div>)}
      </AnimatePresence>
    </div>
  </>;
}
