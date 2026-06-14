import { chromium, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  const requestContext = await request.newContext();
  const response = await requestContext.post(`${process.env.API_URL}/users/login`, {
    data: {
      email: process.env.CUSTOMER_EMAIL,
      password: process.env.CUSTOMER_PASSWORD
    }
  });

  const body = await response.json();
  const token = body.access_token;

  const browser = await chromium.launch();
  const context = await browser.newContext();

  await context.addInitScript((token) => {
    localStorage.setItem('auth_token', token);
  }, token);

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;