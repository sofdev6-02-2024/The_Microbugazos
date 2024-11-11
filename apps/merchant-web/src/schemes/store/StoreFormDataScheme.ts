import { z } from "zod";

const fileSchema = z.instanceof(File).optional();

const americanDialCodes = [
  "1","52","53","54","55","56","57",
  "58","501","502","503","504","505",
  "506","507","508","509","591","592",
  "593","594","595","596","597","598","599",
] as const;

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
    .min(1, "Phone number is mandatory")
    .refine(
      (phone) =>
        americanDialCodes.some((code) => {
          console.log(phone);
          if (phone.startsWith(code)) {
            console.log(phone.length - code.length);
            return phone.length - code.length >= 6;
          }
          return false;
        }),
      "Phone number must be at least 6 digits long"
    )
    .refine(
      (phone) => americanDialCodes.some((code) => phone.startsWith(code)),
      "Invalid dial code"
    ),
  bannerImage: fileSchema,
  profileImage: fileSchema,
  bannerImageUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
  id: z.string().optional(),
});

export type StoreFormData = z.infer<typeof StoreFormScheme>;

export const defaultStoreFormData = {
  id: "",
  name: "",
  description: "",
  address: "",
  phoneNumber: "",
  bannerImage: new File([], ""),
  profileImage: new File([], ""),
  bannerImageUrl: "",
  profileImageUrl: "",
};
