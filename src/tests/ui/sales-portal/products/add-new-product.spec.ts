import { test, expect } from "../../../../fixtures/business.fixture.js";
import { NOTIFICATIONS } from "../../../../data/sales-portal/notifications.js";
import { generateProductData } from "../../../../data/sales-portal/products/generateProductData.js";

test.describe("[Sales Portal] [Products]", () => {
  test("Add new product", async ({ loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
    await loginAsAdmin();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
