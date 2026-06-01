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

    const steinhardtRow = page.locator('tr', { hasText: 'Steinhardt' }).first();
    await steinhardtRow.hover();
    await steinhardtRow.locator('button').first().click();

    await page.getByPlaceholder('Enter Site Name').clear();
    await page.getByPlaceholder('Enter Site Name').fill('Steinhardt Updated');
    await page.getByPlaceholder('Enter name of Contact Person').clear();
    await page.getByPlaceholder('Enter name of Contact Person').fill('Henry Kelly');
    await page.getByPlaceholder('Enter Email Address').clear();
    await page.getByPlaceholder('Enter Email Address').fill('kelly.henry@mailinator.com');
    await page.getByPlaceholder('Enter Phone Number').clear();
    await page.getByPlaceholder('Enter Phone Number').fill('6498210311');
    await page.getByPlaceholder('Enter State').clear();
    await page.getByPlaceholder('Enter State').fill('USA');
    await page.getByPlaceholder('Enter City').clear();
    await page.getByPlaceholder('Enter City').fill('NY');
    await page.getByPlaceholder('Enter Zip Code').clear();
    await page.getByPlaceholder('Enter Zip Code').fill('10003');
    await page.getByPlaceholder('Enter Address Line 1').clear();
    await page.getByPlaceholder('Enter Address Line 1').fill('853 Broadway, New York, NY 10013, USA');

    await page.getByRole('button', {name: 'Update Site'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'site_edit.png', fullPage: true});
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');
})