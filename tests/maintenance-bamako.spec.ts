import { expect, test } from '@playwright/test';

const route = '/fr/services/maintenance-informatique-bamako';
const canonical = `https://shamsi-dev.vercel.app${route}`;

test('French maintenance route is discoverable without a non-existent English alternate', async ({ page, request }) => {
  const response = await page.goto(route);
  expect(response?.status()).toBe(200);
  expect(response?.headers()['link'] ?? '').not.toContain('hreflang');
  await expect(page).toHaveTitle('Maintenance informatique à Bamako pour PME et ONG | SHAMSI Digital');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Maintenance informatique à Bamako pour PME et ONG');
  await expect(page.getByRole('link', { name: 'reprise d’application à Bamako' })).toHaveAttribute('href', '/fr/services/developpement-application-mali');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain(`<loc>${canonical}</loc>`);
  expect(xml).not.toMatch(/\/en\/services\/maintenance-informatique-bamako/);
  for (const source of ['/fr', '/fr/shamsi-digital']) {
    await page.goto(source);
    await expect(page.getByRole('link', { name: 'Maintenance informatique à Bamako', exact: true })).toHaveAttribute('href', route);
  }
});

test('mobile contact button selects maintenance without sending and English switch has a real destination', async ({ page }) => {
  await page.route('https://formsubmit.co/**', route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.getByRole('link', { name: 'Décrire votre panne' }).first().click();
  await expect(page).toHaveURL(/shamsi-digital\?service=maintenance#contact$/);
  await expect(page.locator('#contact-service')).toHaveValue('maintenance');
  await page.goto(route);
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en\/shamsi-digital$/);
});
