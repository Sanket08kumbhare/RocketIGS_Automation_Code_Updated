import { test as base, expect, Page } from '@playwright/test';

type LoginFixtures = {
  loginAsAdmin: () => Promise<void>;
  loginAsCompanyUser: () => Promise<void>;
};

export const test = base.extend<LoginFixtures>({
  // Wrap page.goto() to always wait for networkidle — eliminates manual waitForLoadState('networkidle') after navigation
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);
    (page as any).goto = async (url: string, options?: Parameters<Page['goto']>[1]) =>
      originalGoto(url, { waitUntil: 'networkidle', ...options });
    await use(page);
  },

  loginAsAdmin: async ({ page }, use) => {
    await use(async () => {
      await page.goto('https://uat-rocketigs.harrier.digital/sign-in');
      await page.getByPlaceholder('email').fill('shrihari.gawande@harriersys.com');
      await page.locator('#password').fill('Harrier@2025');
      await page.getByRole('button', { name: 'Initiate Access' }).click();
      await page.waitForURL('https://uat-rocketigs.harrier.digital/dashboard');
    });
  },

  loginAsCompanyUser: async ({ page }, use) => {
    await use(async () => {
      await page.goto('https://uat-rocketigs.harrier.digital/sign-in');
      await page.getByPlaceholder('email').fill('patrick.rachel@mailinator.com');
      await page.locator('#password').fill('Test@123');
      await page.getByRole('button', { name: 'Initiate Access' }).click();
      await page.waitForURL('https://uat-rocketigs.harrier.digital/globex/dashboard');
    });
  },
});

export { expect } from '@playwright/test';
