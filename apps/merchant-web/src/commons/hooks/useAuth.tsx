import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthUser } from "@/types/auth";
import {API_URL} from "@/request/AxiosConfig";

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signOutHandle = async () => {
    try {
      await signOut(auth);
      document.cookie = "auth-token=; max-age=0; path=/";
      setUser(null);
    } catch (error) {
      console.error("Failed to close session", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          if (!token) {
            return
          }
          document.cookie = `auth-token=${token}; path=/`;

          const response = await fetch(`${API_URL}/users/Auth/token`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            const userData = responseData.data;
            setUser({
              ...currentUser,
              userType: userData.userType,
              userId: userData.id,
            });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading, signOutHandle };
};

export default useAuth;
