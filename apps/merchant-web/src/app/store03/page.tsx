"use client";

import ImageUpload from "@/components/atoms/ImageUpload";


export default function CreateNewStore() {
  return <ImageUpload 
    shape="circle"
    width="100%"
    height="300px"
    isEditable={false}
  />;
}
