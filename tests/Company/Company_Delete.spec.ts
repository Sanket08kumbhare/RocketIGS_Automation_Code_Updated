import {test, expect} from '@playwright/test';
test('Company Delete', async({page})=>{
    await page.goto('https://uat-rocketigs.harrier.digital/sign-in');

    await page.getByPlaceholder('email').fill('shrihari.gawande@harriersys.com');
    await page.locator('#password').fill('Harrier@2025');
    await page.getByRole('button', {name: 'Initiate Access'}).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.waitForTimeout(3000);
    await page.getByRole('link', {name: 'Company'}).click();
    await page.waitForTimeout(2000);

    const firstRow = page.locator('tr.ant-table-row').first();
    await firstRow.hover();
    await firstRow.locator('div.action-buttons button').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', {name: 'Delete'}).click();
    await page.screenshot({path: 'screenshots/company-delete-confirmation.png'});
    await page.waitForTimeout(2000);

    


})
