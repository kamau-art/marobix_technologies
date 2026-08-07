import { createLead } from '@/lib/db';
import { isValidEmail } from '@/lib/validation';

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await createLead({
      email,
      source: 'newsletter',
    });
  } catch {
    return Response.json(
      { error: 'Could not subscribe right now. Please try again.' },
      { status: 503 }
    );
  }

  return Response.json({ ok: true });
}
