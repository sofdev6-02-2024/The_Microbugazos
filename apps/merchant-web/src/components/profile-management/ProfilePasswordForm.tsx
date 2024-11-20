import { useProfile } from "@/contexts/profile/ProfileContext";
import { PasswordInput } from "../atoms/inputs/PasswordInput";

export const ProfilePasswordForm = () => {
  const { isEditable, errors, formData, handleInputChange } = useProfile();

  return (
    <>
      <PasswordInput
        id="newPassword"
        value={formData.newPassword ?? ""}
        onChange={handleInputChange}
        label="New Password"
        error={errors?.newPassword}
        touched={!!errors?.newPassword}
        isEditable={isEditable}
      />

      <PasswordInput
        id="confirmNewPassword"
        value={formData.confirmNewPassword ?? ""}
        onChange={handleInputChange}
        label="Confirm New Password"
        error={errors?.confirmNewPassword}
        touched={!!errors?.confirmNewPassword}
        isEditable={isEditable}
      />

      <PasswordInput
        id="currentPassword"
        value={formData.currentPassword ?? ""}
        onChange={handleInputChange}
        label="Current Password"
        error={errors?.currentPassword}
        touched={!!errors?.currentPassword}
        isEditable={isEditable}
      />
    </>
  );
};
