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

export const defaultStoreFormData : StoreFormDto = {
  id: "",
  name: "",
  description: "",
  address: "",
  phoneNumber: "",
  bannerImage: "",
  profileImage: "",
  userId: "",
};
