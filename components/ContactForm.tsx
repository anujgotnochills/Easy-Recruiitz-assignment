'use client';

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import Link from 'next/link';
import { useAudience } from '@/context/AudienceProvider';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { content } from '@/data/content';
import { jobs } from '@/data/jobs';
import type { Audience } from '@/data/site';
import { readContact, validateContact, type ContactErrors, type ContactField } from '@/lib/validation';
import { buttonClass } from './ui/Button';
import { Segment } from './ui/Segment';

const copy = content.contact;
const subscribe = (update: () => void) => {
  window.addEventListener('popstate', update);
  window.addEventListener('hashchange', update);
  return () => {
    window.removeEventListener('popstate', update);
    window.removeEventListener('hashchange', update);
  };
};

export function ContactFormEntry() {
  const { mode } = useAudience();
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => '');
  const params = new URLSearchParams(search);
  const requested = params.get('audience');
  const audience = requested === 'candidate' || requested === 'employer' ? requested : mode;
  const subject = params.get('role')?.slice(0, 150);
  return <ContactForm key={search + audience} start={audience} subject={subject} showCv={params.get('cv') === '1'} />;
}

function ContactForm({ start, subject, showCv }: { start: Audience; subject?: string; showCv: boolean }) {
  const [audience, setAudience] = useState<Audience>(start);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'failed'>('idle');
  const sample = audience === 'candidate' && jobs.some(job => job.title === subject);
  const errorId = (name: ContactField) => 'contact-' + name + '-error';
  const invalid = (name: ContactField, hint?: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': [hint, errors[name] && errorId(name)].filter(Boolean).join(' ') || undefined,
  });
  const fieldError = (name: ContactField) => errors[name] && <span className="field-error" id={errorId(name)}>{errors[name]}</span>;

  const showErrors = (issues: ContactErrors, form: HTMLFormElement) => {
    setErrors(issues);
    const first = Object.keys(issues)[0];
    if (first) requestAnimationFrame(() => form.querySelector<HTMLElement>('[name="' + first + '"]')?.focus());
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('audience', audience);
    const input = readContact(Object.fromEntries(data));
    if (!input) return;
    const issues = validateContact(input);
    setStatus('idle');
    if (Object.keys(issues).length) { showErrors(issues, form); return; }
    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', { method: 'POST', body: data });
      if (response.status === 422) {
        setStatus('idle');
        const result: { errors: ContactErrors } = await response.json();
        showErrors(result.errors, form);
        return;
      }
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('failed');
    }
  };

  return <form className="contact-form" noValidate onSubmit={submit} aria-labelledby="contact-form-title">
    <h3 id="contact-form-title">{copy.intro}</h3>
    <Segment label={copy.audienceLabel} value={audience} disabled={status === 'sending'} onChange={value => { setAudience(value); setErrors({}); setStatus('idle'); }}
      options={[{ value: 'employer', label: copy.audiences.employer }, { value: 'candidate', label: copy.audiences.candidate }]} />
    <fieldset disabled={status === 'sending'} className="contact-fields">
      <div className="form-grid">
        <label>{copy.name}<input name="name" autoComplete="name" maxLength={100} required {...invalid('name')} />{fieldError('name')}</label>
        <label>{copy.email}<input name="email" type="email" autoComplete="email" maxLength={254} required {...invalid('email')} />{fieldError('email')}</label>
        <label>{copy.phone}<input name="phone" type="tel" autoComplete="tel" maxLength={30} required {...invalid('phone')} />{fieldError('phone')}</label>
        {audience === 'employer' && <label>{copy.company}<input name="company" autoComplete="organization" maxLength={150} required {...invalid('company')} />{fieldError('company')}</label>}
        {audience === 'candidate' && <label className={showCv ? 'cv-intent' : undefined}>{copy.cv}
          <input name="cv" type="file" accept=".pdf,.doc,.docx" {...invalid('cv', 'contact-cv-hint')} />
          <small id="contact-cv-hint">{copy.cvHint}</small>{fieldError('cv')}
        </label>}
      </div>
      {sample && <p className="sample-note">{content.jobs.applyNotice}</p>}
      <label>{copy.message}<textarea name="message" rows={4} maxLength={2000} required {...invalid('message')}
        placeholder={audience === 'employer' ? copy.employerHint : copy.candidateHint}
        defaultValue={subject ? (sample ? copy.sampleSubject : copy.employerSubject) + ': ' + subject + '\n' : ''} />
        {fieldError('message')}
      </label>
      <label className="honeypot" aria-hidden="true">{copy.honeypot}<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div>
        <label className="consent"><input name="consent" type="checkbox" required {...invalid('consent')} />{copy.consent}</label>
        {fieldError('consent')}
        <Link className="privacy-link" href="/privacy">{copy.privacy}</Link>
      </div>
      <p className="form-preview">{copy.preview}</p>
      <button className={buttonClass('brand')} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? copy.sending : copy.submit}<ArrowUpRight size={17} aria-hidden="true" className="button-arrow" />
      </button>
    </fieldset>
    <div className="form-status" role="status">
      {status === 'success' && <p className="form-success"><CheckCircle2 size={19} aria-hidden="true" />{copy.success}</p>}
      {status === 'failed' && <p className="field-error">{copy.failure}</p>}
    </div>
  </form>;
}
