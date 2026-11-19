import type { Metadata } from 'next';
import { ResourcePage } from '@/components/ResourcePage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { content } from '@/data/content';
import { services } from '@/data/services';
import { contactHref } from '@/data/site';

export const metadata: Metadata = {
  title: content.pages.services, description: content.pages.servicesDetail, alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <ResourcePage title={content.pages.services} description={content.pages.servicesDetail}>
    <div className="resource-grid">
      {services.map(item => <div key={item.id} id={item.id}><Card className="resource-card">
        <span className="icon-box"><Icon name={item.icon} /></span>
        <h2>{item.title}</h2><p>{item.detail}</p>
        <Button href={contactHref('employer', item.title)} variant="outline" label={content.pages.serviceCta + ' · ' + item.title}>{content.pages.serviceCta}</Button>
      </Card></div>)}
    </div>
  </ResourcePage>;
}
