import { createStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { uploadImage } from "../FirebaseImageScripts";
export const createStoreHandler = async (
  store: StoreFormData,
  userId: string
): Promise<string> => {
  const bannerImage = await uploadImage(
    store.bannerImage,
    `${userId}-banner`,
    "store"
  );
  const profileImage = await uploadImage(
    store.profileImage,
    `${userId}-profile`,
    "store"
  );

  const storeToCreate: StoreFormDto = {
    name: store.name.trim(),
    description: store.description.trim(),
    address: store.address.trim(),
    phoneNumber: store.phoneNumber.trim(),
    bannerImage: bannerImage,
    profileImage: profileImage,
    UserIdentity: userId,
  };
  const response = await createStore(storeToCreate);
  return response;
};
