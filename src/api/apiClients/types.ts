import { IRequestOptions, IResponse } from "data/sales-portal/types/core.types.js";

export interface IApiClient {
  send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;
}
