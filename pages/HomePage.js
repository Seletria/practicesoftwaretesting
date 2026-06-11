import { expect } from '@playwright/test';

export class HomePage {

  constructor(page) {
    this.page = page;

    this.productContainer = page.locator('.container');

    this.searchInput = page.locator('#search-query');
    this.searchButton = page.locator('[data-test="search-submit"]');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL);
  }

  async searchingProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async filteredByCategory(categoryName, currentCount) {
    await this.page.getByLabel(categoryName).click();
    // await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('[data-test^="product-"]')).not.toHaveCount(currentCount);


  }

  async getProductCount() {
    return await this.page.locator('[data-test^="product-"]').count();
  }

  async waitForProducts() {
    await this.page.locator('[data-test^="product-"]').first().waitFor();
  }

}