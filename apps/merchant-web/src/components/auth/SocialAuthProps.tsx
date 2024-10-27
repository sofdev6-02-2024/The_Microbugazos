import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from '../../styles/auth/SocialAuth.module.css';

interface SocialAuthProps {
  onGoogleSignIn: () => Promise<void>;
  onFacebookSignIn: () => Promise<void>;
}

export const SocialAuth: React.FC<SocialAuthProps> = ({
  onGoogleSignIn,
  onFacebookSignIn,
}) => {
  return (
    <>
      <div className={styles.divider}>
        <span className={styles.dividerText}>Or Signup with</span>
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
          <FaFacebook size={45} />
        </button>
      </div>
    </>
  );
};
