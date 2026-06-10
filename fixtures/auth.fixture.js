import { test as base } from '@playwright/test';
import { AuthAPI } from '../tests/api/AuthAPI';

export const test = base.extend({

  token: async ({ request }, use) => {
    const authAPI = new AuthAPI(request);
    const token = await authAPI.getToken();

    await use(token);
  },

  authenticatedRequest: async ({ request, token }, use) => {

    await use({
      post: (url, options = {}) => request.post(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`, ...options.headers
        }
      }),
      delete: (url, options = {}) => request.delete(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`, ...options.headers
        }
      }),
      get: (url, options = {}) => request.get(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`, ...options.headers
        }
      })
    });
  }

})

export { expect } from '@playwright/test';

