import {test, expect} from '@playwright/test';

test('Login as Super Admin', async({page})=>{
    await page.goto('https://uat-rocketigs.harrier.digital/sign-in');
    await page.getByPlaceholder('email').fill('shrihari.gawande@harriersys.com');
    await page.locator('#password').fill('Harrier@2025');
    await page.getByRole('button', {name: 'Initiate Access'}).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');

})