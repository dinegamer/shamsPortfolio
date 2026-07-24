import { expect, test, type Page } from '@playwright/test';

const linkedInUrl = 'https://www.linkedin.com/in/chamsoudine-thienta-146b21183';

function collectCriticalErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => {
    const failure = request.failure();
    if (failure && !failure.errorText.includes('ERR_ABORTED')) {
      errors.push(`${request.url()}: ${failure.errorText}`);
    }
  });
  return errors;
}

test('redirects the root to the stable French default', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr$/);
});

test('renders independent French and English pages', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ingénieur logiciel');
  await expect(page.getByText('Projets sélectionnés')).toBeVisible();

  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Engineer');
  await expect(page.getByText('Selected work')).toBeVisible();
});

test('English page does not retain major French interface copy', async ({ page }) => {
  await page.goto('/en');
  const body = await page.locator('body').innerText();
  for (const frenchText of [
    'Ingénieur logiciel',
    'Projets sélectionnés',
    'À propos',
    'Me contacter',
    'Je travaille sur',
    'Étudiants formés'
  ]) {
    expect(body).not.toContain(frenchText);
  }
});

test('switches both ways and preserves the active section', async ({ page }) => {
  await page.goto('/fr#services');
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en#services$/);
  await expect(page.getByText('Focused engineering and data support.')).toBeVisible();

  await page.getByRole('link', { name: 'View site in French' }).click();
  await expect(page).toHaveURL(/\/fr#services$/);
  await expect(page.getByText('Ingénierie et données, avec un périmètre clair.')).toBeVisible();
});

test('language switch works from the mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/fr#about');
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en#about$/);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
});

test('publishes locale-specific canonical and hreflang metadata', async ({ page }) => {
  for (const locale of ['fr', 'en']) {
    await page.goto(`/${locale}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://shamsi-dev.vercel.app/${locale}`
    );
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
      'href',
      'https://shamsi-dev.vercel.app/fr'
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://shamsi-dev.vercel.app/en'
    );
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
      'href',
      'https://shamsi-dev.vercel.app/fr'
    );
  }
});

test('publishes locale-specific titles and descriptions', async ({ page }) => {
  await page.goto('/fr');
  await expect(page).toHaveTitle('Chamsoudine THIENTA | Ingénieur logiciel & Data Analyst');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Shamsi Digital/
  );

  await page.goto('/en');
  await expect(page).toHaveTitle('Chamsoudine THIENTA | Software Engineer & Data Analyst');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /software systems, backend APIs, databases and data analytics/
  );
});

test('publishes accurate Person structured data and public profiles', async ({ page }) => {
  await page.goto('/en');
  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}'
  );
  expect(jsonLd).toMatchObject({
    '@type': 'Person',
    name: 'Chamsoudine THIENTA',
    alternateName: 'Shams',
    url: 'https://shamsi-dev.vercel.app',
    jobTitle: 'Software Engineer & Data Analyst'
  });
  expect(jsonLd.sameAs).toContain('https://github.com/dinegamer');
  expect(jsonLd.sameAs).toContain(linkedInUrl);
  expect(jsonLd.worksFor.name).toBe('Shamsi Digital');
});

test('serves an XML sitemap with both canonical locales', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/xml');
  const xml = await response.text();
  expect(xml).toContain('https://shamsi-dev.vercel.app/fr');
  expect(xml).toContain('https://shamsi-dev.vercel.app/en');
  expect(xml).not.toContain('localhost');
  expect(xml).not.toContain('vercel.app.vercel');
});

test('exposes official social and contact links', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('a[href="https://github.com/dinegamer"]').first()).toBeVisible();
  await expect(page.locator(`a[href="${linkedInUrl}"]`).first()).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
});

test('renders all projects in both languages', async ({ page }) => {
  for (const locale of ['fr', 'en']) {
    await page.goto(`/${locale}`);
    await expect(page.locator('#work article')).toHaveCount(7);
    await expect(page.getByText('KalanSUP', { exact: true }).first()).toBeVisible();
  }
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(hasOverflow).toBe(false);
  });
}

test('honors reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/fr');
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});

test('has no critical console or network errors in either locale', async ({ page }) => {
  const errors = collectCriticalErrors(page);
  await page.goto('/fr');
  await page.goto('/en');
  expect(errors).toEqual([]);
});
