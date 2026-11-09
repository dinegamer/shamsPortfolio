'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { ContactActions } from '@/components/contact-actions';
import { contactServices, isContactService, readContactContext } from '@/lib/contact-options';
import { getLeadAttribution } from '@/lib/lead-attribution';
import { formSubmitEndpoint, SubmissionError, submissionTimeout, submitContact } from '@/lib/contact-submission';
import { contactLocaleChangeEvent, saveContactDraft, takeContactDraft } from '@/lib/contact-draft';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
const lastSubmissionKey = 'shams-portfolio-contact-last-submission';

export function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const serviceEdited = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const [project, setProject] = useState('');

  useEffect(() => {
    mounted.current = true;
    const context = readContactContext(window.location.search);
    const draft = takeContactDraft(window.location.pathname);
    if (draft && formRef.current) {
      for (const name of ['name', 'email', 'organization', 'message'] as const) {
        const field = formRef.current.elements.namedItem(name);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.value = draft[name];
      }
      serviceEdited.current = true;
      setService(draft.service);
      startedAt.current = draft.startedAt;
    } else if (!serviceEdited.current) setService(context.service);
    setProject(draft?.project ?? context.project);
    getLeadAttribution();
    const preserveDraft = (event: Event) => {
      // Do not interrupt an in-flight submission or make its outcome uncertain.
      if (inFlight.current) { event.preventDefault(); return; }
      const form = formRef.current;
      const pathname = (event as CustomEvent<{ pathname: string }>).detail?.pathname;
      if (!form || !pathname) return;
      const data = new FormData(form);
      const value = (key: string) => String(data.get(key) ?? '');
      saveContactDraft(pathname, {
        name: value('name'), email: value('email'), organization: value('organization'),
        message: value('message'), service: isContactService(value('service')) ? value('service') : '',
        project: draft?.project ?? context.project, startedAt: startedAt.current
      });
    };
    window.addEventListener(contactLocaleChangeEvent, preserveDraft);
    return () => {
      window.removeEventListener(contactLocaleChangeEvent, preserveDraft);
      mounted.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setError('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    if (value('_honey') || !value('name') || !value('message')) {
      setError(t('errors.invalid')); setStatus('error'); return;
    }
    if (Date.now() - startedAt.current < 2_500) {
      setError(t('errors.tooFast')); setStatus('error'); return;
    }
    try {
      const last = Number(window.localStorage.getItem(lastSubmissionKey) ?? 0);
      if (Date.now() - last < 60_000) {
        setError(t('errors.wait')); setStatus('error'); return;
      }
    } catch { /* Private browsing must not block an enquiry. */ }
    const selected = isContactService(value('service')) ? value('service') : '';
    const serviceLabel = selected ? t(`services.${selected}`) : t('services.other');
    const payload = {
      name: value('name'), email: value('email'), organization: value('organization'),
      message: value('message'), service: selected, service_label: serviceLabel,
      project, language: locale, ...getLeadAttribution(),
      _replyto: value('email'),
      _subject: `[SHAMSI DIGITAL] ${locale === 'fr' ? 'Demande de devis' : 'Quote enquiry'} — ${serviceLabel}`,
      _template: 'table', _captcha: 'false', _honey: '',
      _url: `https://shamsi-dev.vercel.app${window.location.pathname}`
    };
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), submissionTimeout);
    inFlight.current = true;
    setStatus('sending');
    try {
      await submitContact(payload, controller.signal);
      if (!mounted.current) return;
      try { window.localStorage.setItem(lastSubmissionKey, String(Date.now())); } catch { /* Optional cooldown. */ }
      form.reset();
      setStatus('success');
    } catch (cause) {
      if (!mounted.current) return;
      const errorKey = cause instanceof SubmissionError && cause.kind === 'rejected'
        ? 'errors.generic'
        : cause instanceof SubmissionError && cause.kind === 'timeout' ? 'errors.timeout' : 'errors.unconfirmed';
      setError(t(errorKey));
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
      controllerRef.current = null;
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 bg-black py-24 md:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="min-w-0 border-b border-white/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-400">{t('kicker')}</p>
              <h2 id="contact-title" className="text-3xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">{t('body')}</p>
              <div className="mt-8"><ContactActions /></div>
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-brand-400/15 bg-brand-400/[0.05] p-4">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-sm leading-relaxed text-white/65">{t('privacy')}{' '}
                  <a href={`/${locale}/mentions-legales#confidentialite`} className="underline hover:text-white">{t('privacyLink')}</a>
                </p>
              </div>
            </div>
            <div className="min-w-0 p-6 md:p-10">
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                  <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-emerald-300" />
                  <h3 className="mt-5 text-2xl font-semibold">{t('success.title')}</h3>
                  <p className="mt-3 max-w-md text-white/65">{t('success.body')}</p>
                  <button type="button" onClick={() => { startedAt.current = Date.now(); setStatus('idle'); }} className="mt-7 min-h-11 rounded-full border border-white/15 px-6 py-3 text-sm font-medium hover:bg-white/10">{t('success.again')}</button>
                </div>
              ) : (
                <form ref={formRef} action={formSubmitEndpoint} method="POST" onSubmit={handleSubmit} aria-label={t('formLabel')} aria-busy={status === 'sending'} className="space-y-5">
                  <fieldset disabled={status === 'sending'} className="space-y-5">
                  <p className="text-sm text-white/65">{t('requiredHint')}</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label={t('fields.name')} htmlFor="contact-name">
                      <input id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={80} className="contact-input" placeholder={t('placeholders.name')} />
                    </FormField>
                    <FormField label={t('fields.email')} htmlFor="contact-email">
                      <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={160} className="contact-input" placeholder={t('placeholders.email')} />
                    </FormField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label={t('fields.organization')} htmlFor="contact-organization" optional={t('optional')}>
                      <input id="contact-organization" name="organization" type="text" autoComplete="organization" maxLength={120} className="contact-input" placeholder={t('placeholders.organization')} />
                    </FormField>
                    <FormField label={t('fields.service')} htmlFor="contact-service" optional={t('optional')}>
                      <select id="contact-service" name="service" value={service} onChange={event => { serviceEdited.current = true; setService(event.target.value); }} className="contact-input">
                        <option value="">{t('placeholders.service')}</option>
                        {contactServices.map(item => <option key={item} value={item}>{t(`services.${item}`)}</option>)}
                      </select>
                    </FormField>
                  </div>
                  <FormField label={t('fields.message')} htmlFor="contact-message">
                    <p id="contact-message-help" className="mb-3 text-sm leading-relaxed text-slate-300">{t('messageHelp')}</p>
                    <textarea id="contact-message" name="message" required maxLength={3000} rows={5} className="contact-input resize-y" aria-describedby="contact-message-help" />
                  </FormField>
                  <input type="hidden" name="_subject" value="[SHAMSI DIGITAL] Contact" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  {status === 'error' ? <p role="alert" className="text-sm leading-relaxed text-amber-300">{error}</p> : null}
                  <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-black transition hover:bg-brand-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                    {status === 'sending' ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
                    {status === 'sending' ? t('sending') : t('submit')}
                  </button>
                  {status === 'sending' ? <p aria-live="polite" className="text-sm text-white/65">{t('pending')}</p> : null}
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, htmlFor, optional, children }: { label: string; htmlFor: string; optional?: string; children: React.ReactNode }) {
  return <div><label htmlFor={htmlFor} className="mb-2 flex flex-wrap items-center justify-between gap-1 text-sm font-medium text-white/85">{label}{optional ? <span className="text-xs font-normal text-white/45">{optional}</span> : null}</label>{children}</div>;
}
