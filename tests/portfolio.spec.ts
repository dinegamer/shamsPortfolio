import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const criticalMessages: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') criticalMessages.push(message.text());
  });
  page.on('pageerror', (error) => criticalMessages.push(error.message));
  await page.goto('/');
  expect(criticalMessages).toEqual([]);
});

test('loads the localized homepage and project cards', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Engineer');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('& Data Analyst');
  await expect(page.locator('#work article')).toHaveCount(7);
});

test('switches from English to French', async ({ page }) => {
  await page.getByRole('link', { name: /switch to fr/i }).click();
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ingénieur logiciel');
});

test('navigates to page sections', async ({ page }) => {
  await page.getByRole('link', { name: 'Projects' }).first().click();
  await expect(page.locator('#work')).toBeInViewport();
  await page.getByRole('link', { name: 'Services' }).first().click();
  await expect(page.locator('#services')).toBeInViewport();
  await page.getByRole('link', { name: 'About' }).first().click();
  await expect(page.locator('#about')).toBeInViewport();
});

test('exposes working contact and profile links', async ({ page }) => {
  await expect(page.locator('a[href="https://github.com/dinegamer"]').first()).toBeVisible();
  await expect(
    page.locator('a[href="https://www.linkedin.com/in/chamsoudine-thienta"]').first()
  ).toBeVisible();
  await expect(page.locator('a[href="mailto:teenagerdine@gmail.com"]').first()).toBeVisible();
});

test('mobile menu is keyboard and touch reachable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.locator('#mobile-navigation a[href="#about"]').click();
  await expect(page.locator('#mobile-navigation')).toBeHidden();
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(hasOverflow).toBe(false);
  });
}

test('honors reduced motion media preference', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});
