import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { HomePage } from '../../pages/HomePage';

test.describe('Checkout Page Tests', () => {

  let checkoutPage;
  let homePage;
  let productDetailPage;

  test.beforeEach(async ({ page, request }) => {
    productDetailPage = new ProductDetailPage(page);
    checkoutPage = new CheckoutPage(page);
    homePage = new HomePage(page);

    await homePage.goto();

    const response = await request.get(`${process.env.API_URL}/products`);
    const body = await response.json();
    const product = body.data.find(p => p.in_stock === true) || body.data[0];
    await productDetailPage.goto(product.id);


    await productDetailPage.addProductToCart();
    await page.locator('[data-test="nav-cart"]').click();

  })

  test('should complete checkout as guest', async ({ page }) => {
    await checkoutPage.goto();
    await checkoutPage.clickContinueToCheckOut();
    await checkoutPage.clickAndFillGuestInfo('random121@softwaretesting.com', 'randomName', 'randomSurname');
    await checkoutPage.fillBillingAddress('Algeria', '35500', '111');
    await checkoutPage.selectPaymentMethod('Cash on Delivery');
    await checkoutPage.expectOrderSuccess();

  })
})