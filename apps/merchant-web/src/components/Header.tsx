"use client";

import { useState, useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import logo from "@/assets/logo/imagotipo/merchant-s.png";
import "@/styles/header/header.css";
import { SearchBar } from "./header/searchbar/searchbar";
import { ShoppingCart } from "./header/shopping-cart/shoppingCart";
import { UserSession } from "./header/user/UserSession";
import { Menu } from "@/components/header/menu/Menu";

export function Header() {
  const { user } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isProfileMenuOpen &&
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsDown(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <header className={`header ${isDown ? "down" : ""}`}>
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
