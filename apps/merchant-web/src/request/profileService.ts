import { auth } from "@/config/firebase";
import {
    updatePassword,
    updateProfile,
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    AuthError,
    UserCredential,
    verifyBeforeUpdateEmail
} from 'firebase/auth';

export class ProfileService {
    private static validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    private static validatePassword(password: string): boolean {
        return password.length >= 6;
    }

    private static validateUsername(username: string): boolean {
        return username.length >= 3;
    }

    public static isPasswordProvider(): boolean {
        const user = auth.currentUser;
        if (!user) return false;
        return user.providerData[0]?.providerId === 'password';
    }

    public static getCurrentUserData() {
        const user = auth.currentUser;
        if (!user) return null;

        return {
            email: user.email || '',
            username: user.displayName || ''
        };
    }

    public static getProviderName(): string {
        const user = auth.currentUser;
        if (!user) return '';

        const primaryProvider = user.providerData[0]?.providerId;
        switch (primaryProvider) {
            case 'google.com':
                return 'Google';
            case 'facebook.com':
                return 'Facebook';
            case 'password':
                return 'Email/Password';
            default:
                return primaryProvider || '';
        }
    }

    private static async reauthorizeUser(currentPassword?: string): Promise<UserCredential> {
        const user = auth.currentUser;
        if (!user?.email) throw new Error('No user email found');

        const primaryProvider = user.providerData[0]?.providerId;

        try {
            if (primaryProvider === 'password' && currentPassword) {
                const credential = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                return await reauthenticateWithCredential(user, credential);
            } else if (primaryProvider === 'google.com') {
                const provider = new GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                return await reauthenticateWithPopup(user, provider);
            } else {
                throw new Error(`Unsupported authentication provider: ${primaryProvider}`);
            }
        } catch (error) {
            const authError = error as AuthError;
            switch (authError.code) {
                case 'auth/user-mismatch':
                    throw new Error('The provided credentials do not correspond to the currently signed in user');
                case 'auth/requires-recent-login':
                    throw new Error('Please sign in again to complete this action');
                case 'auth/invalid-credential':
                    throw new Error('Invalid password. Please try again');
                case 'auth/wrong-password':
                    throw new Error('Incorrect password. Please try again');
                case 'auth/popup-blocked':
                    throw new Error('Please enable popups for this site to reauthenticate with Google');
                case 'auth/popup-closed-by-user':
                    throw new Error('Authentication cancelled. Please try again');
                case 'auth/network-request-failed':
                    throw new Error('Network error. Please check your connection and try again');
                case 'auth/too-many-requests':
                    throw new Error('Too many failed attempts. Please try again later');
                default:
                    console.error('Reauthorization error:', authError);
                    throw new Error(`Authentication failed: ${authError.message}`);
            }
        }
    }

    public static async updateUserProfile(data: {
        newEmail?: string,
        newUsername?: string,
        currentPassword?: string,
        newPassword?: string,
        confirmNewPassword?: string
    }): Promise<void> {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');

        const currentData = this.getCurrentUserData();
        if (!currentData) throw new Error('Unable to fetch current user data');

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

        try {
            if ((data.newEmail || data.newPassword) && this.isPasswordProvider()) {
                if (!data.currentPassword) {
                    throw new Error('Current password is required to update email or password');
                }
                await this.reauthorizeUser(data.currentPassword);
            }

            const token = await user.getIdToken();

            const updatePromises: Promise<void>[] = [];

            if (data.newUsername) {
                updatePromises.push(
                    updateProfile(user, {
                        displayName: data.newUsername
                    })
                );

                updatePromises.push(
                    this.updateBackendProfile(token, {
                        Name: data.newUsername
                    })
                )
            }

            if (data.newEmail) {
                updatePromises.push(
                    verifyBeforeUpdateEmail(user, data.newEmail)
                        .then( async () => {
                            if (data.newUsername) {
                                await updateProfile(user, {
                                    displayName: data.newUsername
                                })
                            }
                            const newToken = await user.getIdToken(true);

                            await this.updateBackendProfile(newToken, {
                                Name: data.newUsername,
                                Email: data.newEmail
                            })
                            throw {
                                type: 'info',
                                message: 'Please check your new email address for verification instructions'
                            };
                        })
                );
            }

            if (data.newPassword && this.isPasswordProvider()) {
                updatePromises.push(
                    updatePassword(user, data.newPassword)
                );
            }

            await Promise.all(updatePromises);

            if (data.newUsername && !data.newEmail && !data.newPassword) {
                return;
            }

        } catch (error) {
            const authError = error as AuthError;
            switch (authError.code) {
                case 'auth/email-already-in-use':
                    throw new Error('This email is already in use by another account');
                case 'auth/invalid-email':
                    throw new Error('The email address is not valid');
                case 'auth/requires-recent-login':
                    throw new Error('Please sign in again to complete this action');
                case 'auth/weak-password':
                    throw new Error('Password is too weak. Please choose a stronger password');
                default:
                    if (authError.message) {
                        throw new Error(authError.message);
                    }
                    throw error;
            }
        }
    }
    private static async updateBackendProfile(token: string, data: {
        Name?: string,
        Email?: string
    }): Promise<void> {
        const response = await fetch(`http://localhost:5001/api/users/Auth`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.Name,
                email: data.Email
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Failed to update profile in backend');
        }
    }
}