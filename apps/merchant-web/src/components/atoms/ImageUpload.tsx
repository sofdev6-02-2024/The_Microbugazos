"use client";
import React, { useState, useRef, useEffect } from "react";
import { SquarePen, Upload } from "lucide-react";
import styles from "@/styles/atoms/ImageUpload.module.css";

interface ImageUploadProps {
  shape?: "rectangle" | "circle";
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  defaultImage?: string;
  onImageUpload?: (file: File) => void;
  className?: string;
  isEditable?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  shape = "rectangle",
  width = "200px",
  height = "200px",
  top = "0",
  left = "0",
  defaultImage = "",
  onImageUpload = (file: File) => {
    console.log(file);
  },
  className = "",
  isEditable = true,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasImage, setHasImage] = useState(defaultImage !== "");

  useEffect(() => {
    if (defaultImage !== "") {
      setHasImage(true);
    }

    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
      setHasImage(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isEditable) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (isEditable) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isEditable) return;

    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
      setHasImage(true);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${styles.container} ${styles[shape]} ${
        isDragging ? styles.dragging : ""
      } ${styles[className]}  ${
        (isEditable === false || hasImage) && styles.containerHover
      }`}
      style={{ width, height, top, left }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`${styles.previewContainer} ${styles[shape]}`}>
        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className={`${styles.preview} ${
              shape === "circle"
                ? styles.previewCircle
                : styles.previewRectangle
            }`}
          />
        ) : (
          <div
            className={`${
              isEditable ? styles.uploadContainer : styles.NotUploadContainer
            } `}
          >
            {isEditable && (
              <>
                <Upload className={styles.uploadIcon} size={32} />
                <p className={styles.uploadText}>Drag and drop an image</p>
              </>
            )}
          </div>
        )}
      </div>
      {isEditable && (
        <button
          onClick={handleClick}
          className={styles.editButton}
          title="Edit image"
        >
          <SquarePen color="var(--white)" />
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
