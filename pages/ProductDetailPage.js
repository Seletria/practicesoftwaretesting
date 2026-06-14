export class ProductDetailPage {

  constructor(page) {
    this.page = page;

    this.productTitle = page.locator('[data-test="product-name"]');
    this.decreaseButton = page.locator('#btn-decrease-quantity');
    this.increaseButton = page.locator('#btn-increase-quantity');
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.addToFavoritesButton = page.locator('#btn-add-to-favorites');
    this.shoppingCart = page.locator('[data-test="nav-cart"]');

    this.toastMessage = page.locator('#toast-container .toast-message');
  }

  // async goto(productId) {
  //   const baseUrl = process.env.BASE_URL.replace(/\/$/, '');
  //   await this.page.goto(`${process.env.BASE_URL}/product/${productId}`);
  //   await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });

  // }

  async goto(productId) {
    const baseUrl = process.env.BASE_URL.replace(/\/$/, '');

    // CI ortamındaki yavaşlığı egale etmek için sayfa ağ trafiğinin durulmasını (networkidle) 
    // veya DOM'un tamamen hazır olmasını (domcontentloaded) tetikliyoruz.
    await this.page.goto(`${baseUrl}/product/${productId}`, {
      waitUntil: 'domcontentloaded'
    });

    // Elementin DOM'a eklenmesini (attached) ve ardından görünür (visible) olmasını garanti ediyoruz.
    await this.productTitle.waitFor({ state: 'attached', timeout: 15000 });
    await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async addToFavorites() {
    await this.addToFavoritesButton.waitFor({ state: 'visible' });
    await this.addToFavoritesButton.click();
  }

  async decreaseProductQuantity() {
    await this.decreaseButton.click();
  }
  async increaseProductQuantity() {
    await this.increaseButton.click();
  }

}