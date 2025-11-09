import { obligatoryFieldsSchema, obligatoryRequredFields } from "./coreSchema.js";
import { userSchema } from "./users/user.schema.js";

export const loginSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema,
    User: userSchema,
  },
  required: [...obligatoryRequredFields, "User"],
};
