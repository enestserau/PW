import { test, expect } from "@playwright/test";
import { credentials } from "../../../../config/env.js";
import { NOTIFICATIONS } from "../../../../data/sales-portal/notifications.js";
import { generateProductData } from "../../../../data/sales-portal/products/generateProductData.js";
import { HomePage } from "../../../../ui/pages/sales-portal/home.page.js";
import { AddNewProductPage } from "../../../../ui/pages/sales-portal/products/addNewProduct.page.js";
import { ProductsListPage } from "../../../../ui/pages/sales-portal/products/productsList.page.js";
import { LoginPage } from "../../../../ui/pages/sales-portal/login.page.js";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", async () => {
  test("Check product details", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();

    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.emailInput.fill(credentials.username);
    await loginPage.passwordInput.fill(credentials.password);
    await loginPage.loginButton.click();

    await homePage.waitForOpened();
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

    await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
    await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
    await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);

    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);
  });
});
