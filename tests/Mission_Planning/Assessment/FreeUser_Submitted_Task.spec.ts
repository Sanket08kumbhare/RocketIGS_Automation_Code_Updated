import { test, expect } from '../../../fixtures';
import * as fs from 'fs';

const RATING_OPTIONS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

test('Free User submits assessment task with random answers', async ({ page, loginAsFreeUser }) => {
  test.setTimeout(180000);
  fs.mkdirSync('screenshots', { recursive: true });
  await loginAsFreeUser();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

    await page.locator('.ant-dropdown-trigger').filter({ hasText: 'Free User' }).click();
    await page.getByRole('button', { name: 'Tasks' }).click();
    await page.getByRole('heading', { name: 'Modules' }).click();
    //await page.getByRole('button', { name: 'Start Assessment' }).click();


  // Answer all 27 questions with a random option each
  for (let q = 1; q <= 27; q++) {
    const chosenOption = pickRandom(RATING_OPTIONS);

    // Find the question block that contains both the Q-number label AND radio inputs.
    // The extra has-radio filter prevents .last() from landing on the innermost text-only
    // div (which has no radio siblings and causes the timeout).
    const questionBlock = page.locator('div')
      .filter({ hasText: new RegExp(`Q${q}\\.`) })
      .filter({ has: page.locator('input[type="radio"]') })
      .last();

    // Click the radio input whose accessible name matches the chosen option.
    await questionBlock.getByRole('radio', { name: chosenOption, exact: true }).click();

    console.log(`Q${q}: selected "${chosenOption}"`);
  }

  // Wait for Finish to become enabled (it starts disabled until all questions are answered)
  const finishBtn = page.getByRole('button', { name: 'Finish' });
  await finishBtn.waitFor({ state: 'visible' });
  await expect(finishBtn).toBeEnabled({ timeout: 15000 });
  await finishBtn.click();
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'screenshots/freeuser_assessment_submitted.png', fullPage: true });
  console.log('Assessment submitted. Screenshot saved.');
});
