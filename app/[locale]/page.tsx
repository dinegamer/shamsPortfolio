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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <main className="relative" id="content" tabIndex={-1}>
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
