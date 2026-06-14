// import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Product detail tests', () => {

  let productDetailPage;
  let loginPage;

  test.beforeEach(async ({ page, request }) => {
    productDetailPage = new ProductDetailPage(page);
    loginPage = new LoginPage(page);

    const response = await request.get(`${process.env.API_URL}/products`);
    const body = await response.json();

    // await loginPage.goto();
    // await loginPage.login(process.env.CUSTOMER_EMAIL, process.env.CUSTOMER_PASSWORD);
    // await page.waitForURL(/account/);

    const product = body.data.find(p => p.in_stock === true) || body.data[0];

    if (!product || !product.id) {
      throw new Error("Test için geçerli bir ürün bulunamadı.");
    }

    await productDetailPage.goto(product.id);
  })

  test('should add product to cart with increased quantity', async ({ page }) => {
    await productDetailPage.increaseProductQuantity();
    await productDetailPage.increaseProductQuantity();
    await productDetailPage.addProductToCart();

    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await expect(page.locator('#lblCartCount')).toHaveText('3');
  })

  test('should add product to favorites when logged in', async ({ page }) => {
    await productDetailPage.addToFavorites();
    await productDetailPage.toastMessage.waitFor({ state: 'visible', timeout: 5000 });

    const toastText = await productDetailPage.toastMessage.innerText();
    const validMessages = /Product added to your favorites list\.|Product already in your favorites list\./;

    expect(toastText).toMatch(validMessages);

  })

})