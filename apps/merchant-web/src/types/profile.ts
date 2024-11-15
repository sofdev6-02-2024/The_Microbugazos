export interface UpdateProfileData {
    newUsername?: string;
    newEmail?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export interface ProfileErrors extends UpdateProfileData {}

export interface ProfileFormProps {
    onSubmit: (data: UpdateProfileData) => Promise<void>;
    isLoading: boolean;
    errors: ProfileErrors;
    isPasswordProvider: boolean;
    providerName?: string;
    currentEmail?: string;
    currentUsername?: string;
}

export interface MessageProps {
    message: string;
    type: 'success' | 'error';
}