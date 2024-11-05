"use client";
import {
  defaultStoreFormData,
  StoreFormData,
  StoreFormScheme,
} from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import { StoreForm } from "./StoreForm";
import { useState } from "react";
import useFormHandler from "@/commons/hooks/UseFormHandler";
import { updateStoreHandler } from "@/scripts/store/UpdateStoreHandler";

export const UpdateStore: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const storeFormHandler: FormikProps<StoreFormData> = useFormHandler({
    initialValues: defaultStoreFormData,
    validationSchema: StoreFormScheme,
    onSubmit: async () => {
      if (clicked) return;
      setClicked(true);
      try {
        const updated = await updateStoreHandler("", storeFormHandler.values);
        if (updated) console.log("Updated");
      } finally {
        setClicked(false);
      }
    },
  });

  return (
    <div>
      <StoreForm formikProps={storeFormHandler} />
      <div>
        <button>Cancel</button>
        <button>Update</button>
      </div>
    </div>
  );
};
