import { obligatoryFieldsSchema, obligatoryRequredFields } from "../coreSchema.js";
import { productSchema } from "./product.schema.js";

export const getAllProductsSchema = {
  type: "object",
  properties: {
    Products: {
      type: "array",
      items: productSchema,
    },
    ...obligatoryFieldsSchema,
  },
  required: ["Products", ...obligatoryRequredFields],
};
