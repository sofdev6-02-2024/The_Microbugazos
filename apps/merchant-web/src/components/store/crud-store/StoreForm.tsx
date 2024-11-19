"use client";
import styles from "@/styles/store/StoreForm.module.css";
import { EditableInput } from "@/components/atoms/inputs/EditableInput";
import { StoreFormData } from "@/schemes/store/StoreFormDataScheme";
import { FormikProps } from "formik";
import { StoreImagesProfile } from "./StoreImagesProfile";
import PhoneNumberInput from "../../atoms/inputs/PhoneNumberInput";


interface StoreFormProps {
  formikProps: FormikProps<StoreFormData>;
  defaultProfileImage?: string;
  defaultBannerImage?: string;
  editableFields?: boolean[];
  hasEditableFields?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  reset?: boolean;
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
  editableFields,
  hasEditableFields,
  disabled = false,
  style = {},
  reset = false,
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
    <div
      className={`${styles.mainContainer} ${disabled && styles.disabled} `}
      style={style}
    >
      <StoreImagesProfile
        bannerImage={defaultBannerImage}
        profileImage={defaultProfileImage}
        onLoadImage={loadImage}
        reset={reset}
      />
      <form
        className={styles.formContainer}
        onSubmit={(e) => e.preventDefault()}
      >
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
          isEditable={hasEditableFields}
          isMarkedEditable={editableFields ? editableFields[0] : false}
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
          isEditable={hasEditableFields}
          isMarkedEditable={editableFields ? editableFields[1] : false}
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
          isEditable={hasEditableFields}
          isMarkedEditable={editableFields ? editableFields[2] : false}
        />

        <EditableInput
          type="text"
          value={values.phoneNumber}
          onChange={handleChange}
          label="Phone Number"
          placeholder="e.g. +1 555-123-4567"
          name="phoneNumber"
          id="phoneNumber"
          error={errors.phoneNumber}
          handleBlur={onBlur}
          touched={touched.phoneNumber}
          isEditable={hasEditableFields}
          isMarkedEditable={editableFields ? editableFields[3] : false}
          preelement={
            <PhoneNumberInput
              value={values.phoneNumber}
              onChange={(val) => setFieldValue("phoneNumber", val)}
            />
          }
        />
      </form>
    </div>
  );
};
