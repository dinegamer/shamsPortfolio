import { expect, test } from '@playwright/test';

const hints = {
  fr: 'Exemple : nous souhaitons suivre les paiements et les inscriptions de notre établissement. Vous pouvez préciser vos délais si vous les connaissez.',
  en: 'For example: we need to track payments and enrolments at our institution. Include your timeline if you know it.'
};

test.beforeEach(async ({ page }) => {
  await page.route('https://formsubmit.co/**', route => route.abort());
});

for (const locale of ['fr', 'en'] as const) {
  for (const width of [320, 1280]) {
    test(`${locale}: message guidance stays visible and accessible at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['', '/shamsi-digital']) {
        await page.goto(`/${locale}${path}#contact`);
        const message = page.locator('#contact-message');
        const help = page.locator('#contact-message-help');
        await expect(help).toHaveText(hints[locale]);
        await expect(message).toHaveAccessibleDescription(hints[locale]);
        await expect(message).not.toHaveAttribute('placeholder');
        await message.focus();
        await message.fill('Un projet à préciser / A project to discuss');
        await expect(help).toBeVisible();
        await expect(message).toHaveAccessibleDescription(hints[locale]);
        await message.clear();
        await expect(help).toBeVisible();
        const contrast = await help.evaluate(element => {
          const rgba = (value: string) => {
            const parts = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0];
            return [parts[0], parts[1], parts[2], parts[3] ?? 1];
          };
          const blend = (foreground: number[], background: number[]) => foreground.slice(0, 3).map((channel, index) => channel * foreground[3] + background[index] * (1 - foreground[3]));
          const ancestors: Element[] = [];
          for (let node: Element | null = element; node; node = node.parentElement) ancestors.unshift(node);
          let background = [255, 255, 255];
          for (const node of ancestors) background = blend(rgba(getComputedStyle(node).backgroundColor), background);
          const foreground = blend(rgba(getComputedStyle(element).color), background);
          const luminance = (rgb: number[]) => rgb.map(channel => {
            const s = channel / 255;
            return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
          }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
          const light = luminance(foreground), dark = luminance(background);
          return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
        });
        expect(contrast).toBeGreaterThanOrEqual(4.5);
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
      }
    });
  }

  test(`${locale}: homepage skip link bypasses the complete navigation`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await page.keyboard.press('Tab');
    await expect(page.locator('a[href="#content"]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#content')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#top a[href="#contact"]')).toBeFocused();
    await expect(page.locator('main header.fixed')).toHaveCount(0);
  });
}

for (const path of ['', '/shamsi-digital']) {
  test(`language changes retain the entire enquiry on ${path || 'home'} without durable storage`, async ({ page }) => {
    await page.addInitScript(() => {
      for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { get() { throw new DOMException('Blocked', 'SecurityError'); } });
    });
    await page.goto(`/fr${path}?service=consultant-si-ong#contact`);
    await page.locator('#contact-name').fill('Test prospect');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-organization').fill('Organisation test');
    await page.locator('#contact-service').selectOption('maintenance');
    await page.locator('#contact-message').fill('Mon besoin reste ici.\nDeuxième ligne.');
    for (const languageLink of ['Afficher le site en anglais', 'View site in French', 'Afficher le site en français']) {
      await page.getByRole('link', { name: languageLink }).click();
      await expect(page.locator('#contact-name')).toHaveValue('Test prospect');
      await expect(page.locator('#contact-email')).toHaveValue('test@example.com');
      await expect(page.locator('#contact-organization')).toHaveValue('Organisation test');
      await expect(page.locator('#contact-service')).toHaveValue('maintenance');
      await expect(page.locator('#contact-message')).toHaveValue('Mon besoin reste ici.\nDeuxième ligne.');
    }
    await page.reload();
    await expect(page.locator('#contact-message')).toHaveValue('');
  });
}

test('language changes do not interrupt or duplicate a pending submission', async ({ page }) => {
  let requests = 0;
  let finish: () => void = () => {};
  const accepted = new Promise<void>(resolve => { finish = resolve; });
  await page.route('https://formsubmit.co/ajax/**', async route => {
    requests++;
    await accepted;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/fr/shamsi-digital#contact');
  await page.locator('#contact-name').fill('Test prospect');
  await page.locator('#contact-email').fill('test@example.com');
  await page.locator('#contact-message').fill('Une demande de test interceptée.');
  await page.waitForTimeout(2600);
  await page.locator('#contact button[type="submit"]').click();
  await expect(page.getByRole('button', { name: 'Envoi en cours…' })).toBeDisabled();
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/fr\/shamsi-digital#contact$/);
  finish();
  await expect(page.getByRole('status')).toContainText('Demande transmise');
  expect(requests).toBe(1);
  await page.getByRole('link', { name: 'Afficher le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en\/shamsi-digital#contact$/);
  await expect(page.locator('#contact-message')).toHaveValue('');
});
