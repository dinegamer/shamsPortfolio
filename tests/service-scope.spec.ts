import { expect, test } from '@playwright/test';

const relevantPaths = [
  '', '/shamsi-digital', '/services/consultant-informatique-bamako',
  '/services/developpement-application-mali', '/services/consultant-si-ong'
];

for (const locale of ['fr', 'en']) {
  test(`${locale}: distinguishes international remote development from local maintenance`, async ({ page }) => {
    for (const path of relevantPaths) {
      await page.goto(`/${locale}${path}`);
      const modes = page.locator('section[aria-labelledby="delivery-modes-title"]');
      await expect(modes).toHaveCount(1);
      await expect(modes.getByRole('heading', { name: locale === 'fr' ? 'Développement à distance' : 'Remote development' })).toBeVisible();
      await expect(modes).toContainText(locale === 'fr' ? 'au Mali et à l’international' : 'in Mali and internationally');
      await expect(modes.getByRole('heading', { name: locale === 'fr' ? 'Maintenance sur site au Mali' : 'On-site maintenance in Mali' })).toBeVisible();
      await expect(modes).toContainText(locale === 'fr' ? 'confirmés avant le devis' : 'confirmed before a quote');
    }
    await page.goto(`/${locale}/services/developpement-application-mali`);
    const service = await page.locator('main script[type="application/ld+json"]').textContent();
    expect(JSON.parse(service ?? '{}').areaServed).toContain('Worldwide (remote development)');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', locale === 'fr' ? /à l’international/ : /internationally/);
  });

  test(`${locale}: NGO reporting package has bounded deliverables and safe enquiry guidance`, async ({ page }) => {
    await page.goto(`/${locale}/services/consultant-si-ong`);
    const pilot = page.locator('section[aria-labelledby="reporting-package-title"]');
    await expect(pilot.getByRole('heading', { level: 2 })).toHaveText(locale === 'fr' ? 'Un premier tableau de bord de reporting' : 'A first reporting dashboard');
    await expect(pilot).toContainText(locale === 'fr' ? 'Un seul processus de reporting' : 'One reporting process');
    await expect(pilot.getByRole('listitem')).toHaveCount(3);
    await expect(pilot).toContainText(locale === 'fr' ? 'cadrage séparé' : 'separate scoping');
    await expect(pilot).toContainText(locale === 'fr' ? 'exemples fictifs ou anonymisés' : 'fictional or anonymized examples');
    await expect(pilot).toContainText(locale === 'fr' ? 'ne transmettez pas de données personnelles de bénéficiaires' : 'do not send beneficiaries’ personal data');
    await expect(page.locator('main')).not.toContainText(locale === 'fr' ? 'sous 24 heures' : 'within 24 hours');
    await pilot.getByRole('link').click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/shamsi-digital\\?service=consultant-si-ong#contact$`));
    await expect(page.locator('#contact-service')).toHaveValue('consultant-si-ong');
    await page.goBack();
    await expect(pilot).toBeVisible();
    await pilot.getByRole('link').click();
    await expect(page.locator('#contact-service')).toHaveValue('consultant-si-ong');
  });

  test(`${locale}: service packages remain usable on a narrow phone`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 812 });
    for (const path of relevantPaths) {
      await page.goto(`/${locale}${path}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    }
    const pilot = page.locator('section[aria-labelledby="reporting-package-title"]');
    await pilot.getByRole('link').click();
    await expect(page.locator('#contact-title')).toBeInViewport();
    await expect(page.locator('#contact-service')).toHaveValue('consultant-si-ong');
  });
}

test('language switching preserves the NGO package and selected enquiry', async ({ page }) => {
  await page.goto('/fr/services/consultant-si-ong');
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en\/services\/consultant-si-ong$/);
  await expect(page.locator('#reporting-package-title')).toHaveText('A first reporting dashboard');
  await page.locator('section[aria-labelledby="reporting-package-title"]').getByRole('link').click();
  await expect(page.locator('#contact-service')).toHaveValue('consultant-si-ong');
  await page.getByRole('link', { name: 'View site in French' }).click();
  await expect(page.locator('#contact-service')).toHaveValue('consultant-si-ong');
});
