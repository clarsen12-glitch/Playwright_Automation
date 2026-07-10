import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";

test("login without page object test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe",
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account",
  );
});

test("login with page object test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("customer2@practicesoftwaretesting.com", "welcome01");
  await expect(page.getByTestId("nav-menu")).toContainText("Johnny Black");
});
