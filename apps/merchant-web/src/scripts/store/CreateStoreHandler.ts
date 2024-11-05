import { createStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { uploadImage } from "../FirebaseImageScripts";
export const createStoreHandler = async (
  store: StoreFormData
): Promise<string> => {
  // TODO : GET USER INFORMATION
  const userId = "b3bbbc33-2b85-4a9e-8f00-0febe9061802";

  const bannerImage = await uploadImage(store.bannerImage, `${userId}-banner`);
  const profileImage = await uploadImage(
    store.profileImage,
    `${userId}-profile`
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
