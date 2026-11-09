'use client';

export const contactLocaleChangeEvent = 'shamsi:contact-locale-change';

export type ContactDraft = {
  name: string;
  email: string;
  organization: string;
  message: string;
  service: string;
  project: string;
  startedAt: number;
};

// A one-use handover for client-side language navigation, never browser storage
// or a server-side draft. Only event handlers and effects access this value.
let pendingDraft: { pathname: string; savedAt: number; values: ContactDraft } | null = null;

export function saveContactDraft(pathname: string, values: ContactDraft) {
  pendingDraft = { pathname, savedAt: Date.now(), values };
}

export function takeContactDraft(pathname: string) {
  const draft = pendingDraft;
  pendingDraft = null;
  return draft?.pathname === pathname && Date.now() - draft.savedAt < 60_000
    ? draft.values : null;
}
