import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const siteUrl = 'https://shamsi-dev.vercel.app';
const linkedInUrl =
  'https://www.linkedin.com/in/chamsoudine-thienta-146b21183';
const personId = `${siteUrl}/#chamsoudine-thienta`;
const organizationId = `${siteUrl}/#shamsi-digital`;
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

test('publishes one reusable Person and Organization identity graph', async ({
  page
}) => {
  await page.goto('/en');
  const graph = JSON.parse(
    (await page.locator('#identity-graph').textContent()) ?? '{}'
  );
  const person = graph['@graph'].find(
    (entity: Record<string, unknown>) => entity['@id'] === personId
  );
  const organization = graph['@graph'].find(
    (entity: Record<string, unknown>) => entity['@id'] === organizationId
  );

  expect(person).toMatchObject({
    '@type': 'Person',
    name: 'Chamsoudine Thienta',
    alternateName: ['Shams', 'Chamsoudine THIENTA'],
    url: `${siteUrl}/fr`,
    jobTitle: ['Software Engineer', 'Data Analyst'],
    sameAs: ['https://github.com/dinegamer', linkedInUrl],
    affiliation: { '@id': organizationId }
  });
  expect(person.image.url).toBe(
    `${siteUrl}/chamsoudine-thienta-portrait.webp`
  );
  expect(organization).toMatchObject({
    '@type': 'Organization',
    name: 'Shamsi Digital',
    alternateName: 'SH☀MSI Digital',
    founder: { '@id': personId }
  });
});

test('About pages publish localized ProfilePage JSON-LD', async ({ page }) => {
  for (const locale of locales) {
    await page.goto(`/${locale}/about`);
    const profile = JSON.parse(
      (await page.locator('#profile-page-graph').textContent()) ?? '{}'
    );
    expect(profile).toMatchObject({
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/${locale}/about#profile-page`,
      url: `${siteUrl}/${locale}/about`,
      inLanguage: locale,
      dateModified: '2026-07-26',
      mainEntity: { '@id': personId }
    });
  }
});

test('projects reference the Person and expose evidence-based schema types', async ({
  page
}) => {
  const expectedTypes: Record<string, string> = {
    kalansup: 'SoftwareApplication',
    'digital-queue': 'SoftwareApplication',
    'agritech-mali': 'CreativeWork',
    storesup: 'SoftwareSourceCode'
  };

  for (const slug of projectSlugs) {
    await page.goto(`/en/projects/${slug}`);
    const project = JSON.parse(
      (await page.locator('#project-graph').textContent()) ?? '{}'
    );
    expect(project['@type']).toBe(expectedTypes[slug]);
    expect(project.creator).toEqual({ '@id': personId });
    expect(project.dateModified).toBe('2026-07-26');
    expect(project.keywords.length).toBeGreaterThan(2);
    await expect(page.locator('meta[name="keywords"]')).toHaveCount(1);
    await expect(page.locator('meta[name="date-modified"]')).toHaveAttribute(
      'content',
      '2026-07-26'
    );
  }
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
  expect(robots).toContain('User-Agent: OAI-SearchBot');
  expect(robots).toContain('User-Agent: ClaudeBot');
  expect(robots).toContain('User-Agent: *');
  expect((robots.match(/Allow: \//g) ?? []).length).toBe(3);
  expect(robots).not.toContain('OAI-AdsBot');
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});

test('serves a short factual llms.txt with official routes and profiles', async ({
  request
}) => {
  const response = await request.get('/llms.txt');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('text/plain');
  const content = await response.text();
  expect(content).toContain('Chamsoudine Thienta');
  expect(content).toContain('Software Engineer and Data Analyst');
  expect(content).toContain('Bamako, Mali');
  expect(content).toContain(`${siteUrl}/fr/about`);
  expect(content).toContain(`${siteUrl}/en/projects/storesup`);
  expect(content).toContain('https://github.com/dinegamer');
  expect(content).toContain(linkedInUrl);
});

test('identity and official links exist in initial server HTML', async ({
  request
}) => {
  for (const locale of locales) {
    const response = await request.get(`/${locale}`);
    const html = await response.text();
    expect(html).toContain('Chamsoudine THIENTA');
    expect(html).toContain('Bamako');
    expect(html).toContain('Mali');
    expect(html).toContain('Software Engineer');
    expect(html).toContain('Data Analyst');
    expect(html).toContain('href="https://github.com/dinegamer"');
    expect(html).toContain(`href="${linkedInUrl}"`);
  }
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
  const response = await request.get('/chamsoudine-thienta-portrait.webp');
  expect(response.ok()).toBeTruthy();
  const productionHash = createHash('sha256')
    .update(await response.body())
    .digest('hex');
  const repositoryHash = createHash('sha256')
    .update(readFileSync('public/chamsoudine-thienta-portrait.webp'))
    .digest('hex');
  expect(productionHash).toBe(repositoryHash);
});
