import { audienceCopy } from '@/data/audience';
import { Heading } from './ui/Heading';

export function CandidateTestimonials() {
  const { testimonials } = audienceCopy.candidate;

  return <section className="panel candidate-testimonials" aria-labelledby="candidate-testimonials-title">
    <Heading id="candidate-testimonials-title" title={testimonials.title} />
    <ul>
      {testimonials.items.map(item => <li key={item.name + item.placement} className="card">
        <figure>
          <blockquote>{item.quote}</blockquote>
          <figcaption>{item.name} · {item.placement}</figcaption>
        </figure>
      </li>)}
    </ul>
  </section>;
}
