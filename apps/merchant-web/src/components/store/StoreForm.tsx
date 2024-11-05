"use client";
import styles from "@/styles/store/StoreForm.module.css";
import { EditableInput } from "@/components/atoms/inputs/EditableInput";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import { StoreImagesProfile } from "./StoreImagesProfile";

interface StoreFormProps {
  formikProps: FormikProps<StoreFormData>;
  defaultProfileImage?: string;
  defaultBannerImage?: string;
}

export const StoreForm: React.FC<StoreFormProps> = ({
  formikProps: {
    values,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    setFieldValue,
    handleChange,
  },
  defaultProfileImage,
  defaultBannerImage,
}) => {
  const onBlur = (field: string) => {
    handleBlur(field);
    setFieldTouched(field, true);
  };
  const loadImage = (file?: File, type?: "banner" | "profile") => {
    if (file) {
      const imageType: string =
        type === "banner" ? "bannerImage" : "profileImage";
      setFieldValue(imageType, file);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <StoreImagesProfile
        bannerImage={defaultBannerImage}
        profileImage={defaultProfileImage}
        onLoadImage={loadImage}
      />
      <form className={styles.formContainer}>
        <EditableInput
          type="text"
          value={values.name}
          onChange={handleChange}
          label="Name"
          placeholder="A brief description of your store"
          name="name"
          id="name"
          error={errors.name}
          handleBlur={onBlur}
          touched={touched.name}
        />

        <EditableInput
          type="text"
          value={values.description}
          onChange={handleChange}
          label="Description"
          placeholder="A brief description of your store"
          name="description"
          id="description"
          error={errors.description}
          handleBlur={onBlur}
          touched={touched.description}
        />

        <EditableInput
          type="text"
          value={values.address}
          onChange={handleChange}
          label="Address"
          placeholder="e.g. 123 Main St, City"
          name="address"
          id="address"
          error={errors.address}
          handleBlur={onBlur}
          touched={touched.address}
        />

        <EditableInput
          type="text"
          value={values.phoneNumber}
          onChange={handleChange}
          label="Phone number"
          placeholder="+1 (555) 123-4567"
          name="phoneNumber"
          id="phoneNumber"
          error={errors.phoneNumber}
          handleBlur={onBlur}
          touched={touched.phoneNumber}
        />
      </form>
    </div>
  );
};
