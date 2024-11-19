/* import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "@/config/firebase";
import { UserType } from "@/types/user";

interface AuthUser {
  userType?: UserType;
  userId?: string;
}

interface AuthContextType {
  loading: boolean;
  user: AuthUser | null;
  signOutHandle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signOutHandle = async () => {
    try {
      await signOut(auth);
      document.cookie = "auth-token=; max-age=0; path=/";
      localStorage.removeItem("auth-user");
      setUser(null);
    } catch (error) {
      console.error("Failed to close session", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return; // Evita nuevas solicitudes si ya tienes el usuario en el almacenamiento local.
    }

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
            const userInfo = {
              userType: userData.userType,
              userId: userData.id,
            };
            setUser(userInfo);
            localStorage.setItem("auth-user", JSON.stringify(userInfo));
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

  return (
    <AuthContext.Provider value={{ user, loading, signOutHandle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
 */