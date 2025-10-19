import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/registration.page.js";
import { VALID_REGISTRATION_DATA } from "../data/user.data.js";

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
    await expect(registrationPage.detailsSkills).toHaveText(
      Array.isArray(VALID_REGISTRATION_DATA.skills)
        ? VALID_REGISTRATION_DATA.skills.join(", ")
        : VALID_REGISTRATION_DATA.skills,
    );
    await expect(registrationPage.detailsHobbies).toHaveText(
      Array.isArray(VALID_REGISTRATION_DATA.hobbies)
        ? VALID_REGISTRATION_DATA.hobbies.join(", ")
        : VALID_REGISTRATION_DATA.hobbies,
    );
    const dob = `${VALID_REGISTRATION_DATA.dateOfBirth.day} ${VALID_REGISTRATION_DATA.dateOfBirth.month} ${VALID_REGISTRATION_DATA.dateOfBirth.year}`;
    await expect(registrationPage.detailsDateOfBirth).toHaveText(dob);
    await expect(registrationPage.detailsPassword).toHaveText(/^\*+$/);
  });
});
