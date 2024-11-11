import { createStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { uploadImage } from "../FirebaseImageScripts";
export const createStoreHandler = async (
  store: StoreFormData
): Promise<string> => {
  // TODO : GET USER INFORMATION
  const userId = "d947dbe7-242c-443b-b9ed-17cf3f4b1d32";

  const bannerImage = await uploadImage(store.bannerImage, `${userId}-banner`,"store");
  const profileImage = await uploadImage(
    store.profileImage,
    `${userId}-profile`,"store"
  );

  const storeToCreate: StoreFormDto = {
    name: store.name,
    description: store.description,
    address: store.address,
    phoneNumber: store.phoneNumber,
    bannerImage: bannerImage,
    profileImage: profileImage,
    userId: userId,
  };
  console.log(storeToCreate);
  const response = await createStore(storeToCreate);
  return response;
};
