import { test as base, expect } from "@playwright/test";
import { HomePage } from "../ui/pages/sales-portal/home.page.js";
import { AddNewProductPage } from "../ui/pages/sales-portal/products/addNewProduct.page.js";
import { ProductsListPage } from "../ui/pages/sales-portal/products/productsList.page.js";
import { LoginPage } from "../ui/pages/sales-portal/login.page.js";

export interface IPages {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  loginPage: LoginPage;
}

export const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
