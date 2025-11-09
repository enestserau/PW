import { test, expect } from "fixtures/api.fixture.js";
import { credentials } from "config/env.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import { validateResponse } from "utils/validation/validateResponse.utils.js";
import { loginSchema } from "data/schemas/login.schema.js";

test.describe("[API] [Sales Portal]", () => {
  test("Login as Admin", async ({ loginApi }) => {
    const response = await loginApi.login(credentials);

    validateResponse(response, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const token = response.headers["authorization"];
    expect(token, "Authorization token should exist in response headers").toBeTruthy();
  });
});
