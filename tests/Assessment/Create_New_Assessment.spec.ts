import {test, expect} from '@playwright/test';

test ('Check the Assessment Report', async({page})=> {

    await page.goto('https://uat-rocketigs.harrier.digital/sign-in');
    await page.getByPlaceholder('email').fill('patrick.rachel@mailinator.com');
    await page.locator('#password').fill('Test@123');
    await page.getByRole('button', {name: 'Initiate Access'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

    await page.getByRole('button', {name: 'Mission Planning'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator("//a[@href='/globex/assessments']").click();
    await page.waitForLoadState('load');
    await page.getByRole('button', {name: 'Add'}).click();
    await page.waitForSelector('[placeholder="Enter assessment name"]');
    await page.getByPlaceholder('Enter assessment name').fill('Modules');

    await page.getByRole('combobox').nth(0).click();
    await page.locator('div').filter({ hasText: /^Full Assessment$/ }).last().click();

    await page.getByRole('combobox').nth(1).click();
    await page.locator('div').filter({ hasText: /^Shimkin$/ }).last().click();

    const targetCompletionDateIcon = page.locator('div').filter({ hasText: /^Target Completion Date/ }).locator('button[type="button"]').first();
    await targetCompletionDateIcon.click();
    const nextMonthButton = page.locator('button.w-7.h-7').filter({ hasText: '›' });
    await nextMonthButton.click();
    await page.getByRole('button', { name: '15', exact: true }).click();

    await page.getByRole('button', {name: 'Save Assessment'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL("https://uat-rocketigs.harrier.digital/globex/assessments");
    await page.screenshot({ path: 'assessment_creation.png', fullPage: true });









})