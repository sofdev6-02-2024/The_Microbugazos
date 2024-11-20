import { z } from "zod";
import parsePhoneNumber, {
  CountryCode,
  parsePhoneNumberFromString,
  PhoneNumber,
} from "libphonenumber-js";
import { StoreFormDto } from "./StoreFormDto";

const fileSchema = z.instanceof(File).optional();

function isValidPhoneNumber(phoneNumber: string, countryCode: CountryCode) {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, countryCode);
  return phoneNumberObj ? phoneNumberObj.isValid() : false;
}

export const StoreFormScheme = z.object({
  name: z
    .string()
    .max(30, "Name cannot be more than 30 characters.")
    .regex(
      /^[a-zA-Z0-9 ]*$/,
      "Name can only contain letters, numbers, and spaces."
    )
    .refine(
      (value) => !/^\s*$/.test(value),
      "Name cannot contain only whitespace."
    )
    .refine(
      (value) => !/\s{2,}/.test(value),
      "Name cannot contain more than one consecutive space."
    )
    .refine(
      (value) => value.length >= 2,
      "Name cannot be empty, must contain at least 2 character."
    ),
  description: z
    .string()
    .max(300, "Description cannot be more than 300 characters.")
    .refine(
      (value) => !/^\s*$/.test(value),
      "Description cannot contain only whitespace."
    )
    .refine(
      (value) => value.trim().length >= 10,
      "Description cannot be empty, must contain at least 10 character."
    ),
  address: z
    .string()
    .max(60, "Address cannot be more than 60 characters.")
    .regex(
      /^[a-zA-Z0-9., -]+$/,
      "Address can only contain letters, numbers, spaces, commas, periods, and hyphens."
    )
    .min(8, "Address must be at least 8 characters.")
    .refine(
      (value) => !/\s{2,}/.test(value),
      "Name cannot contain more than one consecutive space."
    ),
  phoneNumber: z.string().refine(
    (phone) => {
      if (phone.length === 0) return false;
      const parsedPhoneNumber: PhoneNumber | undefined = parsePhoneNumber(
        `+${phone}`
      );

      if (parsedPhoneNumber === undefined) {
        return false;
      }
      return isValidPhoneNumber(
        phone,
        parsedPhoneNumber.country as CountryCode
      );
    },
    {
      message: "Please enter a valid and complete phone number.",
    }
  ),
  bannerImage: fileSchema,
  profileImage: fileSchema,
  bannerImageUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
  reloadable: z.string().optional(),
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
  reloadable: "",
};

export const parseDtoToScheme = (store: StoreFormDto): StoreFormData => {
  return {
    id: store.id ?? "",
    name: store.name,
    description: store.description,
    address: store.address,
    phoneNumber: store.phoneNumber,
    bannerImage: new File([], ""),
    profileImage: new File([], ""),
    bannerImageUrl: store.bannerImage ?? "",
    profileImageUrl: store.profileImage ?? "",
    reloadable: "",
  };
};
