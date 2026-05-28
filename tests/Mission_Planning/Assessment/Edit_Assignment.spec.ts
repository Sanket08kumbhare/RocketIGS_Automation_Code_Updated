import {test, expect} from '../../../fixtures';

test('Edit the Assignment for the Module Assessment', async ({ page, loginAsCompanyUser }) => {
  test.setTimeout(60000);
  await loginAsCompanyUser();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

  await page.getByRole('button', { name: 'Mission Planning' }).click();
  await page.locator("//a[@href='/globex/assessments']").click();
  await page.waitForURL('https://uat-rocketigs.harrier.digital/globex/assessments');
  await page.waitForTimeout(2000);

  // Step 1: Click on "Modules" assessment name link
  await page.locator('tr', { hasText: 'Modules' }).getByText('Modules').click();
  await page.waitForTimeout(2000);

  // Step 2: Click on "View Assignment" button
  await page.getByRole('button', { name: 'View Assignment' }).click();
  await page.waitForTimeout(2000);

  // Step 3: Hover over "data modules" row to reveal action buttons, then click edit
  const dataModulesRow = page.locator('tr', { hasText: 'data modules' });
  await dataModulesRow.hover();
  await dataModulesRow.locator('div.action-buttons button').first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('combobox').nth(0).click();
  await page.locator('.ant-select-item[title="Maintenance Tech"]').click();
  await page.getByRole('button', {name: 'Update Assignment'}).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assignment_edit.png', fullPage: true });
 


})