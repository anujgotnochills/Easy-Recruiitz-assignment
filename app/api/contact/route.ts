import { NextResponse } from 'next/server';
import { maxCvBytes, readContact, validateContact } from '@/lib/validation';

const reply = (status: number, body: { ok?: boolean; errors?: ReturnType<typeof validateContact> }) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const type = request.headers.get('content-type') ?? '';
  const isForm = type.startsWith('multipart/form-data');
  if (!isForm && !type.startsWith('application/json')) return reply(415, { ok: false });

  const limit = isForm ? maxCvBytes + 32 * 1024 : 32 * 1024;
  if (Number(request.headers.get('content-length')) > limit || !request.body) return reply(413, { ok: false });

  let raw: unknown;
  try {
    // Enforce the same bound when a client omits Content-Length.
    let size = 0;
    const bounded = request.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        size += chunk.byteLength;
        if (size > limit) throw new RangeError('Request too large');
        controller.enqueue(chunk);
      },
    }));
    const body = new Response(bounded, { headers: { 'Content-Type': type } });
    raw = isForm ? Object.fromEntries(await body.formData()) : await body.json();
  } catch (error) {
    return reply(error instanceof RangeError ? 413 : 400, { ok: false });
  }

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return reply(400, { ok: false });
  const data = raw as Record<string, unknown>;
  if (typeof data.website === 'string' && data.website.trim()) return reply(200, { ok: true });

  const input = readContact(data);
  if (!input) return reply(400, { ok: false });
  const errors = validateContact(input);
  if (Object.keys(errors).length) return reply(422, { ok: false, errors });

  // TODO(client): Send validated enquiries to the approved email/CRM and use approved CV storage.
  // Record submission events without exposing contact details, messages or résumé contents in logs.
  console.info('Contact enquiry validated', { audience: input.audience, hasCv: Boolean(input.cv) });
  return reply(200, { ok: true });
}
