import{test, expect} from'../../../fixtures';
test('SuperAdmin:Editted a new Location', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');

    const othmerRow = page.locator('tr', {hasText: 'Othmer Hall'}).first();
    await othmerRow.hover();
    await othmerRow.locator('button').first().click();

    await page.getByPlaceholder('Enter Location Name').clear();
    await page.getByPlaceholder('Enter Location Name').fill('Othmer Hall - Edited');

    const siteSelect = page.locator('.ant-select').filter({hasText: 'Steinhardt'});
    await siteSelect.click();
    await siteSelect.locator('input').fill('Kevorkian');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.getByRole('button', {name: 'Update Location'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/Location-Edited-By-SuperAdmin-details-filled.png', fullPage: true});
        
})