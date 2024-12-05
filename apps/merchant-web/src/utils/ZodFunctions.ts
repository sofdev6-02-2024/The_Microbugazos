import {z} from "zod";

export const validateWithZod = (schema: z.ZodSchema) => (values: any) => {
  try {
    schema.parse(values);
    return {};
  } catch (error) {
    const zodErrors = (error as z.ZodError).flatten();
    return zodErrors.fieldErrors;
  }
};
