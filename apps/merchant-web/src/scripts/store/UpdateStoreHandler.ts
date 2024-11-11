import { updateStore } from "@/request/StoreRequests";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { deleteImageFromFirebase, uploadImage } from "../FirebaseImageScripts";
export const updateStoreHandler = async (
  storeId: string,
  store: StoreFormData
): Promise<boolean> => {
  // TODO : GET USER INFORMATION
  const userId = "d947dbe7-242c-443b-b9ed-17cf3f4b1d32";

  console.log("testing : ", store.profileImageUrl);
  console.log("testing 02 : ", store.bannerImageUrl);

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
  console.log("FUCKING RESPONSE : ",response);
  return (response.id as string) !== "";
};

const changeImage = async (
  name: string,
  currentImage?: string,
  imageFile?: File
) => {
  if (imageFile !== undefined && imageFile !== null && imageFile.size > 0) {
    await deleteImageFromFirebase(name, "store");
    return await uploadImage(imageFile, name, "store");
  }
  return currentImage;
};
