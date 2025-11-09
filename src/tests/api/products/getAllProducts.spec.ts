import { test, expect } from "fixtures/api.fixture.js";
import { credentials } from "config/env.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { createProductSchema } from "data/schemas/products/create.schema.js";
import { getAllProductsSchema } from "data/schemas/products/getAllProducts.schema.js";
import { loginSchema } from "data/schemas/login.schema.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import { IProduct } from "data/sales-portal/types/product.types.js";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils.js";

test.describe("[API] [Sales Portal] [Products]", () => {
  let createdProductId = "";
  let token = "";
  let productData: IProduct | undefined;

  test.afterEach(async ({ productsApiService }) => {
    if (createdProductId && token) {
      await productsApiService.delete(token, createdProductId);
      createdProductId = "";
    }
  });

  test("Get All Products - Smoke", async ({ loginApi, productsApi }) => {
    // Залогиниться
    const loginResponse = await loginApi.login(credentials);
    validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
      schema: loginSchema,
    });

    token = loginResponse.headers["authorization"]!;
    expect(token).toBeTruthy();

    // Создать продукт и проверить 201й статус
    productData = generateProductData();
    const createProductResponse = await productsApi.create(productData, token);

    validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    createdProductId = createProductResponse.body.Product._id;

    // Получить все продукты
    const getAllProductsResponse = await productsApi.getAll(token);

    validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // Проверить, что в массиве тела респонса есть созданный продукт
    const products = getAllProductsResponse.body.Products;
    const foundProduct = products.find((product: { _id: string }) => product._id === createdProductId);
    expect(foundProduct, "Created product should be present in the products array").toBeTruthy();
    expect(_.omit(foundProduct, ["_id", "createdOn"]), "Product data should match created product").toEqual(
      productData,
    );
  });
});
