import type { Page, Locator } from "@playwright/test";
import type { IRegistrationData } from "./../types/user.types.js";

export class RegistrationPage {
  readonly page: Page;

  // Registration form locators
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly addressInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;
  private readonly countrySelect: Locator;
  private readonly genderRadioMale: Locator;
  private readonly genderRadioFemale: Locator;
  private readonly languageInput: Locator;
  private readonly skillsSelect: Locator;
  private readonly hobbiesCheckboxes: Locator;
  private readonly yearSelect: Locator;
  private readonly monthSelect: Locator;
  private readonly daySelect: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly submitButton: Locator;

  // User details page locators (after registration)
  readonly detailsFullName: Locator;
  readonly detailsAddress: Locator;
  readonly detailsEmail: Locator;
  readonly detailsPhone: Locator;
  readonly detailsCountry: Locator;
  readonly detailsGender: Locator;
  readonly detailsLanguage: Locator;
  readonly detailsSkills: Locator;
  readonly detailsHobbies: Locator;
  readonly detailsDateOfBirth: Locator;
  readonly detailsPassword: Locator;

  constructor(page: Page) {
    this.page = page;

    // Registration form
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.addressInput = page.locator("#address");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.countrySelect = page.locator("#country");
    this.genderRadioMale = page.locator('input[name="gender"][value="male"]');
    this.genderRadioFemale = page.locator('input[name="gender"][value="female"]');
    this.languageInput = page.locator("#language");
    this.skillsSelect = page.locator("#skills");
    this.hobbiesCheckboxes = page.locator(".hobby");
    this.yearSelect = page.locator("#year");
    this.monthSelect = page.locator("#month");
    this.daySelect = page.locator("#day");
    this.passwordInput = page.locator("#password");
    this.confirmPasswordInput = page.locator("#password-confirm");
    this.submitButton = page.locator('button[type="submit"]');

    // User details page to check after submit
    this.detailsFullName = page.locator("#fullName");
    this.detailsAddress = page.locator("#address");
    this.detailsEmail = page.locator("#email");
    this.detailsPhone = page.locator("#phone");
    this.detailsCountry = page.locator("#country");
    this.detailsGender = page.locator("#gender");
    this.detailsLanguage = page.locator("#language");
    this.detailsSkills = page.locator("#skills");
    this.detailsHobbies = page.locator("#hobbies");
    this.detailsDateOfBirth = page.locator("#dateOfBirth");
    this.detailsPassword = page.locator("#password");
  }

  async open() {
    await this.page.goto("/demo-registration-form/");
  }

  async fillRegistrationForm(data: IRegistrationData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.countrySelect.selectOption(data.country);
    if (data.gender === "male") {
      await this.genderRadioMale.check();
    } else {
      await this.genderRadioFemale.check();
    }
    await this.languageInput.fill(data.language);
    await this.skillsSelect.selectOption(data.skills);
    for (const hobby of data.hobbies) {
      await this.page.locator(`.hobby[value="${hobby}"]`).check();
    }
    await this.yearSelect.selectOption(data.dateOfBirth.year);
    await this.monthSelect.selectOption(data.dateOfBirth.month);
    await this.daySelect.selectOption(data.dateOfBirth.day);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async register(data: IRegistrationData) {
    await this.fillRegistrationForm(data);
    await this.submitForm();
  }
}
