"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/auth/signup-form.module.css";
import Logo from "@/assets/logo/imagotipo/merchant-l.png";
import Image from "next/image";
import { useSignUpForm } from "@/hooks/sign-up/useSignUp";
import { Form } from "./sign-up-form/Form";
import { MessageVerification } from "./sign-up-form/MessageVerification";

const SignupForm = () => {
  const [isDarkMode] = useState(false);
  const {
    router,
    isEmailSent,
    currentUserEmail,
    tempUserData,
    unsubscribe,
    checkInterval
  } = useSignUpForm();

  useEffect(() => {
    if (!currentUserEmail) return;
    return () => {
      unsubscribe();
      clearInterval(checkInterval);
    };
  }, [router, currentUserEmail, tempUserData]);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.formCard}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>SIGN UP</h1>

          {isEmailSent ? (
            <MessageVerification />
          ) : (
            <Form />
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
