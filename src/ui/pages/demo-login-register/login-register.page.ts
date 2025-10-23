import type { Page } from "@playwright/test";
import type { Locator } from "@playwright/test";
import type { ILoginCredentials } from "../../../data/demo-login-form/types/user.types.js";

export class LoginRegisterPage {
  readonly page: Page;

  // Login form elements
  private readonly loginUsername: Locator;
  private readonly loginPassword: Locator;
  private readonly loginSubmitButton: Locator;
  private readonly registerOnLoginButton: Locator;

  // Register form elements
  readonly registerForm: Locator;
  private readonly registerUsername: Locator;
  private readonly registerPassword: Locator;
  private readonly registerButton: Locator;

  // Messages
  private readonly errorMessage: Locator;
  private readonly errorMessageOnRegister: Locator;
  private readonly successMessage: Locator;
  private readonly successLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login form
    this.loginUsername = page.locator("#userName");
    this.loginPassword = page.locator("#password");
    this.loginSubmitButton = page.locator("#submit");
    this.registerOnLoginButton = page.locator("#registerOnLogin");

    // Register form
    this.registerForm = page.locator(".registerForm");
    this.registerUsername = page.locator("#userNameOnRegister");
    this.registerPassword = page.locator("#passwordOnRegister");
    this.registerButton = page.locator("#register");

    // Messages
    this.errorMessage = page.locator("#errorMessage");
    this.errorMessageOnRegister = page.locator("#errorMessageOnRegister");
    this.successMessage = page.locator('#errorMessageOnRegister:has-text("Successfully registered")');
    this.successLoginMessage = page.locator("#successMessage");
  }

  async open() {
    await this.page.goto("/demo-login-form/");
  }

  async login(credentials: ILoginCredentials) {
    await this.loginUsername.fill(credentials.username);
    await this.loginPassword.fill(credentials.password);
    await this.loginSubmitButton.click();
  }

  async isRegisterFormVisible() {
    return await this.registerForm.isVisible();
  }

  async openRegisterForm() {
    await this.registerOnLoginButton.click();
  }

  async registerFromLoginPage(credentials: ILoginCredentials) {
    await this.openRegisterForm();
    await this.registerUsername.fill(credentials.username);
    await this.registerPassword.fill(credentials.password);
    await this.registerButton.click();
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async isSuccessMessageAfterLogin(): Promise<boolean> {
    return await this.successLoginMessage.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || "";
  }

  async getRegisterErrorMessage(): Promise<string> {
    return (await this.errorMessageOnRegister.textContent()) || "";
  }
}
