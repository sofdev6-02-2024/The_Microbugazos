import { auth } from '@/config/firebase';
import { User,
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    AuthError,
    UserCredential,
} from 'firebase/auth';

export const validateTokenWithBackend = async (user: User) => {
    const token = await user.getIdToken();
    if (!token) throw new Error('No token available');
    const response = await fetch('http://localhost:5001/api/users/Auth/token', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 404) {
        await auth.signOut();
        throw new Error('User not registered in the system');
    }

    if (!response.ok) {
        await auth.signOut();
        throw new Error('Token validation failed');
    }

    return response.json();
};

export class AuthService {
    static isPasswordProvider(): boolean {
        const user = auth.currentUser;
        if (!user) return false;
        return user.providerData[0]?.providerId === 'password';
    }

    static getProviderName(): string {
        const user = auth.currentUser;
        if (!user) return '';

        const primaryProvider = user.providerData[0]?.providerId;
        switch (primaryProvider) {
            case 'google.com': return 'Google';
            case 'facebook.com': return 'Facebook';
            case 'password': return 'Email/Password';
            default: return primaryProvider || '';
        }
    }

    static async reauthorizeUser(currentPassword?: string): Promise<UserCredential> {
        const user = auth.currentUser;
        if (!user?.email) throw new Error('No user email found');

        const primaryProvider = user.providerData[0]?.providerId;

        try {
            if (primaryProvider === 'password' && currentPassword) {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                return await reauthenticateWithCredential(user, credential);
            } else if (primaryProvider === 'google.com') {
                const provider = new GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                return await reauthenticateWithPopup(user, provider);
            }
            throw new Error(`Unsupported authentication provider: ${primaryProvider}`);
        } catch (error) {
            throw this.handleAuthError(error as AuthError);
        }
    }

    private static handleAuthError(error: AuthError): Error {
        const errorMessages: Record<string, string> = {
            'auth/user-mismatch': 'The provided credentials do not correspond to the currently signed in user',
            'auth/requires-recent-login': 'Please sign in again to complete this action',
            'auth/invalid-credential': 'Invalid password. Please try again',
            'auth/wrong-password': 'Incorrect password. Please try again',
            'auth/popup-blocked': 'Please enable popups for this site to reauthenticate with Google',
            'auth/popup-closed-by-user': 'Authentication cancelled. Please try again',
            'auth/network-request-failed': 'Network error. Please check your connection and try again',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later'
        };

        const message = errorMessages[error.code] || `Authentication failed: ${error.message}`;
        console.error('Reauthorization error:', error);
        return new Error(message);
    }
}
