import{test, expect} from'../../../fixtures';
test('SuperAdmin:Create a new Location Type and verify it appears in the list of Location Types', async({page, loginAsAdmin})=>{
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
    await page.getByRole('menuitem', {name: 'New Type'}).click();
    await page.getByPlaceholder('Enter Location Type').fill('Test Location Type');
    await page.locator('div').filter({hasText: 'Search and select a site' }).getByRole('combobox').click();
    await page.getByRole('option', {name: 'Steinhardt'}).click();
    await page.getByRole('button', {name: 'Save Location Type'}).click();
    await expect(page.getByRole('cell', {name: 'Test Location Type'})).toBeVisible();
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the UI has updated before taking the screenshot
    await page.getByRole('cell', {name: 'Test Location Type'}).highlight();
    await page.screenshot({path: 'screenshots/LocationType-created-by-superadmin.png', fullPage: true});

})