import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(5, "Name should be at least 5 characters")
    .max(100, "Name should not exceed 100 characters"),
  email: z
    .string()
    .email("Invalid email format"),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(500, "Message should not exceed 500 characters"),
  reloadable: z.boolean().optional().default(false)
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const defaultContactData: ContactFormData = {
  name: "",
  email: "",
  message: "",
  reloadable: false,
};