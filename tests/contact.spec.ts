import { expect, test, type Page } from '@playwright/test';

const endpoint = 'https://formsubmit.co/ajax/**';
const needs = 'Nous souhaitons suivre nos inscriptions et nos paiements.';
async function fillEnquiry(page: Page) {
  await page.locator('#contact-name').fill('Test prospect');
  await page.locator('#contact-email').fill('prospect@example.com');
  await page.locator('#contact-message').fill(needs);
  // The public form has a 2.5 second anti-bot completion check.
  await page.waitForTimeout(2600);
}
const send = (page: Page) => page.locator('#contact button[type="submit"]');

test.beforeEach(async ({ page }) => {
  // Never send test data to the real service, including unexpected endpoints.
  await page.route('https://formsubmit.co/**', route => route.abort());
});

for (const locale of ['fr', 'en']) {
  test(`${locale}: an explicit accepted response confirms an enquiry with only three required fields`, async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(endpoint, async route => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: locale === 'fr' ? true : 'true' } });
    });
    await page.goto(`/${locale}/shamsi-digital`);
    await expect(page.locator('#contact [required]')).toHaveCount(3);
    await fillEnquiry(page);
    await send(page).click();
    await expect(page.getByRole('status')).toContainText(locale === 'fr' ? 'Demande transmise' : 'Enquiry submitted');
    expect(payload).toMatchObject({ name: 'Test prospect', email: 'prospect@example.com', message: needs, language: locale, source: 'unknown', _replyto: 'prospect@example.com', service: '' });
    expect(payload._subject).toContain('[SHAMSI DIGITAL]');
    await expect(page).toHaveURL(new RegExp(`/${locale}/shamsi-digital$`));
  });
}

for (const failure of ['false', '400', '503', 'html', 'network', 'timeout']) {
  test(`preserves the enquiry and offers direct contact on ${failure}`, async ({ page }) => {
    if (failure === 'timeout') test.setTimeout(60_000);
    await page.route(endpoint, async route => {
      if (failure === 'network') return route.abort('failed');
      if (failure === 'timeout') return; // Leave pending until the application's abort deadline.
      if (failure === 'html') return route.fulfill({ contentType: 'text/html', body: '<html>Rejected</html>' });
      if (failure === 'false') return route.fulfill({ json: { success: 'false' } });
      return route.fulfill({ status: Number(failure), json: { success: false } });
    });
    await page.goto('/fr/shamsi-digital');
    await fillEnquiry(page);
    await send(page).click();
    await expect(page.locator('#contact').getByRole('alert')).toBeVisible({ timeout: 48000 });
    await expect(page.getByRole('status')).toHaveCount(0);
    await expect(page.locator('#contact-message')).toHaveValue(needs);
    await expect(page.locator('#contact-name')).toHaveValue('Test prospect');
    await expect(send(page)).toBeEnabled();
    await expect(page.locator('#contact a[href^="https://wa.me/"]')).toBeVisible();
    await expect(page.locator('#contact a[href="tel:+22373449230"]')).toBeVisible();
  });
}

test('retry after rejection works and a double submit sends only once', async ({ page }) => {
  let count = 0;
  await page.route(endpoint, async route => {
    count++;
    await new Promise(resolve => setTimeout(resolve, 200));
    await route.fulfill({ json: { success: count > 1 } });
  });
  await page.goto('/fr'); await fillEnquiry(page);
  await send(page).click();
  await expect(page.locator('#contact').getByRole('alert')).toBeVisible();
  await send(page).evaluate((button: HTMLButtonElement) => { button.click(); button.click(); });
  await expect(page.getByRole('status')).toBeVisible();
  expect(count).toBe(2);
});

test('blocked browser storage cannot prevent submission', async ({ page }) => {
  await page.addInitScript(() => {
    for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await page.route(endpoint, route => route.fulfill({ json: { success: true } }));
  await page.goto('/fr/shamsi-digital'); await fillEnquiry(page); await send(page).click();
  await expect(page.getByRole('status')).toBeVisible();
});

test('Google attribution and project context survive the actual navigation and language switch', async ({ page }) => {
  let payload: Record<string, string> = {};
  await page.route(endpoint, async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/fr/shamsi-digital?utm_source=google&utm_medium=organic&utm_campaign=gbp');
  await page.locator('a[href="/fr/projects/kalansup"]').click();
  await page.getByRole('link', { name: 'Discuter d’un projet similaire' }).click();
  await expect(page.locator('#contact-service')).toHaveValue('kalansup-universites');
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page.locator('#contact-service')).toHaveValue('kalansup-universites');
  await expect(page.locator('#contact a[href^="https://wa.me/"]')).toHaveAttribute('href', /I%20found%20you%20on%20Google/);
  await fillEnquiry(page); await send(page).click();
  await expect(page.getByRole('status')).toBeVisible();
  expect(payload).toMatchObject({ source: 'google', medium: 'organic', campaign: 'gbp', project: 'kalansup', service: 'kalansup-universites', language: 'en' });
});

test('service CTA leads straight to the preselected form', async ({ page }) => {
  await page.goto('/fr/services/developpement-application-mali');
  await page.locator('main header a[href*="service="]').click();
  await expect(page).toHaveURL(/shamsi-digital\?service=developpement-application-mali#contact$/);
  await expect(page.locator('#contact-service')).toHaveValue('developpement-application-mali');
});

test('unknown query values are ignored', async ({ page }) => {
  await page.goto('/fr/shamsi-digital?service=unknown&project=__proto__&utm_source=other&utm_medium=email&utm_campaign=private');
  await expect(page.locator('#contact-service')).toHaveValue('');
  expect(await page.evaluate(() => sessionStorage.getItem('shamsi-lead-origin-v1'))).toBeNull();
});

for (const width of [320, 390, 768, 1024]) {
  test(`quote access and forms are usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const locale of ['fr', 'en']) {
      for (const path of ['', '/shamsi-digital']) {
        await page.goto(`/${locale}${path}`);
        const quote = page.locator('header.fixed').getByRole('link', { name: locale === 'fr' ? 'Demander un devis' : 'Request a quote', exact: true });
        await expect(quote).toBeVisible();
        await expect(quote).toHaveAttribute('href', '#contact');
        await quote.click();
        await expect(page.locator('#contact-title')).toBeInViewport();
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
      }
    }
  });
}

test('home exposes services before projects and removes internal capture notes', async ({ page }) => {
  await page.goto('/fr');
  const sections = await page.locator('main > section[id]').evaluateAll(nodes => nodes.map(node => node.id));
  expect(sections.indexOf('services')).toBeLessThan(sections.indexOf('work'));
  await expect(page.getByText('Aucune capture locale disponible dans ce dépôt.')).toHaveCount(0);
  await expect(page.locator('#top a[href="#contact"]')).toBeVisible();
});
