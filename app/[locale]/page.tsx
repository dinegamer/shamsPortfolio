import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { MorphStrip } from '@/components/sections/morph';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Stack } from '@/components/sections/stack';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chamsoudine THIENTA',
  alternateName: 'Shams',
  url: 'https://shamsi-dev.vercel.app',
  jobTitle: 'Software Engineer & Data Analyst',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bamako',
    addressCountry: 'Mali'
  },
  sameAs: [
    'https://github.com/dinegamer',
    'https://www.linkedin.com/in/chamsoudine-thienta-146b21183'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Shamsi Digital',
    url: 'https://shamsi-dev.vercel.app'
  }
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="relative" id="content">
        <Navbar />
        <Hero />
        <MorphStrip />
        <Projects />
        <About />
        <Services />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
