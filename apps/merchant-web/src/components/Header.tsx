import React, {useState} from 'react';
import styles from '@/styles/Header.module.css'
import Logo from '@/app/assets/logo/S.png'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image';
import { IoMenuOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import SideMenu from "@/components/SideMenu";

const Header = () => {
    const {user, loading} = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={toggleMenu}>
                <IoMenuOutline className={styles.menuLogo}/>
            </button>
            <Image className={styles.logo}
               alt="Logo"
               src={Logo}
            />
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search something..."
                    className={styles.input}
                />
                <IoSearch className={styles.searchIcon}/>
            </div>
            {!user && !loading ? (
                <div className={styles.authSection}>
                    <button className={styles.signInButton} onClick={() => router.push('/login')}>Sign In</button>
                    <button className={styles.signUpButton} onClick={() => router.push('/signup')}>Sign Up</button>
                </div>
            ):
                <div>
                    <button>{user?.displayName?.slice(0, 2) || 'NA'}</button>
                </div>
            }
            {isMenuOpen && (
                <div className={styles.sideMenuOverlay}>
                    <SideMenu/>
                </div>
            )}
        </div>
    )
};

export default Header;