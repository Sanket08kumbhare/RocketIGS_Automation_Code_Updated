import{test, expect} from'../../../fixtures';
test('SuperAdmin:Apply Site filter on Locations and verify filtered results', async({page, loginAsAdmin})=>{
    await loginAsAdmin();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');
    await page.locator('.ant-select').filter({hasText: 'Select Company'}).click();
    await page.getByRole('option', { name: /Globex/ }).click();
    await expect(page).toHaveURL(/\/globex\//);

    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Locations'}).click();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/locations');

    const Selectfilter = page.getByRole('button', {name: 'Site', exact: true});
    await Selectfilter.click();

    await page.getByPlaceholder('Search site...').fill('Kevorkian');
    await page.getByRole('button', {name: 'Kevorkian', exact: true}).click();

    await page.waitForTimeout(2000);
    await page.screenshot({path: 'screenshots/Location-Filter-Applied-By-SuperAdmin.png', fullPage: true});

})