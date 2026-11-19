import { ArrowUpRight } from 'lucide-react';
import { content } from '@/data/content';
import { insights } from '@/data/insights';
import { Card } from './ui/Card';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';

export function Insights() {
  return <section id="insights" className="panel insights-panel" aria-labelledby="insights-title">
    <Reveal><Heading id="insights-title" {...content.insights} /></Reveal>
    <div className="insight-grid">
      {insights.map((item, index) => <Reveal key={item.id} delay={index * 65}>
        <Card className="insight-card">
          <div className="insight-body">
            <p className="insight-meta">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
            <a className="insight-link" href={'/insights/' + item.id} aria-label={content.insights.link + ' · ' + item.title}>{content.insights.link}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </Card>
      </Reveal>)}
    </div>
  </section>;
}
