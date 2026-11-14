import { expect, test } from '@playwright/test';

const slug = 'developpement-application-mali';
const source = 'https://github.com/dinegamer/shamsPortfolio/commit/1e3c898ccafc9c61e6796e7ffcc37880360fadb8';

for (const locale of ['fr', 'en'] as const) {
  const heading = locale === 'fr'
    ? 'On reprend votre application bloquée et on vous montre ce qui peut être remis en service.'
    : 'We take over your stalled application and show you what can be restored.';
  const whatsappLabel = locale === 'fr' ? 'Décrire mon blocage sur WhatsApp' : 'Describe my issue on WhatsApp';
  const formLabel = locale === 'fr' ? 'Préférer le formulaire' : 'Use the contact form instead';

  test(`${locale}: application recovery is readable without JavaScript and has honest public evidence`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://localhost:3000/${locale}/services/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(page.locator('#application-package-title')).toBeVisible();
    await expect(page.locator('#service-questions-title')).toBeVisible();
    await expect(page.locator('dl dt')).toHaveCount(4);
    const example = page.locator('section[aria-labelledby="service-example-title"]');
    await expect(example).toContainText(locale === 'fr' ? 'notre propre site' : 'our own website');
    await expect(example).toContainText(locale === 'fr' ? 'ne prouvent pas la réception d’un e-mail réel' : 'do not prove delivery of a real email');
    await expect(example.getByRole('link')).toHaveAttribute('href', source);
    const service = JSON.parse(await page.locator('main script[type="application/ld+json"]').textContent() ?? '{}');
    expect(service.name).toBe(heading);
    expect(service.url).toBe(`https://shamsi-dev.vercel.app/${locale}/services/${slug}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', service.url);
    await expect(page.locator('main')).not.toContainText(/ChatGPT|Google rank|classement garanti|100 %/);
    await context.close();
  });

  test(`${locale}: recovery WhatsApp links are prefilled and the form fallback preserves the service`, async ({ page }) => {
    await page.route('https://formsubmit.co/**', route => route.abort());
    await page.goto(`/${locale}/services/${slug}`);
    const ctas = page.getByRole('link', { name: whatsappLabel, exact: true });
    await expect(ctas).toHaveCount(3);
    for (const cta of await ctas.all()) {
      const url = new URL(await cta.getAttribute('href') ?? '');
      expect(url.origin).toBe('https://wa.me');
      expect(url.pathname).toBe('/22373449230');
      expect(url.searchParams.get('text')).toContain(locale === 'fr' ? 'page Reprise d’application' : 'Application recovery page');
      await expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
    }
    // Inspect the WhatsApp destination without opening it or sending a message.
    await page.getByRole('link', { name: formLabel, exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/shamsi-digital\\?service=${slug}#contact$`));
    await expect(page.locator('#contact-service')).toHaveValue(slug);
    await page.goBack();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await page.getByRole('link', { name: formLabel, exact: true }).last().click();
    await expect(page.locator('#contact-service')).toHaveValue(slug);
  });

  test(`${locale}: existing home service link exposes the recovery offer on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 812 });
    await page.goto(`/${locale}`);
    const offer = page.locator(`#services a[href="/${locale}/services/${slug}"]`);
    await expect(offer).toHaveCount(1);
    await expect(offer).toContainText(locale === 'fr' ? 'Application bloquée ?' : 'Application stalled?');
    await offer.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    await expect(page.getByRole('link', { name: whatsappLabel, exact: true }).first()).toBeVisible();
  });
}

test('recovery language switching preserves the route and localizes the offer', async ({ page }) => {
  await page.goto(`/fr/services/${slug}`);
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(`/en/services/${slug}`);
  await expect(page.locator('#application-package-title')).toHaveText('Start with one broken workflow');
  await page.getByRole('link', { name: 'View site in French' }).click();
  await expect(page).toHaveURL(`/fr/services/${slug}`);
  await expect(page.locator('#application-package-title')).toHaveText('Commencer par un seul parcours bloqué');
});
