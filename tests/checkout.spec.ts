import { test, expect } from "@playwright/test";

test.describe("Checkout tests with customer 02 auth", () => {
  test.use({ storageState: ".auth/customer02.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("buy now pay later", async ({ page, headless }) => {
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();
    await expect(
      page.locator(".step-indicator").filter({ hasText: "2" }),
    ).toBeVisible();
    await page
      .getByTestId("country")
      .selectOption("United States of America (the)");
    await page.getByTestId("postal_code").fill("84000");
    await page.getByTestId("house_number").fill("123");
    await page.getByTestId("street").fill("Main St");
    await page.getByTestId("city").fill("Anytown");
    await page.getByTestId("state").fill("UT");
    await page.getByTestId("proceed-3").click();
    await expect(page.getByTestId("finish")).toBeDisabled();
    await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
    await page
      .getByTestId("monthly_installments")
      .selectOption("6 Monthly Installments");
    await page.getByTestId("finish").click();
    await expect(page.locator(".help-block")).toHaveText(
      "Payment was successful",
    );
  });
});
