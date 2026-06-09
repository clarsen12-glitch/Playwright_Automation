import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login/loginPage";

setup("Create customer 01 authentication", async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const customer02AuthFile = ".auth/customer02.json";

  await loginPage.goto();
  await loginPage.login(process.env.CUST2!, process.env.PASS!);
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  await page.context().storageState({ path: customer02AuthFile });
});
