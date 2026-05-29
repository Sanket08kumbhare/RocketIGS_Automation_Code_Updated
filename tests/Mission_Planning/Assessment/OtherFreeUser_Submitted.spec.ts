import { test, expect } from '../../../fixtures';
import * as fs from 'fs';

const RATING_OPTIONS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

test('Henry Kelly answers 62 of 62 questions and leaves assessment pending', async ({ page, loginAsHenryKelly }) => {
  test.setTimeout(180000);
  fs.mkdirSync('screenshots', { recursive: true });
  await loginAsHenryKelly();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

  // Click on Free User (Henry Kelly) profile icon
  await page.locator('.ant-dropdown-trigger').filter({ hasText: 'Henry Kelly' }).click();
  await page.waitForTimeout(2000);

  // Click on Tasks
  await page.getByRole('button', { name: 'Tasks' }).click();

  // Click on the Modules task
  await page.getByRole('heading', { name: 'Modules' }).click();


  // Section 1: Answer Q1–Q50
  for (let q = 1; q <= 50; q++) {
    const chosenOption = pickRandom(RATING_OPTIONS);

    const questionBlock = page.locator('div')
      .filter({ hasText: new RegExp(`Q${q}\\.`) })
      .filter({ has: page.locator('input[type="radio"]') })
      .last();

    await questionBlock.getByRole('radio', { name: chosenOption, exact: true }).click();
    console.log(`Q${q}: selected "${chosenOption}"`);
  }

  // Click Next to go to Section 2
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(2000);

  // Section 2: Answer Q51–Q62
  for (let q = 51; q <= 62; q++) {
    const chosenOption = pickRandom(RATING_OPTIONS);

    const questionBlock = page.locator('div')
      .filter({ hasText: new RegExp(`Q${q}\\.`) })
      .filter({ has: page.locator('input[type="radio"]') })
      .last();

    await questionBlock.getByRole('radio', { name: chosenOption, exact: true }).click();
    console.log(`Q${q}: selected "${chosenOption}"`);
  }

  // Click Finish after all 62 questions are answered
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.waitForTimeout(2000);

  // Screenshot: Assessment successfully submitted confirmation
  await page.screenshot({ path: 'screenshots/simontiffany_assessment_submitted.png', fullPage: true });
  console.log('Assessment submitted. Screenshot saved.');

  // Click on Free User icon to open dropdown
  await page.locator('.ant-dropdown-trigger').filter({ hasText: 'Henry Kelly' }).click();
  await page.waitForTimeout(2000);

  // Click on Tasks to see the completed card
  await page.getByRole('button', { name: 'Tasks' }).click();
  await page.waitForTimeout(2000);

  // Screenshot: Modules showing in Completed card
  await page.screenshot({ path: 'screenshots/simontiffany_modules_completed.png', fullPage: true });
  console.log('Modules completed card screenshot saved.');
});
