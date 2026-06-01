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
    await page.getByPlaceholder('Enter Site Name').fill('Sample Site');
    await page.getByPlaceholder('Enter name of Contact Person').fill('Henry Kelly');
    await page.getByPlaceholder('Enter Email Address').fill('kelly.henry@mailinator.com');
    await page.getByPlaceholder('Enter Phone Number').fill('6498210348');
    await page.locator('div').filter({ hasText: /^Status/ }).getByRole('combobox').click();
    await page.locator('.ant-select-dropdown').getByText('Active', { exact: true }).click();
    await page.getByPlaceholder('Enter State').fill('USA');
    await page.getByPlaceholder('Enter City').fill('New York');
    await page.getByPlaceholder('Enter Zip Code').fill('10003');
    await page.getByPlaceholder('Enter Address Line 1').fill('853 Broadway, New York, NY 10003, USA');
    await page.getByRole('button', {name: 'Save Site'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'site_creation.png', fullPage: true});
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

})