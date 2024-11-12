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
import { toast } from "sonner";
export default function CreateNewStore() {
  const [clicked, setClicked] = useState(false);
  const storeFormHandler: FormikProps<StoreFormData> = useFormHandler({
    initialValues: defaultStoreFormData,
    validationSchema: StoreFormScheme,
    onSubmit: async () => {
      if (clicked) return;
      setClicked(true);

      toast.promise(createStoreHandler(storeFormHandler.values), {
        loading: "Creating Store",
        success: (storeId) => {
          location.href = `/store/${storeId}`;
          setClicked(false);
          return "Store Created";
        },
        error: () => {
          setClicked(false);
          return "Failed to Create Store";
        },
      });
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
          rightContent={
            <StoreForm
              formikProps={storeFormHandler}
              disabled={clicked}
              style={{ paddingBottom: "80px" }}
            />
          }
        />
      </main>
    </ThemeProvider>
  );
}
