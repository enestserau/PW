import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig.js";
import { credentials } from "config/env.js";
import { STATUS_CODES } from "data/sales-portal/types/statusCodes.js";
import { validateResponse } from "utils/validateResponse.utils.js";
import { loginSchema } from "data/schemas/login.schema.js";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal]", () => {
  test("Login as Admin", async ({ request }) => {
    const response = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    await validateResponse(response, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = response.headers();
    const token = headers["authorization"];
    expect(token, "Authorization token should exist in response headers").toBeTruthy();
  });
});
