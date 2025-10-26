import { BasePage } from "./base.page.js";
import { SALES_PORTAL_URL } from "../../../config/env.js";
import { ICredentials } from "../../../data/sales-portal/types/credentials.types.js";

export class LoginPage extends BasePage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");

  async openLogin() {
    await this.page.goto(SALES_PORTAL_URL);
  }

  async fillForm(credentials: ICredentials) {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
