import { Page, Locator } from '@playwright/test';

export class LoginPage {

  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(private page: Page) {
    this.emailInput   = page.getByPlaceholder('email');
    this.passwordInput = page.locator('#password');
    this.loginButton  = page.getByRole('button', {name: 'Initiate Access'});
  }

  async goto() {
    await this.page.goto('/sign-in');  
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard');
    await this.page.screenshot({path: `screenshots/login-${email}.png`});
  }
}