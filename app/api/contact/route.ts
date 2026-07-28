import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const recipient = 'teenagerdine@gmail.com';
const allowedReasons = new Set([
  'recruitment',
  'project',
  'kalansup',
  'partnership',
  'other'
]);
const requestWindowMs = 60_000;
const maxRequestsPerWindow = 3;
const requestsByIp = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  reason?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  locale?: unknown;
  startedAt?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string'
    ? value.trim().replace(/\0/g, '').slice(0, maxLength)
    : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    const originHostname = new URL(origin).hostname;
    const requestHostname = request.nextUrl.hostname;
    return (
      originHostname === requestHostname ||
      originHostname === 'shamsi-dev.vercel.app' ||
      originHostname === 'localhost' ||
      originHostname === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < requestWindowMs
  );

  if (recent.length === 0) {
    requestsByIp.delete(ip);
  }
  recent.push(now);
  requestsByIp.set(ip, recent);

  if (requestsByIp.size > 5_000) {
    for (const [storedIp, timestamps] of requestsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= requestWindowMs)) {
        requestsByIp.delete(storedIp);
      }
    }
  }

  return recent.length > maxRequestsPerWindow;
}

function responseError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return responseError('Invalid request origin.', 403);
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return responseError('Too many requests. Please try again shortly.', 429);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return responseError('Invalid request.', 400);
  }

  if (clean(payload.website, 120)) {
    return NextResponse.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const startedAt =
    typeof payload.startedAt === 'number' ? payload.startedAt : Number.NaN;
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(elapsed) || elapsed < 2_500 || elapsed > 7_200_000) {
    return responseError('Please review the form and try again.', 400);
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160).toLowerCase();
  const organization = clean(payload.organization, 120);
  const reason = clean(payload.reason, 40);
  const subject = clean(payload.subject, 120);
  const message = clean(payload.message, 3000);
  const locale = payload.locale === 'en' ? 'en' : 'fr';

  if (
    name.length < 2 ||
    !validEmail(email) ||
    !allowedReasons.has(reason) ||
    subject.length < 3 ||
    message.length < 20
  ) {
    return responseError('Please complete all required fields correctly.', 400);
  }

  let formSubmitResponse: Response;
  try {
    formSubmitResponse = await fetch(
      `https://formsubmit.co/ajax/${recipient}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          organization: organization || 'Not provided',
          reason,
          subject,
          message,
          language: locale,
          _replyto: email,
          _subject: `[Portfolio] ${subject}`,
          _template: 'table',
          _url: `https://shamsi-dev.vercel.app/${locale}#contact`
        }),
        cache: 'no-store'
      }
    );
  } catch {
    return responseError('Message delivery is temporarily unavailable.', 502);
  }

  if (!formSubmitResponse.ok) {
    return responseError('Message delivery is temporarily unavailable.', 502);
  }

  const result = (await formSubmitResponse.json()) as {
    success?: boolean | string;
  };
  if (result.success === false || result.success === 'false') {
    return responseError('Message delivery is temporarily unavailable.', 502);
  }

  return NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
