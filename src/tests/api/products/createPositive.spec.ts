import { test, expect } from "fixtures/api.fixture.js";
import { createProductSchema } from "data/schemas/products/create.schema.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { MANUFACTURERS } from "data/sales-portal/products/manufactures.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import { positiveCreateProductCases } from "data/sales-portal/products/createProductPositiveCases.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";
import _ from "lodash";

test.describe("[API] [Sales Portal] [Products] [Create] [Positive]", () => {
  let createdProductId = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (createdProductId && token) {
      await productsApiService.delete(token, createdProductId);
      createdProductId = "";
    }
  });

  for (const testCase of positiveCreateProductCases) {
    test(testCase.title, async ({ productsApi }) => {
      const productData = generateProductData({
        manufacturer: MANUFACTURERS.APPLE,
        notes: "Valid product notes",
        ...testCase.overrides,
      });
      const createResponse = await productsApi.create(productData, token);

      validateResponse(createResponse, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      const { Product } = createResponse.body;
      createdProductId = Product._id;

      expect(_.omit(Product, ["_id", "createdOn"])).toEqual(productData);
    });
  }
});
