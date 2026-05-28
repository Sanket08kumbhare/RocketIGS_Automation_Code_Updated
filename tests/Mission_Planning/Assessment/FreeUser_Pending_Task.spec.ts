import { test, expect } from '../../../fixtures';
import * as fs from 'fs';

const RATING_OPTIONS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

test('Dennis Heather answers 5 of 27 questions and leaves assessment pending', async ({ page, loginAsDennis }) => {
  test.setTimeout(180000);
  fs.mkdirSync('screenshots', { recursive: true });
  await loginAsDennis();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

    await page.locator('.ant-dropdown-trigger').filter({ hasText: 'Dennis Heather' }).click();
    await page.getByRole('button', { name: 'Tasks' }).click();
    await page.getByRole('heading', { name: 'Modules' }).click();
    //await page.getByRole('button', { name: 'Start Assessment' }).click();


  // Answer only 5 out of 27 questions to leave the assessment in a pending state
  for (let q = 1; q <= 6; q++) {
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

  // Do NOT click Finish — assessment intentionally left in pending state (5/27 answered)
  await page.waitForTimeout(2000);

  await page.locator('.ant-dropdown-trigger').filter({ hasText: 'Dennis Heather' }).click();
  await page.getByRole('button', { name: 'Tasks' }).click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/heatherdennis_assessment_pending.png', fullPage: true });
  console.log('6 questions answered. Assessment left pending. Screenshot saved.');
});
