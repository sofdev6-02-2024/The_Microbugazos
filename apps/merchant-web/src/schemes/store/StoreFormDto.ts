export interface StoreFormDto {
  id?: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  bannerImage?: string;
  profileImage?: string;
  userId: string;
  lowStockThreshold?: number;
}

export const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2FdefaultImage.png?alt=media&token=95bf0221-2e08-4a68-a8d2-7fbfbecc066a";

export 
const defaultSmallImage =
  "https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2Fdefault-image-icon.png?alt=media&token=3f7f5804-460e-43e2-bb04-ec002268f2ec";
  export const defaultStoreFormData: StoreFormDto = {
    id: "",
    name: "Store Name",
    description: "Some description",
    address: "Some address",
    phoneNumber: "+591 1234567",
    bannerImage: defaultImage,
    profileImage: defaultImage,
    userId: "",
    lowStockThreshold: 20
  };
