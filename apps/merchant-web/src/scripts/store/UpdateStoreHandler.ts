import { updateStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { deleteImageFromFirebase, uploadImage } from "../FirebaseImageScripts";
export const updateStoreHandler = async (
  storeId: string,
  store: StoreFormData
): Promise<boolean> => {
  // TODO : GET USER INFORMATION
  const userId = "b3bbbc33-2b85-4a9e-8f00-0febe9061802";

  await deleteImageFromFirebase(`${userId}-banner`, "store");
  await deleteImageFromFirebase(`${userId}-banner`, "store");
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
    id: storeId,
    name: store.name,
    description: store.description,
    address: store.address,
    phoneNumber: store.phoneNumber,
    bannerImage: bannerImage,
    profileImage: profileImage,
    userId: userId,
  };
  console.log(storeToCreate);
  const response = await updateStore(storeId, storeToCreate);
  return (response.id as string) !== "";
};
