import type { Audience } from '@/data/site';
import { content } from '@/data/content';

export const maxCvBytes = 4 * 1024 * 1024;
export type ContactField = 'name' | 'email' | 'phone' | 'company' | 'message' | 'consent' | 'cv';
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactInput = {
  audience: Audience; name: string; email: string; phone: string; company: string;
  message: string; consent: boolean; website: string; cv?: File;
};

const value = (data: Record<string, unknown>, key: string) =>
  typeof data[key] === 'string' ? data[key].trim() : '';

export function readContact(data: Record<string, unknown>): ContactInput | null {
  if (data.audience !== 'employer' && data.audience !== 'candidate') return null;
  const cv = data.cv instanceof File && data.cv.size > 0 ? data.cv : undefined;

  return {
    audience: data.audience, name: value(data, 'name'), email: value(data, 'email'),
    phone: value(data, 'phone'), company: data.audience === 'employer' ? value(data, 'company') : '',
    message: value(data, 'message'), consent: data.consent === true || data.consent === 'on',
    website: value(data, 'website'), cv,
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const messages = content.contact.errors;
  if (input.name.length < 2 || input.name.length > 100) errors.name = messages.name;
  if (input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = messages.email;
  const digits = input.phone.replace(/\D/g, '');
  if (!/^\+?[\d ()-]+$/.test(input.phone) || digits.length < 7 || digits.length > 15) errors.phone = messages.phone;
  if (input.audience === 'employer' && (input.company.length < 2 || input.company.length > 150)) errors.company = messages.company;
  if (input.message.length < 10 || input.message.length > 2000) errors.message = messages.message;
  if (!input.consent) errors.consent = messages.consent;
  if (input.cv && (input.audience !== 'candidate' || input.cv.size > maxCvBytes || !/\.(pdf|docx?)$/i.test(input.cv.name))) {
    errors.cv = messages.cv;
  }
  return errors;
}
