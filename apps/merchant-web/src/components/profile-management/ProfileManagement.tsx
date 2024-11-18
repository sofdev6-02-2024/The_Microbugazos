"use client"

import React, { useState, useEffect } from "react";
import { ProfileForm } from "./ProfileForm";
import { ProfileService } from "@/request/profileService";
import { UpdateProfileData, ProfileErrors } from "@/types/auth";
import styles from "@/styles/profile/ProfileForm.module.css";
import { Toaster, toast } from "sonner";

const ProfileManagement: React.FC = () => {
    const [errors, setErrors] = useState<ProfileErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordProvider, setIsPasswordProvider] = useState(false);
    const [providerName, setProviderName] = useState('');
    const [currentUserData, setCurrentUserData] = useState({ email: '', username: '' });

    useEffect(() => {
        setIsPasswordProvider(ProfileService.isPasswordProvider());
        setProviderName(ProfileService.getProviderName());
        const userData = ProfileService.getCurrentUserData();
        if (userData) {
            setCurrentUserData(userData);
        }
    }, []);

    const handleSubmit = async (data: UpdateProfileData) => {
        setIsLoading(true);
        setErrors({});

        try {
            await ProfileService.updateUserProfile(data);
            if (!data.newEmail) {
                toast.success('Profile updated successfully', {
                    style: { backgroundColor: '#4CAF50', color: '#FFFFFF' }
                });
            }
        } catch (error: any) {
            toast.error(error.message || 'Update failed', {
                style: { backgroundColor: '#9c2323', color: '#FFFFFF' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <Toaster position="bottom-right" />
            <h1 className={styles.profileTitle}>Profile Management</h1>
            <ProfileForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                errors={errors}
                isPasswordProvider={isPasswordProvider}
                providerName={providerName}
                currentEmail={currentUserData.email}
                currentUsername={currentUserData.username}
            />
        </div>
    );
};

export default ProfileManagement;