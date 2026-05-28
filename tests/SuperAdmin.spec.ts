import { test, expect } from '../fixtures';

test('Login as Super Admin', async ({ page, loginAsAdmin }) => {
  await loginAsAdmin();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
});
