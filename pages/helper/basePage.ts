import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async selectByTestId(testId: string, value: string) {
    await this.page.getByTestId(testId).selectOption(value);
  }
}
