import { auth } from '@/config/firebase';
import { User } from 'firebase/auth';

export const validateTokenWithBackend = async (user: User) => {
    const token = await user.getIdToken();
    if (!token) throw new Error('No token available');
    console.log(token);
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
