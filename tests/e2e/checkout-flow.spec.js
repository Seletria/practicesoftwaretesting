import { test, expect } from '../../fixtures/auth.fixture';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { generateCheckoutData } from '../../utils/faker';

test.describe('E2E test', () => {

  let productDetailPage;
  let checkoutPage;

  test.beforeEach(async ({ authenticatedRequest, page }) => {
    productDetailPage = new ProductDetailPage(page);
    checkoutPage = new CheckoutPage(page);

    const response = await authenticatedRequest.get(`${process.env.API_URL}/products`);
    const body = await response.json();

    const product = body.data.find(p => p.in_stock === true) || body.data[0];
    await productDetailPage.goto(product.id);

  })

  test('should complete full checkout flow as guest', async ({ page }) => {
    const checkoutData = generateCheckoutData();

    await productDetailPage.addProductToCart();
    await page.locator('[data-test="nav-cart"]').click();
    await checkoutPage.clickContinueToCheckOut();
    await checkoutPage.clickAndFillGuestInfo(checkoutData.email, checkoutData.name, checkoutData.surname);
    await checkoutPage.fillBillingAddress('Algeria', checkoutData.zipcode, checkoutData.houseNumber);
    await checkoutPage.selectPaymentMethod('Cash on Delivery');
    await checkoutPage.expectOrderSuccess();

  })
})