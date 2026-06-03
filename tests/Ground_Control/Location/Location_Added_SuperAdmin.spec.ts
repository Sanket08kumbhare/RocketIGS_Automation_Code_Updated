import{test, expect} from'../../../fixtures';
test('SuperAdmin:Create a new Location and verify it appears in the list of Location', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');
    await page.getByRole('button', {name: ' Add'}).click();
    //await page.waitForLoadState('networkidle');
    await page.getByRole('menuitem', {name: 'New Location'}).click();
    await page.getByPlaceholder('Enter Location Name').fill('Sample Location');

    const siteSelect = page.locator('.ant-select').filter({hasText: 'Search and select a site'});
    await siteSelect.click();
    await siteSelect.locator('input').fill('Steinhardt');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const statusSelect = page.locator('.ant-select').filter({hasText: 'Search and select a status'});
    await statusSelect.click();
    await statusSelect.locator('input').fill('Active');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const locationTypeSelect = page.locator('.ant-select').filter({hasText: 'Search and select a location type'});
    await locationTypeSelect.click();
    await locationTypeSelect.locator('input').fill('Tikvah');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.getByRole('button', {name: 'Save Location'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/Location-Added-By-SuperAdmin-details-filled.png', fullPage: true});




})