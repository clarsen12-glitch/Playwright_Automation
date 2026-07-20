import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home/homePage";

test.describe("Home Page tests with no auth", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL!);
    homePage = new HomePage(page);
  });

  test("check top nav menu", async ({ page }) => {
    await expect(page.getByTestId("nav-home")).toHaveText("Home");
    await expect(page.getByTestId("nav-categories")).toHaveText("Categories");
    await expect(page.getByTestId("nav-contact")).toHaveText("Contact");
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    await expect(page.getByTestId("language-select")).toHaveText("EN");
  });

  test("grid loads with 9 items", async () => {
    await homePage.expectProductCount(9);
  });

  test("search for thor hammer", async ({ page }) => {
    await homePage.searchForProduct("Thor Hammer");
    await homePage.expectProductCount(1);
    await expect(page.getByTestId("product-name")).toHaveText("Thor Hammer");
  });

  test("check category selection", async ({ page }) => {
    await homePage.selectCategory("hand-tools");
    await expect(page).toHaveURL("/category/hand-tools");
    await expect(page.getByLabel("Hand Tools")).toBeVisible();
    await homePage.selectCategory("power-tools");
    await expect(page).toHaveURL("/category/power-tools");
    await expect(page.getByLabel("Power Tools")).toBeVisible();
    await homePage.selectCategory("other");
    await expect(page).toHaveURL("/category/other");
    await expect(page.getByLabel("Other")).toBeVisible();
    await homePage.selectCategory("special-tools");
    await expect(page).toHaveURL("/category/special-tools");
    await expect(page.getByTestId("category-empty")).toHaveText(
      "There are no products found.",
    );
    await homePage.selectCategory("rentals");
    await expect(page).toHaveURL("/rentals");
    await expect(page.getByTestId("page-title")).toHaveText("Rentals");
    await homePage.goHome();
  });
});

test.describe("Home Page tests customer 02 auth", () => {
  test.use({ storageState: ".auth/customer02.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL!);
  });

  test("check if customer 02 is logged in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  });
});
