import { content } from '@/data/content';
import { faqs } from '@/data/faqs';
import { Accordion } from './ui/Accordion';
import { Heading } from './ui/Heading';
import { Reveal } from './ui/Reveal';

export function FAQ() {
  return <section id="faq" className="panel faq-panel" aria-labelledby="faq-title">
    <Reveal className="faq-layout">
      <Heading id="faq-title" {...content.faq} />
      <Accordion items={faqs} />
    </Reveal>
  </section>;
}
