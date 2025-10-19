import { test, expect } from "@playwright/test";
import { LoginRegisterPage } from "../pages/login-register.page.js";
import { VALID_LOGIN_CREDENTIALS } from "../data/user.data.js";

test.describe("[UI][POM] Local Storage", () => {
  test("Should login via localStorage (POM)", async ({ page }) => {
    const loginPage = new LoginRegisterPage(page);
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await expect(page.locator("#loginForm")).toBeVisible();

    await page.evaluate(() => localStorage.clear());
    await page.evaluate(
      ({ username, password }) => {
        localStorage.setItem(username, JSON.stringify({ name: username, password: password }));
      },
      {
        username: VALID_LOGIN_CREDENTIALS.username,
        password: VALID_LOGIN_CREDENTIALS.password,
      },
    );

    await page.reload();
    await loginPage.login(VALID_LOGIN_CREDENTIALS);
    expect(await loginPage.isSuccessMessageAfterLogin()).toBeTruthy();
    await expect(page.locator("#successMessage")).toHaveText(`Hello, ${VALID_LOGIN_CREDENTIALS.username}!`);
  });
});
