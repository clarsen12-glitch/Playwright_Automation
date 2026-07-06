import { test, expect } from "@playwright/test";
import { CartPage } from "../../pages/cart/cartPage";

test.describe("Checkout tests with customer 02 auth", () => {
  test.use({ storageState: ".auth/customer02.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL!);
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
    headless
      ? await test.step("visual test", async () => {
          await expect(page).toHaveScreenshot("checkout.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")],
          });
        })
      : console.log("Visual test skipped in headed mode");
  });

  test("remove item from cart", async ({ page }) => {
    await page.getByText("Bolt Cutters").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-cart").click();
    const cartPage = new CartPage(page);
    await cartPage.removeProduct("Bolt Cutters");
    await cartPage.expectCartEmpty();
    await page.getByTestId("nav-home").click();
  });

  test("remove multiple items from cart", async ({ page }) => {
    await page.getByText("Bolt Cutters").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-home").click();
    await page.getByText("Thor Hammer").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("2");
    await page.getByTestId("nav-home").click();
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("3");
    await page.getByTestId("nav-cart").click();
    const cartPage = new CartPage(page);
    await cartPage.removeProduct("Bolt Cutters");
    await cartPage.removeProduct("Thor Hammer");
    await cartPage.removeProduct("Claw Hammer with Shock Reduction Grip");
    await cartPage.expectCartEmpty();
    await page.getByTestId("nav-home").click();
  });

  test("adjust quantity in cart", async ({ page }) => {
    await page.getByText("Bolt Cutters").click();
    await page.getByTestId("quantity").fill("5");
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("5");
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("product-quantity").fill("1");
    await expect(page.getByTestId("product-price")).toContainText("48.41");
    const cartPage = new CartPage(page);
    await cartPage.removeProduct("Bolt Cutters");
    await page.locator(".btn.btn-danger").click();
    await cartPage.expectCartEmpty();
    await page.getByTestId("nav-home").click();
  });
});
