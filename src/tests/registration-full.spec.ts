import { test, expect } from "@playwright/test";
import { RegistrationPage } from "./pages/registration.page.js";
import { VALID_REGISTRATION_DATA } from "./fixtures/user.data.js";

test.describe("Registration Form - Full Flow @smoke", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
  });

  test("should successfully register and verify submitted data", async () => {
    await registrationPage.open();
    await registrationPage.register(VALID_REGISTRATION_DATA);

    // Verify that entered data equals displayed data
    await expect(registrationPage.detailsFullName).toHaveText(
      `${VALID_REGISTRATION_DATA.firstName} ${VALID_REGISTRATION_DATA.lastName}`,
    );
    await expect(registrationPage.detailsAddress).toHaveText(VALID_REGISTRATION_DATA.address);
    await expect(registrationPage.detailsEmail).toHaveText(VALID_REGISTRATION_DATA.email);
    await expect(registrationPage.detailsPhone).toHaveText(VALID_REGISTRATION_DATA.phone);
    await expect(registrationPage.detailsCountry).toHaveText(VALID_REGISTRATION_DATA.country);
    await expect(registrationPage.detailsGender).toHaveText(VALID_REGISTRATION_DATA.gender);
    await expect(registrationPage.detailsLanguage).toHaveText(VALID_REGISTRATION_DATA.language);
    await expect(registrationPage.detailsSkills).toHaveText(VALID_REGISTRATION_DATA.skills.join(", "));
    await expect(registrationPage.detailsHobbies).toHaveText(VALID_REGISTRATION_DATA.hobbies.join(", "));
    const dateOfBirth = `${VALID_REGISTRATION_DATA.dateOfBirth.day} ${VALID_REGISTRATION_DATA.dateOfBirth.month} ${VALID_REGISTRATION_DATA.dateOfBirth.year}`;
    await expect(registrationPage.detailsDateOfBirth).toHaveText(dateOfBirth);
    await expect(registrationPage.detailsPassword).toHaveText(/^\*+$/);
    const maskedPasswordText = await registrationPage.detailsPassword.textContent();
    expect(maskedPasswordText?.length).toBe(VALID_REGISTRATION_DATA.password.length);
  });
});
