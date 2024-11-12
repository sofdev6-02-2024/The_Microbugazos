import { updateStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { deleteImageFromFirebase, uploadImage } from "../FirebaseImageScripts";
export const updateStoreHandler = async (
  storeId: string,
  store: StoreFormData,
  userId: string
): Promise<boolean> => {
  const profileImage = await changeImage(
    `${userId}-profile`,
    store.profileImageUrl,
    store.profileImage
  );

  const bannerImage = await changeImage(
    `${userId}-banner`,
    store.bannerImageUrl,
    store.bannerImage
  );

  const storeToUpdate: StoreFormDto = {
    id: storeId,
    name: store.name.trim(),
    description: store.description.trim(),
    address: store.address.trim(),
    phoneNumber: store.phoneNumber.trim(),
    bannerImage: bannerImage,
    profileImage: profileImage,
    UserIdentity: userId,
  };
  const response = await updateStore(storeId, storeToUpdate);
  return (response.id as string) !== "";
};

const changeImage = async (
  name: string,
  currentImage?: string,
  imageFile?: File
) => {
  if (imageFile !== undefined && imageFile !== null && imageFile.size > 0) {
    if (currentImage !== undefined && currentImage !== "") {
      await deleteImageFromFirebase(name, "store");
    }
    return await uploadImage(imageFile, name, "store");
  }
  return currentImage;
};
