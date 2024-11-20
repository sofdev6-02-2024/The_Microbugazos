import { auth } from "@/config/firebase";
import {
  User,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  AuthError,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import axiosInstance from "@/request/AxiosConfig";
import { ProfileValidator } from "@/commons/validations/profile";

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateTokenWithBackend = async (user: User) => {
  const token = await user.getIdToken();

  if (!token) throw new Error("No token available");
  const response = await fetch("http://localhost:5001/api/users/Auth/token", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    await auth.signOut();
    throw new Error("User not registered in the system");
  }

  if (!response.ok) {
    await auth.signOut();
    throw new Error("Token validation failed");
  }

  return response.json();
};

export class AuthService {
  private static async registerUserInBackend(user: User) {
    try {
      await axiosInstance.post("/users/Auth/signup", {
        name: user.displayName,
        email: user.email,
        IdentityId: user.uid,
      });
    } catch (error: any) {
      if (
        error.response?.status === 500 &&
        error.response?.data?.detail?.startsWith(
          "System.Exception: User already exists."
        )
      ) {
        return;
      }
      throw error;
    }
  }
  private static async handleVerificationEmail(user: User) {
    try {
      await sendEmailVerification(user);
      await user.reload();
      return true;
    } catch (error) {
      throw new Error("Failed to send verification email. Please try again.");
    }
  }

  static async signUpWithEmailAndPassword(formData: SignUpFormData): Promise<{
    userCredential: UserCredential;
    isEmailSent: boolean;
  }> {
    if (!ProfileValidator.validateEmail(formData.email)) {
      throw new Error("Invalid email format");
    }

    if (!ProfileValidator.validatePassword(formData.password)) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (!ProfileValidator.validateUsername(formData.username)) {
      throw new Error("Username must be at least 3 characters long");
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });

      const isEmailSent = await this.handleVerificationEmail(
        userCredential.user
      );
      await this.registerUserInBackend(userCredential.user);

      return { userCredential, isEmailSent };
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async signInWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await this.registerUserInBackend(result.user);
      return result;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async signInWithFacebook(): Promise<UserCredential> {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await this.registerUserInBackend(result.user);
      return result;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }
  static isPasswordProvider(): boolean {
    const user = auth.currentUser;
    if (!user) return false;
    return user.providerData[0]?.providerId === "password";
  }

  static getProviderName(): string {
    const user = auth.currentUser;
    if (!user) return "";

    const primaryProvider = user.providerData[0]?.providerId;
    switch (primaryProvider) {
      case "google.com":
        return "Google";
      case "facebook.com":
        return "Facebook";
      case "password":
        return "Email/Password";
      default:
        return primaryProvider || "";
    }
  }

  static async reauthorizeUser(
    currentPassword?: string
  ): Promise<UserCredential> {
    const user = auth.currentUser;
    if (!user?.email) throw new Error("No user email found");

    const primaryProvider = user.providerData[0]?.providerId;

    try {
      if (primaryProvider === "password" && currentPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        return await reauthenticateWithCredential(user, credential);
      } else if (primaryProvider === "google.com") {
        const provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        return await reauthenticateWithPopup(user, provider);
      }
      throw new Error(
        `Unsupported authentication provider: ${primaryProvider}`
      );
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError): Error {
    const errorMessages: Record<string, string> = {
      "auth/email-already-in-use": "Email is already in use.",
      "auth/invalid-email": "Invalid email format.",
      "auth/operation-not-allowed": "Operation not allowed.",
      "auth/weak-password": "Password is too weak.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/popup-blocked": "Popup was blocked by the browser.",
      "auth/popup-closed-by-user": "Popup was closed by the user.",
      "auth/cancelled-popup-request": "Authentication cancelled.",
      "auth/network-request-failed": "Network error. Please try again.",
    };

    console.error("Auth error:", error);
    return new Error(errorMessages[error.code] || error.message);
  }
}
