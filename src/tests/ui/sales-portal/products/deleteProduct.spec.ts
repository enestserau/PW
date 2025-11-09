import { test, expect } from "fixtures/business.fixture.js";
import { NOTIFICATIONS } from "data/sales-portal/notifications.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  test("Delete product", async ({ loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
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
    await productsListPage.closeToastMessage();
    const actual = await productsListPage.getProductData(productData.name);
    expect(_.omit(actual, ["createdOn"])).toEqual(_.omit(productData, ["notes", "amount"]));
    await productsListPage.deleteButton(productData.name).click();
    const { peoductDeleteModal } = productsListPage;
    await peoductDeleteModal.waitForOpened();
    await peoductDeleteModal.clickDelete();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});
