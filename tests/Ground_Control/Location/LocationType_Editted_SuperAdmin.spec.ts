import{test, expect} from'../../../fixtures';
test('SuperAdmin:Edit a Location Type and verify the changes are saved', async({page, loginAsAdmin})=>{
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

    const locationTypeRow = page.locator('tr', {hasText: 'Test Location Type'}).first();
    await locationTypeRow.hover();
    await locationTypeRow.locator('button').first().click();

    await page.getByPlaceholder('Enter Location Type', {exact: true}).clear();
    await page.getByPlaceholder('Enter Location Type', {exact: true}).fill('Test Location Type - Edited');

    const siteSelect = page.locator('.ant-select').filter({hasText: 'Steinhardt'});
    await siteSelect.click();
    await siteSelect.locator('input').fill('Gallatin');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.getByRole('button', {name: 'Update Location Type'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/LocationType-Edited-By-SuperAdmin.png', fullPage: true});

})