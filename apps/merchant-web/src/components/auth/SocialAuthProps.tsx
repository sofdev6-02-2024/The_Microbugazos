import React from "react";
import { MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import styles from "@/styles/auth/social-auth.module.css";

interface Props {
  onGoogleSignIn: () => Promise<void>;
  onFacebookSignIn: () => Promise<void>;
  message: string;
}

export const SocialAuth = ({
  onGoogleSignIn,
  onFacebookSignIn,
  message,
}: Props) => {
  return (
    <>
      <div className={styles.divider}>
        <span className={styles.dividerText}>{message}</span>
      </div>
      <div className={styles.socialButtons}>
        <button
          type="button"
          onClick={onGoogleSignIn}
          className={styles.socialButton}
        >
          <FcGoogle size={45} />
        </button>
        <button
          type="button"
          onClick={onFacebookSignIn}
          className={styles.socialButton}
        >
          <MdFacebook size={45} color="#3b5998" />
        </button>
      </div>
    </>
  );
};
