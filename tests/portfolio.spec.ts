import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const siteUrl = 'https://shamsi-dev.vercel.app';
const linkedInUrl =
  'https://www.linkedin.com/in/chamsoudine-thienta-146b21183';
const storeSupGitHub =
  'https://github.com/dinegamer/hackhaton_dev_frontEnd2';
const projectSlugs = [
  'kalansup',
  'digital-queue',
  'agritech-mali',
  'storesup'
];
const locales = ['fr', 'en'];
const indexedPaths = [
  '',
  '/about',
  ...projectSlugs.map((slug) => `/projects/${slug}`)
];

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

test('redirects the root to the stable French homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr$/);
});

test('shows Chamsoudine THIENTA and Shams in both heroes', async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    await expect(
      page.getByText('Chamsoudine THIENTA — Shams', { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(
        locale === 'fr'
          ? 'Fondateur de SH☀MSI Digital'
          : 'Founder of SH☀MSI Digital'
      )
    ).toBeVisible();
  }
});

test('renders dedicated French and English About pages', async ({ page }) => {
  await page.goto('/fr/about');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Chamsoudine THIENTA'
  );
  await expect(page.getByText('Une trajectoire vers le Data Engineering')).toBeVisible();

  await page.goto('/en/about');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Chamsoudine THIENTA'
  );
  await expect(page.getByText('A gradual path toward Data Engineering')).toBeVisible();
});

for (const locale of locales) {
  for (const slug of projectSlugs) {
    test(`${locale} project route renders: ${slug}`, async ({ page }) => {
      await page.goto(`/${locale}/projects/${slug}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(
        page.getByText(locale === 'fr' ? 'Statut réel' : 'Current status')
      ).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    });
  }
}

test('About language switch preserves the corresponding page', async ({ page }) => {
  await page.goto('/fr/about');
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await page.getByRole('link', { name: 'View site in French' }).click();
  await expect(page).toHaveURL(/\/fr\/about$/);
});

for (const slug of projectSlugs) {
  test(`language switch preserves project: ${slug}`, async ({ page }) => {
    await page.goto(`/fr/projects/${slug}`);
    await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
    await expect(page).toHaveURL(new RegExp(`/en/projects/${slug}$`));
    await page.getByRole('link', { name: 'View site in French' }).click();
    await expect(page).toHaveURL(new RegExp(`/fr/projects/${slug}$`));
  });
}

test('homepage links to About and all four detailed projects', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('a[href="/fr/about"]').first()).toBeVisible();
  for (const slug of projectSlugs) {
    await expect(page.locator(`a[href="/fr/projects/${slug}"]`)).toBeVisible();
  }
});

test('only verified project repositories are linked', async ({ page }) => {
  await page.goto('/en/projects/storesup');
  await expect(page.locator(`a[href="${storeSupGitHub}"]`)).toBeVisible();

  for (const slug of ['kalansup', 'digital-queue', 'agritech-mali']) {
    await page.goto(`/en/projects/${slug}`);
    await expect(page.locator('a[href*="github.com/dinegamer/"]')).toHaveCount(0);
  }
});

test('all indexed pages publish correct canonical and hreflang links', async ({
  page
}) => {
  for (const locale of locales) {
    for (const path of indexedPaths) {
      await page.goto(`/${locale}${path}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${siteUrl}/${locale}${path}`
      );
      await expect(
        page.locator('link[rel="alternate"][hreflang="fr"]')
      ).toHaveAttribute('href', `${siteUrl}/fr${path}`);
      await expect(
        page.locator('link[rel="alternate"][hreflang="en"]')
      ).toHaveAttribute('href', `${siteUrl}/en${path}`);
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]')
      ).toHaveAttribute('href', `${siteUrl}/fr${path}`);
    }
  }
});

test('every indexed page has unique localized metadata', async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const locale of locales) {
    for (const path of indexedPaths) {
      await page.goto(`/${locale}${path}`);
      const title = await page.title();
      const description =
        (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(title.length).toBeGreaterThan(20);
      expect(description.length).toBeGreaterThan(60);
      expect(titles.has(title)).toBe(false);
      expect(descriptions.has(description)).toBe(false);
      titles.add(title);
      descriptions.add(description);
    }
  }
});

test('global Person and project CreativeWork JSON-LD are valid', async ({ page }) => {
  await page.goto('/en/projects/storesup');
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const structuredData = blocks.map((block) => JSON.parse(block));
  expect(structuredData).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        '@type': 'Person',
        name: 'Chamsoudine THIENTA',
        alternateName: 'Shams',
        sameAs: expect.arrayContaining([
          'https://github.com/dinegamer',
          linkedInUrl
        ])
      }),
      expect.objectContaining({
        '@type': 'CreativeWork',
        name: 'StoreSup',
        creator: expect.objectContaining({
          name: 'Chamsoudine THIENTA'
        })
      })
    ])
  );
});

test('sitemap contains exactly the expected official content routes', async ({
  request
}) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/xml');
  const xml = await response.text();

  for (const locale of locales) {
    for (const path of indexedPaths) {
      expect(xml).toContain(`${siteUrl}/${locale}${path}`);
    }
  }

  expect((xml.match(/<url>/g) ?? []).length).toBe(12);
  expect(xml).not.toContain('localhost');
  expect(xml).not.toContain('shams-portfolio-');
});

test('robots allows the portfolio and points to the official sitemap', async ({
  request
}) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBeTruthy();
  const robots = await response.text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});

test('keyboard navigation reaches the skip link and page content', async ({ page }) => {
  await page.goto('/en/about');
  await page.keyboard.press('Tab');
  await expect(page.locator('a[href="#content"]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#content')).toBeFocused();
});

test('mobile menu and detail-page layout remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/fr/projects/digital-queue');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.getByRole('link', { name: 'À propos' }).click();
  await expect(page).toHaveURL(/\/fr\/about$/);
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  );
  expect(hasOverflow).toBe(false);
});

for (const width of [320, 768, 1024, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en/projects/storesup');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(hasOverflow).toBe(false);
  });
}

test('honors reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/fr/projects/agritech-mali');
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});

test('has no critical console or network errors across new routes', async ({
  page
}) => {
  const errors = collectCriticalErrors(page);
  for (const locale of locales) {
    for (const path of indexedPaths) {
      await page.goto(`/${locale}${path}`);
    }
  }
  expect(errors).toEqual([]);
});

test('serves the exact unchanged portrait file', async ({ request }) => {
  const response = await request.get('/me.jpg');
  expect(response.ok()).toBeTruthy();
  const productionHash = createHash('sha256')
    .update(await response.body())
    .digest('hex');
  const repositoryHash = createHash('sha256')
    .update(readFileSync('public/me.jpg'))
    .digest('hex');
  expect(productionHash).toBe(repositoryHash);
});
