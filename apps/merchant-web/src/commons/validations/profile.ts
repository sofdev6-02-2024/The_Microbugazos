import {UpdateProfileData} from "@/types/auth";

export class ProfileValidator {
    static validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePassword(password: string): boolean {
        return password.length >= 6;
    }

    static validateUsername(username: string): boolean {
        return username.length >= 3;
    }

    static validateProfileUpdate(data: UpdateProfileData, currentData: { email: string, username: string }): void {
        const isEmailDifferent = data.newEmail && data.newEmail !== currentData.email;
        const isUsernameDifferent = data.newUsername && data.newUsername !== currentData.username;
        const isPasswordChange = data.newPassword && data.currentPassword;

        if (!isEmailDifferent && !isUsernameDifferent && !isPasswordChange) {
            throw new Error('At least one field must be different from current values');
        }

        if (data.newEmail && !this.validateEmail(data.newEmail)) {
            throw new Error('Invalid email format');
        }

        if (data.newUsername && !this.validateUsername(data.newUsername)) {
            throw new Error('Username must be at least 3 characters long');
        }

        if (data.newPassword) {
            if (!this.validatePassword(data.newPassword)) {
                throw new Error('Password must be at least 6 characters long');
            }
            if (data.newPassword !== data.confirmNewPassword) {
                throw new Error('Passwords do not match');
            }
            if (data.newPassword === data.currentPassword) {
                throw new Error('New password must be different from current password');
            }
        }
    }
}
