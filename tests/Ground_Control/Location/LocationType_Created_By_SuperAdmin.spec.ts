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
    await page.getByPlaceholder('Enter Location Type', { exact: true }).fill('Tikvah');
    const siteCombobox = page.locator('div').filter({hasText: 'Search and select a site'}).getByRole('combobox');
    await siteCombobox.click();
    await siteCombobox.fill('Steinhardt');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByRole('button', {name: 'Save Location Type'}).click();
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the UI has updated before taking the screenshot
    await page.getByRole('cell', {name: 'Tikvah'}).highlight();
    await page.screenshot({path: 'screenshots/LocationType-created-by-superadmin.png', fullPage: true});

})
