import { MANUFACTURERS } from "data/sales-portal/products/manufactures.js";
import { IProduct } from "data/sales-portal/types/product.types.js";

export interface IPositiveCreateProductCase {
  title: string;
  overrides: Partial<IProduct>;
}

export const positiveCreateProductCases: IPositiveCreateProductCase[] = [
  {
    title: "Create product with minimal allowed price",
    overrides: {
      price: 1,
      manufacturer: MANUFACTURERS.SONY,
      amount: 10,
      notes: "Valid minimal price notes",
    },
  },
  {
    title: "Create product with maximal allowed price",
    overrides: {
      price: 99999,
      manufacturer: MANUFACTURERS.APPLE,
      amount: 25,
      notes: "Valid maximal price notes",
    },
  },
  {
    title: "Create product with zero amount",
    overrides: {
      amount: 0,
      price: 250,
      manufacturer: MANUFACTURERS.GOOGLE,
      notes: "Valid zero amount notes",
    },
  },
  {
    title: "Create product with maximal allowed amount and price",
    overrides: {
      amount: 999,
      price: 99999,
      manufacturer: MANUFACTURERS.MICROSOFT,
      notes: "Valid maximal amount and price notes",
    },
  },
  {
    title: "Create product with maximal notes length",
    overrides: {
      price: 870,
      amount: 100,
      manufacturer: MANUFACTURERS.SAMSUNG,
      notes: "N".repeat(250),
    },
  },
];
