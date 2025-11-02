import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { credentials } from "config/env.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { createProductSchema } from "data/schemas/products/create.schema.js";
import { getAllProductsSchema } from "data/schemas/products/getAllProducts.schema.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils.js";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let createdProductId = "";
  let token = "";

  test.afterEach(async ({ request }) => {
    if (createdProductId && token) {
      const response = await request.delete(`${baseURL}${endpoints.products}/${createdProductId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status()).toBe(STATUS_CODES.DELETED);
    }
  });

  test("Get All Products - Smoke", async ({ request }) => {
    // Залогиниться
    const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const loginBody = await loginResponse.json();
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    // Создать продукт и проверить 201й статус
    const productData = generateProductData();
    const createProductResponse = await request.post(`${baseURL}${endpoints.products}`, {
      data: productData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    createdProductId = createProductBody.Product._id;

    // Получить все продукты
    const getAllProductsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const getAllProductsBody = await getAllProductsResponse.json();

    // Создать и проверить схему
    // Проверить статус
    // Проверить поля IsSuccess и ErrorMessage
    await validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // Проверить, что в массиве тела респонса есть созданный продукт
    const products = getAllProductsBody.Products;
    const foundProduct = products.find((product: { _id: string }) => product._id === createdProductId);
    expect(foundProduct, "Created product should be present in the products array").toBeTruthy();
    expect(_.omit(foundProduct, ["_id", "createdOn"]), "Product data should match created product").toEqual(
      productData,
    );
  });
});
