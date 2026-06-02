import{test, expect} from'../../../fixtures';
test('Create a new site and verify it appears in the list of Sites', async({page, loginAsCompanyUser})=>{
    await loginAsCompanyUser();
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');
    await page.getByRole('button',{name: 'Ground Control'}).click();
    await page.getByRole('button', {name: 'Sites'}).click()
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/sites');

    await page.getByPlaceholder('Search sites...').fill('Kevorkian');
    await page.waitForTimeout(3000);
    await page.screenshot({path: 'site_search.png', fullPage: true});       



})