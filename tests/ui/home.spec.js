import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Homepage tests', () => {

  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.goto();
    await homePage.waitForProducts();
  })

  test('should filter products by selected category', async ({ page, request }) => {
    const response = await request.get(`${process.env.API_URL}/categories`);
    const body = await response.json();
    const beforeCount = await homePage.getProductCount();

    await homePage.filteredByCategory('Hammer', beforeCount);
    const afterCount = await homePage.getProductCount();

    expect(afterCount).toBeLessThan(beforeCount);

  })

  test('should display search results for searched term', async ({ page }) => {
    await homePage.searchingProduct('pliers');

    await expect(page.locator('[data-test="search-term"]')).toHaveText('pliers');
  })
})