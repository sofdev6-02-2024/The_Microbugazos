import React, { useState } from "react";
import { FormInput } from "../auth/FormInputProps";
import { ProfileFormProps, UpdateProfileData } from "@/types/auth";
import styles from "@/styles/profile/ProfileForm.module.css";

export const ProfileForm: React.FC<ProfileFormProps> = ({
                                                            onSubmit,
                                                            isLoading,
                                                            errors,
                                                            isPasswordProvider,
                                                            providerName,
                                                            currentEmail,
                                                            currentUsername
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
            <div className={styles.accountType}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <p>Account type: {providerName}</p>
            </div>

            <h2 className={styles.sectionTitle}>Profile Information</h2>
            <div className={styles.formGroup}>
                <FormInput
                    id="newUsername"
                    type="text"
                    value={formData.newUsername || ''}
                    onChange={handleInputChange}
                    label="Username"
                    error={errors.newUsername}
                />
            </div>

            <div className={styles.formGroup}>
                <FormInput
                    id="newEmail"
                    type="email"
                    value={formData.newEmail || ''}
                    onChange={handleInputChange}
                    label="Email"
                    error={errors.newEmail}
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    {showPasswordSection && (
                        <div className={styles.passwordSection}>
                            <FormInput
                                id="newPassword"
                                type="password"
                                value={formData.newPassword || ''}
                                onChange={handleInputChange}
                                label="New Password"
                                error={errors.newPassword}
                            />

                            <FormInput
                                id="confirmNewPassword"
                                type="password"
                                value={formData.confirmNewPassword || ''}
                                onChange={handleInputChange}
                                label="Confirm New Password"
                                error={errors.confirmNewPassword}
                            />

                            <FormInput
                                id="currentPassword"
                                type="password"
                                value={formData.currentPassword || ''}
                                onChange={handleInputChange}
                                label="Current Password"
                                error={errors.currentPassword}
                            />
                        </div>
                    )}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={styles.updateButton}
            >
                {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
};
