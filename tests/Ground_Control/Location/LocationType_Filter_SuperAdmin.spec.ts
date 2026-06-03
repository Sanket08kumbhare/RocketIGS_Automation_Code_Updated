import{test, expect} from'../../../fixtures';
test('SuperAdmin:Filter Location Types by Site', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');

    await page.getByRole('button', {name: 'Location Type', exact: true}).first().click();
    await page.getByPlaceholder('Search location types...').waitFor({state: 'visible'});

    const filterBySite = page.locator('.ant-select').filter({hasText: 'Filter by sites...'});
    await filterBySite.click();
    await page.locator('span[class="truncate"]', {hasText: /^Kevorkian$/}).click();
    await page.waitForTimeout(2000);


    await page.screenshot({path: 'screenshots/LocationType-Filter-By-Site-SuperAdmin.png', fullPage: true});

})