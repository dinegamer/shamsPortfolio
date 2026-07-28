import { expect, test } from '@playwright/test';

test('French contact form submits without leaving the portfolio', async ({
  page
}) => {
  await page.route('**/api/contact', async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: 'Aminata Traoré',
      email: 'aminata@example.com',
      organization: 'Example SARL',
      reason: 'recruitment',
      subject: 'Opportunité backend'
    });
    expect(payload.message).toContain('équipe backend');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true })
    });
  });

  await page.goto('/fr');
  await page.locator('#contact-name').fill('Aminata Traoré');
  await page.locator('#contact-email').fill('aminata@example.com');
  await page.locator('#contact-organization').fill('Example SARL');
  await page.locator('#contact-reason').selectOption('recruitment');
  await page.locator('#contact-subject').fill('Opportunité backend');
  await page
    .locator('#contact-message')
    .fill('Nous souhaitons échanger avec vous pour rejoindre notre équipe backend.');
  await page.getByRole('button', { name: 'Envoyer le message' }).click();

  await expect(page.getByText('Message envoyé', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/fr$/);
});

test('English form exposes professional inquiry reasons', async ({ page }) => {
  await page.goto('/en');
  const select = page.locator('#contact-reason');
  await expect(select).toBeVisible();
  await expect(select.locator('option')).toHaveText([
    'Select a reason',
    'Recruitment or contract work',
    'Software or data project',
    'KalanSUP',
    'Partnership',
    'Other inquiry'
  ]);
});

test('contact API rejects invalid requests before delivery', async ({
  request
}) => {
  const response = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:3000' },
    data: {
      name: 'A',
      email: 'invalid',
      reason: 'unknown',
      subject: 'x',
      message: 'short',
      startedAt: Date.now() - 3_000
    }
  });

  expect(response.status()).toBe(400);
});

test('contact API silently accepts honeypot submissions', async ({
  request
}) => {
  const response = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:3000' },
    data: {
      website: 'https://spam.example',
      startedAt: Date.now() - 3_000
    }
  });

  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toEqual({ ok: true });
});
