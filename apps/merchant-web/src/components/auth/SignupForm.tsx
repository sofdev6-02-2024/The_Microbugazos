'use client';

import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  sendEmailVerification,
  User
} from 'firebase/auth';
import { FormInput } from './FormInputProps';
import { SocialAuth } from './SocialAuthProps';
import { MessageDisplay } from './MessageDisplay';
import styles from '../../styles/auth/SignupForm.module.css';
import Logo from '../../app/assets/logo/logo_L.png';
import Image from 'next/image';

const SignupForm = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (id === 'email' || id === 'password') {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
    
    if (id === 'confirmPassword' && value !== formData.password) {
      setErrors(prev => ({ ...prev, password: 'Passwords do not match.' }));
    } else if (id === 'confirmPassword') {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const sendVerificationEmail = async (user: User) => {
    try {
      await sendEmailVerification(user);
      setIsEmailSent(true);
      setMessage('Verification email sent! Please check your inbox and verify your email address.');
      setMessageType('success');
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
      setMessageType('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    let hasErrors = false;
  
    if (!formData.username) {
      setErrors(prev => ({ ...prev, username: 'Username is required.' }));
      hasErrors = true;
    }
  
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required.' }));
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format.' }));
      hasErrors = true;
    }
  
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required.' }));
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, password: 'Passwords do not match.' }));
      hasErrors = true;
    }
  
    if (hasErrors) return;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendVerificationEmail(userCredential.user);
      
      
    } catch (error) {
      handleAuthError(error);
    }
  };  

  const handleAuthError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes('email-already-in-use')) {
        setErrors(prev => ({ ...prev, email: 'Email is already in use.' }));
      } else {
        setMessage(`Failed to create account: ${error.message}`);
        setMessageType('error');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      setMessage('Signed in with Google successfully!');
      setMessageType('success');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new FacebookAuthProvider());
      setMessage('Signed in with Facebook successfully!');
      setMessageType('success');
    } catch (error) {
      handleAuthError(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setMessage('Email verified successfully! You can now login.');
          setMessageType('success');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.formCard}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>SIGN UP</h1>
          
          {isEmailSent ? (
            <div className={styles.verificationMessage}>
              <h2>Check Your Email</h2>
              <p>We've sent a verification link to your email address. Please click the link to verify your account.</p>
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
                label='Email'
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
              />
            </form>
          )}
        </div>

        <div className={styles.rightSection}>
          <Image className={styles.logo}
            src={Logo}
            alt="Logo"
          />

          <div className={styles.welcomeText}>
            <h3 className="text-2xl mb-4">WELCOME!</h3>
            <p>Join us to find everything you need</p>
          </div>
          
          <div className={styles.loginSection}>
            <p className="mb-4">Already have an account?</p>
            <button className={styles.loginButton}>
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
