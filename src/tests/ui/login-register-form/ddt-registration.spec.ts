import { test, expect } from "@playwright/test";
import { LoginRegisterPage } from "../../../ui/pages/demo-login-register/login-register.page.js";
import { INVALID_REGISTER_CRED } from "../../../data/demo-login-form/user.data.js";

test.describe("Demo Login/Register - Negative validations (DDT)", () => {
  test.beforeEach(async ({ page }) => {
    const p = new LoginRegisterPage(page);
    await p.open();
  });

  // Registration negative cases
  for (const tc of INVALID_REGISTER_CRED) {
    test(`[Registration negative cases]: login "${tc.username}" password "${tc.password}"`, async ({ page }) => {
      const p = new LoginRegisterPage(page);
      await p.registerFromLoginPage(tc);
      const errorMessage = await p.getRegisterErrorMessage();
      expect(errorMessage).toEqual(tc.errorMessage);
    });
  }
});
