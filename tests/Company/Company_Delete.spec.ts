import { test } from '../../fixtures';

test('Company Delete', async ({ page, loginAsAdmin }) => {
  await loginAsAdmin();

  await page.getByRole('link', { name: 'Company' }).click();

  const firstRow = page.locator('tr.ant-table-row').first();
  await firstRow.waitFor({ state: 'visible' });
  await firstRow.hover();
  await firstRow.locator('div.action-buttons button').nth(1).click();

  await page.getByRole('button', { name: 'Delete' }).click();
  await page.screenshot({ path: 'screenshots/company-delete-confirmation.png' });
});
