import{test, expect} from'../../../fixtures';
test('Create a new site and verify it appears in the list of Sites', async({page, loginAsCompanyUser})=>{
    await loginAsCompanyUser();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');
    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Sites'}).click()
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

    await page.getByRole('button', {name: ' Add'}).click();
    await page.getByPlaceholder('Enter Site Name').fill('!@#$%^&*()_=+|}{":?><,./;\'[]\\`~');
    await page.getByPlaceholder('Enter name of Contact Person').fill('Austin Cherly');
    await page.getByPlaceholder('Enter Email Address').fill('cherly.austin@mailinator.com');
    await page.getByPlaceholder('Enter Phone Number').fill('6498021214');
    await page.locator('div').filter({ hasText: /^Status/ }).getByRole('combobox').click();
    await page.locator('.ant-select-dropdown').getByText('Active', { exact: true }).click();
    await page.getByPlaceholder('Enter State').fill('USA');
    await page.getByPlaceholder('Enter City').fill('New York');
    await page.getByPlaceholder('Enter Zip Code').fill('10003');
    await page.getByPlaceholder('Enter Address Line 1').fill('853 Broadway, New York, NY 10003, USA');
    await page.getByRole('button', {name: 'Save Site'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: './screenshots/site_creation_special_characters.png', fullPage: true});
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

})