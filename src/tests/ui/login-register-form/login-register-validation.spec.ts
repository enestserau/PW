import { test, expect } from "@playwright/test";
import { LoginRegisterPage } from "ui/pages/demo-login-register/login-register.page.js";
import {
  VALID_LOGIN_CREDENTIALS,
  INVALID_USERNAME_CASES,
  INVALID_PASSWORD_CASES,
} from "data/demo-login-form/user.data.js";

test.describe("Login/Register Form Validation @smoke", () => {
  let loginPage: LoginRegisterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginRegisterPage(page);
    await loginPage.open();
  });

  test.describe("Registration - Username validation", () => {
    test("should register with valid username and password", async () => {
      await loginPage.registerFromLoginPage(VALID_LOGIN_CREDENTIALS);
      expect(await loginPage.isSuccessMessageVisible()).toBeTruthy();
    });

    test("should not register with username less than 3 characters", async () => {
      await loginPage.registerFromLoginPage({
        username: INVALID_USERNAME_CASES.tooShort,
        password: VALID_LOGIN_CREDENTIALS.password,
      });
      const error = await loginPage.getRegisterErrorMessage();
      expect(error).toEqual("Username should contain at least 3 characters");
    });

    test("should not register with username of only spaces", async () => {
      await loginPage.registerFromLoginPage({
        username: INVALID_USERNAME_CASES.onlySpaces,
        password: VALID_LOGIN_CREDENTIALS.password,
      });
      const error = await loginPage.getRegisterErrorMessage();
      expect(error).toEqual("Prefix and postfix spaces are not allowed is username");
    });
  });

  test.describe("Registration - Password validation", () => {
    test("should not register with password less than 8 characters", async () => {
      await loginPage.registerFromLoginPage({
        username: VALID_LOGIN_CREDENTIALS.username,
        password: INVALID_PASSWORD_CASES.tooShort,
      });
      const error = await loginPage.getRegisterErrorMessage();
      expect(error).toEqual("Password should contain at least 8 characters");
    });

    test("should not register without lowercase letter in password", async () => {
      await loginPage.registerFromLoginPage({
        username: VALID_LOGIN_CREDENTIALS.username,
        password: INVALID_PASSWORD_CASES.noLowerCase,
      });
      const error = await loginPage.getRegisterErrorMessage();
      expect(error).toEqual("Password should contain at least one character in lower case");
    });

    test("should not register with password of only spaces", async () => {
      await loginPage.registerFromLoginPage({
        username: VALID_LOGIN_CREDENTIALS.username,
        password: INVALID_PASSWORD_CASES.onlySpaces,
      });
      const error = await loginPage.getRegisterErrorMessage();
      expect(error).toEqual("Password is required");
    });
  });

  test.describe("Login - Required fields validation", () => {
    test("should login with valid credentials and see success message", async () => {
      await loginPage.login({
        username: VALID_LOGIN_CREDENTIALS.username,
        password: VALID_LOGIN_CREDENTIALS.password,
      });
      const successMessage = await loginPage.page.locator("#successMessage").textContent();
      expect(successMessage).toContain("Logged in!");
    });

    test("should not login without username", async () => {
      await loginPage.login({
        username: "",
        password: VALID_LOGIN_CREDENTIALS.password,
      });
      const error = await loginPage.getErrorMessage();
      expect(error).toEqual("Username is required");
    });

    test("should not login without password", async () => {
      await loginPage.login({
        username: VALID_LOGIN_CREDENTIALS.username,
        password: "",
      });
      const error = await loginPage.getErrorMessage();
      expect(error).toEqual("Password is required");
    });
  });
});
