"use client";
import { ThemeProvider } from "@/commons/context/ThemeContext";
import { CreateStorePanel } from "@/components/store/CreateStorePanel";
import {
  StoreFormData,
  StoreFormScheme,
  defaultStoreFormData,
} from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import useFormHandler from "@/commons/hooks/UseFormHandler";
import { createStoreHandler } from "@/scripts/store/CreateStoreHandler";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import { useState } from "react";
import { StoreForm } from "@/components/store/StoreForm";
export default function CreateNewStore() {
  const [clicked, setClicked] = useState(false);
  const storeFormHandler: FormikProps<StoreFormData> = useFormHandler({
    initialValues: defaultStoreFormData,
    validationSchema: StoreFormScheme,
    onSubmit: async () => {
      if (clicked) return;
      setClicked(true);
      try {
        const storeId = await createStoreHandler(storeFormHandler.values);
        location.href = `/store/${storeId}`;
      } finally {
        setClicked(false);
      }
    },
  });

  const onCancel = () => {
    location.href = "/";
  };

  return (
    <ThemeProvider>
      <main>
        <TwoColumnLayout
          leftContent={
            <CreateStorePanel
              onCancel={onCancel}
              onSubmit={storeFormHandler.handleSubmit}
              clicked={clicked}
            />
          }
          rightContent={<StoreForm formikProps={storeFormHandler} />}
        />
      </main>
    </ThemeProvider>
  );
}
