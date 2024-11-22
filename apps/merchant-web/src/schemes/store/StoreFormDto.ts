export interface StoreFormDto {
  id?: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  bannerImage?: string;
  profileImage?: string;
  userId: string;
}

export const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2FdefaultImage.png?alt=media&token=95bf0221-2e08-4a68-a8d2-7fbfbecc066a";
export const defaultStoreFormData: StoreFormDto = {
  id: "",
  name: "",
  description: "",
  address: "",
  phoneNumber: "",
  bannerImage: defaultImage,
  profileImage: defaultImage,
  userId: "",
};
