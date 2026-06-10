import { test, expect } from '@playwright/test';
import { AuthAPI } from './AuthAPI.js'

test.describe('Authentication API', () => {

  test('should return a valid token on successful login', async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const token = await authAPI.getToken();

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

  })

  test('should return an invalid token on error', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/users/login`, {
      data: {
        email: 'sadas@gmail.com',
        password: '123123'
      }
    })

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
  })
})