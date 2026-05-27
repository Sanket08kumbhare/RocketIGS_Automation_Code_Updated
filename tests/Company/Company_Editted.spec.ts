import {test, expect} from '@playwright/test';
test('Company Creation ', async({page})=>{
    await page.goto('https://uat-rocketigs.harrier.digital/sign-in');

    await page.getByPlaceholder('email').fill('shrihari.gawande@harriersys.com');
    await page.locator('#password').fill('Harrier@2025');
    await page.getByRole('button', {name: 'Initiate Access'}).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.waitForTimeout(3000);
    await page.getByRole('link', {name :'Company'}).click();
    await page.waitForTimeout(2000);

    const firstRow = page.locator('tr.ant-table-row').first();
    await firstRow.hover();
    await firstRow.locator('div.action-buttons button').first().click();
    await page.waitForTimeout(4000);
    await page.getByPlaceholder('Enter Max Sites').fill('8');
    await page.getByRole('button', {name:'Update Company'}).click();


})
