import { test, expect } from '../../../fixtures';

test('Add the Assignment for the Module Assessment', async ({ page, loginAsCompanyUser }) => {
  test.setTimeout(60000);
  await loginAsCompanyUser();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

  await page.getByRole('button', { name: 'Mission Planning' }).click();
  await page.locator("//a[@href='/globex/assessments']").click();
  await page.waitForURL('https://uat-rocketigs.harrier.digital/globex/assessments');
  await page.getByText('Modules').click();
  await page.getByRole('button', {name: 'View Assignments'}).click();
  await page.getByRole('button', {name: 'Add Assignment'}).click();
  await page.getByPlaceholder('Enter assignment name').fill('Data modules');
  await page.getByRole('combobox').nth(0).click();
  await page.locator('.ant-select-item[title="Finance"]').click();

  const targetFinishDate = page.locator('div').filter({ hasText: /Target Finish Date/ }).filter({ hasNot: page.locator('text=Target Start Date') }).locator("button[type='button']").first();
  await targetFinishDate.click();
  await page.getByRole('button', { name: '›' }).click();
  await page.getByRole('button', { name: '20', exact: true }).click();
  await page.getByRole('combobox').nth(1).click();
  await page.locator('.ant-select-item[title="Open"]').click();
  await page.getByRole('row', { name: 'Simon tiffany' }).getByRole('checkbox').click();
  await page.getByRole('row', { name: 'Henry Kelly' }).getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Save Assignment' }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assignment_creation.png', fullPage: true });


  //2nd Assignment added for the same assessment
  await page.getByRole('button', {name: 'Add Assignment'}).click();
  await page.getByPlaceholder('Enter assignment name').fill('Object-oriented modules');
  await page.getByRole('combobox').nth(0).click();
  await page.keyboard.type('Storeroom');
  const storeroomOption = page.locator('.ant-select-item[title="Storeroom"]');
  await storeroomOption.waitFor({ state: 'visible' });
  await storeroomOption.click();

  const targetFinishDate1 = page.locator('div').filter({ hasText: /Target Finish Date/ }).filter({ hasNot: page.locator('text=Target Start Date') }).locator("button[type='button']").first();
  await targetFinishDate1.click();
  await page.getByRole('button', { name: '›' }).click();
  await page.getByRole('button', { name: '20', exact: true }).click();
  await page.getByRole('combobox').nth(1).click();
  await page.locator('.ant-select-item[title="Open"]').click();
  await page.getByRole('row', { name: 'Adam Lauren' }).getByRole('checkbox').click();
  await page.getByRole('row', { name: 'Dennis Heather' }).getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Save Assignment' }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'assignment_creation.png', fullPage: true });
});
