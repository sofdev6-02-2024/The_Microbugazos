import { useEffect, useState } from 'react';
import {auth} from '@/config/firebase'
import {onAuthStateChanged, User, signOut} from "firebase/auth";

const UseAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const signOutHandle = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch(() => {
                console.log("Failed to close sesion")
            })
    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           setLoading(false);
       })
        return unsubscribe;
    });

    return (
        { user, loading, signOutHandle}
    );
};

export default UseAuth;