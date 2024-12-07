"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { AuthService, SignUpFormData } from "@/services/authService";
import { FormInput } from "./FormInputProps";
import { SocialAuth } from "./SocialAuthProps";
import { MessageDisplay } from "./MessageDisplay";
import styles from "@/styles/auth/signup-form.module.css";
import Logo from "@/app/assets/logo/logo_L.png";
import Image from "next/image";
import { sendWelcomeEmail } from "@/request/NotificationsRequest";

const SignupForm = () => {
  const [isDarkMode] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

useEffect(() => {
  if (!currentUserEmail) return;

  const intervalId = setInterval(async () => {
    const user = auth.currentUser;

    if (user) {
      await user.reload(); 
      if (user.email === currentUserEmail && user.emailVerified) {
        clearInterval(intervalId);
        setCurrentUserEmail(null);
        setIsEmailSent(false);
        sendWelcomeEmail(user.email, user.displayName || "");
        router.replace("/login");
      }
    }
  }, 1600);

  return () => clearInterval(intervalId);
}, [currentUserEmail, router]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));

    if (id === "confirmPassword" && value !== formData.password) {
      setErrors((prev) => ({ ...prev, password: "Passwords do not match." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ username: "", email: "", password: "" });

    try {
      const { userCredential, isEmailSent: emailSent } =
        await AuthService.signUpWithEmailAndPassword(formData);
      setIsEmailSent(emailSent);
      setCurrentUserEmail(userCredential.user.email);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email")) {
          setErrors((prev) => ({ ...prev, email: error.message }));
        } else if (error.message.includes("password")) {
          setErrors((prev) => ({ ...prev, password: error.message }));
        } else if (error.message.includes("username")) {
          setErrors((prev) => ({ ...prev, username: error.message }));
        } else {
          setMessage(error.message);
          setMessageType("error");
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        setMessageType("error");
      }
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await AuthService.signInWithFacebook();
      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        setMessageType("error");
      }
    }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.formCard}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>SIGN UP</h1>

          {isEmailSent ? (
            <div className={styles.verificationMessage}>
              <h2>Check Your Email</h2>
              <p>
                We have sent a verification link to your email address. Please
                click the link to verify your account.
              </p>
              <p>Once verified, you can login to your account.</p>
            </div>
          ) : (
            <form noValidate className={styles.form} onSubmit={handleSubmit}>
              <FormInput
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                label="Username"
                error={errors.username}
              />

              <FormInput
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                label="Email"
                error={errors.email}
              />

              <FormInput
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                label="Password"
                error={errors.password}
              />

              <FormInput
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                label="Confirm Password"
                error={errors.password}
              />

              <button type="submit" className={styles.signupButton}>
                SIGN UP
              </button>

              <MessageDisplay message={message} type={messageType} />

              <SocialAuth
                onGoogleSignIn={handleGoogleSignIn}
                onFacebookSignIn={handleFacebookSignIn}
                message={"Or Sign up with"}
              />
            </form>
          )}
        </div>

        <div className={styles.rightSection}>
          <Image className={styles.logo} src={Logo} alt="Logo" />

          <div className={styles.welcomeText}>
            <h3 className="text-2xl mb-4">WELCOME!</h3>
            <p>Join us to find everything you need</p>
          </div>

          <div className={styles.loginSection}>
            <p className="mb-4">Already have an account?</p>
            <button
              className={styles.loginButton}
              onClick={() => router.push("/login")}
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className={styles.bottomRectangle}></div>
      </div>
    </div>
  );
};

export default SignupForm;
