import{test, expect} from'../../../fixtures';
test('SuperAdmin:Delete a Location and verify it is removed from the list', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');

    const othmerRow = page.locator('tr', {hasText: 'Sample Location'}).first();
    await othmerRow.hover();
    await othmerRow.locator('button').nth(1).click();

    await page.getByRole('button', {name: 'Delete'}).click();
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/Location-Deleted-By-SuperAdmin.png', fullPage: true});

})