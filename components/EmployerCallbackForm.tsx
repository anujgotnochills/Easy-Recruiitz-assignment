'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, BriefcaseBusiness, MapPin, Phone } from 'lucide-react';

const hiringTypes = ['Permanent', 'Contract', 'Bulk'] as const;

export function EmployerCallbackForm() {
  const [hiringType, setHiringType] = useState<(typeof hiringTypes)[number]>('Permanent');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const draft = {
      role: String(data.get('role') ?? '').trim(),
      location: String(data.get('location') ?? '').trim(),
      hiringType,
      callback: String(data.get('callback') ?? '').trim(),
    };
    try { window.sessionStorage.setItem('er:callback-draft', JSON.stringify(draft)); } catch { /* Continue to the contact form. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('audience', 'employer');
    url.searchParams.delete('role');
    url.searchParams.delete('location');
    url.searchParams.delete('hiringType');
    url.searchParams.set('callback', '1');
    url.hash = 'contact';
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <form className="hero-callback" onSubmit={submit} aria-labelledby="hero-callback-title">
    <h2 id="hero-callback-title">Tell us how you’re hiring</h2>
    <p>We’ll call you back with a hiring plan.</p>
    <label className="hero-callback-field">
      <BriefcaseBusiness size={18} aria-hidden="true" />
      <span className="sr-only">Role you’re hiring for</span>
      <input name="role" placeholder="Role you’re hiring for" maxLength={150} required />
    </label>
    <label className="hero-callback-field">
      <MapPin size={18} aria-hidden="true" />
      <span className="sr-only">Location</span>
      <input name="location" placeholder="Location" maxLength={100} required />
    </label>
    <fieldset className="hero-hiring-types">
      <legend className="sr-only">Hiring type</legend>
      {hiringTypes.map(type => <label key={type} className={hiringType === type ? 'is-selected' : undefined}>
        <input type="radio" name="hiringType" value={type} checked={hiringType === type} onChange={() => setHiringType(type)} />
        <span>{type}</span>
      </label>)}
    </fieldset>
    <label className="hero-callback-field">
      <Phone size={18} aria-hidden="true" />
      <span className="sr-only">Phone or email</span>
      <input name="callback" placeholder="Phone or email" maxLength={254} required />
    </label>
    <button type="submit" className="hero-callback-submit">Request a callback <ArrowUpRight size={18} aria-hidden="true" /></button>
  </form>;
}
