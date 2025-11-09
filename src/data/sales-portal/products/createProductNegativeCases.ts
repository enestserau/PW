import { IProduct } from "data/sales-portal/types/product.types.js";

export interface INegativeCreateProductCase {
  title: string;
  preparePayload: (product: IProduct) => Record<string, unknown>;
  expectedErrorMessage?: string | null;
}

export const negativeCreateProductCases: INegativeCreateProductCase[] = [
  {
    title: "Should not create product without name",
    preparePayload: (product) => {
      const payload = { ...product } as Record<string, unknown>;
      delete payload.name;
      return payload;
    },
  },
  {
    title: "Should not create product when name shorter than 3 characters",
    preparePayload: (product) => ({
      ...product,
      name: "A",
    }),
  },
  {
    title: "Should not create product when name longer than 40 characters",
    preparePayload: (product) => ({
      ...product,
      name: `LongName ${"A".repeat(33)}`,
    }),
  },
  {
    title: "Should not create product when name contains invalid characters",
    preparePayload: (product) => ({
      ...product,
      name: "Invalid@ Name",
    }),
  },
  {
    title: "Should not create product when name contains multiple spaces",
    preparePayload: (product) => ({
      ...product,
      name: "Invalid  Name",
    }),
  },
  {
    title: "Should not create product without manufacturer",
    preparePayload: (product) => {
      const payload = { ...product } as Record<string, unknown>;
      delete payload.manufacturer;
      return payload;
    },
  },
  {
    title: "Should not create product without price",
    preparePayload: (product) => {
      const payload = { ...product } as Record<string, unknown>;
      delete payload.price;
      return payload;
    },
  },
  {
    title: "Should not create product when price is below 1",
    preparePayload: (product) => ({
      ...product,
      price: 0,
    }),
  },
  {
    title: "Should not create product when price is above 99999",
    preparePayload: (product) => ({
      ...product,
      price: 100000,
    }),
  },
  {
    title: "Should not create product without amount",
    preparePayload: (product) => {
      const payload = { ...product } as Record<string, unknown>;
      delete payload.amount;
      return payload;
    },
  },
  {
    title: "Should not create product when amount is below 0",
    preparePayload: (product) => ({
      ...product,
      amount: -1,
    }),
  },
  {
    title: "Should not create product when amount is above 999",
    preparePayload: (product) => ({
      ...product,
      amount: 1000,
    }),
  },
  {
    title: "Should not create product when notes exceed 250 characters",
    preparePayload: (product) => ({
      ...product,
      notes: "N".repeat(251),
    }),
  },
  {
    title: "Should not create product when notes contain forbidden symbols",
    preparePayload: (product) => ({
      ...product,
      notes: "Notes with <script> tag",
    }),
  },
];
