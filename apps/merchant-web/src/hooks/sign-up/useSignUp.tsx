import { auth } from "@/config/firebase";
import UserSession from "@/entities/sign-up/UserSession";
import axiosInstance from "@/request/AxiosConfig";
import { messageType, tempUser, userEmail } from "@/types/sign-up-types";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  User,
  updateProfile,
  getAdditionalUserInfo,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useValidate } from "../useValidate";

export const useSignUpForm = () => {
  const { validateEmail } = useValidate();

  const router = useRouter();
  const [formData, setFormData] = useState<UserSession>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<UserSession>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<messageType>("success");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<userEmail>(null);
  const [tempUserData, setTempUserData] = useState<tempUser>({
    userCredential: null,
    formData: null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "email" || id === "password") {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }

    if (id === "confirmPassword" && value !== formData.password) {
      setErrors((prev) => ({ ...prev, password: "Passwords do not match." }));
    } else if (id === "confirmPassword") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const registerVerifiedUser = async (userCredential: UserCredential) => {
    const userInfo = getAdditionalUserInfo(userCredential);
    if (!userInfo?.isNewUser) return;
    const user = userCredential.user;

    try {
      await axiosInstance.post("/users/Auth/signup", {
        name: user.displayName,
        email: user.email,
        IdentityId: user.uid,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status, data } = error.response || {};
        if (
          status === 500 &&
          data?.detail?.startsWith("System.Exception: User already exists.")
        ) {
          return;
        }
      }
      console.error("Error registering verified user:", error);
      throw error;
    }
  };

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user?.email === currentUserEmail) {
      await user.reload();

      if (user.emailVerified) {
        if (tempUserData.userCredential) {
          await registerVerifiedUser(tempUserData.userCredential);
        }
        setCurrentUserEmail(null);
        setIsEmailSent(false);
        router.replace("/login");
      }
    }
  });

  const checkInterval = setInterval(async () => {
    const currentUser = auth.currentUser;
    if (currentUser?.email === currentUserEmail) {
      await currentUser.reload();
      if (currentUser.emailVerified) {
        clearInterval(checkInterval);
        if (tempUserData.userCredential) {
          await registerVerifiedUser(tempUserData.userCredential);
        }
        setCurrentUserEmail(null);
        setIsEmailSent(false);
        router.replace("/login");
      }
    }
  }, 2000);

  const sendVerificationEmail = async (user: User) => {
    try {
      await sendEmailVerification(user);
      setIsEmailSent(true);
      setCurrentUserEmail(user.email);

      await user.reload();
    } catch (error) {
      setMessage("Failed to send verification email. Please try again.");
      setMessageType("error");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasErrors = false;

    if (!formData.username) {
      setErrors((prev) => ({ ...prev, username: "Username is required." }));
      hasErrors = true;
    }

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      hasErrors = true;
    }

    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, password: "Passwords do not match." }));
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });

      setTempUserData({
        userCredential,
        formData: { ...formData },
      });
      await sendVerificationEmail(userCredential.user);
    } catch (error) {
      setTempUserData({
        userCredential: null,
        formData: null,
      });
      handleAuthError(error);
    }
  };

  const registerUser = async (userCredential: UserCredential) => {
    const userInfo = getAdditionalUserInfo(userCredential);
    if (!userInfo?.isNewUser) return;
    const user = userCredential.user;

    try {
      await axios.post("http://localhost:5001/api/users/Auth/signup", {
        name: user.displayName,
        email: user.email,
        IdentityId: user.uid,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status, data } = error.response || {};
        if (
          status === 500 &&
          data?.detail?.startsWith("System.Exception: User already exists.")
        ) {
          return;
        }
      }
      console.error("Error registering user:", error);
    }
  };

  const handleAuthError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes("email-already-in-use")) {
        setErrors((prev) => ({ ...prev, email: "Email is already in use." }));
      } else {
        setMessage(`Failed to create account: ${error.message}`);
        setMessageType("error");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await registerUser(result);
      router.replace("/login");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new FacebookAuthProvider());
      await registerUser(result);
    } catch (error) {
      handleAuthError(error);
    }
  };

  return {
    router,
    formData,
    errors,
    message,
    messageType,
    isEmailSent,
    currentUserEmail,
    tempUserData,
    handleInputChange,
    unsubscribe,
    registerVerifiedUser,
    checkInterval,
    handleSubmit,
    handleGoogleSignIn,
    handleFacebookSignIn
  };
};
