import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  console.log('BASE_URL:', process.env.BASE_URL);
  console.log('API_URL:', process.env.API_URL);
  const browser = await chromium.launch();
  console.log('Browser launched');
  const page = await browser.newPage();
  console.log('Page created');
  await page.goto(`${process.env.BASE_URL}/auth/login`);
  console.log('Navigated to login page');
  await page.screenshot({ path: 'debug-screenshot.png' });
  await page.locator('#email').fill(process.env.CUSTOMER_EMAIL);
  await page.locator('#password').fill(process.env.CUSTOMER_PASSWORD);
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForURL(/account/);

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;