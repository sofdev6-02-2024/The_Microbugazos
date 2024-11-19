"use client";
import {
  defaultStoreFormData,
  StoreFormData,
  StoreFormScheme,
} from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import { StoreForm } from "./StoreForm";
import { useEffect, useState } from "react";
import useFormHandler from "@/hooks/useFormHandler";
import { updateStoreHandler } from "@/scripts/store/UpdateStoreHandler";
import buttonStyle from "@/styles/store/create-store-panel.module.css";
import { getStoreById } from "@/request/StoreRequests";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

interface UpdateStoreProps {
  id: string;
}
export const UpdateStore: React.FC<UpdateStoreProps> = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState([true, true, true, true]);
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
      toast.promise(updateStoreHandler(id, storeFormHandler.values, user.uid), {
        loading: "Updating Store",
        success: () => {
          setClicked(false);
          return "Store Updated";
        },
        error: () => {
          setClicked(false);
          return "Failed to Update Store";
        },
      });
    },
  });

  useEffect(() => {
    getStoreById(id).then((data) => {
      storeFormHandler.setValues({
        ...storeFormHandler.values,
        id: data.id,
        name: data.name,
        description: data.description,
        address: data.address,
        phoneNumber: data.phoneNumber,
        bannerImageUrl: data.bannerImage,
        profileImageUrl: data.profileImage,
      });
    });
  }, [id]);

  return (
    <div>
      <StoreForm
        formikProps={storeFormHandler}
        defaultBannerImage={storeFormHandler.values.bannerImageUrl}
        defaultProfileImage={storeFormHandler.values.profileImageUrl}
        editableFields={isEditing}
        hasEditableFields={true}
        disabled={clicked}
      />
      <div
        className={`${buttonStyle.buttonContainer} ${buttonStyle.buttonContainerSurface}`}
      >
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
            location.reload();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
