"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "@/styles/header/user/user-options.css";

interface Props {
  isLogged: boolean;
  isOpen: boolean;
  logOut: () => void;
  toggleMenu: () => void;
}

export const UserOptions = ({
  isLogged,
  isOpen,
  logOut,
  toggleMenu,
}: Props) => {
  const userRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      userRef.current &&
      !userRef.current.contains(event.target as Node)
    ) {
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`user-options ${isOpen ? "open" : ""}`} ref={userRef}>
      {isLogged ? (
        <>
          <Link href="/profile" className="user-options-option">
            Profile
          </Link>
          <button className="user-options-option log-out" onClick={logOut}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="user-options-option">
            Log in
          </Link>
          <Link href="/signup" className="user-options-option">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};
