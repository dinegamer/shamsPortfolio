'use client';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="border-t border-white/5 py-10 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/45">{t('rights')}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dinegamer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/chamsoudine-thienta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:teenagerdine@gmail.com"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
