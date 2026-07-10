import { Page, expect } from "@playwright/test";
import { BasePage } from "../helper/basePage";

export type PaymentMethod =
  | "bank-transfer"
  | "cash-on-delivery"
  | "credit-card"
  | "buy-now-pay-later"
  | "gift-card";

export type MonthlyInstallments = "3" | "6" | "9" | "12";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async removeProduct(productName: string) {
    const row = this.page.locator("tr").filter({
      has: this.page.locator('[data-test="product-title"]', {
        hasText: productName,
      }),
    });

    await row.locator("a.btn-danger").click();
    await expect(row).toHaveCount(0);
  }

  async expectCartEmpty() {
    await expect(this.page.locator("tbody tr")).toHaveCount(0);
    await expect(
      this.page.getByText("The cart is empty. Nothing to display."),
    ).toBeVisible();
  }

  async selectCountry(countryCode: string) {
    await this.selectByTestId("country", countryCode);
  }

  async selectPaymentMethod(method: PaymentMethod) {
    await this.selectByTestId("payment-method", method);
  }

  async selectMonthlyInstallments(installments: MonthlyInstallments) {
    await this.selectByTestId("monthly_installments", installments);
  }
}
