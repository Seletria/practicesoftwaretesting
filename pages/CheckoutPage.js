import { expect } from '@playwright/test';

export class CheckoutPage {

  constructor(page) {
    this.page = page;

    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="proceed-1"]');

    this.signInOption = page.locator('a[href="#signin-tab"]');
    this.guestOption = page.locator('a[href="#guest-tab"]');

    this.signInEmail = page.locator('#email');
    this.signInPassword = page.locator('#password');

    this.guestEmail = page.locator('#guest-email');
    this.guestFirstName = page.locator('#guest-first-name');
    this.guestLastName = page.locator('#guest-last-name');
    this.continueAsGuestBtn = page.locator('[data-test="guest-submit"]');

    this.continueToBillingBtn = page.locator('[data-test="proceed-2-guest"]');

    this.countryDropdown = page.locator('#country');
    this.postalCodeInput = page.locator('#postal_code');
    this.houseNumberInput = page.locator('#house_number');
    this.streetInput = page.locator('#street');
    this.stateInput = page.locator('#state');

    this.continueToPaymentBtn = page.locator('[data-test="proceed-3"]');

    this.paymentMethodDropdown = page.locator('#payment-method');
    this.paymentSuccessfullMsg = page.locator('[data-test="payment-success-message"]');
    this.confirmBtn = page.locator('[data-test="finish"]');

    this.successfullMessage = page.locator('#order-confirmation');
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/checkout`);
  }

  async updateProductQuantity(productId, quantity) {
    const quantityInput = this.page.locator(`#quantity-${productId}`);

    await this.quantityInput.fill(quantity);

  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  async clickContinueToCheckOut() {
    await this.checkoutBtn.click();
  }

  async clickAndFillGuestInfo(email, firstName, lastName) {
    await this.guestOption.click();

    await this.guestEmail.fill(email);
    await this.guestFirstName.fill(firstName);
    await this.guestLastName.fill(lastName);

    await this.continueAsGuestBtn.click();
    await this.continueToBillingBtn.waitFor({ state: 'visible' });
    await this.continueToBillingBtn.click();
  }

  async fillBillingAddress(countryName, zipCode, houseNumber) {
    await this.countryDropdown.selectOption({ label: countryName });
    await this.postalCodeInput.fill(zipCode);
    await this.houseNumberInput.fill(houseNumber);

    await expect(this.continueToPaymentBtn).toBeEnabled();
    await this.continueToPaymentBtn.click();

  }

  async selectPaymentMethod(methodValue) {
    await this.paymentMethodDropdown.waitFor({ state: 'visible' });
    await this.paymentMethodDropdown.selectOption(methodValue);

    await expect(this.confirmBtn).toBeEnabled();
    await this.confirmBtn.click();
    await expect(this.paymentSuccessfullMsg).toBeVisible();
    await this.confirmBtn.click();

  }

  async expectOrderSuccess() {
    await this.successfullMessage.waitFor({ state: 'visible' });
    await expect(this.successfullMessage).toContainText('Thanks for your order!');

  }
}