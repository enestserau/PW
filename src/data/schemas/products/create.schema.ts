import { obligatoryFieldsSchema, obligatoryRequredFields } from "data/schemas/coreSchema.js";
import { productSchema } from "./product.schema.js";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...obligatoryFieldsSchema,
  },
  required: ["Product", ...obligatoryRequredFields],
};
