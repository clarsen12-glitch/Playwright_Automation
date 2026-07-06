import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

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
}
