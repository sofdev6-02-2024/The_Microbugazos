import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthUser } from "@/types/auth";

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signOutHandle = async () => {
    try {
      await signOut(auth);
      document.cookie = "auth-token=; max-age=0; path=/";
      setUser(null);
    } catch (error) {
      console.log("Failed to close session", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          document.cookie = `auth-token=${token}; path=/`;

          const response = await fetch(
            "http://localhost:5001/api/users/Auth/token",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser({
              ...currentUser,
              userType: userData.userType,
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
