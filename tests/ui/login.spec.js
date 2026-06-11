import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  })

  test('should redirect user to account after login', async ({ page }) => {
    await loginPage.login(process.env.CUSTOMER_EMAIL, process.env.CUSTOMER_PASSWORD);

    await expect(page).toHaveURL(`${process.env.BASE_URL}/account`);
  })

  test('should display error message when email or password is wrong', async ({ page }) => {
    const invalidEmail = `wrong_${Date.now()}@test.com`;
    await loginPage.login(invalidEmail, process.env.CUSTOMER_PASSWORD);

    await loginPage.expectErrorMessage('Invalid email or password');
  })

  test('should display error message when email is empty', async ({ page }) => {
    await loginPage.login('', process.env.CUSTOMER_PASSWORD);

    await loginPage.expectEmptyEmailError('Email is required');
  })

  test('should display error message when password is empty', async ({ page }) => {
    await loginPage.login(process.env.CUSTOMER_EMAIL, '');

    await loginPage.expectEmptyPasswordError('Password is required');
  })

})