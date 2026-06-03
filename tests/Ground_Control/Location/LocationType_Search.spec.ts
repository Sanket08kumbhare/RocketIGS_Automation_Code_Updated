import{test, expect} from'../../../fixtures';
test('SuperAdmin:Search a Location Type and verify it appears in the list', async({page, loginAsAdmin})=>{
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

    const searchInput = page.getByPlaceholder('Search location types...');
    await searchInput.fill('Rufus');
    await expect(page.getByRole('cell', {name: 'Rufus'}).first()).toBeVisible();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/LocationType-Search-By-SuperAdmin.png', fullPage: true});
})
