import { useDropzone } from "react-dropzone";
import {
  MdOutlineImageSearch,
  MdCancel,
  MdCheckCircleOutline,
} from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import DotLoader from "react-spinners/DotLoader";
import ImageSelectorStyle from "../styles/components/image-selector.module.css";

export default function ImagePicker({
  maxImages = 3,
  selectedImages,
  setSelectedImages,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      if (selectedImages.length >= maxImages) {
        return;
      }

      setSelectedImages((prevImages) => [...prevImages, "spin-loader"]);

      const remainingSlots = maxImages - selectedImages.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const uploadPromises = filesToAdd.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        console.log(`Firebase Download URL: ${downloadURL}`);
        return downloadURL;
      });

      const firebaseUrls = await Promise.all(uploadPromises);

      handleImageDeleted("spin-loader");
      setSelectedImages((prevImages) => [...prevImages, ...firebaseUrls]);
    },
  });

  const handleImageDeleted = (url: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== url)
    );
  };

  return (
    <div
      {...getRootProps()}
      style={{
        height: "248px",
        padding: "20px",
        marginBottom: "24px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input {...getInputProps()} />
      {selectedImages.length > 0 ? (
        selectedImages.map((imageUrl, index) =>
          imageUrl == "spin-loader" ? (
            <div
              key={`${imageUrl}_${index}`}
              className={ImageSelectorStyle.imageSelected}
            >
              <DotLoader size={64} color="#7790ED" loading={true}></DotLoader>
            </div>
          ) : (
            <div key={imageUrl} className={ImageSelectorStyle.imageContainer}>
              <MdCancel
                className={ImageSelectorStyle.sideButton}
                color="#7790ED"
                size={24}
                onClick={(event) => {
                  event.stopPropagation();
                  handleImageDeleted(imageUrl);
                }}
              />
              <img
                key={index}
                src={imageUrl}
                alt={`Selected ${index}`}
                className={ImageSelectorStyle.imageSelected}
              />
            </div>
          )
        )
      ) : (
        <div></div>
      )}
      {selectedImages.length >= maxImages ? (
        maxImages > 1 ? (
          <div className={ImageSelectorStyle.imageLimit}>
            <MdCheckCircleOutline size={64} />
            <p>Maximum of {maxImages} images reached</p>
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <div className={ImageSelectorStyle.imageLimit}>
          <MdOutlineImageSearch size={64} />
          <p>Drag & drop images here, or click to select</p>
        </div>
      )}
    </div>
  );
}
