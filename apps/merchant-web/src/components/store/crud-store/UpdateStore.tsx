"use client";
import {
  StoreFormData,
  StoreFormScheme,
} from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import { StoreForm } from "./StoreForm";
import { useState } from "react";
import useFormHandler from "@/commons/hooks/UseFormHandler";
import { updateStoreHandler } from "@/scripts/store/UpdateStoreHandler";
import buttonStyle from "@/styles/store/CreateStorePanel.module.css";
import { toast } from "sonner";
import { useAuth } from "@/commons/context/AuthContext";
import { useStore } from "@/commons/context/StoreContext";

interface UpdateStoreProps {
  storeData: StoreFormData;
}
export const UpdateStore: React.FC<UpdateStoreProps> = ({ storeData }) => {
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState([true, true, true, true]);
  const { user } = useAuth();
  const { setStore } = useStore();
  const storeFormHandler: FormikProps<StoreFormData> = useFormHandler({
    initialValues: storeData,
    validationSchema: StoreFormScheme,
    onSubmit: async () => {
      if (clicked) return;
      setClicked(true);
      if (!user) {
        toast.error("You must be logged in to create a store");
        setClicked(false);
        return;
      }
      toast.promise(
        updateStoreHandler(
          storeData.id ?? "",
          storeFormHandler.values,
          user?.userId
        ),
        {
          loading: "Updating Store",
          success: (store) => {
            setClicked(false);
            setStore(store);
            return "Store Updated";
          },
          error: () => {
            setClicked(false);
            return "Failed to Update Store";
          },
        }
      );
    },
  });

  return (
    <div style={{ height: "100%" }}>
      <StoreForm
        formikProps={storeFormHandler}
        defaultBannerImage={storeFormHandler.values.bannerImageUrl}
        defaultProfileImage={storeFormHandler.values.profileImageUrl}
        editableFields={isEditing}
        hasEditableFields={true}
        disabled={clicked}
      />
      <div className={`${buttonStyle.buttonContainer}`}>
        <button
          type="submit"
          className={`${buttonStyle.button} ${buttonStyle.createButton} ${
            clicked && buttonStyle.disabledButton
          }`}
          onClick={() => {
            setIsEditing(
              isEditing.map((value) => {
                return !value;
              })
            );
            storeFormHandler.handleSubmit();
          }}
        >
          Save
        </button>

        <button
          className={`${buttonStyle.button} ${buttonStyle.cancelButton} ${
            clicked && buttonStyle.disabledButton
          }`}
          disabled={clicked}
          onClick={() => {
            storeFormHandler.resetForm();
            setIsEditing(
              isEditing.map((value) => {
                return !value;
              })
            );
            storeFormHandler.setFieldValue("reloadable", `${Date.now()}`);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
