import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EditableInput } from "@/components/atoms/inputs/EditableInput";
import { ProfileFormProps, UpdateProfileData } from "@/types/auth";
import styles from "@/styles/profile/profile-form.module.css";
import {PasswordInput} from "@/components/atoms/inputs/PasswordInput";

export const ProfileForm: React.FC<ProfileFormProps> = ({
    onSubmit, isLoading, errors, isPasswordProvider, currentEmail, currentUsername, isEditable
}) => {
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [formData, setFormData] = React.useState<UpdateProfileData>({
        newUsername: currentUsername || '',
        newEmail: currentEmail || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    React.useEffect(() => {
        setFormData(prev => ({
            ...prev,
            newUsername: currentUsername || '',
            newEmail: currentEmail || ''
        }));
    }, [currentUsername, currentEmail]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            newUsername: formData.newUsername !== currentUsername ? formData.newUsername : undefined,
            newEmail: formData.newEmail !== currentEmail ? formData.newEmail : undefined,
        };
        await onSubmit(dataToSubmit);
    };

    const togglePasswordSection = () => {
        setShowPasswordSection(!showPasswordSection);
        if (!showPasswordSection) {
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }));
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.profileCard}>
            <h2 className={styles.sectionTitle}>Profile Information</h2>
            <div className={styles.formGroup}>
                <EditableInput
                    id="newUsername"
                    type="text"
                    value={formData.newUsername || ''}
                    onChange={handleInputChange}
                    label="Username"
                    error={errors.newUsername}
                    touched={!!errors.newUsername}
                    isEditable={true}
                    isMarkedEditable={isEditable}
                />
            </div>

            <div className={styles.formGroup}>
                <EditableInput
                    id="newEmail"
                    type="email"
                    value={formData.newEmail || ''}
                    onChange={handleInputChange}
                    label="Email"
                    error={errors.newEmail}
                    touched={!!errors.newEmail}
                    isEditable={true}
                    isMarkedEditable={isEditable}
                />
            </div>

            {isPasswordProvider && (
                <div className={styles.formGroup}>
                    <button
                        type="button"
                        onClick={togglePasswordSection}
                        className={`${styles.togglePasswordBtn} ${showPasswordSection ? styles.active : ''}`}
                    >
                        <span>Change Password</span>
                        <ChevronDown size={20} />
                    </button>

                    {showPasswordSection && (
                        <div className={styles.passwordSection}>
                            <PasswordInput
                              id="newPassword"
                              value={formData.newPassword || ''}
                              onChange={handleInputChange}
                              label="New Password"
                              error={errors.newPassword}
                              touched={!!errors.newPassword}
                              isEditable={isEditable}
                            />

                            <PasswordInput
                              id="confirmNewPassword"
                              value={formData.confirmNewPassword || ''}
                              onChange={handleInputChange}
                              label="Confirm New Password"
                              error={errors.confirmNewPassword}
                              touched={!!errors.confirmNewPassword}
                              isEditable={isEditable}
                            />

                            <PasswordInput
                              id="currentPassword"
                              value={formData.currentPassword || ''}
                              onChange={handleInputChange}
                              label="Current Password"
                              error={errors.currentPassword}
                              touched={!!errors.currentPassword}
                              isEditable={isEditable}
                            />
                        </div>
                    )}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || (
                    formData.newUsername === currentUsername &&
                    formData.newEmail === currentEmail &&
                    !formData.newPassword &&
                    !formData.confirmNewPassword &&
                    !formData.currentPassword
                )}
                className={styles.updateButton}
            >
                {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
};
