import { expect, test } from '@playwright/test';

const labels = {
  fr: ['Maintenance informatique et support au Mali', 'Création et refonte de sites web', 'Développement et reprise d’applications', 'Conseil informatique et audit SI'],
  en: ['IT maintenance and support in Mali', 'Website design and redevelopment', 'Application development and recovery', 'IT consulting and systems audits']
} as const;

for (const locale of ['fr', 'en'] as const) {
  test(`${locale}: business service page is legible without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
    try {
      const page = await context.newPage();
      await page.goto(`http://localhost:3000/${locale}/shamsi-digital`);
      for (const label of labels[locale]) await expect(page.getByRole('heading', { name: label, exact: true })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://shamsi-dev.vercel.app/${locale}/shamsi-digital`);
      await expect(page.getByRole('link', { name: labels[locale][0] })).toHaveAttribute('href', `/${locale}/shamsi-digital?service=maintenance#contact`);
      await expect(page.getByRole('link', { name: labels[locale][2] })).toHaveAttribute('href', `/${locale}/services/developpement-application-mali`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    } finally {
      await context.close();
    }
  });

  test(`${locale}: on-site service enquiry selects maintenance without submitting`, async ({ page }) => {
    await page.goto(`/${locale}/shamsi-digital`);
    await page.getByRole('link', { name: labels[locale][0] }).click();
    await expect(page.locator('#contact-service')).toHaveValue('maintenance');
  });
}
