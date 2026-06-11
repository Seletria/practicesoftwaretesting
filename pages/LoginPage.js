import { expect } from '@playwright/test';

export class LoginPage {

  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('[data-test="login-submit"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async expectErrorMessage(errorMessage) {
    const errorMessageContainer = this.page.locator('[data-test="login-error"]');

    await expect(errorMessageContainer).toHaveText(errorMessage);
  }

  async expectEmptyEmailError(message) {
    const errorMessageContainer = this.page.locator('#email-error');

    await expect(errorMessageContainer).toHaveText(message);
  }

  async expectEmptyPasswordError(message) {
    const errorMessageContainer = this.page.locator('#password-error');

    await expect(errorMessageContainer).toHaveText(message);
  }
}