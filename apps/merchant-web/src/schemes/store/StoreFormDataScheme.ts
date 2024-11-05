import { z } from "zod";

const fileSchema = z.instanceof(File).optional();

export const StoreFormScheme = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(12, "Name must be at most 12 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(250, "Description must be at most 250 characters long"),
  address: z
    .string()
    .min(3, "Address must be at least 12 characters long")
    .max(30, "Address must be at most 30 characters long"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits"),
  bannerImage: fileSchema,
  profileImage: fileSchema,
});

export type StoreFormData = z.infer<typeof StoreFormScheme>;

export const defaultStoreFormData = {
  name: "",
  description: "",
  address: "",
  phoneNumber: "",
  bannerImage: new File([], ""),
  profileImage: new File([], ""),
};
