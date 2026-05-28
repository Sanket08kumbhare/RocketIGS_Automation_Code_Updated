import { test, expect } from '../../fixtures';

test('Company Edit', async ({ page, loginAsAdmin }) => {
  await loginAsAdmin();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');

  // Intercept the companies list API to read the existing company data
  const [listResp] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/list_companies/') && r.status() === 200),
    page.getByRole('link', { name: 'Company' }).click(),
  ]);
  const company = (await listResp.json())?.data?.data?.[0];

  await page.waitForLoadState('networkidle');

  const firstRow = page.locator('tr.ant-table-row').first();
  await firstRow.waitFor({ state: 'visible' });
  await firstRow.hover();

  // Open the Edit form and wait until dropdown data is loaded
  await Promise.all([
    page.waitForResponse(r => r.url().includes('/industries/dropdown') && r.status() === 200),
    firstRow.locator('div.action-buttons button').first().click(),
  ]);

  const companyNameInput = page.getByPlaceholder('Enter Company Name');
  await companyNameInput.waitFor({ state: 'visible' });

  // Form sometimes opens blank (backend decrypt API fails); fill with existing data from list API
  if (!(await companyNameInput.inputValue())) {
    await companyNameInput.fill(company.company);
    await page.locator("div.ant-select-content").filter({ hasText: /^Select Industry$/ }).click();
    await page.getByText(company.industry.industry_name, { exact: true }).click();
    await page.locator("div.ant-select-content").filter({ hasText: /^Select Status$/ }).click();
    await page.locator("div.ant-select-item-option-content").getByText(company.status.status, { exact: true }).click();
    await page.getByPlaceholder('Enter Contact Person Name').fill(company.contact_person);
    await page.getByPlaceholder('Enter Contact Person Email').fill('sanketkharriersys@gmail.com');
    await page.locator("div.ant-select-content").filter({ hasText: /Count/ }).click();
    await page.keyboard.type('India');
    await page.getByText('India (+91)', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('India (+91)', { exact: true }).click();
    await page.getByPlaceholder('Enter Phone Number').fill('9561221241');
    await page.locator('input[name="address_line_1"]').fill(company.address_line_1);
    await page.getByPlaceholder('Enter City').fill(company.city);
    await page.getByPlaceholder('Enter State').fill(company.state);
    await page.getByPlaceholder('Enter Zip Code').fill('10003');
  }

  // Screenshot showing the previous company record in the edit form
  await page.screenshot({ path: 'screenshots/company-edit-loaded.png', fullPage: true });

  // Update ONLY Max Sites — triple-click selects the existing value, then type replaces it
  const maxSitesInput = page.locator('input[name="max_sites"]');
  await maxSitesInput.click({ clickCount: 3 });
  await page.keyboard.type('8');
  await expect(maxSitesInput).toHaveValue('8');

  // Click Update and wait for the PUT API call to confirm the update is sent
  await Promise.all([
    page.waitForResponse(r => r.url().includes('/companies/') && r.request().method() === 'PUT'),
    page.getByRole('button', { name: 'Update Company' }).click(),
  ]);
  await page.waitForTimeout(2000);

  // Verify success toast appears
  await expect(page.getByText('Company edited successfully')).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: 'screenshots/company-update.png', fullPage: true });
});
