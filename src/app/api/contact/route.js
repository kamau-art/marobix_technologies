import { createLead } from '@/lib/db';
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isNonEmpty,
  isHoneypotFilled,
} from '@/lib/validation';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = typeof payload?.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload?.phone === 'string' ? payload.phone.trim() : '';
  const company = typeof payload?.company === 'string' ? payload.company.trim() : '';
  const service = typeof payload?.service === 'string' ? payload.service.trim() : '';
  const budget = typeof payload?.budget === 'string' ? payload.budget.trim() : '';
  const message = typeof payload?.message === 'string' ? payload.message.trim() : '';
  const consent = payload?.consent === true;

  if (isHoneypotFilled(payload?.website)) {
    return Response.json({ ok: true });
  }

  if (!isValidName(name)) {
    return Response.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (phone && !isValidPhone(phone)) {
    return Response.json(
      { error: 'Please enter a valid phone number (e.g. 0712345678 or +254712345678).' },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return Response.json(
      { error: 'Please tell us a little more about your project (min 10 characters).' },
      { status: 400 }
    );
  }
  if (!isNonEmpty(message, 2000)) {
    return Response.json({ error: 'Message must be 2,000 characters or fewer.' }, { status: 400 });
  }
  if (!consent) {
    return Response.json(
      { error: 'Please consent to being contacted about your enquiry.' },
      { status: 400 }
    );
  }

  try {
    await createLead({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      source: 'contact',
    });
  } catch {
    return Response.json(
      { error: 'Could not submit your message right now. Please try again.' },
      { status: 503 }
    );
  }

  return Response.json({ ok: true });
}
