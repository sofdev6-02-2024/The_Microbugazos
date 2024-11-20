"use client";

import { AuthService } from "@/services/authService";
import { ProfileService } from "@/services/profileService";
import { ProfileErrors, UpdateProfileData, UserBasicData } from "@/types/auth";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface Type {
  errors: ProfileErrors | undefined;
  isLoading: boolean;
  isEditable: boolean;
  isPasswordProvider: boolean;
  providerName: string;
  currentUserData: UserBasicData;
  formData: UpdateProfileData;
  setIsPasswordProvider: Dispatch<SetStateAction<boolean>>;
  handleEditStatus: () => void;
  handleSubmit: (data: UpdateProfileData) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  changeData: () => void;
  setProviderName: Dispatch<SetStateAction<string>>;
  setCurrentUserData: Dispatch<SetStateAction<UserBasicData>>
}

interface Props {
  children: ReactNode;
}

const ProfileContext = createContext<Type | undefined>(undefined);

const TOAST_STYLES = {
  success: { backgroundColor: "var(--background-primary)", color: "var(--action-success)" },
  error: { backgroundColor: "#9c2323", color: "#FFFFFF" },
  info: { backgroundColor: "#2196F3", color: "#FFFFFF" },
} as const;

export const ProfileProvider = ({ children }: Props) => {
  const [errors, setErrors] = useState<ProfileErrors>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isPasswordProvider, setIsPasswordProvider] = useState(false);
  const [providerName, setProviderName] = useState("");
  const [currentUserData, setCurrentUserData] = useState<UserBasicData>({
    email: "",
    username: "",
  });
  const [formData, setFormData] = useState<UpdateProfileData>({
    newUsername: currentUserData.username ?? "",
    newEmail: currentUserData.email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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
        showToast("success", result.message ?? "Profile updated successfully");
        handleEditStatus();
      } else {
        showToast("error", result.message ?? "Update failed");
      }
    } catch (error: any) {
      showToast("error", error.message ?? "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`${id} | ${value}`)
    console.log(formData)
    setFormData((prev) => ({ ...prev, [id]: value }));
    console.log(formData)
  };

  const changeData = () => {
    console.log(currentUserData)
    console.log(formData)
    setFormData((prev) => ({
      ...prev,
      newUsername: currentUserData.username || "",
      newEmail: currentUserData.email || "",
    }));
    console.log(formData)
  };

  const value = useMemo(
    () => ({
      errors,
      isLoading,
      isEditable,
      isPasswordProvider,
      providerName,
      currentUserData,
      formData,
      handleInputChange,
      handleEditStatus,
      handleSubmit,
      changeData,
      setIsPasswordProvider,
      setProviderName,
      setCurrentUserData,
    }),
    []
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
};
