'use client';

import { FormEvent, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  ShieldCheck
} from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const formSubmitEndpoint =
  'https://formsubmit.co/3bc2588a7c30e68047d52b720455e7bb';
const minimumCompletionTime = 2_500;
const submissionCooldown = 60_000;
const lastSubmissionKey = 'shams-portfolio-contact-last-submission';

export function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const submissionStarted = useRef(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload._honey) {
      form.reset();
      setStatus('success');
      return;
    }

    if (Date.now() - startedAt.current < minimumCompletionTime) {
      setError(t('errors.tooFast'));
      setStatus('error');
      return;
    }

    const lastSubmission = Number(
      window.localStorage.getItem(lastSubmissionKey) ?? 0
    );
    if (Date.now() - lastSubmission < submissionCooldown) {
      setError(t('errors.wait'));
      setStatus('error');
      return;
    }

    const generatedFields = {
      _replyto: String(payload.email),
      _subject: `[Portfolio] ${String(payload.subject)}`,
      _template: 'table',
      _captcha: 'false',
      _url: `https://shamsi-dev.vercel.app/${locale}#contact`,
      language: locale
    };

    for (const [name, value] of Object.entries(generatedFields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      input.dataset.contactGenerated = 'true';
      form.appendChild(input);
    }

    submissionStarted.current = true;
    setStatus('sending');
    form.submit();
  }

  function handleSubmissionFrameLoad() {
    if (!submissionStarted.current) return;
    submissionStarted.current = false;

    const form = formRef.current;
    form?.reset();
    form
      ?.querySelectorAll('[data-contact-generated="true"]')
      .forEach((field) => field.remove());
    startedAt.current = Date.now();
    window.localStorage.setItem(lastSubmissionKey, String(Date.now()));
    setStatus('success');
  }

  return (
    <section id="contact" className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-400">
                {t('kicker')}
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                {t('title')}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">
                {t('body')}
              </p>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-brand-400/15 bg-brand-400/[0.05] p-4">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-400"
                />
                <p className="text-sm leading-relaxed text-white/65">
                  {t('privacy')}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:teenagerdine@gmail.com"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-brand-400/50 hover:bg-white/10"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  {t('email')}
                </a>
                <a
                  href="https://github.com/dinegamer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 p-3 text-white transition hover:border-brand-400/50 hover:bg-white/10"
                >
                  <Github aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/chamsoudine-thienta-146b21183"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 p-3 text-white transition hover:border-brand-400/50 hover:bg-white/10"
                >
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {status === 'success' ? (
                <div
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">
                    {t('success.title')}
                  </h3>
                  <p className="mt-3 max-w-md text-white/65">
                    {t('success.body')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-7 min-h-11 rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-brand-400/50 hover:bg-white/10"
                  >
                    {t('success.again')}
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  action={formSubmitEndpoint}
                  method="POST"
                  target="contact-submission-target"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label={t('fields.name')} htmlFor="contact-name">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        className="contact-input"
                        placeholder={t('placeholders.name')}
                      />
                    </FormField>
                    <FormField label={t('fields.email')} htmlFor="contact-email">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={160}
                        className="contact-input"
                        placeholder={t('placeholders.email')}
                      />
                    </FormField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      label={t('fields.organization')}
                      htmlFor="contact-organization"
                      optional={t('optional')}
                    >
                      <input
                        id="contact-organization"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        maxLength={120}
                        className="contact-input"
                        placeholder={t('placeholders.organization')}
                      />
                    </FormField>
                    <FormField label={t('fields.reason')} htmlFor="contact-reason">
                      <select
                        id="contact-reason"
                        name="reason"
                        required
                        defaultValue=""
                        className="contact-input"
                      >
                        <option value="" disabled>
                          {t('placeholders.reason')}
                        </option>
                        <option value="recruitment">
                          {t('reasons.recruitment')}
                        </option>
                        <option value="project">{t('reasons.project')}</option>
                        <option value="kalansup">{t('reasons.kalansup')}</option>
                        <option value="partnership">
                          {t('reasons.partnership')}
                        </option>
                        <option value="other">{t('reasons.other')}</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label={t('fields.subject')} htmlFor="contact-subject">
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      minLength={3}
                      maxLength={120}
                      className="contact-input"
                      placeholder={t('placeholders.subject')}
                    />
                  </FormField>

                  <FormField label={t('fields.message')} htmlFor="contact-message">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={6}
                      className="contact-input resize-y"
                      placeholder={t('placeholders.message')}
                    />
                  </FormField>

                  <div
                    className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="_honey"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === 'error' && (
                    <p
                      className="rounded-lg border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-brand-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin"
                        />
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        {t('submit')}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
              <iframe
                name="contact-submission-target"
                title={t('submissionFrameTitle')}
                onLoad={handleSubmissionFrameLoad}
                className="hidden"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  optional,
  children
}: {
  label: string;
  htmlFor: string;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center justify-between text-sm font-medium text-white/80"
      >
        <span>{label}</span>
        {optional && (
          <span className="text-xs font-normal text-white/40">{optional}</span>
        )}
      </label>
      {children}
    </div>
  );
}
