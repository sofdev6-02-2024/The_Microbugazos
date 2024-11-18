import { auth } from "@/config/firebase";
import {updatePassword, updateProfile, verifyBeforeUpdateEmail} from 'firebase/auth';
import {ProfileValidator} from '@/commons/validations/profile'
import {AuthService} from '@/services/authService'
import {ProfileAPI} from "@/services/profileAPI";
import {UpdateProfileData, UpdateResult} from "@/types/auth";

export class ProfileService {
    static getCurrentUserData() {
        const user = auth.currentUser;
        if (!user) return null;

        return {
            email: user.email || '',
            username: user.displayName || ''
        };
    }

    public static async updateUserProfile(data: UpdateProfileData): Promise<UpdateResult> {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');

        const currentData = this.getCurrentUserData();
        if (!currentData) throw new Error('Unable to fetch current user data');

        ProfileValidator.validateProfileUpdate(data, currentData);

        try {
            if ((data.newEmail || data.newPassword) && AuthService.isPasswordProvider()) {
                if (!data.currentPassword) {
                    throw new Error('Current password is required to update email or password');
                }
                await AuthService.reauthorizeUser(data.currentPassword);
            }

            if (data.newEmail) {
                return await this.handleEmailUpdate(user, data);
            }

            return await this.handleNonEmailUpdates(user, data);

        } catch (error) {
            const handledError = this.handleUpdateError(error);
            return { type: 'error', message: handledError.message };
        }
    }

    private static async handleEmailUpdate(user: any, data: UpdateProfileData): Promise<UpdateResult> {
        if (!data.newEmail) return { type: 'success', message: '' };

        try {
            await verifyBeforeUpdateEmail(user, data.newEmail);

            if (data.newUsername) {
                await updateProfile(user, { displayName: data.newUsername });
                const token = await user.getIdToken();
                await ProfileAPI.updateBackendProfile(token, {
                    Name: data.newUsername,
                });
            }

            return {
                type: 'info',
                message: 'Please check your new email address for verification instructions. The email will be updated after verification.'
            };
        } catch (error) {
            throw this.handleUpdateError(error);
        }
    }

    private static async handleNonEmailUpdates(user: any, data: UpdateProfileData): Promise<UpdateResult> {
        const updatePromises: Promise<void>[] = [];

        if (data.newUsername) {
            const token = await user.getIdToken();
            updatePromises.push(
                updateProfile(user, { displayName: data.newUsername }),
                ProfileAPI.updateBackendProfile(token, { Name: data.newUsername })
            );
        }

        if (data.newPassword && AuthService.isPasswordProvider()) {
            updatePromises.push(
                updatePassword(user, data.newPassword)
            );
        }

        await Promise.all(updatePromises);
        return { type: 'success', message: 'Profile updated successfully' };
    }

    private static handleUpdateError(error: any): Error {
        const errorMessages: Record<string, string> = {
            'auth/email-already-in-use': 'This email is already in use by another account',
            'auth/invalid-email': 'The email address is not valid',
            'auth/requires-recent-login': 'Please sign in again to complete this action',
            'auth/weak-password': 'Password is too weak. Please choose a stronger password'
        };

        if (error.code && errorMessages[error.code]) {
            return new Error(errorMessages[error.code]);
        }

        if (error.message) {
            return new Error(error.message);
        }

        return error;
    }
}
