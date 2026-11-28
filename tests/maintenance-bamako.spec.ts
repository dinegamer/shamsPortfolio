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
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const services = jsonLd.map((value) => JSON.parse(value)).filter((value) => value['@type'] === 'Service');
  expect(services).toHaveLength(1);
  expect(services[0]).toMatchObject({
    '@id': `${canonical}#service`,
    url: canonical,
    name: 'Maintenance informatique à Bamako pour PME et ONG',
    provider: { '@id': 'https://shamsi-dev.vercel.app/#shamsi-digital' },
    areaServed: { '@type': 'City', name: 'Bamako' }
  });
  expect(services[0]).not.toHaveProperty('offers');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Maintenance informatique à Bamako pour PME et ONG');
  await expect(page.getByRole('link', { name: 'reprise d’application à Bamako' })).toHaveAttribute('href', '/fr/services/developpement-application-mali');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain(`<loc>${canonical}</loc>`);
  expect(xml).not.toMatch(/\/en\/services\/maintenance-informatique-bamako/);
  for (const [source, date] of [
    ['/fr', '2026-11-22'], ['/fr/shamsi-digital', '2026-11-22'],
    ['/en', '2026-11-14'], ['/en/shamsi-digital', '2026-11-14']
  ]) {
    expect(xml).toContain(`<loc>https://shamsi-dev.vercel.app${source}</loc>\n<lastmod>${date}T00:00:00.000Z</lastmod>`);
  }
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
  const englishSwitch = page.getByRole('link', { name: 'Afficher le site en anglais' });
  await expect(englishSwitch).toHaveAttribute('href', '/en/shamsi-digital');
  await englishSwitch.click();
  await expect(page).toHaveURL(/\/en\/shamsi-digital$/);
});

test('French-only maintenance links directly to the English agency page without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    const navigations: string[] = [];
    page.on('response', (response) => {
      if (response.request().isNavigationRequest()) navigations.push(new URL(response.url()).pathname);
    });
    await page.goto(route);
    const englishSwitch = page.getByRole('link', { name: 'Afficher le site en anglais' });
    await expect(englishSwitch).toHaveAttribute('href', '/en/shamsi-digital');
    await englishSwitch.click();
    await expect(page).toHaveURL(/\/en\/shamsi-digital$/);
    expect(navigations).toEqual([route, '/en/shamsi-digital']);
  } finally {
    await context.close();
  }
});
