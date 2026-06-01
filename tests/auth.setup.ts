import { test as setup, expect } from "@playwright/test";

setup("Create customer 01 authentication", async ({ page, context }) => {
  const email = "customer2@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer02AuthFile = ".auth/customer02.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jack Howe",
  );
  await page.context().storageState({ path: customer02AuthFile });
});
