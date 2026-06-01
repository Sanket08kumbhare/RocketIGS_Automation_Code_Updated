import{test, expect} from'../../../fixtures';
test('SuperAdmin:Edit an existing site and verify the changes are saved', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Sites'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

    const steinhardtRow = page.locator('tr', { hasText: 'Sample Site' }).first();
    await steinhardtRow.hover();
    await steinhardtRow.locator('button').nth(1).click();
    
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'site_delete_confirmation.png', fullPage: true});


})