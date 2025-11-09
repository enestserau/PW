import { IApiClient } from "api/apiClients/types.js";
import { apiConfig } from "config/apiConfig.js";
import { IRequestOptions } from "data/sales-portal/types/core.types.js";
import { ICredentials, ILoginResponse } from "data/sales-portal/types/credentials.types.js";

export class LoginApi {
  constructor(private apiClient: IApiClient) {}

  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
    };

    return await this.apiClient.send<ILoginResponse>(options);
  }
}
