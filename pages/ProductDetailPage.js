export class ProductDetailPage {

  constructor(page) {
    this.page = page;

    this.productTitle = page.locator('[data-test="product-name"]');
    this.decreaseButton = page.locator('#btn-decrease-quantity');
    this.increaseButton = page.locator('#btn-increase-quantity');
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.addToFavoritesButton = page.locator('#btn-add-to-favorites');
    this.shoppingCart = page.locator('[data-test="nav-cart"]');

  }

  async goto(productId) {
    await this.page.goto(`${process.env.BASE_URL}/product/${productId}`);
    await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });

  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();
  }

  async decreaseProductQuantity() {
    await this.decreaseButton.click();
  }
  async increaseProductQuantity() {
    await this.increaseButton.click();
  }

}