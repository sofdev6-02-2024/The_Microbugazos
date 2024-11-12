"use client";

import { useState, useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import logo from "@/app/assets/logo/S.png";
import "@/styles/header/header.css";
import { SearchBar } from "./header/searchbar/searchbar";
import { ShoppingCart } from "./header/shopping-cart/shoppingCart";
import { UserSession } from "./header/user/UserSession";
import { Menu } from "@/components/header/menu/Menu";
import { useRouter } from "next/navigation";

interface Props {
  isRegistered: boolean;
}

export function Header({ isRegistered }: Readonly<Props>) {
  const { user, loading, signOutHandle } = useAuth();
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // if (
    //   isMenuOpen &&
    //   sideMenuRef.current &&
    //   !sideMenuRef.current.contains(event.target as Node)
    // ) {
    //   setIsMenuOpen(false);
    // }
    if (
      isProfileMenuOpen &&
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogout = () => {
    signOutHandle();
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="first-section-header">
        <Menu />
        <Image src={logo} alt="Merchant logo" draggable={false} />
      </div>
      <SearchBar />
      <div className="header-actions">
        <ShoppingCart />
        <UserSession isLogged={user !== null} />
      </div>
    </header>
  );
}

// import { IoMenuOutline } from "react-icons/io5";
// import { IoSearch } from "react-icons/io5";
//
// import SideMenu from "@/components/SideMenu";
// import { RiShoppingCart2Line } from "react-icons/ri";
// import { Option } from "@/components/Option";
// import { IoLogOutOutline } from "react-icons/io5";

//     return (
//         <div className={styles.container}>
//             <button className={styles.button} onClick={toggleMenu}>
//                 <IoMenuOutline className={styles.menuLogo}/>
//             </button>
//             <Image
//                 className={styles.logo}
//                 alt="Logo"
//                 src={isMobile ? MobileLogo : Logo}
//             />
//             <div className={styles.searchContainer}>
//                 <input
//                     type="text"
//                     placeholder="Search something..."
//                     className={styles.input}
//                 />
//                 <IoSearch className={styles.searchIcon}/>
//             </div>
//             <div className={styles.authSection}>
//                 <RiShoppingCart2Line size={isMobile ? 25 : 35} className={styles.cartIcon}/>
//                 {!user && !loading ? (
//                     isMobile ? (
//                         <div className={styles.profileContainer} ref={profileMenuRef}>
//                             <button className={styles.profile}>
//                                 NA
//                             </button>
//                         </div>
//                     ) : (
//                         <div className={styles.authSection}>
//                             <button className={styles.signInButton} onClick={() => router.push('/login')}>Sign In</button>
//                             <button className={styles.signUpButton} onClick={() => router.push('/signup')}>Sign Up</button>
//                         </div>
//                     )
//                 ) : (
//                     <div className={styles.profileContainer} ref={profileMenuRef}>
//                         <button className={styles.profile} onClick={toggleProfileMenu}>
//                             {user?.displayName?.slice(0, 2) || 'NA'}
//                         </button>
//                         {isProfileMenuOpen && (
//                             <div className={styles.profileMenu}>
//                                 <div onClick={handleLogout}>
//                                     <Option icon={IoLogOutOutline} text="Logout" />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//             {isMenuOpen && (
//                 <div className={styles.sideMenuOverlay} ref={sideMenuRef}>
//                     <SideMenu />
//                 </div>
//             )}
//         </div>
//     )
// };
