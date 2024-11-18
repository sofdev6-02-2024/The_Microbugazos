import {User} from "firebase/auth";

export interface UpdateProfileData {
    newUsername?: string;
    newEmail?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export interface BackendProfileData {
    Name?: string;
    Email?: string;
}

export interface AuthUser extends User {
    userType?: UserType;
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
export enum UserType {
    GUEST = 0,
    OWNER = 1,
    SELLER = 2,
    ADMIN = 3,
    CLIENT = 4
}

export interface UserPermissions {
    paths: string[];
    redirectTo: string;
}

export interface UserData {
    id: string;
    email: string;
    name: string;
    userType: UserType;
}

export interface UserBasicData {
    email: string;
    username: string;
}

export interface UpdateResult {
    type: 'success' | 'info' | 'error';
    message: string;
}
