import{test, expect} from'../../../fixtures';
test('SuperAdmin:Search a Location and verify it appears in the list', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');

    const searchInput = page.getByPlaceholder('Search locations...');
    await searchInput.fill('Othmer Hall - Edited');
    await expect(page.getByRole('cell', {name: 'Othmer Hall - Edited'}).first()).toBeVisible();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/Location-Search-By-SuperAdmin.png', fullPage: true});





})