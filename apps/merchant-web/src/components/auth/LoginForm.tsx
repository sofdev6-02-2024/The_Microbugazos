'use client';

import React, { useState } from 'react';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import {
    signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,
    signInWithEmailAndPassword, User, AuthProvider, sendPasswordResetEmail
} from 'firebase/auth';
import { FormInput } from './FormInputProps';
import { SocialAuth } from './SocialAuthProps';
import { MessageDisplay } from './MessageDisplay';
import styles from '../../styles/auth/LoginForm.module.css';
import Logo from '../../app/assets/logo/logo_L.png';
import Image from 'next/image';
import {validateTokenWithBackend} from "@/components/auth/authService";

const LoginForm = () => {
    const [isDarkMode] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        auth: ''
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
        setErrors(prev => ({...prev, [id]: '', auth: ''}));
    };

    const handleAuthSuccess = async (firebaseUser: User) => {
        try {
            await validateTokenWithBackend(firebaseUser);
            router.push('/');
        } catch (error: any) {
            console.error('Auth error:', error);
            setMessage(error.message === 'User not registered in the system'
                ? 'User does not exist'
                : 'Authentication failed');
            setMessageType('error');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setErrors({ email: '', password: '', auth: '' });
        let hasErrors = false;

        if (!formData.email) {
            setErrors(prev => ({...prev, email: 'Email is required.'}));
            hasErrors = true;
        } else if (!validateEmail(formData.email)) {
            setErrors(prev => ({...prev, email: 'Invalid email format.'}));
            hasErrors = true;
        }

        if (!formData.password) {
            setErrors(prev => ({...prev, password: 'Password is required.'}));
            hasErrors = true;
        }

        if (hasErrors) {
            setIsLoading(false);
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await handleAuthSuccess(result.user);

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

        } catch {
            const errorMessage = 'Email or Password invalid';
            setErrors(prev => ({...prev, auth: errorMessage}));
            setMessage(errorMessage);
            setMessageType('error');
            await auth.signOut();
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialAuth = async (provider: AuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            await handleAuthSuccess(result.user);
        } catch {
            const errorMessage = 'Authentication failed. Please try again.';
            setMessage(errorMessage);
            setMessageType('error');
            await auth.signOut();
        }
    };

    const handleGoogleSignIn = () => handleSocialAuth(new GoogleAuthProvider());
    const handleFacebookSignIn = () => handleSocialAuth(new FacebookAuthProvider());

    const toggleRememberMe = () => {
        setRememberMe(prev => !prev);
    }
    const handleForgotPassword = async () => {
        if (!formData.email) {
            setErrors(prev => ({...prev, email: 'Please enter your email to reset password.'}));
            return;
        }

        try {
            await sendPasswordResetEmail(auth, formData.email);
            setMessage('Password reset email sent successfully. Check your inbox.');
            setMessageType('success');
        } catch (error) {
            console.error('Forgot password error:', error);
            setMessage('Failed to send password reset email. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
            <div className={styles.formCard}>
                <div className={styles.leftSection}>
                    <Image className={styles.logo}
                           src={Logo}
                           alt="Logo"
                    />

                    <div className={styles.welcomeText}>
                        <h3 className="text-2xl mb-4">WELCOME BACK!</h3>
                        <p>To keep connected with us please sign up </p>
                        <p>with you personal info</p>
                    </div>

                    <div className={styles.signupSection}>
                        <p className="mb-4">Do not have an account?</p>
                        <button className={styles.loginButton} onClick={() => router.push('/signup')}>
                            SIGN UP
                        </button>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <h1 className={styles.title}>SIGN IN</h1>
                    <form noValidate className={styles.form} onSubmit={handleSubmit}>
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

                        <div className={styles.details}>
                            <div className={styles.rememberMeSection}>
                                <input
                                    type='checkbox'
                                    id='rememberMe'
                                    checked={rememberMe}
                                    onChange={toggleRememberMe}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className={styles.forgotPassword}>
                                <a onClick={handleForgotPassword}>Forgot Password?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.signinButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>

                        <MessageDisplay message={message} type={messageType}/>

                        <SocialAuth
                            onGoogleSignIn={handleGoogleSignIn}
                            onFacebookSignIn={handleFacebookSignIn}
                            message={'Or Login with'}
                        />
                    </form>
                </div>
                <div className={styles.bottomRectangle}></div>
            </div>
        </div>
    );
}

export default LoginForm;
