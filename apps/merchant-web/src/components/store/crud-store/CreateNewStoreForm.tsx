"use client";
import { CreateStorePanel } from "@/components/store/crud-store/CreateStorePanel";
import {
  StoreFormData,
  StoreFormScheme,
  defaultStoreFormData,
} from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import useFormHandler from "@/hooks/useFormHandler";
import { createStoreHandler } from "@/scripts/store/CreateStoreHandler";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import { useState } from "react";
import { StoreForm } from "@/components/store/crud-store/StoreForm";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
export default function CreateNewStoreForm() {
  const [clicked, setClicked] = useState(false);
  const { user } = useAuth();
  const storeFormHandler: FormikProps<StoreFormData> = useFormHandler({
    initialValues: defaultStoreFormData,
    validationSchema: StoreFormScheme,
    onSubmit: async () => {
      if (clicked) return;
      setClicked(true);
      if (!user) {
        toast.error("You must be logged in to create a store");
        setClicked(false);
        return;
      }
      toast.promise(createStoreHandler(storeFormHandler.values, user?.userId), {
        loading: "Creating Store",
        success: () => {
          setClicked(false);
          location.href = `/store`;
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
  );
}
