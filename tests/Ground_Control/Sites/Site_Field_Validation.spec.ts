import{test, expect} from'../../../fixtures';
test('SuperAdmin:Create a new site and verify it appears in the list of Sites', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Sites'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');
    await page.getByRole('button', {name: ' Add'}).click();

    await page.getByRole('button', {name: 'Save Site'}).click();
    await page.waitForTimeout(3000);
    await page.screenshot({path: 'site_creation_validation.png', fullPage: true});
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

})