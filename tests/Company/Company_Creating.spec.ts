import { test, expect } from '../../fixtures';

test('Company Creation', async ({ page, loginAsAdmin }) => {
  await loginAsAdmin();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');

  await page.getByRole('link', { name: 'Company' }).click();
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByPlaceholder('Enter Company Name').fill('Defrox Technology');
  await page.locator("//div [@class= 'ant-select-content']").filter({ hasText: /^Select Industry$/ }).click();
  await page.getByText('Software Development').click();
  await page.getByPlaceholder('Enter Max Sites').fill('5');
  await page.locator("//div [@class= 'ant-select-content']").filter({ hasText: /^Select Status$/ }).click();
  await page.locator("//div[@class='ant-select-item-option-content']").getByText('Active', { exact: true }).click();
  await page.getByPlaceholder('Enter Contact Person Name').fill('Sanket');
  await page.getByPlaceholder('Enter Contact Person Email').fill('sanketkharriersys@gmail.com');
  await page.locator("//div[contains(@class, 'ant-select-content')]").filter({ hasText: /United States/ }).click();
  await page.keyboard.type('India');
  // Wait for the country autocomplete suggestion to appear before clicking
  await page.getByText('India (+91)', { exact: true }).waitFor({ state: 'visible' });
  await page.getByText('India (+91)', { exact: true }).click();
  await page.getByPlaceholder('Enter Phone Number').fill('9561221241');
  await page.locator('input[name="address_line_1"]').fill('339 1st Ave, New York, NY 10003, USA');
  await page.getByPlaceholder('Enter City').fill('New York');
  await page.getByPlaceholder('Enter State').fill('NY');
  await page.getByPlaceholder('Enter Zip Code').fill('10003');
  await page.getByRole('button', { name: 'Save Company' }).click();
  await expect(page.getByText('Defrox')).toBeVisible();
  await page.screenshot({ path: 'screenshots/company-creation.png' });
});
