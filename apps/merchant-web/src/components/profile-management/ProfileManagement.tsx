"use client";

import React, { useState, useEffect } from "react";
import { ProfileForm } from "./ProfileForm";
import { ProfileService } from "@/services/profileService";
import { AuthService } from "@/services/authService";
import { UpdateProfileData, ProfileErrors, UserBasicData } from "@/types/auth";
import styles from "@/styles/profile/profile-form.module.css";
import { Toaster, toast } from "sonner";

const TOAST_STYLES = {
  success: { backgroundColor: "#4CAF50", color: "#FFFFFF" },
  error: { backgroundColor: "#9c2323", color: "#FFFFFF" },
  info: { backgroundColor: "#2196F3", color: "#FFFFFF" },
} as const;

const ProfileManagement: React.FC = () => {
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isPasswordProvider, setIsPasswordProvider] = useState(false);
  const [providerName, setProviderName] = useState("");
  const [currentUserData, setCurrentUserData] = useState<UserBasicData>({
    email: "",
    username: "",
  });

  useEffect(() => {
    initializeProfileData();
  }, []);

  const initializeProfileData = () => {
    setIsPasswordProvider(AuthService.isPasswordProvider());
    setProviderName(AuthService.getProviderName());

    const userData = ProfileService.getCurrentUserData();
    if (userData) {
      setCurrentUserData(userData);
    }
  };
  const handleEditStatus = () => {
    setIsEditable(!isEditable);
  };
  const updateUIData = () => {
    const newUserData = ProfileService.getCurrentUserData();
    if (newUserData) {
      setCurrentUserData(newUserData);
    }
  };

  const showToast = (
    type: keyof typeof TOAST_STYLES,
    message: string,
    duration?: number
  ) => {
    toast[type](message, {
      duration: duration ?? 3000,
      style: TOAST_STYLES[type],
    });
  };

  const handleSubmit = async (data: UpdateProfileData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const result = await ProfileService.updateUserProfile(data);
      if (result.type === "info") {
        showToast("info", result.message, 6000);
        if (data.newUsername) {
          updateUIData();
        }
      } else if (result.type === "success") {
        updateUIData();
        showToast("success", result.message || "Profile updated successfully");
        handleEditStatus();
      } else {
        showToast("error", result.message || "Update failed");
      }
    } catch (error: any) {
      showToast("error", error.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { fontSize: "0.875rem" },
        }}
      />
      <h1 className={styles.profileTitle}>Profile Management</h1>
      <ProfileForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errors={errors}
        isPasswordProvider={isPasswordProvider}
        providerName={providerName}
        currentEmail={currentUserData.email}
        currentUsername={currentUserData.username}
        isEditable={isEditable}
      />
    </div>
  );
};

export default ProfileManagement;
