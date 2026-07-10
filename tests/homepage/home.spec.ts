import { test, expect } from "@playwright/test";

test.describe("Home Page tests with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("check top nav menu", async ({ page }) => {
    await expect(page.getByTestId("nav-home")).toHaveText("Home");
    await expect(page.getByTestId("nav-categories")).toHaveText("Categories");
    await expect(page.getByTestId("nav-contact")).toHaveText("Contact");
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    await expect(page.getByTestId("language-select")).toHaveText("EN");
  });

  test("grid loads with 9 items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
  });

  test("search for thor hammer", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

test.describe("Home Page tests customer 02 auth", () => {
  test.use({ storageState: ".auth/customer02.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("check if customer 02 is logged in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  });
});
