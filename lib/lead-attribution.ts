const storageKey = 'shamsi-lead-origin-v1';
const googleProfile = { source: 'google', medium: 'organic', campaign: 'gbp' } as const;
const unknownOrigin = { source: 'unknown', medium: '', campaign: '' } as const;

function isGoogleProfile(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const origin = value as Record<string, unknown>;
  return origin.source === 'google' && origin.medium === 'organic' && origin.campaign === 'gbp';
}

// Only the known campaign is retained for this tab; never store form data or arbitrary query strings.
export function getLeadAttribution() {
  if (typeof window === 'undefined') return unknownOrigin;
  const params = new URLSearchParams(window.location.search);
  if (params.get('utm_source') === 'google' && params.get('utm_medium') === 'organic' && params.get('utm_campaign') === 'gbp') {
    try { window.sessionStorage.setItem(storageKey, JSON.stringify(googleProfile)); } catch { /* Storage may be blocked. */ }
    return googleProfile;
  }
  try {
    const saved: unknown = JSON.parse(window.sessionStorage.getItem(storageKey) ?? 'null');
    if (isGoogleProfile(saved)) return googleProfile;
  } catch { /* Missing or unavailable storage must not block contact. */ }
  return unknownOrigin;
}
