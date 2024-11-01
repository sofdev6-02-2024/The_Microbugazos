import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { MdOutlineImageSearch, MdCancel, MdCheckCircleOutline } from 'react-icons/md';
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import { storage } from '@/commons/services/firebase-connection'
import DotLoader from "react-spinners/DotLoader";

export default function ImagePicker() {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const maxImages = 3;

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: async (acceptedFiles) => {
            if (selectedImages.length >= maxImages) {
                return;
            }

            setSelectedImages((prevImages) => [...prevImages, "spin-loader"])

            const remainingSlots = maxImages - selectedImages.length;
            const filesToAdd = acceptedFiles.slice(0, remainingSlots);

            const uploadPromises = filesToAdd.map(async (file) => {
                const storageRef = ref(storage, `images/${file.name}`); // TODO: Add folder per store

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

    const handleImageDeleted = async (url: string) => {
        if (url != "spin-loader") {
            try {
                const pathStart = url.indexOf('/o/') + 3;
                const pathEnd = url.indexOf('?') === -1 ? url.length : url.indexOf('?');
                const filePath = decodeURIComponent(url.slice(pathStart, pathEnd));

                const fileRef = ref(storage, filePath);

                await deleteObject(fileRef);
                console.log("File deleted successfully");
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        }
        setSelectedImages(prevImages => prevImages.filter(image => image !== url));
    };

    return (
        <div
            {...getRootProps()}
            style={{
                height: '248px',
                padding: '20px',
                marginBottom: '24px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <input {...getInputProps()} />
            {selectedImages.length > 0 ? (
                selectedImages.map((imageUrl, index) => (
                    imageUrl == "spin-loader"
                    ? <div key={`${imageUrl}_${index}`} className="image-selected">
                        <DotLoader size={64} color="#7790ED" loading={true}></DotLoader>
                    </div>
                    : <div key={imageUrl} className="image-container">
                        <MdCancel
                            className="side-button"
                            color="#7790ED"
                            size={24}
                            onClick={(event) => {
                                event.stopPropagation(); // Prevent click from bubbling up
                                handleImageDeleted(imageUrl);
                            }}
                        />
                        <img key={index} src={imageUrl} alt={`Selected ${index}`} className='image-selected'/>
                    </div>
                ))
            ) : (
                <div></div>
            )}
            {selectedImages.length >= maxImages ? (
                <div className="image-limit">
                    <MdCheckCircleOutline size={64}/>
                    <p>
                        Maximum of {maxImages} images reached
                    </p>
                </div>
            ) : (
                <div className="image-limit">
                    <MdOutlineImageSearch size={64} />
                    <p>Drag & drop images here, or click to select</p>
                </div>
            )}
        </div>
    );
}