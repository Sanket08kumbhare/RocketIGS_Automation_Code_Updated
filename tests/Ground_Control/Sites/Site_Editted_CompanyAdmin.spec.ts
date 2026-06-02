import { test, expect } from '../../../fixtures';

test('Edit a site and verify it appears in the list of Sites', async ({ page, loginAsCompanyUser }) => {
    await loginAsCompanyUser();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

    await page.getByRole('button', { name: 'Ground Control' }).click();
    await page.getByRole('button', { name: 'Sites' }).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

    const siteRow = page.locator('tr', { hasText: 'Adam Lauren' }).first();
    await siteRow.hover();
    await siteRow.locator('button').nth(1).click();
    await page.getByRole('button', {name: 'Edit'}).click();
    await page.getByPlaceholder('Enter Site Name').clear();
    await page.getByPlaceholder('Enter Site Name').fill('Shimkin Updated');
    await page.getByPlaceholder('Enter name of Contact Person').clear();
    await page.getByPlaceholder('Enter name of Contact Person').fill('Lauren Adam');
    await page.getByPlaceholder('Enter Email Address').clear();
    await page.getByPlaceholder('Enter Email Address').fill('lauren.adam@mailinator.com');
    await page.getByRole('button', {name: ' Update Site'}).click();
    await expect(page.locator('tr', { hasText: 'Shimkin Updated' })).toBeVisible();
    await page.screenshot({path: 'site_edit_company_user.png', fullPage: true});
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');


});