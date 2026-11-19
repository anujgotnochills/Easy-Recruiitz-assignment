import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { content } from '@/data/content';
import { Container } from './ui/Container';

export function ResourcePage({ title, description, children, back = '/', backText = content.pages.home }:
  { title: string; description?: string; children: ReactNode; back?: string; backText?: string }) {
  return <main id="main-content" tabIndex={-1}>
    <Container>
      <section className="panel resource-panel" aria-labelledby="resource-title">
        <a href={back} className="resource-back"><ArrowLeft size={18} aria-hidden="true" />{backText}</a>
        <h1 id="resource-title">{title}</h1>
        {description && <p className="resource-description">{description}</p>}
        <div className="resource-body">{children}</div>
      </section>
    </Container>
  </main>;
}
