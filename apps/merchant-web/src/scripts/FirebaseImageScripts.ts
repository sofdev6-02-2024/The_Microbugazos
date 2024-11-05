import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/config/firebase";

export const uploadImageToFirebase = async (
  file: File,
  directory: string = "",
  name: string = ""
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `images${directory ? "/" + directory : ""}/${name}`
    );
    uploadBytes(storageRef, file)
      .then(() => {
        return getDownloadURL(storageRef);
      })
      .then((downloadURL) => {
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadImage = async (
  file?: File,
  name: string = "",
  directory: string = ""
) => {
  if (file !== undefined && file !== null && file.size > 0) {
    return await uploadImageToFirebase(file, directory, name);
  }
  return "";
};

export const deleteImageFromFirebase = async (
  name: string,
  directory: string = ""
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const imageRef = ref(
      storage,
      `images${directory ? "/" + directory : ""}/${name}`
    );

    deleteObject(imageRef)
      .then(() => {
        console.log(
          `Image at path '${directory + "/" + name}' deleted successfully.`
        );
        resolve();
      })
      .catch((error) => {
        console.error(
          `Failed to delete image at path '${directory + "/" + name}':`,
          error
        );
        reject(error);
      });
  });
};
