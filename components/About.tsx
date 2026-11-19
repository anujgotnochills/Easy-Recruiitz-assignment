import Image from 'next/image';
import hiringPortrait from '@/assets/entry-gate/hiring-white-shirt.png';
import jobPortrait from '@/assets/entry-gate/job-seeker.png';
import { content } from '@/data/content';
import { Button } from './ui/Button';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';

export function About() {
  const { about } = content;
  return <section id="about" className="panel about-panel" aria-labelledby="about-title">
    <Reveal className="about-grid">
      <div className="about-intro"><Heading id="about-title" {...about} />
        <div className="about-people" aria-hidden="true">
          <span><Image src={hiringPortrait} alt="" sizes="220px" /></span>
          <span><Image src={jobPortrait} alt="" sizes="220px" /></span>
        </div>
      </div>
      <div className="about-copy">
        {about.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <Button href="#process" variant="outline" label={about.link + ' about how we recruit'}>{about.link}</Button>
      </div>
    </Reveal>
  </section>;
}
