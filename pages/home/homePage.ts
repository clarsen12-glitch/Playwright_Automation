import { expect, Page } from "@playwright/test";
import { BasePage } from "../helper/basePage";

export type Category =
  | "hand-tools"
  | "power-tools"
  | "other"
  | "special-tools"
  | "rentals";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectCategory(category: Category): Promise<void> {
    await this.page.getByTestId("nav-categories").click();
    await this.page.getByTestId(`nav-${category}`).click();
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.page.getByTestId("search-query").fill(productName);
    await this.page.getByTestId("search-submit").click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId("nav-cart").click();
  }

  async goHome(): Promise<void> {
    await this.page.getByTestId("nav-home").click();
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.page.locator(".col-md-9").getByRole("link")).toHaveCount(
      count,
    );
  }
}
