import { test, expect } from "@playwright/test";

test.describe("Heroku app - dynamic controls", () => {
  test("Check elements on the page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
    const removeButton = page.getByRole("button", { name: "Remove" });
    await expect(removeButton, "Remove button is displayed").toBeVisible();
    await expect(page.getByRole("heading", { name: "Dynamic Controls" }), "Title is displayed").toBeVisible();
    const checkbox = page.locator('[label="blah"]');
    await checkbox.check();
    await expect(checkbox, "Checkbox is cheched").toBeChecked();
    await removeButton.click();
    await expect(checkbox, "Checkbox is not displayed").not.toBeVisible();
    const addButton = page.getByRole("button", { name: "Add" });
    await expect(addButton, "Add button is displayed").toBeVisible();
    const message = page.locator("p#message");
    await expect(message, "Check message").toHaveText("It's gone!");
    await addButton.click();
    await expect(page.locator("#checkbox"), "Checkbox is cheched").toBeVisible();
    await expect(message, "Check message").toHaveText("It's back!");
  });
});
