import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASE_URL}/auth/login`);
  await page.locator('#email').fill(process.env.CUSTOMER_EMAIL);
  await page.locator('#password').fill(process.env.CUSTOMER_PASSWORD);
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForURL(/account/);

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;