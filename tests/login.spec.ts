import { test, expect } from '../fixtures';
import { LoginPage } from '../pages/LoginPage';
import users from '../data/users.json';

for (const user of users) {

  test(`[${user.role}] Login Test`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page).toHaveURL(new RegExp(user.expectedURL));

    console.log(` ${user.role} - Login successful`);
  });

}