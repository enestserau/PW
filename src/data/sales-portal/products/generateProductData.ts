import { faker } from "@faker-js/faker";
import { IProduct } from "data/sales-portal/types/product.types.js";
import { getRandomEnumValue } from "utils/enum.utils.js";
import { MANUFACTURERS } from "data/sales-portal/products/manufactures.js";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}
