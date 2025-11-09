import { test } from "fixtures/api.fixture.js";
import { generateProductData } from "data/sales-portal/products/generateProductData.js";
import { ERROR_INCORRECT_BODY } from "data/sales-portal/notifications.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import { IProduct } from "data/sales-portal/types/product.types.js";
import { negativeCreateProductCases } from "data/sales-portal/products/createProductNegativeCases.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";

test.describe("[API] [Sales Portal] [Products] [Create] [Negative]", () => {
  let token = "";
  const createdProductIds: string[] = [];

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    while (createdProductIds.length && token) {
      const productId = createdProductIds.pop();
      if (productId) {
        await productsApiService.delete(token, productId);
      }
    }
  });

  for (const testCase of negativeCreateProductCases) {
    test(testCase.title, async ({ productsApi }) => {
      const validProduct = generateProductData({
        notes: "Invalid product notes",
      });

      const payload = testCase.preparePayload({ ...validProduct });
      console.log(payload);
      const response = await productsApi.create(payload as unknown as IProduct, token);

      validateResponse(response, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: ERROR_INCORRECT_BODY ?? undefined,
      });
    });
  }
});
